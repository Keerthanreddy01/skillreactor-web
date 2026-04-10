"use client"

import { useState, useRef, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import { Send, Bot, User, Zap, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "mentor"
  text: string
  timestamp: Date
}

function getMentorResponse(input: string, ctx: {
  goal: string | null
  skillLevel: string | null
  progress: number
  nextStep: string | null
  completedCount: number
}): string {
  const lower = input.toLowerCase().trim()

  // Intent matching
  if (lower.includes("what next") || lower.includes("what should i") || lower.includes("next step") || lower.includes("after this")) {
    if (ctx.nextStep) {
      return `Your next step is **${ctx.nextStep}**. Focus on this before moving on. Consistency beats speed — even 30–60 minutes per day adds up quickly. Do you want tips for learning it effectively?`
    }
    return "You've completed your entire roadmap — that's incredible! Consider building a capstone project to cement everything, then explore advanced specializations."
  }

  if (lower.includes("project") || lower.includes("portfolio") || lower.includes("build something")) {
    const projects: Record<string, string> = {
      "data-science": "Build a data analysis dashboard using a public dataset (Kaggle has great ones). For example, analyze Spotify song trends or COVID data with pandas and Plotly. Host it on Streamlit Cloud.",
      "machine-learning": "Train a custom image classifier or sentiment analyzer. Deploy it with a simple FastAPI endpoint so you can demo it live. Add it to GitHub with a detailed README.",
      "web-development": "Build a full-stack CRUD app — a task manager or blog with React + Node.js + PostgreSQL. Deploy frontend on Vercel and backend on Railway. This covers 90% of real job requirements.",
      "cloud-computing": "Deploy a 3-tier web app on AWS using EC2, RDS, and an ALB. Then recreate it with Terraform to practice IaC. Document the architecture diagram.",
      "cybersecurity": "Set up a home lab with VirtualBox: one attacker (Kali Linux) and one vulnerable machine (Metasploitable). Practice exploitation and document your findings as a report.",
    }
    return projects[ctx.goal ?? ""] ?? "Pick a small project that solves a real problem you have. The best portfolio projects are ones you actually use. Start small — a CRUD app or automation script is perfect."
  }

  if (lower.includes("help") || lower.includes("stuck") || lower.includes("struggling") || lower.includes("hard")) {
    return `It's totally normal to feel stuck! Here's what helps:\n\n1. **Break it down** — tackle one small concept at a time\n2. **Active learning** — code along while watching tutorials, don't just watch\n3. **Rubber duck it** — explain what you're trying to do out loud\n4. **Take breaks** — a 10-min walk often solves a 2-hour problem\n5. **Join communities** — Discord servers, Reddit, or Stack Overflow are gold\n\nWhat specifically are you struggling with? I can point you to the right resource.`
  }

  if (lower.includes("resource") || lower.includes("course") || lower.includes("book") || lower.includes("learn")) {
    const resources: Record<string, string> = {
      "data-science": "Top picks: **Kaggle Learn** (free, hands-on), **fast.ai** (practical deep learning), **StatQuest on YouTube** (stats made visual), and **'Python for Data Analysis'** by Wes McKinney.",
      "machine-learning": "Start with **Andrew Ng's ML Specialization on Coursera** — it's the gold standard. Then **fast.ai** for practical deep learning, and **Papers with Code** for staying current.",
      "web-development": "**The Odin Project** is a fantastic free curriculum. For React, **Epic React** by Kent C. Dodds is top tier. Use **MDN Web Docs** as your reference bible.",
      "cloud-computing": "**AWS Free Tier** is your playground. **A Cloud Guru** and **Stephane Maarek's courses on Udemy** are excellent. For certs, the **AWS Cloud Practitioner** is the right starting point.",
      "cybersecurity": "**TryHackMe** for beginners, **HackTheBox** when you're ready for challenges. **Professor Messer's CompTIA Security+** is free and great for fundamentals. OWASP WebGoat for web security.",
    }
    return resources[ctx.goal ?? ""] ?? "For any tech topic: official documentation is always the most reliable source. Supplement with YouTube, then practice on real projects."
  }

  if (lower.includes("how long") || lower.includes("timeline") || lower.includes("how much time")) {
    return `Based on your ${ctx.skillLevel ?? "current"} level and ${ctx.goal ? CAREER_GOALS[ctx.goal as keyof typeof CAREER_GOALS]?.label : "your"} goal, expect 3–6 months of consistent effort to be job-ready at a foundational level. You're at **${ctx.progress}% complete**. The key is consistency — 1–2 hours daily beats a weekend binge session every time.`
  }

  if (lower.includes("motivation") || lower.includes("give up") || lower.includes("tired") || lower.includes("burnout")) {
    return `Every expert was once a beginner. You've already completed **${ctx.completedCount} topic(s)** — that's real progress. Here's a reframe: you're not learning ${ctx.goal ?? "this"} to finish a roadmap, you're building a skill that will compound for the rest of your career. Take a day off if you need one, then come back. Momentum beats perfection.`
  }

  if (lower.includes("salary") || lower.includes("job") || lower.includes("career") || lower.includes("interview")) {
    const salaries: Record<string, string> = {
      "data-science": "Entry-level data scientists typically earn $85k–$110k in the US. Focus on SQL, Python, and storytelling with data. Kaggle competitions and a strong GitHub build credibility.",
      "machine-learning": "ML engineers average $110k–$150k at entry level. Demonstrating deployed models > academic projects. Open-source contributions to popular repos really stand out.",
      "web-development": "Entry-level web devs earn $60k–$90k. Fullstack engineers earn more. Build 3–4 strong portfolio projects and contribute to open source. Technical interviews focus on DSA + system design.",
      "cloud-computing": "Cloud engineers start at $90k–$120k. Certifications (AWS, GCP, Azure) + real project experience. Companies love candidates who can architect and automate.",
      "cybersecurity": "Security analysts start at $70k–$100k. Bug bounty experience is gold on a resume. CompTIA Security+ or CEH for early certifications. Practical labs beat theory in interviews.",
    }
    return salaries[ctx.goal ?? ""] ?? "Salaries vary widely by location and specialization. Focus on building a strong portfolio and contributing to open source — these signal skill better than certificates alone."
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greet")) {
    return `Hello! I'm your SkillReactor mentor. I'm here to guide you through your ${ctx.goal ? CAREER_GOALS[ctx.goal as keyof typeof CAREER_GOALS]?.label : "learning"} journey. You can ask me about your next step, project ideas, resources, career advice, or anything else. What's on your mind?`
  }

  // Default fallback with suggestions
  return `That's a great question! Here are some things I can help with:\n\n• **"what next"** — your next roadmap step\n• **"project ideas"** — portfolio project suggestions\n• **"help"** — tips when you're stuck\n• **"resources"** — best courses and books\n• **"how long"** — timeline expectations\n• **"job/career"** — salary and interview advice\n\nWhat would you like to explore?`
}

export function MentorPage() {
  const { roadmapSteps, completedSteps, profile, getProgressPercent } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "mentor",
      text: `Hello! I'm your AI mentor for ${profile.goal ? CAREER_GOALS[profile.goal]?.label : "your learning journey"}. I'm here to guide you, suggest projects, share resources, and keep you motivated. What can I help you with today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const progress = getProgressPercent()
  const completedCount = roadmapSteps.filter((s) => completedSteps[s.id]).length
  const nextStep = roadmapSteps.find((s) => !completedSteps[s.id])

  const send = () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    setTimeout(() => {
      const response = getMentorResponse(text, {
        goal: profile.goal,
        skillLevel: profile.skillLevel,
        progress,
        nextStep: nextStep?.title ?? null,
        completedCount,
      })
      const mentorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "mentor",
        text: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, mentorMsg])
      setLoading(false)
    }, 600 + Math.random() * 400)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const reset = () => {
    setMessages([{
      id: "welcome",
      role: "mentor",
      text: `Hello! I'm your AI mentor for ${profile.goal ? CAREER_GOALS[profile.goal]?.label : "your learning journey"}. I'm here to guide you, suggest projects, share resources, and keep you motivated. What can I help you with today?`,
      timestamp: new Date(),
    }])
  }

  const SUGGESTIONS = ["What's my next step?", "Suggest a project idea", "I need help", "Best resources?"]

  // Parse simple markdown-ish: **bold** and \n\n for paragraphs
  const renderText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      return (
        <span key={i}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto" style={{ maxHeight: "calc(100vh - 6rem)" }}>
      {/* Chat header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 glass rounded-t-2xl mb-0"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">AI Mentor</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Online · Always here</span>
            </div>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          New chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 glass rounded-none"
        style={{ minHeight: 0 }}>
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={
                  msg.role === "mentor"
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { background: "var(--secondary)", color: "var(--secondary-foreground)" }
                }
              >
                {msg.role === "mentor" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              {/* Bubble with typing animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm"
                    : "rounded-tl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }
                }
              >
                {renderText(msg.text)}
                <p className="text-xs mt-1.5 opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator with enhanced animation */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--muted-foreground)",
                      }}
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Suggestions with animations */}
      <AnimatePresence>
        {messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-shrink-0 px-4 py-2 glass flex gap-2 overflow-x-auto"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {SUGGESTIONS.map((s, idx) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setInput(s); inputRef.current?.focus() }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors hover:border-primary/50 hover:text-foreground text-muted-foreground"
                style={{ background: "var(--muted)", borderColor: "var(--border)" }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="flex-shrink-0 flex gap-2 p-3 glass rounded-b-2xl"
        style={{ borderTop: "1px solid var(--border)" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask your mentor anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        <motion.button
          onClick={send}
          disabled={!input.trim() || loading}
          whileHover={{ scale: !input.trim() || loading ? 1 : 1.05 }}
          whileTap={{ scale: !input.trim() || loading ? 1 : 0.95 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
