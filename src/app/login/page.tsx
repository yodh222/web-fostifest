"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message || "Gagal masuk. Periksa kembali email dan password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6 relative overflow-hidden scanline">
      {/* HUD KEMBALI Button */}
      <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-50 font-pixel text-xs bg-red-900 text-white px-4 py-2 border-4 border-red-950 hover:bg-red-800 transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
        {"< KEMBALI"}
      </Link>

      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-glow"></div>
      <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-green-500/10 blur-[100px] animate-pulse-glow"></div>
      
      <div className="pixel-card-wood relative z-10 w-full max-w-md p-2 animate-float">
        <div className="pixel-card-wood-light relative p-8 text-center text-white">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#1a0f07] bg-[#5c3a21] px-6 py-2 whitespace-nowrap">
            <h1 className="font-pixel text-xl text-shadow-pixel-sm hover-glitch cursor-default">LOGIN</h1>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6 text-left">
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 p-2 text-red-400 font-vt323 text-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label className="font-pixel text-xs text-gray-300">[EMAIL]</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-4 border-[#1a0f07] bg-[#1a0f07] p-3 font-vt323 text-xl text-white outline-none focus:border-green-500 transition-colors" 
                placeholder="email@tim.com"
              />
            </div>
            
            <div>
              <label className="font-pixel text-xs text-gray-300">[PASSWORD]</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border-4 border-[#1a0f07] bg-[#1a0f07] p-3 font-vt323 text-xl text-white outline-none focus:border-green-500 transition-colors" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="pixel-btn-green font-pixel mt-4 w-full py-4 text-sm text-shadow-pixel-sm disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {loading ? "MEMPROSES..." : "MASUK"}
            </button>
          </form>

          <p className="font-vt323 mt-6 text-xl text-gray-300">
            Belum punya akun tim?{" "}
            <Link href="/register" className="font-pixel text-xs text-yellow-400 hover:text-green-400 transition-colors">
              [DAFTAR DI SINI]
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
