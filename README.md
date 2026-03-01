<div align="center">

# ✈️ Travio
**Collaborative Trip Planning, Reimagined.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

</div>

<br />

## 🌍 Overview

**Travio** is a modern, collaborative platform designed to take the friction out of group travel. Say goodbye to scattered WhatsApp groups, lost flight tickets, and confusing split bills. Travio brings everything into one beautiful, real-time dashboard so you can focus on the adventure, not the logistics.

Built for a seamless user experience, Travio allows friends to build itineraries together, track expenses, and manage travel documents securely and elegantly.

---

## ✨ Key Features

- **🎒 Collaborative Itineraries:** Build day-by-day travel plans with your friends in real-time.
- **💸 Expense Tracking & Splitting:** Easily log expenses and instantly see who owes what.
- **🔐 Secure Authentication:** Enterprise-grade security handling seamlessly powered by Clerk.
- **📄 Centralized Document Storage:** Keep tickets, boarding passes, and bookings in one accessible place.
- **👥 Role-Based Access:** Assign `owner`, `editor`, and `viewer` permissions to group members.
- **🎨 Premium UI/UX:** A highly polished, responsive interface built with Tailwind CSS and Shadcn UI.

---

## 🛠️ Tech Stack

Travio is built using a modern, scalable, and type-safe architecture:

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes (Serverless), Node.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Clerk
- **Media Optimization:** Next/Image with remote caching

---

## 🚀 Getting Started

If you'd like to run Travio locally:

### 1. Clone the repository
```bash
git clone https://github.com/pranavgawaii/Travio.git
cd Travio
```

### 2. Install dependencies
```bash
# We use a monorepo-style structure
npm install --prefix frontend
npm install --prefix backend
```

### 3. Set up environment variables
Create a `.env.local` file inside the `/frontend` directory and add your keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk redirect configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/trips
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/trips
```

### 4. Start the development server
```bash
npm run dev
```
The app will be running at `http://localhost:3000`.

---

## 👨‍💻 Developed By

Designed and engineered with passion by **Pranav Gawai**.  
If you find this project interesting or helpful, please consider giving it a ⭐ to show your support!

---
<div align="center">
  <i>Built for the hackers, traveler enthusiasts, and builders.</i>
</div>
