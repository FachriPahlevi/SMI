<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        if (Auth::check()) {
            $userRole = Auth::user()->role;
            
            // Superadmin dapat mengakses semua role
            if ($userRole === 'superadmin') {
                return $next($request);
            }
            
            // Untuk role lain, harus sesuai
            if ($userRole === $role) {
                return $next($request);
            }
        }
        
        return redirect('/')->with('error', 'Unauthorized access');
    }
}