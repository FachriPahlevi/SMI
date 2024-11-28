<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('sop', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_division')->constrained('divisions')->onDelete('cascade');
        $table->string('title');
        $table->string('description');
        $table->string('sop')->nullable();
        $table->string('flowchart')->nullable();
        $table->enum('status', ['disetujui', 'menunggu', 'ditolak'])->default('menunggu');
        $table->json('related_division')->nullable();
        $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sop');
    }
};
