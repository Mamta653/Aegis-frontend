# Aegis AI — Frontend

> **Intelligent Healthcare Platform** · Autonomous AI agents for diagnosis, consultations & care planning

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aegis--frontend--gilt.vercel.app-black?style=for-the-badge)](https://aegis-frontend-gilt.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

##  Live Application

**Production URL:** https://aegis-frontend-gilt.vercel.app

---

##  Overview

Aegis AI is a full-stack telehealth platform that leverages agentic AI to deliver intelligent, autonomous healthcare experiences. Users can consult AI-powered agents for symptoms and diagnosis, book video consultations with real doctors, and manage their complete health journey — all in one place.

---

##  Features

- **AI-Powered Health Chat** — Conversational AI agent for symptom checking, diagnosis suggestions, and care planning
- **Doctor Consultations** — Browse specialists, filter by category, and book real-time video appointments
- **Live Video Calls** — Integrated Daily.co video rooms for seamless doctor-patient sessions
- **Authentication System** — Secure signup, login, JWT-based sessions, and password reset via email
- **Responsive Design** — Fully optimized for desktop and mobile devices
- **Health Records** — Personal health history management (in progress)

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Video Calls | Daily.co SDK |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── AgenticAIFeature.tsx   # AI agent showcase section
│   ├── ChatbotWidget.tsx      # Floating AI chat assistant
│   ├── Features.tsx           # Platform features section
│   ├── Footer.tsx
│   ├── Header.tsx             # Navigation with auth state
│   ├── Hero.tsx               # Landing page hero
│   └── LoginModal.tsx         # Auth modal (signup/login/forgot password)
├── pages/
│   ├── ConsultationPage.tsx   # Doctor listing & booking
│   ├── ResetPasswordPage.tsx  # Password reset flow
│   └── VideoCallPage.tsx      # Live video consultation room
├── api/
│   └── axios.ts               # Axios instance with base URL config
├── App.tsx                    # Route definitions
└── main.tsx                   # App entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mamta653/Aegis-frontend.git
cd Aegis-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_API_URL=http://localhost:3000
```

### Available Scripts

```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

##  Backend Repository

This frontend connects to the Aegis Backend (NestJS + PostgreSQL):
 https://github.com/Mamta653/Aegis-backend

---

##  Architecture

```
User Browser
     │
     ▼
Vercel CDN (React SPA)
     │
     ▼ REST API calls (Axios)
     │
Render (NestJS Backend)
     │
     ▼
Supabase (PostgreSQL)
```

---

##  Deployment

This app is deployed on **Vercel** with automatic deployments on every push to `main`.

```bash
# Build and deploy manually
npm run build
# Push to GitHub — Vercel auto-deploys
```

---

##  Author

**Mamta** — Full Stack Developer
- GitHub: [@Mamta653](https://github.com/Mamta653)

---

##  License

This project is for portfolio and learning purposes.
