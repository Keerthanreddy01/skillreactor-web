"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS, getWeeklyPlan } from "@/lib/roadmap-data"
import {
  BarChart2, Brain, Code2, Cloud, Shield,
  TrendingUp, CheckCircle2, Clock, BookOpen,
  ArrowRight, Map, CalendarDays, MessageSquare,
  Zap, Flame, Target, Sparkles, RotateCcw,
  AlertCircle, Star, ChevronRight, Activity,
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
function CircleProgress({ pct, size = 80, stroke = 7, color = "#0066ff" }: {
  pct: number; size?: number; stroke?: number; color?: string
}) {
  const r   = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  )
}

// ── Mini bar sparkline ────────────────────────────────────────────────────────
function Sparkline({ values, color = "#0066ff" }: { values: number[]; color?: string }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex items-end gap-0.5 h-8">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
          style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.3 + (v / max) * 0.7, transformOrigin: "bottom" }}
        />
      ))}
    </div>
  )
}

// ── Section wrapper with fade-up ─────────────────────────────────────────────
function Section({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Card base ────────────────────────────────────────────────────────────────
function Card({ children, className = "", hover = true }: {
  children: React.ReactNode; className?: string; hover?: boolean
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${
        hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function DashboardPage() {
  const {
    user, profile, roadmapSteps, completedSteps,
    getProgressPercent, setCurrentPage,
  } = useApp()

  const progress   = getProgressPercent()
  const totalSteps = roadmapSteps.length
  const completed  = roadmapSteps.filter((s) => completedSteps[s.id]).length
  const remaining  = totalSteps - completed
  const goalInfo   = profile.goal ? CAREER_GOALS[profile.goal] : null
  const goalColor  = profile.goal ? GOAL_COLORS[profile.goal] ?? "#0066ff" : "#0066ff"

  const nextStep   = roadmapSteps.find((s) => !completedSteps[s.id])
  const recentDone = roadmapSteps.filter((s) => completedSteps[s.id]).slice(-3).reverse()
  const streak     = Math.max(1, Math.floor(progress / 8) + 1)

  // Weekly planner data — current focus week tasks
  const weeklyPlan      = getWeeklyPlan(roadmapSteps)
  const weeks           = Object.keys(weeklyPlan).map(Number).sort((a, b) => a - b)
  const currentWeekNum  = weeks.find((w) => weeklyPlan[w].some((s) => !completedSteps[s.id])) ?? weeks[0]
  const currentWeekTasks = currentWeekNum ? weeklyPlan[currentWeekNum] ?? [] : []
  const weekDone        = currentWeekTasks.filter((s) => completedSteps[s.id]).length
  const weekPct         = currentWeekTasks.length ? Math.round((weekDone / currentWeekTasks.length) * 100) : 0

  // Missed tasks (tasks in past weeks not yet completed)
  const hasMissed = weeks
    .filter((w) => w < (currentWeekNum ?? 99))
    .some((w) => weeklyPlan[w].some((s) => !completedSteps[s.id]))

  // Sparkline: simulate last-7-days activity from completed steps spread
  const sparkValues = [2, 4, 3, 6, 5, completed % 6 + 1, completed % 4 + 2]

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  const mentorTip = profile.goal ? MENTOR_TIPS[profile.goal] : "Set a goal to get personalised guidance."

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto pb-8">

      {/* ── Missed tasks alert ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {hasMissed && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">You missed some tasks from previous weeks.</p>
              <p className="text-xs text-amber-700 mt-0.5">{"We've adjusted your schedule — catch up when you can."}</p>
            </div>
            <button
              onClick={() => setCurrentPage("planner")}
              className="text-xs font-bold text-amber-700 hover:underline flex-shrink-0"
            >
              View Plan
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Welcome hero ────────────────────────────────────────────────────── */}
      <Section delay={0}>
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${goalColor}18 0%, ${goalColor}08 60%, #f8f9ff 100%)` }}
        >
          {/* Glow blob */}
          <div
            className="absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: goalColor }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{greeting}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Welcome back, <span style={{ color: goalColor }}>{user?.name?.split(" ")[0] ?? "there"}</span>
                </h2>
                {goalInfo && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ background: goalColor + "18", borderColor: goalColor + "40", color: goalColor }}
                    >
                      {GOAL_ICONS[goalInfo.icon]}
                      {goalInfo.label}
                    </span>
                    <span className="text-gray-400 text-xs capitalize">{profile.skillLevel} track</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {profile.hoursPerWeek}h/week
                    </span>
                  </div>
                )}
              </div>
              {/* Circular progress */}
              {totalSteps > 0 && (
                <div className="relative flex-shrink-0">
                  <CircleProgress pct={progress} size={76} stroke={6} color={goalColor} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-gray-800">{progress}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {totalSteps > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-500 font-medium">Overall Progress</span>
                  <span className="font-bold" style={{ color: goalColor }}>{completed} / {totalSteps} topics</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${goalColor}, ${goalColor}99)` }}
                  />
                </div>
              </div>
            )}

            {/* Continue Learning CTA */}
            {nextStep && (
              <motion.button
                onClick={() => setCurrentPage("roadmap")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-all"
                style={{ background: `linear-gradient(135deg, ${goalColor}, ${goalColor}cc)` }}
              >
                <Zap className="w-4 h-4" />
                Continue Learning
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </Section>

      {/* ── Stat cards row ──────────────────────────────────────────────────── */}
      <Section delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Completed",  value: completed,      sub: "topics done",    icon: <CheckCircle2 className="w-4 h-4" />, color: goalColor },
            { label: "Remaining",  value: remaining,      sub: "topics to go",   icon: <Target className="w-4 h-4" />,       color: "#6b7280" },
            { label: "Progress",   value: `${progress}%`, sub: "completion",     icon: <TrendingUp className="w-4 h-4" />,   color: progress >= 75 ? "#10b981" : goalColor },
            { label: "Streak",     value: `${streak}d`,   sub: "days active",    icon: <Flame className="w-4 h-4" />,        color: "#f97316" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1 cursor-default"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-500 text-xs font-medium">{s.label}</p>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-gray-400 text-xs">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Smart Insights + Streak row ─────────────────────────────────────── */}
      <Section delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Smart Insights */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: goalColor + "18" }}>
                <Sparkles className="w-4 h-4" style={{ color: goalColor }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Smart Insights</h3>
            </div>

            {nextStep ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Next topic</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{nextStep.title}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {nextStep.duration}
                  </span>
                </div>

                {/* Completion % */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Roadmap completion</span>
                    <span className="font-bold" style={{ color: goalColor }}>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: goalColor }}
                    />
                  </div>
                </div>

                <div
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ background: goalColor + "12", color: goalColor }}
                >
                  {progress === 0
                    ? `Ready to start? First up: ${nextStep.title}. Let's go!`
                    : `You're ${progress}% done. Next: ${nextStep.title}. Keep going!`}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <p className="text-sm font-bold text-gray-800">All topics completed!</p>
                <p className="text-xs text-gray-500 text-center">Outstanding work. You have mastered your roadmap.</p>
              </div>
            )}
          </Card>

          {/* Streak Tracker */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-orange-50">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Learning Streak</h3>
            </div>

            <div className="flex items-end gap-4 mb-4">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-5xl font-black text-orange-500 leading-none"
              >
                {streak}
              </motion.div>
              <div className="pb-1">
                <p className="text-base font-bold text-gray-800">days streak</p>
                <p className="text-xs text-gray-500">Keep the momentum!</p>
              </div>
            </div>

            {/* 7-day activity sparkline */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 font-medium mb-2">Last 7 days activity</p>
              <Sparkline values={sparkValues} color={goalColor} />
            </div>

            <p className="text-xs font-semibold rounded-xl px-3 py-2.5 bg-orange-50 text-orange-700">
              {streak >= 5
                ? "You're on fire! Consistency is your superpower."
                : "You're doing great, keep the consistency going!"}
            </p>
          </Card>
        </div>
      </Section>

      {/* ── Up Next topic ───────────────────────────────────────────────────── */}
      {nextStep && (
        <Section delay={0.3}>
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: goalColor + "18" }}>
                <Target className="w-4 h-4" style={{ color: goalColor }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Up Next</h3>
              <span
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: goalColor + "15", color: goalColor }}
              >
                Current Focus
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-1">{nextStep.title}</h4>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{nextStep.description}</p>

                {/* Resources */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {nextStep.resources.slice(0, 3).map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      {r}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Duration</p>
                    <p className="text-sm font-bold text-gray-800">{nextStep.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Week</p>
                    <p className="text-sm font-bold text-gray-800">Week {nextStep.week}</p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => setCurrentPage("roadmap")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white shadow-md"
                style={{ background: `linear-gradient(135deg, ${goalColor}, ${goalColor}cc)` }}
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </Card>
        </Section>
      )}

      {/* ── Weekly Planner Preview + Progress Analytics row ─────────────────── */}
      <Section delay={0.35}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Weekly Planner Preview */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-indigo-50">
                <CalendarDays className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Week {currentWeekNum} Plan</h3>
              <span className="ml-auto text-xs text-gray-400">{weekDone}/{currentWeekTasks.length} done</span>
            </div>

            {/* Week progress bar */}
            <div className="mb-4 mt-3">
              <div className="h-1.5 rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${weekPct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  className="h-full rounded-full bg-indigo-500"
                />
              </div>
              <p className="text-xs text-indigo-600 font-medium mt-1">{weekPct}% of this week complete</p>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {currentWeekTasks.slice(0, 3).map((task) => {
                const done = !!completedSteps[task.id]
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                      done
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {done
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      }
                    </div>
                    <p className={`flex-1 font-medium truncate ${done ? "text-emerald-700 line-through" : "text-gray-800"}`}>
                      {task.title}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{task.duration}</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage("planner")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              View Full Planner
              <ChevronRight className="w-4 h-4" />
            </button>
          </Card>

          {/* Progress Analytics */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: goalColor + "18" }}>
                <Activity className="w-4 h-4" style={{ color: goalColor }} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Progress Analytics</h3>
            </div>

            {/* Big circle */}
            <div className="flex items-center gap-5 mb-5">
              <div className="relative flex-shrink-0">
                <CircleProgress pct={progress} size={88} stroke={8} color={goalColor} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-800">{progress}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Completed</span>
                  <span className="text-sm font-bold text-emerald-600">{completed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Remaining</span>
                  <span className="text-sm font-bold text-gray-700">{remaining}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Total</span>
                  <span className="text-sm font-bold text-gray-700">{totalSteps}</span>
                </div>
              </div>
            </div>

            {/* Weekly mini chart */}
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">Weekly progress</p>
              <Sparkline values={sparkValues} color={goalColor} />
            </div>
          </Card>
        </div>
      </Section>

      {/* ── Mentor Suggestion + Recent Activity row ─────────────────────────── */}
      <Section delay={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* AI Mentor Suggestion */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-purple-50">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">AI Mentor Suggestion</h3>
              <span className="ml-auto flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                <Star className="w-3 h-3" />
                Pro tip
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">{`"${mentorTip}"`}</p>

            <button
              onClick={() => setCurrentPage("mentor")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              Ask Mentor
              <ArrowRight className="w-4 h-4" />
            </button>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-50">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Recent Completions</h3>
            </div>

            {recentDone.length > 0 ? (
              <div className="flex flex-col gap-2">
                {recentDone.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{s.title}</p>
                      <p className="text-xs text-gray-500">{s.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                <BookOpen className="w-7 h-7 text-gray-300" />
                <p className="text-sm text-gray-500">No completions yet.</p>
                <p className="text-xs text-gray-400">Start your first topic to see it here.</p>
              </div>
            )}
          </Card>
        </div>
      </Section>

      {/* ── Quick Actions ───────────────────────────────────────────────────── */}
      <Section delay={0.45}>
        <h3 className="text-gray-800 font-bold text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: <RotateCcw className="w-5 h-5" />,
              label: "New Roadmap",
              desc: "Switch your career goal",
              page: "goal-select" as Page,
              color: "#6b7280",
              bg: "#f3f4f6",
            },
            {
              icon: <Zap className="w-5 h-5" />,
              label: "Continue",
              desc: "Pick up where you left off",
              page: "roadmap" as Page,
              color: goalColor,
              bg: goalColor + "12",
            },
            {
              icon: <MessageSquare className="w-5 h-5" />,
              label: "Ask Mentor",
              desc: "Get personalised tips",
              page: "mentor" as Page,
              color: "#a855f7",
              bg: "#f5f3ff",
            },
            {
              icon: <Activity className="w-5 h-5" />,
              label: "View Progress",
              desc: "See your full analytics",
              page: "progress" as Page,
              color: "#10b981",
              bg: "#ecfdf5",
            },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage(action.page)}
              className="flex flex-col items-start gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white text-left transition-all duration-200"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: action.bg, color: action.color }}
              >
                {action.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-400 leading-snug mt-0.5">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

    </div>
  )
}
