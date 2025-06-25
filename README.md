# 🌴 The Wild Oasis – Client App

This is the **user-facing client application** for The Wild Oasis. Unlike the admin dashboard, this app is focused on letting users explore, view, and interact with cabins, bookings, and account features in a friendly and accessible interface.

---

## 🧭 Features

- 🛏️ Browse and view available cabins
- 🔐 User login and account access
- 🧾 Manage booking requests and view booking history
- 📄 Custom pages (About, Not Found, Loading)
- 📦 Modular folder structure for scalability

---

## 🧩 Tech Stack

- Next.js (App Router)
- React
- CSS Modules
- Supabase (Auth & DB)
- Server Actions / API routes (via `app/api`)

---

## 📁 Folder Structure Overview

- `app/` – Main entry point using the Next.js App Router
  - `_components/` – Reusable UI components
  - `_lib/` – Utility functions or libraries
  - `_styles/` – Global and modular styles
  - `account/` – User profile and account settings
  - `cabins/` – Cabin listings and details
  - `login/` – Auth login page
  - `about/` – Informational page
  - `api/` – Backend functions and route handlers
- `page.js` – Home page
- `layout.js` – Root layout wrapper
- `error.js` / `not-found.js` – Error and 404 handling
- `loading.js` – Loading fallback component

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
