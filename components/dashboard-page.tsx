"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS, getWeeklyPlan } from "@/lib/roadmap-data"
import {
  BarChart2, Brain, Code2, Cloud, Shield,
  TrendingUp, CheckCircle2, Clock, BookOpen,
  ArrowRight, Map, CalendarDays, MessageSquare,
  Zap, Flame, Target, Sparkles, AlertCircle,
  Star, ChevronRight, Activity, Lightbulb, Rocket,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Page } from "@/lib/app-context"

const GOAL_ICONS: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="w-5 h-5" />,
  Brain:     <Brain     className="w-5 h-5" />,
  Code2:     <Code2     className="w-5 h-5" />,
  Cloud:     <Cloud     className="w-5 h-5" />,
  Shield:    <Shield    className="w-5 h-5" />,
}

const GOAL_COLORS: Record<string, string> = {
  "data-science":       "#0066ff",
  "machine-learning":   "#a855f7",
  "web-development":    "#10b981",
  "cloud-computing":    "#f59e0b",
  "cybersecurity":      "#ef4444",
}

const MENTOR_TIPS: Record<string, string> = {
  "data-science":     "Try building a mini EDA project on a Kaggle dataset to solidify your Python and Pandas skills.",
  "machine-learning": "Implement a simple neural network from scratch before using frameworks — it builds real intuition.",
  "web-development":  "Build a small clone of a real app (Trello, Twitter) — it forces you to solve authentic problems.",
  "cloud-computing":  "Deploy a side project on AWS Free Tier today. Hands-on practice beats reading docs every time.",
  "cybersecurity":    "Spend 30 minutes on TryHackMe daily. Consistency beats intensity in security skill-building.",
}

