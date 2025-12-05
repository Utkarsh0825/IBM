# InternPath AI - AI Internship Copilot

An AI-powered platform that helps students tailor resumes and cover letters for internship applications, with integrated IBM Watson Orchestrate AI agent.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

## 🚀 Features

- **AI-Powered Resume Tailoring** - Automatically customize resumes for each job posting
- **Smart Cover Letter Generation** - Generate compelling cover letters matching job requirements
- **Quality Checks** - Automated grammar, consistency, and professionalism checks
- **Advisor Review** - Career advisors can review and approve applications
- **IBM Watson Orchestrate Integration** - Global floating chat widget on all pages
- **Demo Mode** - Fully functional offline demo with sample data
- **Modern UI/UX** - Apple-inspired design with light/dark mode support

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: IBM Watson Orchestrate, OpenAI API (optional)
- **Database**: Supabase (optional, works in demo mode)
- **Email**: Resend (optional)
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Utkarsh0825/IBM.git
cd IBM

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Demo Mode

The app includes a **pure local demo mode** that works completely offline without any external services.

### Enable Demo Mode

Set the environment variable:

```bash
NEXT_PUBLIC_DEMO_MODE=true
```

Or create a `.env.local` file:

```env
NEXT_PUBLIC_DEMO_MODE=true
```

### Demo Credentials

- **Student**: `student@demo.local` / `demo123`
- **Advisor**: `advisor@demo.local` / `demo123`
- **Admin**: `admin@demo.local` / `demo123`

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

The code is already pushed to: `https://github.com/Utkarsh0825/IBM`

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import the GitHub repository: `Utkarsh0825/IBM`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Environment Variables (Optional)

If you want to use real services instead of demo mode, add these in Vercel:

```env
# Demo Mode (recommended for quick demo)
NEXT_PUBLIC_DEMO_MODE=true

# Optional: Real services (only needed if not using demo mode)
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# OPENAI_API_KEY=your_openai_key
# RESEND_API_KEY=your_resend_key
```

**Note**: The app works perfectly in demo mode without any of these variables!

### Step 4: Deploy

Click **"Deploy"** and Vercel will:
1. Build your Next.js app
2. Deploy it to a production URL
3. Set up automatic deployments on every push to `main`

## 🤖 IBM Watson Orchestrate Integration

The app includes a global floating chat widget powered by IBM Watson Orchestrate.

### Configuration

The Watson Orchestrate agent is already configured and deployed. The chat widget:
- Appears on all pages (bottom-right corner)
- Works in demo mode
- Shows "Pace" as the welcome message
- Requires anonymous access (security disabled)

### Security Configuration

If you need to reconfigure the Watson Orchestrate security settings, use the included script:

```bash
./wxO-embed-chat-security-tool.sh
```

## 📁 Project Structure

```
IBM/
├── app/                    # Next.js App Router pages
│   ├── (protected)/        # Protected routes (dashboard, jobs, applications)
│   ├── admin/              # Admin pages
│   ├── advisor/            # Advisor pages
│   ├── applications/       # Application management
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Student dashboard
│   ├── jobs/               # Job postings
│   └── orchestrate/        # IBM Watson Orchestrate page
├── components/             # React components
│   ├── orchestrate/        # Watson Orchestrate components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/                    # Utilities and helpers
│   ├── demo-data.ts        # Demo mode data
│   └── hooks/              # Custom React hooks
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🎨 Features Overview

### Student Features
- Dashboard with application tracking
- Profile onboarding and management
- Job posting import and parsing
- AI-tailored resume generation
- Cover letter generation
- Quality checks and readiness scores
- Application tracking

### Advisor Features
- Dashboard with student overview
- Application review and feedback
- Student management
- Quality monitoring

### Admin Features
- User management
- Platform settings
- System configuration

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 📝 License

This project is built for the IBM Hackathon.

## 🙏 Acknowledgments

- IBM Watson Orchestrate for AI agent integration
- Next.js and Vercel for the amazing platform
- The InternPath AI team

---

**Built with ❤️ for students seeking internships**
