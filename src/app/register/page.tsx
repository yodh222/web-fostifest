"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

export default function RegisterPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: teamName,
    });

    if (error) {
      setError(error.message || "Gagal melakukan registrasi.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6 relative overflow-hidden scanline">
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-glow"></div>
      <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[100px] animate-pulse-glow"></div>
      
      <div className="pixel-card-stone relative z-10 w-full max-w-md p-2 animate-float">
        <div className="pixel-card-stone relative p-8 text-center text-white border-none shadow-none">
          <Link href="/" className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center font-pixel text-xl bg-[#222] text-gray-400 border-4 border-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.8)] hover:bg-[#333] hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,0.8)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_rgba(0,0,0,0.8)] transition-all group" title="Kembali">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">{"<"}</span>
          </Link>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#1a1a1a] bg-[#4a4a4a] px-6 py-2 whitespace-nowrap">
            <h1 className="font-pixel text-xl text-shadow-pixel-sm hover-glitch cursor-default">REGISTRASI</h1>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-6 text-left">
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 p-2 text-red-400 font-vt323 text-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label className="font-pixel text-xs text-gray-300">[NAMA TIM / PESERTA]</label>
              <input 
                type="text" 
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-yellow-500 transition-colors" 
                placeholder="Masukkan nama"
              />
            </div>

            <div>
              <label className="font-pixel text-xs text-gray-300">[EMAIL]</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-yellow-500 transition-colors" 
                placeholder="email@peserta.com"
              />
            </div>
            
            <div>
              <label className="font-pixel text-xs text-gray-300">[PASSWORD]</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-yellow-500 transition-colors" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="pixel-btn-yellow font-pixel mt-4 w-full py-4 text-sm text-shadow-pixel-sm text-white disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {loading ? "MEMPROSES..." : "BUAT AKUN"}
            </button>
          </form>

          <p className="font-vt323 mt-6 text-xl text-gray-300 text-center">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-pixel text-xs text-green-400 hover:text-white transition-colors">
              [MASUK DI SINI]
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