// ── Circular progress ring ────────────────────────────────────────────────────
function CircleProgress({ pct, size = 120, stroke = 8, color = "#0066ff" }: {
  pct: number; size?: number; stroke?: number; color?: string
}) {
  const r   = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        opacity={0.15}
        animate={{ strokeDashoffset: [circ - dash, circ - dash - 10, circ - dash] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
      />
    </svg>
  )
}

// ── Animated dots for streak ────────────────────────────────────────────────────
function StreakDots({ count }: { count: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full ${i < count ? "bg-orange-500" : "bg-gray-200"}`}
          animate={i < count ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// ── Mini SVG journey path preview ─────────────────────────────────────────────
function JourneyPreview({ steps, completed }: { steps: any[]; completed: Record<string, boolean> }) {
  const visibleSteps = steps.slice(0, 5)
  return (
    <svg width="100%" height="60" className="overflow-visible">
      {/* Connecting line */}
      <line x1="10" y1="30" x2="90%" y2="30" stroke="#e5e7eb" strokeWidth="2" />
      
      {/* Completed line */}
      <motion.line
        x1="10" y1="30"
        x2={10 + (visibleSteps.filter(s => completed[s.id]).length / visibleSteps.length) * (window.innerWidth * 0.9 - 20)}
        y1="30" y2="30"
        stroke="#0066ff"
        strokeWidth="2"
        initial={{ x2: 10 }}
        animate={{ x2: 10 + (visibleSteps.filter(s => completed[s.id]).length / visibleSteps.length) * (window.innerWidth * 0.9 - 20) }}
        transition={{ duration: 1 }}
      />
      
      {/* Nodes */}
      {visibleSteps.map((step, idx) => {
        const isCompleted = completed[step.id]
        const x = 10 + (idx / (visibleSteps.length - 1)) * (window.innerWidth * 0.9 - 20)
        return (
          <motion.g key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <motion.circle cx={x} cy="30" r="6" fill={isCompleted ? "#0066ff" : "#9ca3af"} />
            {isCompleted && (
              <motion.circle cx={x} cy="30" r="6" fill="none" stroke="#0066ff" strokeWidth="2"
                animate={{ r: [6, 10, 6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}

export function DashboardPage() {
  const {
    user, profile, roadmapSteps, completedSteps,
    getProgressPercent, setCurrentPage,
  } = useApp()

  const progress = getProgressPercent()
  const totalSteps = roadmapSteps.length
  const completed = roadmapSteps.filter((s) => completedSteps[s.id]).length
  const remaining = totalSteps - completed
  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null
  const goalColor = profile.goal ? GOAL_COLORS[profile.goal] ?? "#0066ff" : "#0066ff"

  const nextStep = roadmapSteps.find((s) => !completedSteps[s.id])
  const upcomingSteps = roadmapSteps.filter((s) => !completedSteps[s.id]).slice(0, 4)
  const streak = Math.max(1, Math.floor(progress / 8) + 1)

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
        style={{ background: `linear-gradient(135deg, ${goalColor}15 0%, ${goalColor}05 50%, transparent 100%)` }}
      >
        {/* Animated blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: goalColor }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-2xl opacity-15"
          style={{ background: goalColor }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-500 mb-2">{greeting},</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {user?.name?.split(" ")[0] ?? "there"}
              </h1>
              
              {goalInfo && (
                <div className="flex flex-wrap gap-3 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: goalColor + "20", border: `2px solid ${goalColor}40` }}
                  >
                    <span style={{ color: goalColor }}>{GOAL_ICONS[goalInfo.icon]}</span>
                    <span className="font-bold text-gray-900">{goalInfo.label}</span>
                  </motion.div>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{profile.hoursPerWeek}h/week</span>
                  </div>
                </div>
              )}

              <p className="text-gray-600 text-lg max-w-md mb-6">
                You're {progress}% through your learning journey. Keep up the momentum!
              </p>

              {nextStep && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 12px 24px ${goalColor}30` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage("journey")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${goalColor}, ${goalColor}cc)` }}
                >
                  <Rocket className="w-4 h-4" />
                  View Learning Journey
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Right content - Animated progress circle */}
            {totalSteps > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex-shrink-0"
              >
                <CircleProgress pct={progress} size={140} stroke={8} color={goalColor} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black" style={{ color: goalColor }}>{progress}%</span>
                  <span className="text-xs font-medium text-gray-500 mt-1">Complete</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── MINI JOURNEY PREVIEW ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" style={{ color: goalColor }} />
          <h3 className="font-bold text-gray-900">Learning Path</h3>
          <span className="ml-auto text-sm font-medium text-gray-500">{completed} / {totalSteps} topics</span>
        </div>
        <JourneyPreview steps={roadmapSteps} completed={completedSteps} />
      </motion.div>

      {/* ── STATS GRID ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { 
            label: "Completed", 
            value: completed, 
            sub: "topics mastered", 
            icon: <CheckCircle2 className="w-5 h-5" />,
            gradient: `linear-gradient(135deg, ${goalColor}20, ${goalColor}05)`,
            color: goalColor
          },
          { 
            label: "In Progress", 
            value: Math.min(3, remaining), 
            sub: "active topics", 
            icon: <Activity className="w-5 h-5" />,
            gradient: "linear-gradient(135deg, #3b82f620, #3b82f605)",
            color: "#3b82f6"
          },
          { 
            label: "Streak", 
            value: `${streak}d`, 
            sub: "keep it up", 
            icon: <Flame className="w-5 h-5" />,
            gradient: "linear-gradient(135deg, #f5970b20, #f5970b05)",
            color: "#f59e0b"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl p-6 border border-gray-100 shadow-sm group cursor-default"
            style={{ background: stat.gradient }}
          >
            <div className="flex items-start justify-between mb-4">
              <div style={{ color: stat.color }} className="p-3 rounded-xl" style={{ background: stat.color + "15" }}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full text-gray-500 bg-white border border-gray-200">
                +{Math.floor(Math.random() * 3) + 1}% this week
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── UPCOMING TASKS (Horizontal Scroll) ────────────────────────────────── */}
      {upcomingSteps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Next Steps</h3>
              <p className="text-sm text-gray-500 mt-1">Stay on track with your learning</p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {upcomingSteps.map((step, i) => {
              const colors = [
                { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
                { bg: "#fce7f3", border: "#ec4899", text: "#831843" },
                { bg: "#dcfce7", border: "#22c55e", text: "#166534" },
                { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
              ]
              const colorScheme = colors[i % colors.length]

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                  className="flex-shrink-0 w-72 p-5 rounded-2xl border-2 shadow-sm cursor-pointer transition-all"
                  style={{ 
                    background: colorScheme.bg,
                    borderColor: colorScheme.border,
                    transform: `skewY(-1deg) rotate(${i % 2 === 0 ? -1 : 1}deg)`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: colorScheme.border }}>
                      Week {step.week}
                    </span>
                    <Clock className="w-4 h-4" style={{ color: colorScheme.text }} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{step.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: colorScheme.text }} className="font-semibold">{step.duration}</span>
                    <ArrowRight className="w-4 h-4" style={{ color: colorScheme.border }} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ── SMART INSIGHTS ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Insights Card */}
        <div className="rounded-2xl p-6 border border-gray-100 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${goalColor}10, ${goalColor}05)` }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5" style={{ color: goalColor }} />
            <h3 className="font-bold text-gray-900">Smart Insight</h3>
          </div>
          
          {nextStep ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                You're making excellent progress! Based on your pace, you'll complete this course in <span className="font-bold text-gray-900">{Math.ceil((remaining * 7) / (profile.hoursPerWeek || 5))} weeks</span>.
              </p>
              <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700">💡 Pro Tip</p>
                <p className="text-xs text-gray-600 mt-2">{MENTOR_TIPS[profile.goal ?? "web-development"]}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p className="font-bold text-gray-900">Roadmap Complete!</p>
              <p className="text-xs text-gray-500">Amazing work mastering all topics.</p>
            </div>
          )}
        </div>

        {/* Streak Tracker */}
        <div className="rounded-2xl p-6 border border-gray-100 shadow-sm bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">Streak Tracker</h3>
          </div>
          
          <div className="mb-6">
            <p className="text-xs text-gray-500 font-medium mb-3">Your activity</p>
            <StreakDots count={Math.min(streak, 7)} />
          </div>

          <div className="text-center py-4 rounded-xl bg-white/60 border border-gray-200">
            <p className="text-3xl font-black text-orange-500 mb-1">{streak}</p>
            <p className="text-sm font-bold text-gray-900">Day Streak</p>
            <p className="text-xs text-gray-500 mt-1">
              {streak >= 5 ? "🔥 You're on fire!" : "Keep going strong!"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
