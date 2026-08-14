"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4">
        <h1 className="font-pixel text-2xl text-white text-shadow-pixel animate-pulse">LOADING...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4 text-white">
      <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay"></div>
      
      {/* Navbar Dashboard */}
      <nav className="relative z-10 flex items-center justify-between border-b-4 border-[#1a1a1a] bg-[#2a2a2a] p-4">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-green-500 border-2 border-black"></div>
          <h1 className="font-pixel text-xl text-shadow-pixel-sm">DASHBOARD TIM</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="font-pixel text-xs text-red-400 hover:text-white"
        >
          [KELUAR]
        </button>
      </nav>

      <div className="relative z-10 mx-auto mt-8 max-w-5xl space-y-8">
        
        {/* Welcome Banner */}
        <div className="pixel-card-wood p-8 border-yellow-500">
          <h2 className="font-pixel text-2xl text-yellow-400 text-shadow-pixel-sm">HALO, {session.user.name?.toUpperCase() || "PESERTA"}!</h2>
          <p className="font-vt323 text-xl text-gray-300 mt-2">Selamat datang di FOSTIFEST 2026. Selesaikan profil tim dan pembayaran Anda untuk mengunci posisi di kompetisi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kelengkapan Tim */}
          <div className="pixel-card-stone p-6">
            <h3 className="font-pixel text-lg text-green-400 mb-6">PROFIL TIM</h3>
            <form className="space-y-4">
              <div>
                <label className="font-pixel text-[10px] text-gray-400">NAMA TIM</label>
                <div className="mt-1 bg-[#1a1a1a] p-3 border-4 border-[#111] font-vt323 text-xl">
                  {session.user.name}
                </div>
              </div>
              
              <div>
                <label className="font-pixel text-[10px] text-gray-400">EMAIL KETUA</label>
                <div className="mt-1 bg-[#1a1a1a] p-3 border-4 border-[#111] font-vt323 text-xl text-gray-400">
                  {session.user.email}
                </div>
              </div>

              <div>
                <label className="font-pixel text-[10px] text-gray-400">ASAL INSTANSI / SEKOLAH</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl outline-none focus:border-green-500" 
                  placeholder="Contoh: Universitas Muhammadiyah Surakarta"
                />
              </div>

              <button type="button" className="pixel-btn-green font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm">
                SIMPAN PROFIL
              </button>
            </form>
          </div>

          {/* Pembayaran */}
          <div className="pixel-card-stone p-6 border-orange-500">
            <h3 className="font-pixel text-lg text-orange-400 mb-6">PEMBAYARAN</h3>
            <div className="space-y-4 text-center">
              <div className="bg-[#1a1a1a] p-4 border-2 border-red-900/50">
                <p className="font-pixel text-xs text-red-400">STATUS: BELUM BAYAR</p>
              </div>

              <div className="font-vt323 text-lg text-gray-300 text-left">
                <p>Transfer ke rekening berikut:</p>
                <p className="text-yellow-400 mt-2">BCA: 1234567890 (a.n FOSTI UMS)</p>
                <p className="text-yellow-400">GOPAY: 082325427416 (a.n FOSTI UMS)</p>
                <p className="mt-2 text-sm text-gray-400">Biaya: Rp 55.000 (Software Dev / UI/UX)</p>
              </div>

              <div className="mt-6 border-t-2 border-dashed border-[#4a4a4a] pt-6">
                <label className="font-pixel text-[10px] text-gray-400 block text-left mb-2">UNGGAH BUKTI TRANSFER</label>
                <div className="flex h-32 flex-col items-center justify-center border-4 border-dashed border-[#4a4a4a] bg-[#1a1a1a] cursor-pointer hover:border-green-500 transition-colors">
                  <span className="text-3xl text-gray-500 mb-2">↑</span>
                  <span className="font-vt323 text-lg text-gray-400">Pilih File (JPG/PNG, Max 2MB)</span>
                </div>
              </div>

              <button type="button" className="pixel-btn-yellow font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm text-white">
                KIRIM BUKTI
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
