<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('useraddress', function (Blueprint $table) {
            $table->id();

            // Foreign key
            $table->unsignedBigInteger('user_id');

            // Current Address
            $table->string('address1');
            $table->string('address2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('zipcode', 10);
            $table->string('country');

            // Permanent Address
            $table->string('paddress1')->nullable();
            $table->string('paddress2')->nullable();
            $table->string('pcity')->nullable();
            $table->string('pstate')->nullable();
            $table->string('pzipcode', 10)->nullable();
            $table->string('pcountry')->nullable();

            // Checkbox flag
            $table->boolean('ischecked')->default(false);

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('useraddress');
    }
};
