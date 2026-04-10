"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS, getWeeklyPlan } from "@/lib/roadmap-data"
import {
  BarChart2, Brain, Code2, Cloud, Shield,
  TrendingUp, CheckCircle2, Clock, BookOpen,
  ArrowRight, Map, CalendarDays, MessageSquare,
  Zap, Flame, Target, Sparkles, AlertCircle,
  Star, ChevronRight, Activity, Lightbulb, Rocket,
  Play, Video, FileText, X
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

// ── Circular progress ring (matching Journey) ─────────────────────────────────
function CircleProgress({ pct, size = 120, stroke = 8, color = "#0066ff" }: {
  pct: number; size?: number; stroke?: number; color?: string
}) {
  const r = (size - stroke) / 2
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

// ── Animated Streak Dots (matching Journey) ───────────────────────────────────
function StreakDots({ count }: { count: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full ${i < count ? "bg-yellow-400" : "bg-gray-200"}`}
          animate={i < count ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// ── Objective Card (matching Journey style) ───────────────────────────────────
function ObjectiveCard({ 
  title, 
  week,
  duration,
  isCompleted, 
  isCurrent,
  colorScheme,
  onClick 
}: { 
  title: string
  week: number
  duration: string
  isCompleted: boolean
  isCurrent: boolean
  colorScheme: "dark" | "light" | "purple" | "yellow" | "green"
  onClick: () => void
}) {
  const schemes = {
    dark: { bg: "bg-gray-900", text: "text-white", subtext: "text-gray-400", border: "border-gray-800" },
    light: { bg: "bg-white", text: "text-gray-800", subtext: "text-gray-500", border: "border-gray-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-900", subtext: "text-purple-600", border: "border-purple-200" },
    yellow: { bg: "bg-amber-100", text: "text-amber-900", subtext: "text-amber-600", border: "border-amber-200" },
    green: { bg: "bg-emerald-100", text: "text-emerald-900", subtext: "text-emerald-600", border: "border-emerald-200" },
  }
  
  const scheme = schemes[colorScheme]

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative ${scheme.bg} ${scheme.border} border-2 rounded-3xl p-5 text-left transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[220px] flex-shrink-0`}
    >
      {isCurrent && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          colorScheme === "dark" ? "bg-white/10 text-white" : "bg-gray-900 text-white"
        }`}>
          Week {week}
        </span>
        <Clock className={`w-4 h-4 ${scheme.subtext}`} />
      </div>
      
      <p className={`${scheme.text} font-bold text-sm line-clamp-2 mb-2`}>
        {isCompleted && <span className="line-through opacity-70">{title}</span>}
        {!isCompleted && title}
      </p>
      <p className={`${scheme.subtext} text-xs mb-4`}>{duration}</p>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${scheme.subtext}`}>
          {isCurrent ? "current" : isCompleted ? "done" : "upcoming"}
        </span>
        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted 
            ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/30" 
            : `${scheme.border}`
        }`}>
          {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>
    </motion.button>
  )
}

// ── Practical Skill Card (matching Journey) ───────────────────────────────────
function PracticalCard({ 
  title, 
  subtitle,
  color,
  isCompleted,
  onClick
}: {
  title: string
  subtitle: string
  color: "purple" | "gray" | "yellow" | "blue" | "green"
  isCompleted: boolean
  onClick: () => void
}) {
  const colors = {
    purple: { bg: "bg-gradient-to-br from-purple-400 to-purple-600", icon: "bg-purple-300" },
    gray: { bg: "bg-gradient-to-br from-gray-400 to-gray-600", icon: "bg-gray-300" },
    yellow: { bg: "bg-gradient-to-br from-amber-300 to-amber-500", icon: "bg-amber-200" },
    blue: { bg: "bg-gradient-to-br from-blue-400 to-blue-600", icon: "bg-blue-300" },
    green: { bg: "bg-gradient-to-br from-emerald-400 to-emerald-600", icon: "bg-emerald-300" },
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
    >
      <div className={`${colors[color].bg} rounded-3xl p-5 w-40 h-44 flex flex-col justify-between shadow-2xl relative overflow-hidden`}>
        {/* Decorative shapes */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-8 -left-4 w-16 h-16 bg-white/10 rounded-full" />
        
        <div className={`w-10 h-10 ${colors[color].icon} rounded-xl flex items-center justify-center shadow-lg`}>
          <FileText className="w-5 h-5 text-gray-700" />
        </div>
        
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </motion.div>
        )}
        
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-400/30">
          <ArrowRight className="w-4 h-4 text-gray-800" />
        </div>
      </div>
      
      <div className="mt-3 px-1">
        <p className="text-gray-800 font-bold text-sm line-clamp-2">{title}</p>
        <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
      </div>
    </motion.button>
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
  const goalInfo = profile.goal && typeof profile.goal === 'string' && !profile.goal.startsWith('custom_') 
    ? CAREER_GOALS[profile.goal as keyof typeof CAREER_GOALS] 
    : null
  const goalColor = profile.goal && typeof profile.goal === 'string' ? GOAL_COLORS[profile.goal] ?? "#0066ff" : "#0066ff"

  const nextStep = roadmapSteps.find((s) => !completedSteps[s.id])
  const upcomingSteps = roadmapSteps.filter((s) => !completedSteps[s.id]).slice(0, 4)
  const completedStepsList = roadmapSteps.filter((s) => completedSteps[s.id]).slice(-3)
  const streak = Math.max(1, Math.floor(progress / 8) + 1)
  const currentWeek = nextStep?.week ?? 1

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  const colorSchemes: Array<"dark" | "purple" | "yellow" | "green"> = ["dark", "purple", "yellow", "green"]
  const practicalColors: Array<"purple" | "gray" | "yellow" | "blue" | "green"> = ["purple", "blue", "yellow", "green", "gray"]

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-12 px-4">
      
      {/* ── LEVEL HEADER (matching Journey) ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{greeting},</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Level <span className="text-gray-400">0{Math.min(Math.floor(progress / 20) + 1, 5)}:</span>{" "}
            <span className="font-serif italic">{
              progress < 20 ? "Foundations" :
              progress < 40 ? "Building" :
              progress < 60 ? "Advancing" :
              progress < 80 ? "Mastering" : "Expert"
            }</span>
          </h1>
        </div>

        {/* Session notification (matching Journey) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 rounded-2xl p-4 shadow-2xl"
        >
          <p className="text-gray-400 text-xs mb-1">your next session</p>
          <p className="text-white font-bold text-sm mb-2">
            {nextStep?.title ?? "All Complete!"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">Week {currentWeek}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("journey")}
              className="px-4 py-1.5 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold shadow-lg shadow-yellow-400/30"
            >
              start now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── HERO CARD (glassmorphism, matching Journey) ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-2xl"
      >
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: `linear-gradient(135deg, ${goalColor}, #a855f7)` }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: `linear-gradient(135deg, #f59e0b, ${goalColor})` }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1">
              {goalInfo && (
                <div className="flex flex-wrap gap-3 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                    style={{ background: goalColor, color: "white" }}
                  >
                    {GOAL_ICONS[goalInfo.icon]}
                    <span className="font-bold text-sm">{goalInfo.label}</span>
                  </motion.div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-lg">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-bold text-gray-700">{profile.hoursPerWeek}h/week</span>
                  </div>
                </div>
              )}

              <p className="text-gray-600 text-lg max-w-lg mb-6">
                You&apos;re <span className="font-bold text-gray-900">{progress}%</span> through your learning journey.
                {progress < 50 ? " Keep building momentum!" : " Amazing progress!"}
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${goalColor}40` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("journey")}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-bold shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${goalColor}, ${goalColor}cc)` }}
              >
                <Rocket className="w-5 h-5" />
                View Learning Journey
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Progress Circle with glow */}
            {totalSteps > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex-shrink-0"
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 blur-2xl opacity-40 rounded-full"
                  style={{ background: goalColor }}
                />
                <div className="relative">
                  <CircleProgress pct={progress} size={160} stroke={10} color={goalColor} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black" style={{ color: goalColor }}>{progress}%</span>
                    <span className="text-xs font-bold text-gray-500 mt-1">Complete</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── CURRENT OBJECTIVES (matching Journey) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">current objectives</h3>
            <p className="text-sm text-gray-500">to complete</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentPage("roadmap")}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {upcomingSteps.map((step, i) => (
            <ObjectiveCard
              key={step.id}
              title={step.title}
              week={step.week}
              duration={step.duration}
              isCompleted={false}
              isCurrent={i === 0}
              colorScheme={colorSchemes[i % colorSchemes.length]}
              onClick={() => setCurrentPage("journey")}
            />
          ))}
        </div>
      </motion.div>

      {/* ── PRACTICAL SKILLS (colorful cards matching Journey) ────────────────── */}
      {completedStepsList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-1">practical</h3>
          <p className="text-sm text-gray-500 mb-4">skills mastered</p>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {completedStepsList.map((step, i) => (
              <PracticalCard
                key={step.id}
                title={step.title}
                subtitle={`Week ${step.week}`}
                color={practicalColors[i % practicalColors.length]}
                isCompleted={true}
                onClick={() => setCurrentPage("roadmap")}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* ── STATS GRID (matching Journey shadows/rounded) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { 
            label: "Completed", 
            value: completed, 
            sub: "topics done", 
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "#10b981"
          },
          { 
            label: "Remaining", 
            value: remaining, 
            sub: "topics left", 
            icon: <Target className="w-5 h-5" />,
            color: "#3b82f6"
          },
          { 
            label: "Progress", 
            value: `${progress}%`, 
            sub: "completion", 
            icon: <TrendingUp className="w-5 h-5" />,
            color: goalColor
          },
          { 
            label: "Streak", 
            value: `${streak}d`, 
            sub: "days active", 
            icon: <Flame className="w-5 h-5" />,
            color: "#f59e0b"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl hover:shadow-2xl transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: stat.color + "20", color: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── SMART INSIGHTS + STREAK (matching Journey) ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* AI Insights Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900">Smart Insights</h3>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Next topic</p>
              <p className="font-bold text-gray-900">{nextStep?.title ?? "All Complete!"}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3 h-3" />
              {Math.ceil((remaining * 7) / (profile.hoursPerWeek || 5))} weeks
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Roadmap completion</span>
              <span className="font-bold" style={{ color: goalColor }}>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: goalColor }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-sm text-blue-800">
              {MENTOR_TIPS[profile.goal as string ?? "web-development"]}
            </p>
          </div>
        </div>

        {/* Streak Tracker (matching Journey) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900">Learning Streak</h3>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl font-black text-amber-500">{streak}</span>
            <div>
              <p className="font-bold text-gray-900">days streak</p>
              <p className="text-sm text-gray-500">Keep the momentum!</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500 font-medium mb-3">Last 7 days activity</p>
            <StreakDots count={Math.min(streak, 7)} />
          </div>
          
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-sm text-emerald-800">
              {streak >= 5 
                ? "You're doing great, keep the consistency going!" 
                : "Build your streak by learning daily!"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
