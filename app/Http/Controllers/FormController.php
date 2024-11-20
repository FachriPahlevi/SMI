<?php

namespace App\Http\Controllers;

use App\Models\FormApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
     return Inertia::render('form/view');
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FormApplication  $formApplication
     * @return \Illuminate\Http\Response
     */
    public function show(FormApplication $formApplication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FormApplication  $formApplication
     * @return \Illuminate\Http\Response
     */
    public function edit(FormApplication $formApplication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FormApplication  $formApplication
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FormApplication $formApplication)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FormApplication  $formApplication
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormApplication $formApplication)
    {
        //
    }
}
