# DOKUMEN RENCANA IMPLEMENTASI SISTEM: FOSTIFEST 2026

## 1. Analisis Trade-off Arsitektur Tanpa Biaya
Implementasi infrastruktur gratis untuk skala nasional membutuhkan kompromi pada kontrol peladen penuh dan batasan kuota bulanan. 

*   **Risiko:** Penghentian layanan sepihak oleh penyedia *cloud* jika terjadi lonjakan trafik yang dianggap sebagai serangan *Distributed Denial of Service* (DDoS) atau pelanggaran kuota paket gratis.
*   **Mitigasi:** Arsitektur harus menggunakan *Static Site Generation* (SSG) agar halaman utama tidak membebani pangkalan data, mendelegasikan autentikasi ke pihak ketiga, dan menerapkan kompresi aset gambar secara agresif.

## 2. Arsitektur Sistem Low-Cost / Zero-Cost
Arsitektur ini menghilangkan kebutuhan menyewa *Virtual Private Server* (VPS) secara bulanan dengan memanfaatkan layanan *freemium* tingkat lanjut.

*   **Frontend & Hosting Web:** Next.js (dideploy ke Vercel - Hobby Tier).
    *   *Analisis:* Vercel menyediakan lebar pita yang sangat besar secara gratis untuk fail statis. Komponen halaman utama (Landing Page) harus dirender secara statis, sedangkan *dashboard* menggunakan *Client-Side Rendering* (CSR).
*   **Backend, Autentikasi & Database:** Firebase (Spark Plan) atau Supabase (Free Tier).
    *   *Analisis:* Daripada membangun *backend* dari nol yang memerlukan peladen terdedikasi, penggunaan BaaS sangat efisien secara biaya. Integrasi Firebase Realtime Database dengan konfigurasi *security rules* yang ketat dapat diandalkan untuk manajemen data yang cepat. Alternatifnya, Supabase menawarkan pangkalan data relasional PostgreSQL gratis yang lebih superior untuk menangani relasi kompleks antara entitas Peserta, Tim, dan Pembayaran.
*   **Penyimpanan Aset & Bukti Pembayaran:** Cloudinary (Free Tier) atau Firebase Storage.
    *   *Analisis:* Mengisolasi fail gambar (seperti bukti transfer) dari pangkalan data utama. Cloudinary secara otomatis mengonversi gambar ke format yang efisien (WebP/AVIF), menghemat kuota lebar pita secara signifikan.
*   **Manajemen Domain:** 
    *   *Analisis:* Untuk memangkas pengeluaran di luar infrastruktur komputasi, penggunaan domain dengan ekstensi lokal tingkat kedua seperti `.my.id` sangat disarankan karena biaya pendaftaran dan perpanjangan tahunannya jauh lebih rendah dibandingkan ekstensi `.com` atau `.id`, namun tetap memberikan legitimasi untuk portal registrasi.

## 3. Fase Implementasi

### Fase 1: Optimasi Aset dan Konfigurasi Repositori
1.  Menerjemahkan desain piksel/Minecraft ke dalam CSS murni sebanyak mungkin.
2.  Mengompresi seluruh aset visual yang tidak dapat digantikan oleh CSS ke format WebP.
3.  Inisialisasi repositori Git dan integrasi dengan Vercel untuk otomatisasi *deployment*.

### Fase 2: Integrasi Backend-as-a-Service (BaaS)
1.  Pembuatan proyek pada platform BaaS pilihan (Supabase/Firebase).
2.  Desain skema pangkalan data atau struktur JSON (jika menggunakan NoSQL) untuk menampung data `Users`, `Teams`, dan `Payments`.
3.  Implementasi aturan keamanan (*Security Rules* / *Row Level Security*) untuk memastikan modifikasi data hanya dapat dilakukan oleh pengguna yang terautentikasi dan panitia.

### Fase 3: Pengembangan Frontend & Logika Pendaftaran
1.  **Landing Page:** Pembuatan antarmuka publik yang dioptimalkan untuk waktu muat di bawah 2 detik.
2.  **Autentikasi:** Implementasi fungsi masuk dan daftar menggunakan modul bawaan dari BaaS.
3.  **Alur Pendaftaran:** Pembuatan formulir multitingkat dengan validasi input di sisi klien untuk mengurangi kueri yang tidak valid ke pangkalan data.
4.  **Integrasi Penyimpanan:** Menghubungkan formulir unggah bukti pembayaran ke layanan *storage*, membatasi ukuran fail maksimal 1MB di sisi klien.

### Fase 4: Pengembangan Dashboard Panitia
1.  Pembuatan antarmuka rahasia dengan akses terbatas untuk memantau data secara *real-time*.
2.  Implementasi tabel data dengan fitur pencarian dan penyaringan berdasarkan status pembayaran.
3.  Pembuatan tombol aksi untuk memverifikasi atau menolak bukti pembayaran, yang akan secara langsung memperbarui status di pangkalan data.

### Fase 5: Pengujian Limitasi (Penetrasi Kuota)
1.  Menghitung estimasi maksimal *request* harian berdasarkan kuota paket gratis penyedia layanan.
2.  Simulasi unggahan 1000 gambar bukti transfer palsu untuk mengukur kapasitas *storage* yang tersisa dan merumuskan skenario pembersihan data sementara jika diperlukan.
