<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('help_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->enum('type', ['مالي', 'غذائي', 'طبي', 'تعليمي', 'إيجار', 'أخرى'])->default('مالي');
            $table->text('description');
            $table->decimal('amount', 12, 2)->nullable();
            $table->string('address')->nullable();
            $table->enum('status', ['قيد_المراجعة', 'تمت_الموافقة', 'تم_الصرف', 'مرفوض'])->default('قيد_المراجعة');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('help_requests');
    }
};
