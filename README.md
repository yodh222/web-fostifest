## Website# FOSTIFEST 26

![FOSTIFEST 26 Logo/Header Placeholder]

The official registration platform and dashboard for FOSTIFEST 26. Built using the modern T3 Stack with a pixel-art/Minecraft aesthetic.
This platform handles the registration flow, from team formation and payment to uploading competition and workshop requirements.

## 🚀 Key Features
* **Secure Authentication:** Managed using [Better Auth](https://better-auth.com) with separate schemas for high security.
* **Team Management:** Participants can create a new team or join an existing team using a unique invite code (only 1 team per person).
* **Requirement Uploads:** Integrated directly with **Supabase Storage** for uploading KMS/KTM (Student ID), Twibbon, IG Follow proofs, and Payment Receipts.
* **Admin Dashboard:** A hidden panel for the committee to verify all registration proofs.
* **Pixel-art UI:** An aesthetic interface with a retro gaming vibe.

## 🛠️ Environment Setup

Copy the `.env.example` file to `.env` and fill in the following environment variables:

```env
# Database URL (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/fostifest"

# Better Auth
BETTER_AUTH_SECRET="hard-to-guess-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_SUPABASE_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
```

> **Supabase Warning:** Ensure you have a bucket named **`fostifest-files`** in Supabase with _public_ visibility.

## 📚 Database Migration & Dummy Account Seeding

1. Run the database schema migration with Drizzle:
   ```bash
   pnpm db:push
   ```
2. Start the application:
   ```bash
   pnpm dev
   ```
3. **INITIAL MIGRATION / DUMMY ACCOUNT SEEDING:**
   Open this secret endpoint in your browser just once to inject dummy accounts into the database:
   [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

   Upon success, you can Sign In using these two weird dummy accounts to fully explore all pages:

   **👤 Committee Account (Admin)**
   * Email: `panitia.fosti_secret_x99@fostiums.org`
   * Password: `FostiAdmin_X99_#2026`
   * _(Role: Has access to the payment verification control & team requirement verification)_

   **👥 Tester/Participant Account**
   * Email: `dummy_team_xyz88@tester.com`
   * Password: `TestAccount_88_!`
   * _(Role: Can try the team registration simulation, join using a code, pay for the competition, & join the workshop)_

## 💻 Advanced Development Guide

If you want to update the schema, please edit `/src/server/db/schema.ts` and re-run `pnpm db:push`. All FOSTIFEST server logic integrations are located in `/src/server/actions.ts`.

---
_© 2026 FOSTIFEST by FOSTI UMS_
