"use client";

import { useEffect, useState } from "react";
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

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4">
        <h1 className="font-pixel text-2xl text-white text-shadow-pixel animate-pulse">LOADING...</h1>
      </div>
    );
  }

  const isAdmin = session.user.role === "admin";

  return (
    <main className="min-h-screen bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4 text-white">
      <div className={`absolute inset-0 mix-blend-overlay ${isAdmin ? 'bg-red-900/10' : 'bg-green-900/10'}`}></div>
      
      {/* Navbar Dashboard */}
      <nav className="relative z-10 flex items-center justify-between border-b-4 border-[#1a1a1a] bg-[#2a2a2a] p-4">
        <div className="flex items-center space-x-4">
          <div className={`h-8 w-8 border-2 border-black ${isAdmin ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <h1 className="font-pixel text-xl text-shadow-pixel-sm">
            {isAdmin ? "DASHBOARD PANITIA" : "DASHBOARD PESERTA"}
          </h1>
        </div>
        <button 
          onClick={() => authClient.signOut().then(() => router.push("/login"))}
          className="font-pixel text-xs text-red-400 hover:text-white"
        >
          [KELUAR]
        </button>
      </nav>

      <div className="relative z-10 mx-auto mt-8 max-w-6xl space-y-8">
        
        {/* Welcome Banner */}
        <div className="pixel-card-wood p-8 border-yellow-500">
          <h2 className="font-pixel text-2xl text-yellow-400 text-shadow-pixel-sm">
            HALO, {session.user.name?.toUpperCase() || "PESERTA"}!
          </h2>
          <p className="font-vt323 text-xl text-gray-300 mt-2">
            {isAdmin 
              ? "Selamat datang di ruang kontrol pusat. Harap lakukan verifikasi data dengan saksama." 
              : "Selamat datang di FOSTIFEST 2026. Lengkapi syarat administrasi atau bergabunglah dengan tim untuk berlaga!"}
          </p>
        </div>

        {isAdmin ? <AdminView /> : <ParticipantView user={session.user} />}

      </div>
    </main>
  );
}

// ----------------------------------------------------------------------
// ADMIN VIEW COMPONENT
// ----------------------------------------------------------------------
function AdminView() {
  return (
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
              <p>TOTAL TIM: <span className="text-yellow-200">0</span></p>
              <p>MENUNGGU VERIFIKASI: <span className="text-red-200">0</span></p>
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="font-pixel text-gray-200 border-b-2 border-[#3b2514]">
                  <th className="pb-4 px-2">NAMA TIM</th>
                  <th className="pb-4 px-2">KODE TIM</th>
                  <th className="pb-4 px-2">KATEGORI</th>
                  <th className="pb-4 px-2">STATUS PEMBAYARAN</th>
                  <th className="pb-4 px-2">STATUS SYARAT (ANGGOTA)</th>
                  <th className="pb-4 px-2">AKSI</th>
                </tr>
              </thead>
              <tbody className="font-pixel text-xs text-gray-400">
                <tr>
                  <td colSpan={6} className="py-8 text-center">Belum ada data tim.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PARTICIPANT VIEW COMPONENT
// ----------------------------------------------------------------------
function ParticipantView({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<"team" | "workshop">("team");
  
  // States for creating a team
  const [teamName, setTeamName] = useState("");
  const [competitionCategory, setCompetitionCategory] = useState("");
  
  // State for joining a team
  const [joinCode, setJoinCode] = useState("");

  // Determine if user has a team
  const hasTeam = !!user.teamId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT PANEL: Team / Workshop Logic */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab("team")}
            className={`font-pixel text-xs px-4 py-3 border-4 ${activeTab === 'team' ? 'bg-green-600 border-white text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white'}`}
          >
            LOMBA (BUAT / GABUNG TIM)
          </button>
          <button 
            onClick={() => setActiveTab("workshop")}
            className={`font-pixel text-xs px-4 py-3 border-4 ${activeTab === 'workshop' ? 'bg-green-600 border-white text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white'}`}
          >
            WORKSHOP EKSKLUSIF
          </button>
        </div>

        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create Team Card */}
            <div className={`pixel-card-stone p-6 ${hasTeam ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="font-pixel text-lg text-yellow-400 mb-4">BUAT TIM BARU</h3>
              <p className="font-vt323 text-lg text-gray-300 mb-6">Jadilah ketua dan bentuk tim tangguhmu sendiri.</p>
              
              <form className="space-y-4">
                <div>
                  <label className="font-pixel text-[10px] text-gray-400">NAMA TIM</label>
                  <input 
                    type="text" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="mt-1 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl outline-none focus:border-green-500" 
                    placeholder="Masukkan nama tim..."
                  />
                </div>
                <div>
                  <label className="font-pixel text-[10px] text-gray-400">KATEGORI LOMBA</label>
                  <select 
                    value={competitionCategory}
                    onChange={(e) => setCompetitionCategory(e.target.value)}
                    className="mt-1 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-gray-200 outline-none focus:border-yellow-500 cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Kategori --</option>
                    <option value="software_dev">Software Development</option>
                    <option value="ui_ux">UI/UX Design</option>
                  </select>
                </div>
                <button type="button" className="pixel-btn-yellow font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm text-white">
                  BUAT TIM & DAPATKAN KODE
                </button>
              </form>
            </div>

            {/* Join Team Card */}
            <div className={`pixel-card-stone p-6 border-blue-500 ${hasTeam ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="font-pixel text-lg text-blue-400 mb-4">GABUNG TIM</h3>
              <p className="font-vt323 text-lg text-gray-300 mb-6">Punya kode tim dari ketua kamu? Masukkan di sini.</p>
              
              <form className="space-y-4">
                <div>
                  <label className="font-pixel text-[10px] text-gray-400">KODE TIM</label>
                  <input 
                    type="text" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="mt-1 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl outline-none focus:border-blue-500 text-center uppercase tracking-widest" 
                    placeholder="FST-XXXXXX"
                  />
                </div>
                <button type="button" className="pixel-btn-green font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm">
                  GABUNG SEKARANG
                </button>
              </form>
            </div>
            
            {hasTeam && (
              <div className="md:col-span-2 pixel-card-wood p-4 mt-2 text-center border-green-500">
                <p className="font-pixel text-sm text-green-400">✅ ANDA SUDAH TERGABUNG DALAM TIM</p>
                <p className="font-vt323 text-lg text-gray-300 mt-2">Anda tidak bisa membuat atau bergabung dengan tim lain.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "workshop" && (
          <div className="pixel-card-stone p-6 border-purple-500">
            <h3 className="font-pixel text-lg text-purple-400 mb-4">DAFTAR WORKSHOP EKSKLUSIF</h3>
            <p className="font-vt323 text-xl text-gray-300 mb-4">Dapatkan ilmu langsung dari praktisi industri mengenai tren teknologi dan desain masa depan.</p>
            <div className="bg-[#1a1a1a] p-4 border-2 border-dashed border-[#444] text-center">
              <p className="font-pixel text-sm text-gray-400">STATUS: BELUM MENDAFTAR</p>
            </div>
            <button type="button" className="bg-purple-600 hover:bg-purple-500 border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 font-pixel w-full py-4 mt-6 text-sm text-white transition-all">
              SAYA INGIN IKUT WORKSHOP
            </button>
          </div>
        )}

      </div>

      {/* RIGHT PANEL: Individual Requirements */}
      <div className="lg:col-span-1">
        {hasTeam ? (
          <div className="pixel-card-stone p-6 sticky top-8 border-orange-500">
            <h3 className="font-pixel text-lg text-orange-400 mb-2">SYARAT INDIVIDU</h3>
            <p className="font-vt323 text-lg text-gray-300 mb-6 border-b-2 border-dashed border-[#444] pb-4">Setiap anggota wajib melengkapi berkas ini agar tim bisa diverifikasi.</p>
            
            <div className="space-y-6">
              
              {/* KTM */}
              <div>
                <label className="font-pixel text-[10px] text-gray-400 flex justify-between">
                  <span>KARTU MAHASISWA / PELAJAR</span>
                  <span className="text-red-400">✖ KOSONG</span>
                </label>
                <div className="mt-2 flex h-20 flex-col items-center justify-center border-2 border-dashed border-[#4a4a4a] bg-[#1a1a1a] cursor-pointer hover:border-orange-500 transition-colors">
                  <span className="font-vt323 text-lg text-gray-400">Unggah Gambar (JPG/PNG)</span>
                </div>
              </div>

              {/* Twibbon */}
              <div>
                <label className="font-pixel text-[10px] text-gray-400 flex justify-between">
                  <span>BUKTI POST TWIBBON</span>
                  <span className="text-red-400">✖ KOSONG</span>
                </label>
                <div className="mt-2 flex h-20 flex-col items-center justify-center border-2 border-dashed border-[#4a4a4a] bg-[#1a1a1a] cursor-pointer hover:border-orange-500 transition-colors">
                  <span className="font-vt323 text-lg text-gray-400">Unggah Screenshot Twibbon</span>
                </div>
              </div>

              {/* Follow IG */}
              <div>
                <label className="font-pixel text-[10px] text-gray-400 flex justify-between">
                  <span>BUKTI FOLLOW IG @FOSTI</span>
                  <span className="text-red-400">✖ KOSONG</span>
                </label>
                <div className="mt-2 flex h-20 flex-col items-center justify-center border-2 border-dashed border-[#4a4a4a] bg-[#1a1a1a] cursor-pointer hover:border-orange-500 transition-colors">
                  <span className="font-vt323 text-lg text-gray-400">Unggah Screenshot Follow</span>
                </div>
              </div>

              <button type="button" className="pixel-btn-green font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm" disabled>
                SIMPAN BERKAS
              </button>

            </div>
          </div>
        ) : (
          <div className="pixel-card-stone p-6 sticky top-8 border-gray-600 opacity-80">
            <h3 className="font-pixel text-lg text-gray-500 mb-2">SYARAT INDIVIDU</h3>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl mb-4">🔒</span>
              <p className="font-vt323 text-xl text-gray-400">
                Fitur ini terkunci.
              </p>
              <p className="font-vt323 text-lg text-gray-500 mt-2">
                Silakan buat tim baru atau gabung ke tim yang sudah ada untuk mulai mengunggah persyaratan administrasi Anda.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
