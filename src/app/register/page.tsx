import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111111] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4">
      <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay"></div>
      
      <div className="pixel-card-stone relative z-10 w-full max-w-md p-8 text-center text-white">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-[#1a1a1a] bg-[#4a4a4a] px-6 py-2">
          <h1 className="font-pixel text-xl text-shadow-pixel-sm">REGISTRASI</h1>
        </div>

        <form className="mt-8 space-y-6 text-left">
          <div>
            <label className="font-pixel text-xs text-gray-300">[NAMA TIM]</label>
            <input 
              type="text" 
              className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-green-500" 
              placeholder="Masukkan nama tim"
            />
          </div>

          <div>
            <label className="font-pixel text-xs text-gray-300">[EMAIL KETUA]</label>
            <input 
              type="email" 
              className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-green-500" 
              placeholder="emailketua@mail.com"
            />
          </div>
          
          <div>
            <label className="font-pixel text-xs text-gray-300">[PASSWORD]</label>
            <input 
              type="password" 
              className="mt-2 w-full border-4 border-[#111] bg-[#1a1a1a] p-3 font-vt323 text-xl text-white outline-none focus:border-green-500" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="button" 
            className="pixel-btn-yellow font-pixel mt-4 w-full py-4 text-sm text-shadow-pixel-sm text-white"
          >
            BUAT AKUN
          </button>
        </form>

        <p className="font-vt323 mt-6 text-xl text-gray-300">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-pixel text-xs text-green-400 hover:text-white">
            [MASUK DI SINI]
          </Link>
        </p>

        <div className="mt-8 border-t-2 border-[#111] pt-4">
          <Link href="/" className="font-pixel text-[10px] text-gray-400 hover:text-white">
            ← KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </main>
  );
}
