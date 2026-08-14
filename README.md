## Website FOSTIFEST 26

This is a Next.JS website that serves as the main gateway to the many FOSTIFEST
IT competitions held by UKM FOSTI UMS.

```bash
pnpm install
```

## Akun Dummy (Initial Migration / Testing)

Untuk membantu tahap awal peluncuran dan menghindari kebocoran oleh peserta, gunakan akun rahasia berikut.
Gunakan endpoint khusus: Buka peramban (browser) dan akses **`http://localhost:3000/api/seed`** untuk menanamkan (*seed*) kedua akun ini ke dalam basis data Supabase secara otomatis dengan hashing password yang benar via Better Auth.

**1. Akun Panitia (Admin Dashboard)**
- **Email:** `panitia.fosti_secret_x99@fostiums.org`
- **Password:** `FostiAdmin_X99_#2026`
- **Akses:** `/admin`

**2. Akun Peserta (Team Dashboard)**
- **Email:** `dummy_team_xyz88@tester.com`
- **Password:** `TestAccount_88_!`
- **Akses:** `/dashboard`

## What's next? How do I make an app with this?
