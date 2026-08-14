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

// At the top of the file, we also need to import the admin actions:
import { getAdminDataAction, verifyPaymentAction, verifyRequirementsAction } from "~/server/actions";

// ----------------------------------------------------------------------
// ADMIN VIEW COMPONENT
// ----------------------------------------------------------------------
function AdminView() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDataAction()
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleVerifyPayment = async (teamId: string, status: "verified" | "rejected") => {
    if (confirm(`Apakah Anda yakin ingin mengubah status pembayaran tim ini menjadi ${status}?`)) {
      try {
        await verifyPaymentAction(teamId, status);
        const data = await getAdminDataAction();
        setTeams(data);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const pendingTeams = teams.filter(t => t.payment?.status === "pending").length;

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
              <p>TOTAL TIM: <span className="text-yellow-200">{teams.length}</span></p>
              <p>MENUNGGU VERIFIKASI: <span className="text-red-200">{pendingTeams}</span></p>
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
                  <th className="pb-4 px-2">ANGGOTA & SYARAT</th>
                  <th className="pb-4 px-2">AKSI (BAYAR)</th>
                </tr>
              </thead>
              <tbody className="font-pixel text-xs text-gray-400">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white">Memuat data...</td>
                  </tr>
                ) : teams.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">Belum ada data tim.</td>
                  </tr>
                ) : (
                  teams.map((t) => (
                    <tr key={t.id} className="border-b-2 border-[#3b2514]/50 hover:bg-[#3b2514]/30">
                      <td className="py-4 px-2 text-white">{t.name}</td>
                      <td className="py-4 px-2 text-yellow-300">{t.teamCode}</td>
                      <td className="py-4 px-2">{t.category === 'software_dev' ? 'Software Dev' : 'UI/UX Design'}</td>
                      <td className="py-4 px-2">
                        {t.payment?.proofUrl ? (
                          <a href={t.payment.proofUrl} target="_blank" rel="noreferrer" className={`block w-fit px-2 py-1 rounded hover:underline ${t.payment?.status === 'verified' ? 'bg-green-900 text-green-300' : t.payment?.status === 'rejected' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                            {t.payment?.status?.toUpperCase() || 'UNKNOWN'} (LIHAT BUKTI)
                          </a>
                        ) : (
                          <span className="px-2 py-1 rounded bg-gray-900 text-gray-500">BELUM BAYAR</span>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        <ul className="space-y-1">
                          {t.members?.map((m: any) => (
                            <li key={m.id} className="flex gap-2 items-center">
                              <span>- {m.name}</span>
                              <div className="flex gap-1">
                                {m.ktmUrl ? <a href={m.ktmUrl} target="_blank" rel="noreferrer" title="KTM" className="text-green-500 hover:underline">[K]</a> : <span title="KTM" className="text-gray-600">[K]</span>}
                                {m.twibbonUrl ? <a href={m.twibbonUrl} target="_blank" rel="noreferrer" title="Twibbon" className="text-green-500 hover:underline">[T]</a> : <span title="Twibbon" className="text-gray-600">[T]</span>}
                                {m.igUrl ? <a href={m.igUrl} target="_blank" rel="noreferrer" title="IG" className="text-green-500 hover:underline">[I]</a> : <span title="IG" className="text-gray-600">[I]</span>}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-2">
                        {t.payment?.status !== 'verified' && (
                          <button onClick={() => handleVerifyPayment(t.teamId, "verified")} className="bg-green-600 text-white px-3 py-1 hover:bg-green-500 mr-2">VERIFIKASI</button>
                        )}
                        {t.payment?.status !== 'rejected' && (
                          <button onClick={() => handleVerifyPayment(t.teamId, "rejected")} className="bg-red-600 text-white px-3 py-1 hover:bg-red-500">TOLAK</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createTeamAction, joinTeamAction, uploadPaymentAction } from "~/server/actions";

// At the top of ParticipantView, add:
import { uploadRequirementAction } from "~/server/actions";
import { useRef } from "react";

// (Inside ParticipantView, below states)
function ParticipantView({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<"team" | "workshop">("team");
  
  // States for creating a team
  const [teamName, setTeamName] = useState("");
  const [competitionCategory, setCompetitionCategory] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  // State for joining a team
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // States for uploads
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  // Determine if user has a team
  const hasTeam = !!user.teamId;

  const handleCreateTeam = async () => {
    if (!teamName || !competitionCategory) {
      alert("Mohon lengkapi nama tim dan kategori!");
      return;
    }
    setIsCreating(true);
    try {
      const res = await createTeamAction(teamName, competitionCategory);
      if (res.success) {
        alert("Berhasil membuat tim! Kode tim Anda: " + res.teamCode);
        window.location.reload(); 
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!joinCode) {
      alert("Masukkan kode tim!");
      return;
    }
    setIsJoining(true);
    try {
      const res = await joinTeamAction(joinCode);
      if (res.success) {
        alert("Berhasil bergabung ke tim!");
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsJoining(false);
    }
  };

  const handlePaymentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Maksimal ukuran berkas adalah 5MB!");
      return;
    }
    setUploadingTarget("payment");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadPaymentAction(formData);
      if (res.success) {
        alert("Berhasil mengunggah bukti pembayaran tim!");
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "ktm" | "twibbon" | "ig") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Maksimal ukuran berkas adalah 2MB!");
      return;
    }

    setUploadingTarget(type);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await uploadRequirementAction(formData);
      if (res.success) {
        alert("Berhasil mengunggah berkas!");
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploadingTarget(null);
    }
  };

  // UI Helpers for Upload boxes
  const renderUploadBox = (title: string, type: "ktm" | "twibbon" | "ig", currentUrl?: string | null) => {
    const isUploading = uploadingTarget === type;
    return (
      <div>
        <label className="font-pixel text-[10px] text-gray-400 flex justify-between">
          <span>{title}</span>
          {currentUrl ? (
            <span className="text-green-400">✔ TERUNGGAH</span>
          ) : (
            <span className="text-red-400">✖ KOSONG</span>
          )}
        </label>
        <div className="relative mt-2 flex h-20 flex-col items-center justify-center border-2 border-dashed border-[#4a4a4a] bg-[#1a1a1a] cursor-pointer hover:border-orange-500 transition-colors">
          <span className="font-vt323 text-lg text-gray-400">
            {isUploading ? "MENGUNGGAH..." : currentUrl ? "Ubah Berkas" : "Pilih Berkas (Max 2MB)"}
          </span>
          <input 
            type="file" 
            accept="image/png, image/jpeg"
            onChange={(e) => handleUpload(e, type)}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          />
        </div>
      </div>
    );
  };

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
                <button 
                  type="button" 
                  onClick={handleCreateTeam}
                  disabled={isCreating}
                  className="pixel-btn-yellow font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm text-white disabled:opacity-50"
                >
                  {isCreating ? "MEMPROSES..." : "BUAT TIM & DAPATKAN KODE"}
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
                <button 
                  type="button" 
                  onClick={handleJoinTeam}
                  disabled={isJoining}
                  className="pixel-btn-green font-pixel w-full py-3 mt-4 text-xs text-shadow-pixel-sm disabled:opacity-50"
                >
                  {isJoining ? "MEMPROSES..." : "GABUNG SEKARANG"}
                </button>
              </form>
            </div>
            
            {hasTeam && (
              <div className="md:col-span-2 pixel-card-wood p-6 mt-2 border-green-500">
                <div className="text-center mb-6">
                  <p className="font-pixel text-sm text-green-400">✅ ANDA SUDAH TERGABUNG DALAM TIM</p>
                  <p className="font-vt323 text-lg text-gray-300 mt-2">Selesaikan pembayaran untuk memvalidasi pendaftaran tim Anda.</p>
                </div>
                
                <div className="border-t-2 border-dashed border-[#543b22] pt-6">
                  <label className="font-pixel text-xs text-yellow-300 flex justify-between">
                    <span>BUKTI PEMBAYARAN TIM</span>
                  </label>
                  <p className="font-vt323 text-lg text-gray-400 mb-2">Unggah bukti transfer (Max 5MB). Pastikan jelas.</p>
                  <div className="relative mt-2 flex h-20 flex-col items-center justify-center border-2 border-dashed border-[#8a633a] bg-[#3b2514]/30 cursor-pointer hover:border-yellow-500 transition-colors">
                    <span className="font-vt323 text-xl text-yellow-100">
                      {uploadingTarget === "payment" ? "MENGUNGGAH..." : "Klik untuk Unggah Bukti Pembayaran"}
                    </span>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, application/pdf"
                      onChange={handlePaymentUpload}
                      disabled={uploadingTarget === "payment"}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
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
              {renderUploadBox("KARTU MAHASISWA / PELAJAR", "ktm", user.ktmUrl)}
              {renderUploadBox("BUKTI POST TWIBBON", "twibbon", user.twibbonUrl)}
              {renderUploadBox("BUKTI FOLLOW IG @FOSTI", "ig", user.igUrl)}
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
