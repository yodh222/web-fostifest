"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* Navbar */}
      <nav className="absolute left-0 right-0 top-0 z-50 flex flex-wrap items-center justify-between p-4 md:p-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-black"
        >
          {/* Logo */}
          <img src="https://www.fostiums.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fairlanggapradana%2Fimage%2Fupload%2Fv1755442684%2Flogo_ch57ma.png&w=256&q=75" alt="FOSTI Logo" className="h-8 w-8 object-contain" />
          <div className="font-bold">FOSTI</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden space-x-4 md:flex"
        >
          <Link href="#tentang" className="font-pixel text-shadow-pixel-sm hover:text-green-400 transition-colors">[TENTANG]</Link>
          <Link href="#lomba" className="font-pixel text-shadow-pixel-sm hover:text-green-400 transition-colors">[LOMBA]</Link>
          <Link href="#timeline" className="font-pixel text-shadow-pixel-sm hover:text-green-400 transition-colors">[TIMELINE]</Link>
          <Link href="/login" className="font-pixel text-shadow-pixel-sm hover:text-green-400 transition-colors">[LOGIN TIM]</Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-end relative"
        >
          <Link href="/register" className="pixel-btn-yellow font-pixel px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm text-shadow-pixel-sm hover:scale-[1.02] active:scale-[0.98] transition-transform">
            DAFTAR SEKARANG
          </Link>
          <Link href="/admin" className="font-pixel text-[10px] md:text-xs text-gray-300 text-shadow-pixel-sm hover:text-white transition-colors absolute top-full mt-2 right-0 whitespace-nowrap">
            🔑 [PANITIA]
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] pb-16 pt-40 text-center scanline min-h-screen">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 animate-slide-bg"></div>
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[120px] animate-pulse-glow"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center px-4 animate-float"
        >
          <p className="font-pixel text-[10px] md:text-base text-green-400 mb-4 text-shadow-pixel-sm hover-glitch cursor-default transition-all break-words max-w-[90vw] leading-loose md:leading-normal">
            {"< FORUM OPEN SOURCE TEKNIK INFORMATIKA UMS PRESENTS />"}
          </p>
          <h1 className="font-pixel text-4xl tracking-widest text-white text-shadow-pixel md:text-8xl hover-glitch cursor-default transition-all">
            FOSTIFEST
          </h1>
          <h2 className="font-pixel mt-4 text-4xl tracking-widest text-green-500 text-shadow-pixel md:text-7xl hover-glitch cursor-default transition-all">
            2026
          </h2>
          <h3 className="font-pixel mt-6 text-sm tracking-widest text-white text-shadow-pixel md:text-3xl bg-[#111] px-2 py-1 md:px-4 md:py-2 border-2 border-[#333]">
            KOMPETISI NASIONAL
          </h3>
          <p className="font-pixel mt-4 text-yellow-400 text-shadow-pixel-sm text-sm md:text-xl animate-float-delayed">
            TOTAL PRIZE POOL Rp10Jt+
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/register"
              className="pixel-btn-green font-pixel px-8 py-4 text-sm text-white text-shadow-pixel md:text-lg animate-pulse-glow hover:scale-105 active:scale-95 transition-transform"
            >
              DAFTAR TIM SEKARANG
            </Link>
            <Link
              href="#panduan"
              className="pixel-btn-yellow font-pixel px-8 py-4 text-sm text-white text-shadow-pixel md:text-lg hover:scale-105 active:scale-95 transition-transform"
            >
              PANDUAN PENGGUNA
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Running Text */}
      <div className="overflow-hidden border-y-4 border-[#333] bg-[#0a0a0a] py-3 flex relative z-10 shadow-xl shadow-green-900/10">
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
      <section id="tentang" className="bg-[#111111] minecraft-border-top px-6 py-20 text-center relative overflow-hidden border-b-8 border-[#3b2514]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        {/* Floating Minecraft Elements */}
        <div className="absolute top-20 left-[10%] text-4xl animate-float opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel">⛏️</div>
        <div className="absolute bottom-20 right-[15%] text-4xl animate-float-delayed opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel">🍎</div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl relative z-10"
        >
          <h2 className="font-pixel mb-8 text-3xl text-shadow-pixel hover-glitch inline-block">APA ITU FOSTIFEST?</h2>
          <div className="pixel-card-stone p-8 text-left hover:shadow-[0_0_20px_rgba(74,138,42,0.15)] transition-shadow relative overflow-hidden">
            {/* Animasi Partikel Api terbang di About */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 opacity-20 animate-float-delayed shadow-[0_0_15px_#facc15]"></div>
            <div className="absolute bottom-10 right-20 w-3 h-3 bg-green-500 opacity-20 animate-float shadow-[0_0_15px_#22c55e]"></div>

            <p className="leading-relaxed text-gray-300 font-vt323 text-xl md:text-2xl relative z-10">
              FOSTIFEST adalah acara tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) Universitas Muhammadiyah Surakarta. Tahun ini, FOSTIFEST membawakan tema <strong className="text-green-400">"Beyond Codes: Creativity in the Digital Age"</strong>.
              <br/><br/>
              Acara ini menghadirkan workshop interaktif serta kompetisi menegangkan di bidang Software Development, UI/UX Design, dan Robotika (Sumobot & Line Follower). Lebih dari sekadar perayaan teknologi, FOSTIFEST adalah panggung untuk mengasah keahlian teknis, melepaskan kreativitas, dan membuka peluang karier di dunia digital!
            </p>
          </div>
        </motion.div>
      </section>

      {/* Kategori Lomba & Workshop */}
      <section id="lomba" className="bg-[#151515] minecraft-border-bottom px-6 py-20 text-center relative overflow-hidden border-b-8 border-[#222]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        {/* Floating Minecraft Elements */}
        <div className="absolute top-32 left-[5%] text-5xl animate-float opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">💎</div>
        <div className="absolute bottom-40 right-[8%] text-5xl animate-float-delayed opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">🧪</div>
        <div className="absolute top-1/2 left-[80%] text-4xl animate-float opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel" style={{animationDuration: '6s'}}>🏹</div>
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-pixel mb-12 text-3xl text-shadow-pixel relative z-10 inline-block hover-glitch"
        >
          KATEGORI LOMBA & WORKSHOP
        </motion.h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          {/* Lomba 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pixel-card-stone flex flex-col items-start gap-4 p-8 text-left hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(74,138,42,0.3)] transition-all cursor-default"
          >
            <div className="flex w-full items-center justify-between">
              <div className="bg-[#111] p-3 border-4 border-[#3c2a1c] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" className="text-green-500 drop-shadow-[0_0_10px_rgba(74,138,42,0.8)]">
                  <path d="M2 2h12v10H2V2zm2 2v2h2V4H4zm2 2v2h2V6H6zm-2 2v2h2V8H4zm6 2h4v2h-4v-2z" />
                </svg>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-pixel text-xs text-gray-400">Batch 1: Rp 40k</span>
                <span className="font-pixel text-sm text-yellow-400 bg-[#3b2514] px-3 py-1 border-2 border-[#1a0f07] shadow-[2px_2px_0_#000]">Batch 2: Rp 55k</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-pixel text-2xl text-shadow-pixel-sm hover-glitch text-green-400">SOFTWARE DEV</h3>
              <p className="mt-4 font-vt323 text-2xl text-gray-300 leading-relaxed">
                Uji kemampuan algoritmik dan pengembangan aplikasi Anda dalam kompetisi intensif ini layaknya bertahan hidup di mode Hardcore.
              </p>
              <ul className="mt-6 font-vt323 text-xl text-gray-400 space-y-2">
                <li className="flex items-center gap-2"><span className="text-green-500">▶</span> Maksimal 3 anggota per tim</li>
                <li className="flex items-center gap-2"><span className="text-green-500">▶</span> Online via Zoom</li>
              </ul>
            </div>
          </motion.div>

          {/* Lomba 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pixel-card-stone flex flex-col items-start gap-4 p-8 text-left hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,165,0,0.3)] transition-all cursor-default"
          >
            <div className="flex w-full items-center justify-between">
              <div className="bg-[#111] p-3 border-4 border-[#3c2a1c] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
                  <path d="M1 1h14v14H1V1zm2 2v2h10V3H3zm0 4v6h4V7H3zm6 0v2h4V7H9zm0 4v2h4v-2H9z" />
                </svg>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-pixel text-xs text-gray-400">Batch 1: Rp 40k</span>
                <span className="font-pixel text-sm text-yellow-400 bg-[#3b2514] px-3 py-1 border-2 border-[#1a0f07] shadow-[2px_2px_0_#000]">Batch 2: Rp 55k</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-pixel text-2xl text-shadow-pixel-sm hover-glitch text-orange-400">UI/UX DESIGN</h3>
              <p className="mt-4 font-vt323 text-2xl text-gray-300 leading-relaxed">
                Rakit antarmuka pengguna seindah tekstur pack impianmu! Ciptakan pengalaman visual yang memanjakan mata.
              </p>
              <ul className="mt-6 font-vt323 text-xl text-gray-400 space-y-2">
                <li className="flex items-center gap-2"><span className="text-orange-500">▶</span> Tim 3 orang</li>
                <li className="flex items-center gap-2"><span className="text-orange-500">▶</span> Online via Zoom</li>
              </ul>
            </div>
          </motion.div>

        </div>

          {/* Workshop Highlight */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="max-w-4xl mx-auto mt-12 relative group z-10"
          >
            {/* Efek Pendar Emas di Belakang */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-sm blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
            
            <div className="relative pixel-card-stone border-4 border-yellow-500 bg-[#1a110a] flex flex-col md:flex-row items-center md:items-stretch gap-8 p-8 md:p-12 text-left hover:scale-[1.01] transition-transform">
              
              {/* Tempat Poster */}
              <div className="w-full md:w-1/3 shrink-0 flex items-center justify-center border-4 border-[#3c2a1c] bg-[#111] relative overflow-hidden group/poster">
                <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay z-10 group-hover/poster:bg-transparent transition-colors"></div>
                <img 
                  src="https://placehold.co/600x800/111111/facc15/png?text=POSTER+WORKSHOP+COMING+SOON" 
                  alt="Poster Workshop" 
                  className="w-full h-auto object-cover opacity-80 group-hover/poster:opacity-100 group-hover/poster:scale-105 transition-all duration-500"
                />
              </div>

              {/* Konten Workshop */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-block w-max">
                  <span className="font-pixel text-sm text-black bg-yellow-400 px-3 py-1 border-2 border-yellow-600 animate-pulse">SPESIAL HIGHLIGHT</span>
                </div>
                
                <h3 className="font-pixel mt-6 text-3xl md:text-4xl text-shadow-pixel-sm hover-glitch cursor-default text-white">
                  Build Your Own AI Agent: <span className="text-yellow-400">LangGraph</span>
                </h3>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <span className="font-vt323 text-xl bg-[#2a1b10] px-3 py-1 text-gray-300 border-l-4 border-yellow-500">👩‍💻 Pemateri: Firania Putri Harsanti (Software/DevOps Engineer)</span>
                  <span className="font-vt323 text-xl bg-[#2a1b10] px-3 py-1 text-gray-300 border-l-4 border-green-500">🗓️ 29 November 2026</span>
                </div>

                <p className="mt-6 font-vt323 text-2xl text-gray-300 leading-relaxed">
                  Bongkar rahasia membangun AI canggih! Pahami konsep fundamental <span className="text-green-400">agent</span>, <span className="text-green-400">system prompt</span>, hingga <span className="text-green-400">context window</span> dan bangun aplikasi web masa depan yang dapat terhubung dengan _real-world data_.
                </p>
                
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <div className="flex flex-col">
                    <span className="font-pixel text-xs text-gray-400 line-through">Rp 50.000</span>
                    <span className="font-pixel text-2xl text-yellow-400 text-shadow-pixel-sm">Rp 20.000</span>
                  </div>
                  <Link 
                    href="/register" 
                    className="pixel-btn-yellow font-pixel px-8 py-4 text-sm text-white text-shadow-pixel hover:scale-110 active:scale-95 transition-transform"
                  >
                    DAFTAR WORKSHOP SEKARANG
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

      </section>

      {/* Timeline */}
      <section id="timeline" className="bg-[#111111] px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        {/* Floating Minecraft Elements */}
        <div className="absolute top-40 left-[12%] text-5xl animate-float opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">🧭</div>
        <div className="absolute bottom-60 right-[10%] text-5xl animate-float-delayed opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">🕰️</div>
        <div className="absolute top-1/2 left-[85%] text-4xl animate-float opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel" style={{animationDuration: '7s'}}>🧨</div>
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-pixel mb-16 text-3xl text-shadow-pixel relative z-10 inline-block hover-glitch text-red-500"
        >
          TIMELINE KOMPETISI
        </motion.h2>
        
        <div className="relative mx-auto max-w-5xl z-10">
          {/* Garis vertikal tengah Redstone */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-1.5 -translate-x-1/2 bg-red-600 shadow-[0_0_15px_#dc2626] md:block opacity-80"></div>

          <div className="flex flex-col gap-12 md:gap-8">
            
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center md:flex-row md:justify-between group"
            >
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-start md:items-end text-left md:text-right p-6 relative hover:-translate-x-2 transition-transform cursor-default hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] border-red-900">
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-red-800 md:block"></div>
                  <span className="font-pixel text-sm text-red-400 mb-2 group-hover:animate-pulse">10 OKT - 8 NOV</span>
                  <h3 className="font-pixel text-lg group-hover:text-red-400 transition-colors">Pendaftaran</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Pendaftaran Batch 1 (10-25 Okt) dan Batch 2 (26 Okt - 8 Nov) beserta pengumpulan karya secara online.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-red-500 md:flex group-hover:scale-150 group-hover:shadow-[0_0_20px_#ef4444] group-hover:bg-red-400 transition-all"></div>
              <div className="md:w-5/12"></div>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center md:flex-row md:justify-between group"
            >
              <div className="md:w-5/12"></div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-red-600 md:flex group-hover:scale-150 group-hover:shadow-[0_0_20px_#ef4444] group-hover:bg-red-400 transition-all"></div>
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-start text-left p-6 relative hover:translate-x-2 transition-transform cursor-default hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] border-red-900">
                  <div className="absolute top-1/2 -left-4 hidden h-1 w-4 -translate-y-1/2 bg-red-800 md:block"></div>
                  <span className="font-pixel text-sm text-red-400 mb-2 group-hover:animate-pulse">9 - 12 NOV</span>
                  <h3 className="font-pixel text-lg group-hover:text-red-400 transition-colors">Penilaian Awal & Pengumuman Finalis</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Penjurian daring terhadap proposal/karya oleh dewan juri, dan pengumuman finalis.</p>
                </div>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center md:flex-row md:justify-between group"
            >
              <div className="md:w-5/12">
                <div className="pixel-card-stone flex flex-col items-start md:items-end text-left md:text-right p-6 relative hover:-translate-x-2 transition-transform cursor-default hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] border-red-900">
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-red-800 md:block"></div>
                  <span className="font-pixel text-sm text-red-400 mb-2 group-hover:animate-pulse">13 - 14 NOV</span>
                  <h3 className="font-pixel text-lg group-hover:text-red-400 transition-colors">Technical Meeting & Gladi</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Penjelasan peraturan kompetisi bagi para finalis melalui Zoom/Google Meet serta gladi bersih.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-red-600 md:flex group-hover:scale-150 group-hover:shadow-[0_0_20px_#ef4444] group-hover:bg-red-400 transition-all"></div>
              <div className="md:w-5/12"></div>
            </motion.div>

            {/* Item 4 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center md:flex-row md:justify-between group"
            >
              <div className="md:w-5/12"></div>
              <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-red-600 md:flex group-hover:scale-150 group-hover:shadow-[0_0_20px_#ef4444] group-hover:bg-red-400 transition-all"></div>
              <div className="md:w-5/12">
                <div className="pixel-card-stone border-red-500 flex flex-col items-start text-left p-6 relative hover:translate-x-2 transition-transform cursor-default shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                  <div className="absolute top-1/2 -left-4 hidden h-1 w-4 -translate-y-1/2 bg-red-800 md:block"></div>
                  <span className="font-pixel text-sm text-white mb-2 group-hover:animate-pulse">15 NOV</span>
                  <h3 className="font-pixel text-lg text-red-400 group-hover:text-white transition-colors">Final Competition & Awarding</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Presentasi 6 finalis secara langsung, penjurian final, dan pengumuman Juara.</p>
                </div>
              </div>
            </motion.div>

            {/* Item 5 - Kiri */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center md:flex-row md:justify-between group"
            >
              <div className="md:w-5/12">
                <div className="pixel-card-stone border-yellow-500 flex flex-col items-start md:items-end text-left md:text-right p-6 relative hover:-translate-x-2 transition-transform cursor-default hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                  <div className="absolute top-1/2 -right-4 hidden h-1 w-4 -translate-y-1/2 bg-yellow-600 md:block"></div>
                  <span className="font-pixel text-sm text-white mb-2 group-hover:animate-pulse">29 NOV</span>
                  <h3 className="font-pixel text-lg text-yellow-400 group-hover:text-white transition-colors">Acara Puncak: Workshop</h3>
                  <p className="font-vt323 text-xl text-gray-300 mt-2">Workshop interaktif (LangGraph) dan sesi kuis/challenge penutupan acara.</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-[#3c2a1c] bg-yellow-400 md:flex group-hover:scale-150 group-hover:shadow-[0_0_20px_#eab308] transition-all"></div>
              <div className="md:w-5/12"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sponsor & Media Partner */}
      <section id="sponsor" className="bg-[#1a0f07] minecraft-border-top px-0 py-24 text-center relative overflow-hidden border-b-8 border-[#111]">
        {/* Latar belakang Nether/Obsidian gelap */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
        
        {/* Hujan Item Minecraft (Meriah tapi tetap In-Theme) */}
        <div className="absolute top-10 left-[5%] text-4xl animate-float opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_10px_#eab308]">🏆</div>
        <div className="absolute top-24 left-[20%] text-5xl animate-float-delayed opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">📚</div>
        <div className="absolute top-40 right-[15%] text-5xl animate-float opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_10px_#22c55e]" style={{animationDuration: '4s'}}>🟩</div> {/* Emerald */}
        <div className="absolute top-60 left-[8%] text-6xl animate-float-delayed opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_15px_#22d3ee]">💎</div>
        <div className="absolute bottom-40 right-[10%] text-4xl animate-float opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_10px_#facc15]" style={{animationDuration: '5s'}}>🥇</div>
        <div className="absolute top-1/2 left-[12%] text-5xl animate-float-delayed opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel">🍖</div>
        <div className="absolute bottom-60 left-[20%] text-5xl animate-float opacity-20 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_10px_#f97316]" style={{animationDuration: '6s'}}>🥕</div>
        <div className="absolute top-1/2 right-[5%] text-6xl animate-float opacity-30 select-none grayscale hover:grayscale-0 transition-all font-pixel drop-shadow-[0_0_10px_#eab308]">🍎</div>

        {/* Pesan Terima Kasih (Gratitude) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 mx-auto max-w-4xl px-6 mb-20 mt-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-4 w-4 bg-yellow-500 shadow-[2px_2px_0_#ca8a04]"></div>
            <div className="h-4 w-4 bg-yellow-400 shadow-[2px_2px_0_#a16207]"></div>
            <div className="h-4 w-4 bg-yellow-500 shadow-[2px_2px_0_#ca8a04]"></div>
          </div>
          
          <h2 className="font-pixel text-4xl md:text-5xl text-yellow-400 mb-6 drop-shadow-[4px_4px_0_#854d0e] hover-glitch inline-block">
            TERIMA KASIH SEBESAR-BESARNYA
          </h2>
          
          <p className="font-vt323 text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto bg-[#2b1810] p-6 border-4 border-[#3b2514] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            Acara ini tidak akan terwujud tanpa kolaborasi dan dukungan luar biasa dari para mitra kami. Mari bertepuk tangan untuk mereka yang telah mensukseskan <span className="text-yellow-400 font-bold drop-shadow-[0_0_8px_#facc15]">FOSTIFEST 2026!</span>
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-4 w-4 bg-yellow-500 shadow-[2px_2px_0_#ca8a04]"></div>
            <div className="h-4 w-4 bg-yellow-400 shadow-[2px_2px_0_#a16207]"></div>
            <div className="h-4 w-4 bg-yellow-500 shadow-[2px_2px_0_#ca8a04]"></div>
          </div>
        </motion.div>

        <div className="relative z-10 w-full flex flex-col gap-24">
          
          {/* SPONSOR */}
          <div className="px-6">
            <h3 className="font-pixel text-3xl text-gray-300 mb-12 flex items-center justify-center gap-6 before:h-2 before:w-16 before:bg-[#3b2514] after:h-2 after:w-16 after:bg-[#3b2514] drop-shadow-[2px_2px_0_#000]">
              [ MAIN SPONSORS ]
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={`sponsor-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.6 }}
                  className="bg-[#e5e5e5] p-6 hover:-translate-y-4 transition-all cursor-pointer shadow-[8px_8px_0_rgba(0,0,0,0.5)] hover:shadow-[12px_12px_0_rgba(202,138,4,1)] border-4 border-[#3b2514] hover:border-yellow-500 rounded-none group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <img src={`https://placehold.co/240x120/ffffff/111111/png?text=SPONSOR+${i}`} alt={`Sponsor ${i}`} className="h-16 md:h-20 w-auto object-contain relative z-10 drop-shadow-md grayscale group-hover:grayscale-0 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* MEDIA PARTNER (MARQUEE INFINITE) */}
          <div className="w-full relative py-12 overflow-hidden bg-[#111] border-y-8 border-[#3b2514]">
            
            <h3 className="font-pixel text-xl text-gray-400 mb-8 flex items-center justify-center gap-4 absolute top-6 left-1/2 -translate-x-1/2 z-20 drop-shadow-[2px_2px_0_#000] bg-[#1a0f07] px-6 py-2 border-4 border-[#3b2514]">
              OFFICIAL MEDIA PARTNERS
            </h3>
            
            <div className="animate-marquee-slow pt-16 pb-4 flex items-center shrink-0 mt-4">
              {/* Grup 1 */}
              <div className="flex shrink-0 items-center gap-12 px-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={`medpart-a-${i}`}
                    className="bg-[#e5e5e5] p-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer border-4 border-[#3b2514] hover:border-gray-400 shadow-[6px_6px_0_rgba(0,0,0,0.8)] relative group"
                  >
                    <img src={`https://placehold.co/150x80/ffffff/111111/png?text=MEDPART+${i}`} alt={`Media Partner ${i}`} className="h-10 md:h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" />
                  </div>
                ))}
              </div>
              {/* Grup 2 (Clone) */}
              <div className="flex shrink-0 items-center gap-12 px-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={`medpart-b-${i}`}
                    className="bg-[#e5e5e5] p-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer border-4 border-[#3b2514] hover:border-gray-400 shadow-[6px_6px_0_rgba(0,0,0,0.8)] relative group"
                  >
                    <img src={`https://placehold.co/150x80/ffffff/111111/png?text=MEDPART+${i}`} alt={`Media Partner ${i}`} className="h-10 md:h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="pixel-card-stone flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 p-8 md:px-12 mt-12 border-t-4 border-[#1a1a1a]">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2 rounded-full bg-white px-4 py-2 w-max mx-auto md:mx-0">
            <img src="https://www.fostiums.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fairlanggapradana%2Fimage%2Fupload%2Fv1755442684%2Flogo_ch57ma.png&w=256&q=75" alt="FOSTI Logo" className="h-6 w-6 object-contain" />
            <span className="font-bold text-black text-sm">FOSTI UMS</span>
          </div>
          <p className="font-pixel text-[10px] text-gray-400">© 2026 FOSTIFEST by FOSTI UMS.<br/>All rights reserved.</p>
        </div>
        
        <div className="font-vt323 text-center md:text-right text-lg text-gray-300">
          <p>Gedung J Lantai 3 Fakultas Komunikasi dan Informatika<br/>Universitas Muhammadiyah Surakarta</p>
          <p className="mt-2 text-green-400">+62 8232-5427-416 | fostiums@gmail.com</p>
          <div className="mt-4 flex justify-center md:justify-end gap-4 text-2xl">
            <a href="#" className="hover:text-green-400 hover:-translate-y-1 transition-transform">📷</a>
            <a href="#" className="hover:text-green-400 hover:-translate-y-1 transition-transform">🐦</a>
            <a href="#" className="hover:text-green-400 hover:-translate-y-1 transition-transform">▶️</a>
            <a href="#" className="hover:text-green-400 hover:-translate-y-1 transition-transform">💬</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
