# SkillGate

**Skilled hands. Verified trust. Redemption City's premier artisan marketplace.**

SkillGate connects residents of Redemption City with background-checked, community-vetted local artisans — electricians, plumbers, carpenters, painters, and more. Built for Kingdom Hack 3.0: Smart City Innovation.

---

## 🔗 Live Demo

[skillgate-zeta.vercel.app](https://skillgate-zeta.vercel.app)

---

## 🚀 What It Does

- **Browse verified artisans** by category — Plumbing, Electrical, Carpentry, Painting, Masonry
- **AI Match** — describe your job in plain English and get the top 3 artisan recommendations
- **Book instantly** — select date, describe the job, confirm booking in seconds
- **Track jobs** — real-time booking status from pending to completed
- **Artisan registration** — artisans apply and get verified by city administrators
- **Admin dashboard** — city admins approve/reject artisan applications and monitor activity

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TanStack Start, TanStack Router |
| Styling | Tailwind CSS v4, Radix UI, shadcn/ui |
| Backend | TanStack Start Server Functions (Serverless) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| AI | Gemini via Lovable AI Gateway |
| Hosting | Vercel (Nitro serverless preset) |
| Version Control | GitHub |

---

## 🗄️ Database Tables

- `categories` — service categories (plumbing, electrical, etc.)
- `artisans` — verified artisan profiles with ratings and skills
- `bookings` — resident booking records with status tracking
- `artisan_registrations` — pending artisan applications awaiting admin review

---

## 👥 User Types

| Role | Description |
|------|-------------|
| Resident | Searches, books, and rates artisans |
| Artisan | Registers, gets verified, receives bookings |
| Admin | Approves artisans, monitors city-wide activity |

---

## ⚙️ Running Locally

```bash
git clone https://github.com/Mikomijie/Skillgate.git
cd Skillgate
npm install
npm run dev
```

Create a `.env` file with:
SUPABASE_URL=your_supabase_url

SUPABASE_PUBLISHABLE_KEY=your_publishable_key

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

VITE_SUPABASE_PROJECT_ID=your_project_id

---

🏆 Built For

**Kingdom Hack 3.0 — Smart City Innovation**
Track: Verified Service Access
Team: SkillGate
