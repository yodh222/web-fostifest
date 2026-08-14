import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* Navbar */}
      <nav className="absolute left-0 right-0 top-0 z-50 flex flex-wrap items-center justify-between p-6 md:px-12">
        <div className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-black">
          {/* Logo Placeholder */}
          <div className="h-8 w-8 rounded-full bg-blue-900"></div>
          <div className="font-bold">FOSTI</div>
        </div>
        
        <div className="hidden space-x-4 md:flex">
          <Link href="#tentang" className="font-pixel text-shadow-pixel-sm hover:text-green-400">[TENTANG]</Link>
          <Link href="#lomba" className="font-pixel text-shadow-pixel-sm hover:text-green-400">[LOMBA]</Link>
          <Link href="#timeline" className="font-pixel text-shadow-pixel-sm hover:text-green-400">[TIMELINE]</Link>
          <Link href="/login" className="font-pixel text-shadow-pixel-sm hover:text-green-400">[LOGIN TIM]</Link>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <Link href="/register" className="pixel-btn-yellow font-pixel px-6 py-3 text-sm text-shadow-pixel-sm">
            DAFTAR SEKARANG
          </Link>
          <Link href="/admin" className="font-pixel text-xs text-gray-300 text-shadow-pixel-sm hover:text-white">
            🔑 [PANITIA]
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[100px]"></div>

        <div className="z-10 flex flex-col items-center px-4">
          <p className="font-pixel text-green-400 mb-4 text-shadow-pixel-sm">FORUM OPEN SOURCE TEKNIK INFORMATIKA UMS PRESENTS</p>
          <h1 className="font-pixel text-5xl tracking-widest text-white text-shadow-pixel md:text-8xl">
            FOSTIFEST
          </h1>
          <h2 className="font-pixel mt-4 text-5xl tracking-widest text-green-500 text-shadow-pixel md:text-7xl">
            2026
          </h2>
          <h3 className="font-pixel mt-6 text-xl tracking-widest text-white text-shadow-pixel md:text-3xl">
            KOMPETISI NASIONAL
          </h3>
          <p className="font-pixel mt-4 text-yellow-400 text-shadow-pixel-sm text-xl">TOTAL PRIZE POOL Rp10Jt+</p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link
              href="/register"
              className="pixel-btn-green font-pixel px-8 py-4 text-sm text-white text-shadow-pixel md:text-lg"
            >
              DAFTAR TIM SEKARANG
            </Link>
            <Link
              href="#panduan"
              className="pixel-btn-yellow font-pixel px-8 py-4 text-sm text-white text-shadow-pixel md:text-lg"
            >
              PANDUAN PENGGUNA
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Running Text */}
      <div className="overflow-hidden border-y-4 border-[#333] bg-[#0a0a0a] py-3 flex">
        <div className="animate-marquee font-pixel whitespace-nowrap text-sm text-shadow-pixel-sm">
          <div className="flex shrink-0 px-4">
            <span className="mx-4">SKALA TIM SKALA.</span>
            <span className="mx-4 text-green-500">DAFTAR TIM SEKARANG!</span>
            <span className="mx-4">KOMPETISI LEGEND.</span>
            <span className="mx-4">SKALA TERBESAR, NASIONAL.</span>
            <span className="mx-4 text-green-500">DAFTAR TIM SEKARANG, DAN KOMPETISI!</span>
          </div>
          
          <div className="flex shrink-0 px-4">
            <span className="mx-4">SKALA TIM SKALA.</span>
            <span className="mx-4 text-green-500">DAFTAR TIM SEKARANG!</span>
            <span className="mx-4">KOMPETISI LEGEND.</span>
            <span className="mx-4">SKALA TERBESAR, NASIONAL.</span>
            <span className="mx-4 text-green-500">DAFTAR TIM SEKARANG, DAN KOMPETISI!</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="tentang" className="bg-[#111111] px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-pixel mb-8 text-3xl text-shadow-pixel">APA ITU FOSTIFEST?</h2>
          <div className="pixel-card-stone p-8 text-left">
            <p className="text-lg leading-relaxed text-gray-300 font-vt323 text-2xl">
              FOSTIFEST adalah acara tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) Universitas Muhammadiyah Surakarta. Tahun ini, FOSTIFEST membawakan tema <strong>"Beyond Codes: Creativity in the Digital Age"</strong>.
              <br/><br/>
              Acara ini menghadirkan workshop interaktif serta kompetisi menegangkan di bidang Software Development, UI/UX Design, dan Robotika (Sumobot & Line Follower). Lebih dari sekadar perayaan teknologi, FOSTIFEST adalah panggung untuk mengasah keahlian teknis, melepaskan kreativitas, dan membuka peluang karier di dunia digital!
            </p>
          </div>
        </div>
      </section>

      {/* Kategori Lomba & Workshop */}
      <section id="lomba" className="bg-[#151515] px-6 py-20 text-center">
        <h2 className="font-pixel mb-12 text-3xl text-shadow-pixel">KATEGORI LOMBA & WORKSHOP</h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Lomba 1 */}
          <div className="pixel-card-stone flex flex-col items-start gap-4 p-6 text-left">
            <div className="flex w-full items-center justify-between">
              <span className="font-pixel text-2xl text-green-500">{"</>"}</span>
              <div className="flex flex-col items-end gap-1">
                <span className="font-pixel text-[10px] text-gray-400">Batch 1: Rp 40k</span>
                <span className="font-pixel text-xs text-yellow-400 bg-[#3b2514] px-2 py-1 border-2 border-[#1a0f07]">Batch 2: Rp 55k</span>
              </div>
            </div>
            <div>
              <h3 className="font-pixel text-lg text-shadow-pixel-sm">SOFTWARE DEV</h3>
              <p className="mt-2 font-vt323 text-xl text-gray-300">
                Uji kemampuan algoritmik dan pengembangan aplikasi Anda dalam kompetisi intensif ini.
              </p>
              <ul className="mt-4 font-vt323 text-lg text-gray-400 list-disc list-inside">
                <li>Maksimal 3 anggota per tim</li>
                <li>Online via Zoom</li>
              </ul>
            </div>
          </div>

          {/* Lomba 2 */}
          <div className="pixel-card-stone flex flex-col items-start gap-4 p-6 text-left">
            <div className="flex w-full items-center justify-between">
              <span className="font-pixel text-2xl text-orange-400">☻</span>
              <div className="flex flex-col items-end gap-1">
                <span className="font-pixel text-[10px] text-gray-400">Batch 1: Rp 40k</span>
                <span className="font-pixel text-xs text-yellow-400 bg-[#3b2514] px-2 py-1 border-2 border-[#1a0f07]">Batch 2: Rp 55k</span>
              </div>
            </div>
            <div>
              <h3 className="font-pixel text-lg text-shadow-pixel-sm">UI/UX DESIGN</h3>
              <p className="mt-2 font-vt323 text-xl text-gray-300">
                Ciptakan pengalaman pengguna yang inovatif dan desain visual yang memanjakan mata.
              </p>
              <ul className="mt-4 font-vt323 text-lg text-gray-400 list-disc list-inside">
                <li>Tim 3 orang</li>
                <li>Online via Zoom</li>
              </ul>
            </div>
          </div>

          {/* Lomba 3 */}
          <div className="pixel-card-stone flex flex-col items-start gap-4 p-6 text-left">
            <div className="flex w-full items-center justify-between">
              <span className="font-pixel text-2xl text-blue-400">🤖</span>
              <span className="font-pixel text-xs text-yellow-400 bg-[#3b2514] px-2 py-1 border-2 border-[#1a0f07]">Rp 70.000</span>
            </div>
            <div>
              <h3 className="font-pixel text-lg text-shadow-pixel-sm">SUMOBOT & LINE FOLLOWER</h3>
              <p className="mt-2 font-vt323 text-xl text-gray-300">
                Rancang dan program robot untuk menyelesaikan tugas spesifik. Boleh menggunakan KIT atau rakitan sendiri.
              </p>
              <ul className="mt-4 font-vt323 text-lg text-gray-400 list-disc list-inside">
                <li>1-3 anggota per tim</li>
                <li>Offline</li>
              </ul>
            </div>
          </div>

          {/* Workshop */}
          <div className="pixel-card-wood lg:col-span-3 flex flex-col md:flex-row items-center gap-6 p-6 text-left mt-4">
            <div className="flex-1">
              <span className="font-pixel text-xs text-green-400 bg-[#1a0f07] px-2 py-1 border-2 border-black">WORKSHOP</span>
              <h3 className="font-pixel mt-4 text-xl text-shadow-pixel-sm">Build Your Own AI Agent: LangGraph</h3>
              <p className="mt-2 font-vt323 text-2xl text-gray-300">
                Oleh Firania Putri Harsanti (Software and DevOps Engineer). Pahami konsep agent, system prompt, context window, dan bangun aplikasi web yang scalable!
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-pixel text-sm text-yellow-400">Rp 20.000</span>
              <Link href="/register" className="pixel-btn-green font-pixel px-6 py-3 text-sm text-white text-shadow-pixel">DAFTAR WORKSHOP</Link>
            </div>
          </div>

        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="bg-[#111111] px-4 py-20 text-center">
        <h2 className="font-pixel mb-16 text-3xl text-shadow-pixel">TIMELINE KOMPETISI</h2>
        
        <div className="relative mx-auto max-w-5xl">
          {/* Garis vertikal tengah (tersembunyi di mobile, muncul di md) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 bg-[#3c2a1c] md:block"></div>

          <div className="flex flex-col gap-12 md:gap-8">
            
            {/* Item 1 - Kiri */}
            <div className="relative flex flex-col items-center md:flex-row md:justify-between">
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-end text-right p-6 relative">
                  {/* Panah penyambung (kiri) */}
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-[#3c2a1c] md:block"></div>
                  <span className="font-pixel text-sm text-green-400 mb-2">10 OKT - 8 NOV</span>
                  <h3 className="font-pixel text-lg">Pendaftaran</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Pendaftaran Batch 1 (10-25 Okt) dan Batch 2 (26 Okt - 8 Nov) beserta pengumpulan karya secara online.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-green-500 md:flex"></div>
              <div className="md:w-5/12"></div>
            </div>

            {/* Item 2 - Kanan */}
            <div className="relative flex flex-col items-center md:flex-row md:justify-between">
              <div className="md:w-5/12"></div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-yellow-400 md:flex"></div>
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-start text-left p-6 relative">
                  {/* Panah penyambung (kanan) */}
                  <div className="absolute top-1/2 -left-4 hidden h-1 w-4 -translate-y-1/2 bg-[#3c2a1c] md:block"></div>
                  <span className="font-pixel text-sm text-yellow-400 mb-2">9 - 12 NOV</span>
                  <h3 className="font-pixel text-lg">Penilaian Awal & Pengumuman Finalis</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Penjurian daring terhadap proposal/karya oleh dewan juri, dan pengumuman finalis.</p>
                </div>
              </div>
            </div>

            {/* Item 3 - Kiri */}
            <div className="relative flex flex-col items-center md:flex-row md:justify-between">
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-end text-right p-6 relative">
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-[#3c2a1c] md:block"></div>
                  <span className="font-pixel text-sm text-orange-400 mb-2">13 - 14 NOV</span>
                  <h3 className="font-pixel text-lg">Technical Meeting & Gladi</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Penjelasan peraturan kompetisi bagi para finalis melalui Zoom/Google Meet serta gladi bersih.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-orange-400 md:flex"></div>
              <div className="md:w-5/12"></div>
            </div>

            {/* Item 4 - Kanan */}
            <div className="relative flex flex-col items-center md:flex-row md:justify-between">
              <div className="md:w-5/12"></div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-white md:flex"></div>
              <div className="md:w-5/12">
                <div className="pixel-card-stone border-green-500 flex flex-col items-start text-left p-6 relative">
                  <div className="absolute top-1/2 -left-4 hidden h-1 w-4 -translate-y-1/2 bg-[#3c2a1c] md:block"></div>
                  <span className="font-pixel text-sm text-white mb-2">15 NOV</span>
                  <h3 className="font-pixel text-lg text-green-400">Final Competition & Awarding</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Presentasi 6 finalis secara langsung, penjurian final, dan pengumuman Juara.</p>
                </div>
              </div>
            </div>

            {/* Item 5 - Kiri */}
            <div className="relative flex flex-col items-center md:flex-row md:justify-between">
              <div className="md:w-5/12">
                <div className="pixel-card-stone border-yellow-500 flex flex-col items-end text-right p-6 relative">
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-[#3c2a1c] md:block"></div>
                  <span className="font-pixel text-sm text-white mb-2">29 NOV</span>
                  <h3 className="font-pixel text-lg text-yellow-400">Acara Puncak: Workshop</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Workshop interaktif (LangGraph) dan sesi kuis/challenge penutupan acara.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-yellow-500 md:flex"></div>
              <div className="md:w-5/12"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pixel-card-stone flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 p-8 md:px-12 mt-12 border-t-4 border-[#1a1a1a]">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2 rounded-full bg-white px-4 py-2 w-max">
            <div className="h-6 w-6 rounded-full bg-blue-900"></div>
            <div className="h-6 w-6 rounded-full bg-red-900"></div>
            <span className="font-bold text-black text-sm">FOSTI UMS</span>
          </div>
          <p className="font-pixel text-[10px] text-gray-400">© 2026 FOSTIFEST by FOSTI UMS.<br/>All rights reserved.</p>
        </div>
        
        <div className="font-vt323 text-center md:text-right text-lg text-gray-300">
          <p>Gedung J Lantai 3 Fakultas Komunikasi dan Informatika<br/>Universitas Muhammadiyah Surakarta</p>
          <p className="mt-2 text-green-400">+62 8232-5427-416 | fostiums@gmail.com</p>
          <div className="mt-4 flex justify-center md:justify-end gap-4 text-2xl">
            <a href="#" className="hover:text-green-400">📷</a>
            <a href="#" className="hover:text-green-400">🐦</a>
            <a href="#" className="hover:text-green-400">▶️</a>
            <a href="#" className="hover:text-green-400">💬</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
