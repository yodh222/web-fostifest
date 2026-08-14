"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Basic route protection.
  // In a real scenario, check if `session.user.role === 'admin'`.
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    // Optional: if (session && session.user.role !== 'admin') router.push('/dashboard')
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
      <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
      
      {/* Navbar Dashboard */}
      <nav className="relative z-10 flex items-center justify-between border-b-4 border-[#1a1a1a] bg-[#2a2a2a] p-4">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-red-500 border-2 border-black"></div>
          <h1 className="font-pixel text-xl text-shadow-pixel-sm">DASHBOARD PANITIA</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="font-pixel text-xs text-red-400 hover:text-white"
        >
          [KELUAR]
        </button>
      </nav>

      <div className="relative z-10 mx-auto mt-8 max-w-6xl space-y-8">
        
        {/* Table Panel */}
        <div className="flex flex-col items-center">
          <div className="pixel-card-wood w-full p-4">
            <div className="pixel-card-wood-light relative p-6">
              
              <div className="mt-2 flex gap-4 border-b-4 border-[#3b2514] pb-6">
                <div className="flex-1 flex gap-4">
                  <div>
                    <label className="font-pixel text-xs text-gray-800">CARI TIM</label>
                    <input type="text" className="h-10 w-full bg-[#1a0f07] border-2 border-[#1a0f07] text-white p-2 font-vt323 text-lg outline-none" placeholder="Nama tim..." />
                  </div>
                </div>
                <div className="font-pixel text-xs text-right text-gray-900 bg-white/20 p-2 border-2 border-[#3b2514]">
                  <p>TOTAL TIM: <span className="text-yellow-200">3</span></p>
                  <p>MENUNGGU VERIFIKASI: <span className="text-red-200">1</span></p>
                </div>
              </div>

              <div className="overflow-x-auto mt-6">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="font-pixel text-gray-200 border-b-2 border-[#3b2514]">
                      <th className="pb-4 px-2">NAMA TIM</th>
                      <th className="pb-4 px-2">KETUA</th>
                      <th className="pb-4 px-2">INSTITUSI</th>
                      <th className="pb-4 px-2">STATUS PEMBAYARAN</th>
                      <th className="pb-4 px-2">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="font-pixel text-xs">
                    
                    <tr className="border-b border-[#3b2514]/50 hover:bg-white/10 transition-colors">
                      <td className="py-4 px-2">TEAM ALPHA</td>
                      <td className="py-4 px-2">Budi Santoso</td>
                      <td className="py-4 px-2">Univ. A</td>
                      <td className="py-4 px-2 text-red-300">? PENDING</td>
                      <td className="py-4 px-2">
                        <button className="bg-gray-800 border-2 border-black px-4 py-2 hover:bg-gray-700">CEK & VERIFIKASI</button>
                      </td>
                    </tr>
                    
                    <tr className="border-b border-[#3b2514]/50 hover:bg-white/10 transition-colors">
                      <td className="py-4 px-2">PIXEL WARRIORS</td>
                      <td className="py-4 px-2">Siti Aminah</td>
                      <td className="py-4 px-2">Univ. B</td>
                      <td className="py-4 px-2 text-yellow-300">○ TO BE CONFIRM</td>
                      <td className="py-4 px-2">
                        <button className="bg-gray-800 border-2 border-black px-4 py-2 hover:bg-gray-700">CEK & VERIFIKASI</button>
                      </td>
                    </tr>
                    
                    <tr className="border-b border-[#3b2514]/50 hover:bg-white/10 transition-colors">
                      <td className="py-4 px-2">CODE CRAFTERS</td>
                      <td className="py-4 px-2">Dian Pertiwi</td>
                      <td className="py-4 px-2">Univ. C</td>
                      <td className="py-4 px-2 text-green-300">✓ CONFIRMED</td>
                      <td className="py-4 px-2">
                        <button className="bg-gray-800 border-2 border-black px-4 py-2 hover:bg-gray-700 text-gray-500" disabled>SELESAI</button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
