"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import {
  BarChart2, Brain, Code2, Cloud, Shield,
  TrendingUp, CheckCircle2, Clock, BookOpen,
  ArrowRight, Map, CalendarDays, MessageSquare, Zap, Flame, Target,
} from "lucide-react"
import { motion } from "framer-motion"
import type { Page } from "@/lib/app-context"

const ICONS: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
}

function StatCard({ label, value, sub, color, delay }: { label: string; value: string | number; sub: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-5 flex flex-col gap-1 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
      style={{ '--glow-color': color } as React.CSSProperties}
    >
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <motion.p
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className="text-foreground text-2xl font-bold"
        style={{ color }}
      >
        {value}
      </motion.p>
      <p className="text-muted-foreground text-xs">{sub}</p>
    </motion.div>
  )
}

function QuickActionCard({ icon, label, desc, page, onClick }: {
  icon: React.ReactNode; label: string; desc: string; page: Page; onClick: (p: Page) => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 8px 16px var(--glow-color)" }}
      onClick={() => onClick(page)}
      className="glass rounded-2xl p-5 text-left group hover:border-primary/40 transition-all duration-200 flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors"
        style={{ background: "var(--muted)" }}>
        {icon}
      </div>
      <div>
        <p className="text-foreground font-semibold text-sm mb-0.5">{label}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-auto" />
    </motion.button>
  )
}

export function DashboardPage() {
  const { user, profile, roadmapSteps, completedSteps, getProgressPercent, setCurrentPage } = useApp()
  const progress = getProgressPercent()
  const totalSteps = roadmapSteps.length
  const completed = roadmapSteps.filter((s) => completedSteps[s.id]).length
  const remaining = totalSteps - completed
  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null

  // Next uncompleted step
  const nextStep = roadmapSteps.find((s) => !completedSteps[s.id])

  // Recent completions
  const recentDone = roadmapSteps.filter((s) => completedSteps[s.id]).slice(-3).reverse()

  // Calculate "streak" (consecutive days with progress in this session)
  const streak = Math.floor(progress / 10) + 1

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Welcome hero with gradient glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-6 relative overflow-hidden"
      >
        {/* Animated gradient glow background */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: "var(--primary)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <p className="text-muted-foreground text-sm mb-1">{greeting}</p>
            <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
              Welcome back, {user?.name?.split(" ")[0] ?? "there"}.
            </h2>
            {goalInfo && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--primary)" }}>
                  <Zap className="w-3 h-3" />
                  {goalInfo.label}
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs capitalize">{profile.skillLevel} track</span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">{profile.hoursPerWeek}h/week</span>
              </div>
            )}
          </div>
          {goalInfo && (
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: goalInfo.color + "22", color: goalInfo.color }}
            >
              {goalInfo.icon === "BarChart2" && <BarChart2 className="w-5 h-5" />}
              {goalInfo.icon === "Brain" && <Brain className="w-5 h-5" />}
              {goalInfo.icon === "Code2" && <Code2 className="w-5 h-5" />}
              {goalInfo.icon === "Cloud" && <Cloud className="w-5 h-5" />}
              {goalInfo.icon === "Shield" && <Shield className="w-5 h-5" />}
            </div>
          )}
        </div>

        {/* Animated progress bar */}
        {totalSteps > 0 && (
          <div className="mt-5 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Overall Progress</span>
              <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{ background: "var(--primary)" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{ background: "var(--primary)" }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Stats with streak card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Completed"
          value={completed}
          sub={`of ${totalSteps} topics`}
          color="var(--primary)"
          delay={0}
        />
        <StatCard
          label="Remaining"
          value={remaining}
          sub="topics to go"
          color="var(--foreground)"
          delay={0.1}
        />
        <StatCard
          label="Progress"
          value={`${progress}%`}
          sub="completion rate"
          color={progress >= 75 ? "oklch(0.72 0.18 145)" : "var(--primary)"}
          delay={0.2}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-5 flex flex-col gap-1 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
        >
          <p className="text-muted-foreground text-xs font-medium">Streak</p>
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-5 h-5" style={{ color: "oklch(0.65 0.20 30)" }} />
            <p className="text-foreground text-2xl font-bold" style={{ color: "oklch(0.65 0.20 30)" }}>
              {streak}
            </p>
          </motion.div>
          <p className="text-muted-foreground text-xs">days active</p>
        </motion.div>
      </div>

      {/* Smart Recommendation Card */}
      {nextStep && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-5 border border-primary/20 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none"
            style={{ background: "var(--primary)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4" style={{ color: "var(--primary)" }} />
                <span className="text-xs font-semibold text-primary">Smart Recommendation</span>
              </div>
              <h3 className="text-foreground font-bold mb-2">
                Next: {nextStep.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{nextStep.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Duration</p>
                  <p className="text-sm font-semibold text-foreground">{nextStep.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Difficulty</p>
                  <p className="text-sm font-semibold text-foreground">Medium</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Est. Completion</p>
                  <p className="text-sm font-semibold text-foreground">3 days</p>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => setCurrentPage("roadmap")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Start
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Next Up */}
      {nextStep && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold text-sm">Resources for this topic</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                {nextStep.resources.slice(0, 3).map((r) => (
                  <span
                    key={r}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors hover:border-primary/50"
                    style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    <BookOpen className="w-3 h-3 text-muted-foreground" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      {recentDone.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold text-sm">Recent Completions</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentDone.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-3 py-2 border-b last:border-0"
                style={{ borderColor: "var(--border)" }}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-medium">{s.title}</p>
                  <p className="text-muted-foreground text-xs">{s.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-foreground font-semibold text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickActionCard
            icon={<Map className="w-5 h-5" />}
            label="View Roadmap"
            desc="See all topics in your learning path"
            page="roadmap"
            onClick={setCurrentPage}
          />
          <QuickActionCard
            icon={<CalendarDays className="w-5 h-5" />}
            label="Weekly Planner"
            desc="Check your schedule for this week"
            page="planner"
            onClick={setCurrentPage}
          />
          <QuickActionCard
            icon={<MessageSquare className="w-5 h-5" />}
            label="Ask Mentor"
            desc="Get personalized guidance and tips"
            page="mentor"
            onClick={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
