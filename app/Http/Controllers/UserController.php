<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Position;
use App\Models\Division;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::with('Position', 'position.division')->get();
        $divisions = Division::all();
        $positions = Position::with('division')->get();
        return Inertia::render('User', [
            'user' => $user,
            'positions' => $positions,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|string|unique:users,nik',
            'password' => 'required|string|min:6',
            'id_position' => 'required|exists:positions,id',
            'role' => 'required|in:user,admin,superadmin',
        ]);

        try {
            User::create([
                'name' => $request->name,
                'nik' => $request->nik,
                'password' => Hash::make($request->password),
                'id_position' => $request->id_position,
                'role' => $request->role,
            ]);

            return response()->json([
                'message' => 'User berhasil ditambahkan'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'nik' => 'required|string|max:20|unique:users,nik,' . $id,
        'role' => 'required|string|in:superadmin,admin,user',
        'password' => 'nullable|string|min:8',
        'id_position' => 'required|exists:positions,id',
        'id_division' => 'required|exists:divisions,id',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => $validator->errors()->first()], 422);
    }

    // Find the user and update their information
    $user = User::findOrFail($id);
    $user->name = $request->name;
    $user->nik = $request->nik;
    $user->role = $request->role;
    if ($request->password) {
        $user->password = Hash::make($request->password);
    }
    $user->id_position = $request->id_position;
    $user->save();

    return response()->json(['message' => 'User berhasil diedit.', 'user' => $user], 200);
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
