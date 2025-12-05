// Demo mode data - all fake data for hackathon presentation

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

export interface DemoUser {
  id: string
  email: string
  password: string
  role: "student" | "advisor" | "admin"
  full_name: string
  profile?: any
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "student-1",
    email: "student@demo.local",
    password: "demo123",
    role: "student",
    full_name: "Alex Chen",
    profile: {
      program: "Computer Science",
      year_of_study: 3,
      major: "Computer Science",
      skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git"],
      preferences: {
        industries: ["Technology", "Fintech", "AI/ML"],
        locations: ["San Francisco", "New York", "Remote"],
        roles: ["Software Engineering Intern", "Full-Stack Developer Intern"],
      },
    },
  },
  {
    id: "advisor-1",
    email: "advisor@demo.local",
    password: "demo123",
    role: "advisor",
    full_name: "Dr. Sarah Johnson",
  },
  {
    id: "admin-1",
    email: "admin@demo.local",
    password: "demo123",
    role: "admin",
    full_name: "Admin User",
  },
]

export const DEMO_JOBS = [
  {
    id: "job-1",
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    original_description: `TechCorp is seeking a motivated Software Engineering Intern to join our team...`,
    parsed_json: {
      required_skills: ["Python", "Data Structures", "Algorithms", "Git"],
      preferred_skills: ["React", "Node.js", "AWS", "Docker"],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
        "Participate in code reviews",
      ],
      keywords: ["full-stack", "agile", "REST APIs", "testing"],
    },
  },
  {
    id: "job-2",
    title: "Frontend Developer Intern",
    company: "StartupXYZ",
    location: "Remote",
    original_description: `Join our fast-growing startup as a Frontend Developer Intern...`,
    parsed_json: {
      required_skills: ["JavaScript", "React", "CSS", "HTML"],
      preferred_skills: ["TypeScript", "Next.js", "Tailwind CSS"],
      responsibilities: [
        "Build responsive user interfaces",
        "Implement design mockups",
        "Optimize application performance",
      ],
      keywords: ["responsive", "mobile-first", "modern UI"],
    },
  },
]

