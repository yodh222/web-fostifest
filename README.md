## Website# FOSTIFEST 26

![FOSTIFEST 26 Logo/Header Placeholder]

Platform pendaftaran dan dashboard resmi FOSTIFEST 26. Dibuat menggunakan T3 Stack modern dengan nuansa pixel-art/Minecraft. 
Platform ini menangani alur pendaftaran dari pembentukan tim, pembayaran, hingga pengunggahan persyaratan lomba dan _workshop_.

## 🚀 Fitur Utama
* **Autentikasi Aman:** Dikelola menggunakan [Better Auth](https://better-auth.com) dengan _schema_ terpisah untuk keamanan tinggi.
* **Manajemen Tim:** Peserta dapat membentuk tim baru atau bergabung ke dalam tim menggunakan kode _invite_ unik (hanya 1 tim per orang).
* **Unggah Persyaratan:** Terintegrasi langsung dengan **Supabase Storage** untuk unggah KMS/KTM, Twibbon, *Follow* IG, dan Bukti Pembayaran.
* **Dashboard Panitia (Admin):** Panel tersembunyi bagi panitia untuk memverifikasi seluruh bukti pendaftaran.
* **Pixel-art UI:** Antarmuka estetik yang bernuansa *retro gaming*.

## 🛠️ Persiapan Lingkungan (Setup)

Salin fail `.env.example` menjadi `.env` lalu isi *environment variables* berikut:

```env
# URL Database (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/fostifest"

# Better Auth
BETTER_AUTH_SECRET="secret-key-yang-susah-ditebak"
BETTER_AUTH_URL="http://localhost:3000"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_SUPABASE_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
```

> **Peringatan Supabase:** Pastikan Anda memiliki *bucket* bernama **`fostifest-files`** di Supabase dengan visibilitas _public_.

## 📚 Migrasi Database & Seeding Dummy Account

1. Jalankan migrasi skema database dengan Drizzle:
   ```bash
   pnpm db:push
   ```
2. Jalankan aplikasi:
   ```bash
   pnpm dev
   ```
3. **MIGRASI AWAL / SEEDING AKUN DUMMY:**
   Buka *endpoint* rahasia ini di browser Anda sekali saja untuk menginjeksi akun *dummy* ke database:
   [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

   Setelah sukses, Anda dapat login (_Sign In_) menggunakan dua akun *dummy* aneh berikut untuk mengecek semua halaman secara penuh:

   **👤 Akun Panitia (Admin)**
   * Email: `panitia.fosti_secret_x99@fostiums.org`
   * Password: `FostiAdmin_X99_#2026`
   * _(Fungsi: Memiliki akses ke kontrol verifikasi pembayaran & verifikasi syarat kelengkapan anggota tim)_

   **👥 Akun Tester/Peserta**
   * Email: `dummy_team_xyz88@tester.com`
   * Password: `TestAccount_88_!`
   * _(Fungsi: Bisa mencoba simulasi pendaftaran tim, join menggunakan kode, bayar lomba, & ikut workshop)_

## 💻 Panduan Pengembangan Lanjutan

Bila Anda ingin memperbarui skema, silakan sunting `/src/server/db/schema.ts` dan jalankan ulang `pnpm db:push`. Semua integrasi *server logic* Fostifest berada di `/src/server/actions.ts`.

---
_© 2026 FOSTIFEST by FOSTI UMS_

## What's next? How do I make an app with this?
