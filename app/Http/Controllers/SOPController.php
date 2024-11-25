<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SOP;
use App\Models\User;
use App\Models\Division;
use App\Models\FilesExtended;
use App\Models\Notification;

class SOPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        $sop = SOP::where('id_division', $id)
        ->with('user', 'division')
        ->get();

        return Inertia::render('SOP/SOP', [
            "sop" => $sop,
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
            'supporting_files.*.category' => 'required_with:supporting_files.*.file|string',
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
                if (isset($supportingFile['file']) && isset($supportingFile['category'])) {
                    $file = $supportingFile['file'];
                    $fileName = time() . '_' . $supportingFile['category'] . '_' . $file->getClientOriginalName();
                    // Simpan di public/storage/supporting-files
                    $filePath = $file->storeAs('public/supporting-files', $fileName);
                    // Ubah path agar bisa diakses via URL
                    $filePath = 'storage/extended/' . $fileName;
                    
                    FilesExtended::create([
                        'name' => $file->getClientOriginalName(),
                        'file_path' => $filePath,
                        'id_sop' => $sop->id,
                        'category' => $supportingFile['category'],
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
        $division = Division::all();
        $sop = SOP::where('id', $id)
        ->with('division')
        ->get();
        return Inertia::render('SOP/Show', [
            'sop'=> $sop,
            'division' => $division,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
            $sop = SOP::where('id', $id)->get();
            return Inertia::render('SOP/Edit', [
                'sop'=> $sop,
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
