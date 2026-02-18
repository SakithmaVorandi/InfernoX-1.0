"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    document.cookie = `admin_auth=${encodeURIComponent(password)}; path=/; SameSite=Lax`;
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-white/70">
          Enter the admin password to view registrations.
        </p>

        <input
          className="mt-4 w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button
          className="mt-4 w-full rounded-xl bg-white text-black py-3 font-semibold hover:opacity-90"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-3 text-xs text-white/50">
          Tip: bookmark <span className="font-mono">/admin</span>
        </p>
      </div>
    </div>
  );
}