export const DEMO_APPLICATIONS = [
  {
    id: "app-1",
    user_id: "student-1",
    job_posting_id: "job-1",
    resume_version_id: "resume-2",
    cover_letter_version_id: "cover-1",
    status: "ready_for_review",
    readiness_score: 85,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-2",
    user_id: "student-1",
    job_posting_id: "job-2",
    resume_version_id: "resume-3",
    cover_letter_version_id: null,
    status: "draft",
    readiness_score: 45,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const DEMO_RESUMES = [
  {
    id: "resume-1",
    user_id: "student-1",
    job_posting_id: null,
    title: "Base Resume",
    source: "base",
    raw_text: "Alex Chen Resume...",
    structured_json: {
      education: [
        {
          school: "University of California, Berkeley",
          degree: "Bachelor of Science in Computer Science",
          gpa: "3.7",
          dates: "2022 - 2026",
        },
      ],
      experience: [
        {
          title: "Teaching Assistant",
          company: "UC Berkeley",
          dates: "Jan 2024 - Present",
          bullets: [
            "Assisted professor in CS 61A course with 500+ students",
            "Held weekly office hours and graded assignments",
            "Mentored students on data structures and algorithms",
          ],
        },
      ],
      projects: [
        {
          name: "Task Manager App",
          dates: "Summer 2023",
          bullets: [
            "Built full-stack web app using React and Node.js",
            "Implemented user authentication with JWT",
            "Deployed to AWS with CI/CD pipeline",
          ],
        },
      ],
      skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git"],
    },
  },
  {
    id: "resume-2",
    user_id: "student-1",
    job_posting_id: "job-1",
    title: "TechCorp SWE Intern - Tailored",
    source: "tailored",
    raw_text: "Alex Chen Resume (Tailored for TechCorp)...",
    structured_json: {
      education: [
        {
          school: "University of California, Berkeley",
          degree: "Bachelor of Science in Computer Science",
          gpa: "3.7",
          dates: "2022 - 2026",
          relevant_coursework: "Data Structures, Algorithms, Software Engineering",
        },
      ],
      experience: [
        {
          title: "Teaching Assistant",
          company: "UC Berkeley",
          dates: "Jan 2024 - Present",
          bullets: [
            "Assisted professor in CS 61A course with 500+ students, focusing on Python and data structures",
            "Conducted code reviews and provided feedback on algorithmic problem-solving",
            "Mentored students on software engineering best practices and Git workflows",
          ],
        },
      ],
      projects: [
        {
          name: "Task Manager Full-Stack Application",
          dates: "Summer 2023",
          bullets: [
            "Engineered full-stack web application using React frontend and Node.js/Express backend",
            "Implemented RESTful API architecture with secure JWT authentication",
            "Deployed to AWS EC2 with automated CI/CD pipeline using GitHub Actions",
          ],
        },
      ],
      skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "AWS", "REST APIs"],
    },
  },
]

export const DEMO_COVER_LETTERS = [
  {
    id: "cover-1",
    user_id: "student-1",
    job_posting_id: "job-1",
    title: "TechCorp SWE Intern Cover Letter",
    raw_text: `Dear TechCorp Hiring Team,

I am writing to express my strong interest in the Software Engineering Intern position at TechCorp. As a third-year Computer Science student at UC Berkeley with a passion for full-stack development, I am excited about the opportunity to contribute to your innovative team.

Through my coursework and projects, I have developed strong proficiency in Python, JavaScript, and modern web technologies including React and Node.js. My experience as a Teaching Assistant for CS 61A has honed my ability to write clean, maintainable code and collaborate effectively with others. I regularly conduct code reviews and mentor students on algorithmic problem-solving and software engineering best practices.

My hands-on project experience demonstrates my ability to build production-ready applications. I recently developed a full-stack task management application using React and Node.js, implementing secure authentication and deploying it to AWS with a CI/CD pipeline. This project strengthened my understanding of REST APIs, cloud infrastructure, and DevOps practices—skills that align perfectly with TechCorp's technical requirements.

I am particularly drawn to TechCorp's commitment to cutting-edge technology and collaborative culture. I am eager to learn from your experienced engineers while contributing my skills in Python, web development, and problem-solving to meaningful projects.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to TechCorp's team.

Sincerely,
Alex Chen`,
  },
]

export const DEMO_QUALITY_CHECKS = [
  {
    id: "check-1",
    application_id: "app-1",
    summary: "Application is strong and ready for submission",
    checklist_json: {
      passed: [
        { item: "Grammar and spelling", status: "pass" },
        { item: "Consistent dates across documents", status: "pass" },
        { item: "Skills match job requirements", status: "pass" },
        { item: "Professional tone maintained", status: "pass" },
        { item: "Quantifiable achievements included", status: "pass" },
      ],
      warnings: [{ item: "Could add more specific metrics to project descriptions", status: "warning" }],
      failed: [],
    },
  },
]

export const DEMO_FEEDBACK = [
  {
    id: "feedback-1",
    advisor_id: "advisor-1",
    target_type: "resume",
    target_id: "resume-2",
    comment_text:
      'Excellent work tailoring your experience! Consider adding specific numbers to your TA role (e.g., "graded 50+ assignments weekly"). Also, quantify the impact of your task manager app if possible.',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

// In-memory state for demo mode
const demoState = {
  currentUser: null as DemoUser | null,
  applications: [...DEMO_APPLICATIONS],
  resumes: [...DEMO_RESUMES],
  coverLetters: [...DEMO_COVER_LETTERS],
  qualityChecks: [...DEMO_QUALITY_CHECKS],
  feedback: [...DEMO_FEEDBACK],
}

export const demoAuth = {
  login: (email: string, password: string) => {
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
    if (user) {
      demoState.currentUser = user
      // Store in sessionStorage for persistence across page loads
      if (typeof window !== "undefined") {
        sessionStorage.setItem("demo_user", JSON.stringify(user))
      }
      return user
    }
    return null
  },

  logout: () => {
    demoState.currentUser = null
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("demo_user")
    }
  },

  getCurrentUser: () => {
    if (demoState.currentUser) return demoState.currentUser

    // Try to restore from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("demo_user")
      if (stored) {
        demoState.currentUser = JSON.parse(stored)
        return demoState.currentUser
      }
    }
    return null
  },
}

export const demoApi = {
  getJobs: () => DEMO_JOBS,

  getJob: (id: string) => DEMO_JOBS.find((j) => j.id === id),

  getApplications: (userId?: string) => {
    if (userId) {
      return demoState.applications.filter((a) => a.user_id === userId)
    }
    return demoState.applications
  },

  getApplication: (id: string) => {
    return demoState.applications.find((a) => a.id === id)
  },

  getResume: (id: string) => {
    return demoState.resumes.find((r) => r.id === id)
  },

  getCoverLetter: (id: string) => {
    return demoState.coverLetters.find((c) => c.id === id)
  },

  getQualityCheck: (applicationId: string) => {
    return demoState.qualityChecks.find((q) => q.application_id === applicationId)
  },

  getFeedback: (targetId: string) => {
    return demoState.feedback.filter((f) => f.target_id === targetId)
  },

  generateTailoredResume: async (applicationId: string) => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return demoState.resumes.find((r) => r.source === "tailored")
  },

  generateCoverLetter: async (applicationId: string) => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return DEMO_COVER_LETTERS[0]
  },

  runQualityCheck: async (applicationId: string) => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return DEMO_QUALITY_CHECKS[0]
  },
}
