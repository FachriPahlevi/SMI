<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SOP;
use App\Models\User;
use App\Models\Division;
use App\Models\FilesExtended;
use App\Models\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


use Illuminate\Support\Facades\Log; 

class SOPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        $sop = SOP::where('id_division',$id)
        ->with('user', 'division')
        ->get();

        $division = Division::where('id', $id)->first();
       

        return Inertia::render('SOP/SOP', [
            "sop" => $sop,
            "division" => $division
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $division = Division::all();

        return Inertia::render('SOP/Form', [
            'division'=>$division
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->all());
        // Validasi input
        $request->validate([
            'id_division' => 'required|exists:divisions,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'flowchart_file' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:2048',
            'sop_file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'divisions' => 'nullable|array',
            'divisions.*' => 'exists:divisions,id',
            'supporting_files' => 'nullable|array',
            'supporting_files.*.file' => 'nullable|file|max:2048',
            'supporting_files.*.name' => 'required_with:supporting_files.*.file|string',
        ]);
    
        // Proses file SOP
        $sopPath = null;
        if ($request->hasFile('sop_file')) {
            $file = $request->file('sop_file');
            $fileName = time() . '_sop_' . $file->getClientOriginalName();
            // Simpan di public/storage/sops
            $sopPath = $file->storeAs('public/sop', $fileName);
            // Ubah path agar bisa diakses via URL
            $sopPath = 'storage/sop/' . $fileName;
        }
    
        // Proses file Flowchart
        $flowchartPath = null;
        if ($request->hasFile('flowchart_file')) {
            $file = $request->file('flowchart_file');
            $fileName = time() . '_flowchart_' . $file->getClientOriginalName();
            // Simpan di public/storage/flowcharts
            $flowchartPath = $file->storeAs('public/flowchart', $fileName);
            // Ubah path agar bisa diakses via URL
            $flowchartPath = 'storage/flowchart/' . $fileName;
        }
    
        // Simpan data SOP ke tabel `sop`
        $sop = SOP::create([
            'id_division' => $request->input('id_division'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'sop' => $sopPath,
            'flowchart' => $flowchartPath,
            'related_division' => $request->input('divisions') ? json_encode($request->input('divisions')) : null,
            'created_by' => auth()->id(),
        ]);
    
        // Proses file-file pendukung ke tabel files_extended
        if ($request->has('supporting_files')) {
            foreach ($request->supporting_files as $supportingFile) {
                if (isset($supportingFile['file']) && isset($supportingFile['name'])) {
                    $file = $supportingFile['file'];
                    $fileName = time() . '_' . $supportingFile['name'] . '_' . $file->getClientOriginalName();
                    // Simpan di public/storage/supporting-files
                    $filePath = $file->storeAs('public/lainnya', $fileName);
                    // Ubah path agar bisa diakses via URL
                    $filePath = 'storage/extended/' . $fileName;
                    
                    FilesExtended::create([
                        'name' => $supportingFile['name'],
                        'file_path' => $filePath,
                        'id_sop' => $sop->id,
                    ]);
                }
            }
        }
    
        // Kirim notifikasi
        $relatedDivisions = $request->input('divisions');
        if (is_array($relatedDivisions)) {
            foreach ($relatedDivisions as $divisionId) {
                $division = Division::find($divisionId);
                if ($division) {
                    Notification::create([
                        'id_division' => $division->id,
                        'id_sop' => $sop->id,
                        'message' => 'Pengajuan SOP dari divisi ' . $division->name,
                        'status' => 'unread',
                    ]);
                }
            }
        }
    
        // Redirect dengan pesan sukses
        return redirect()->route('divisi.index')->with('success', 'SOP berhasil disimpan dengan file pendukung.');
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
{
    try {
        $division = Division::all();

        $sop = SOP::where('id', $id)
            ->with('division')
            ->get()
            ->map(function ($item) {
                $relatedDivisionIds = json_decode($item->related_division, true);
                if (is_array($relatedDivisionIds)) {
                    $relatedDivisions = Division::whereIn('id', $relatedDivisionIds)->get();
                } else {
                    $relatedDivisions = collect();
                }

                $item->related_divisions = $relatedDivisions;
                return $item;
            });
            $supportedFile = FilesExtended::where('id_sop', $id)->get();

            // dd($supportedFile);
            

        return Inertia::render('SOP/Show', [
            'sop' => $sop,
            'division' => $division,
            'supportedFile' => $supportedFile
        ]);
    } catch (\Exception $e) {
        return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
}


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $sop = SOP::where('id', $id)
            ->with('division')
            ->first(); // Gunakan first() untuk mendapatkan single model
    
        if (!$sop) {
            return redirect()->back()->with('error', 'SOP tidak ditemukan');
        }
    
        // Decode related divisions
        $relatedDivisionIds = json_decode($sop->related_division, true) ?? [];
        $relatedDivision = Division::whereIn('id', $relatedDivisionIds)->get();
        $sop->related_division = $relatedDivision;
    
        $division = Division::all();
        $existingSupportingFiles = FilesExtended::where('id_sop', $id)->get();


        
        
        return Inertia::render('SOP/Edit', [
            'sop' => $sop,
            'division' => $division,
            'existingSupportingFiles'=>$existingSupportingFiles
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $sopId)
{
    // Find the existing SOP
    $sop = SOP::findOrFail($sopId);

    // Validate input
    $request->validate([
        'id_division' => 'required|exists:divisions,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:1000',
        'flowchart_file' => 'nullable|file|mimes:pdf,png,jpg,jpeg|max:2048',
        'sop_file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        'divisions' => 'nullable|array',
        'divisions.*' => 'exists:divisions,id',
        'supporting_files' => 'nullable|array',
        'supporting_files.*.file' => 'nullable|file|max:2048',
        'supporting_files.*.name' => 'nullable|string',
        'supporting_files.*.existing_id' => 'nullable|exists:files_extended,id',
        'removed_supporting_files' => 'nullable|array',
        'removed_supporting_files.*' => 'exists:files_extended,id',
    ]);

    // Proses hapus sop lama
    $sopPath = $sop->sop;
    if ($request->hasFile('sop_file')) {
        // Menghapus file yang lama jika ada
        if ($sopPath && Storage::exists(str_replace('storage/', 'public/', $sopPath))) {
            Storage::delete(str_replace('storage/', 'public/', $sopPath));
        }

        $file = $request->file('sop_file');
        $fileName = time() . '_sop_' . $file->getClientOriginalName();
        $sopPath = $file->storeAs('public/sop', $fileName);
        $sopPath = 'storage/sop/' . $fileName;
    }

    // proses update file flowchart
    $flowchartPath = $sop->flowchart;
    if ($request->hasFile('flowchart_file')) {
        // Delete wanita yang lama atau bisa mengganti dengan yang baru
        if ($flowchartPath && Storage::exists(str_replace('storage/', 'public', $flowchartPath))) {
            Storage::delete(str_replace('storage/', 'public/', $flowchartPath));
        }

        $file = $request->file('flowchart_file');
        $fileName = time() . '_flowchart_' . $file->getClientOriginalName();
        $flowchartPath = $file->storeAs('public/flowchart', $fileName);
        $flowchartPath = 'storage/flowchart/' . $fileName;
    }

    // Update SOP main record
    $sop->update([
        'id_division' => $request->input('id_division'),
        'title' => $request->input('title'),
        'description' => $request->input('description'),
        'sop' => $sopPath,
        'flowchart' => $flowchartPath,
        'related_division' => $request->input('divisions') ? json_encode($request->input('divisions')) : null,
    ]);

    // Handle removed supporting files
    if ($request->has('removed_supporting_files')) {
        $removedFiles = $request->input('removed_supporting_files');
        foreach ($removedFiles as $fileId) {
            $extendedFile = FilesExtended::find($fileId);
            if ($extendedFile) {
                // Delete file from storage
                if (Storage::exists(str_replace('storage/', 'public/', $extendedFile->file_path))) {
                    Storage::delete(str_replace('storage/', 'public/', $extendedFile->file_path));
                }
                // Delete database record
                $extendedFile->delete();
            }
        }
    }

    // Process supporting files
    if ($request->has('supporting_files')) {
        foreach ($request->supporting_files as $supportingFile) {
            // If it's a new file
            if (isset($supportingFile['file'])) {
                $file = $supportingFile['file'];
                $fileName = time() . '_' . $supportingFile['name'] . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('public/lainnya', $fileName);
                $filePath = 'storage/extended/' . $fileName;
                
                FilesExtended::create([
                    'name' => $supportingFile['name'],
                    'file_path' => $filePath,
                    'id_sop' => $sop->id,
                ]);
            } 
            // If it's an existing file with potential name update
            elseif (isset($supportingFile['existing_id'])) {
                $existingFile = FilesExtended::find($supportingFile['existing_id']);
                if ($existingFile) {
                    $existingFile->update([
                        'name' => $supportingFile['name']
                    ]);
                }
            }
        }
    }

    // Update related divisions notifications
    // First, remove existing notifications
    Notification::where('id_sop', $sop->id)->delete();

    // Create new notifications for related divisions
    $relatedDivisions = $request->input('divisions');
    if (is_array($relatedDivisions)) {
        foreach ($relatedDivisions as $divisionId) {
            $division = Division::find($divisionId);
            if ($division) {
                Notification::create([
                    'id_division' => $division->id,
                    'id_sop' => $sop->id,
                    'message' => 'SOP diperbarui dari divisi ' . $division->name,
                    'status' => 'unread',
                ]);
            }
        }
    }

    // Redirect with success message
    return redirect()->route('divisi.index')->with('success', 'SOP berhasil diperbarui dengan file pendukung.');
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
