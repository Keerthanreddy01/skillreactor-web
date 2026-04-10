"use client"

import { useApp } from "@/lib/app-context"
import { getWeeklyPlan, CAREER_GOALS } from "@/lib/roadmap-data"
import { TrendingUp, CheckCircle2, Target, Zap, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

function CircleProgress({ percent, size = 120, stroke = 8 }: { percent: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (percent / 100) * circ
  const cx = size / 2
  const cy = size / 2

  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.68 0.22 195)" />
          <stop offset="100%" stopColor="oklch(0.65 0.20 280)" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        filter="drop-shadow(0 0 8px oklch(0.68 0.22 195 / 0.4))"
      />
    </svg>
  )
}

function BarChart({ data }: { data: { label: string; done: number; total: number }[] }) {
  const max = Math.max(...data.map((d) => d.total), 1)
  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.map((d, idx) => {
        const pct = d.total > 0 ? (d.done / d.total) * 100 : 0
        const height = Math.round((d.total / max) * 100)
        return (
          <motion.div
            key={d.label}
            className="flex-1 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="relative w-full flex items-end justify-center" style={{ height: `${height}px` }}>
              {/* Background bar with gradient */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-t-xl opacity-40"
                style={{
                  height: `${height}px`,
                  background: "linear-gradient(to top, oklch(0.68 0.22 195 / 0.2), oklch(0.65 0.20 280 / 0.1))",
                }}
              />
              {/* Filled bar with gradient */}
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-xl"
                initial={{ height: 0 }}
                animate={{ height: `${(pct / 100) * height}px` }}
                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                style={{
                  background: "linear-gradient(to top, oklch(0.68 0.22 195), oklch(0.65 0.20 280))",
                  boxShadow: `0 0 12px oklch(0.68 0.22 195 / 0.4)`,
                }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{d.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export function ProgressPage() {
  const { roadmapSteps, completedSteps, profile, getProgressPercent } = useApp()

  if (!roadmapSteps.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <div className="text-center">
          <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No progress yet. Select a career goal to get started.</p>
        </div>
      </div>
    )
  }

  const progress = getProgressPercent()
  const completed = roadmapSteps.filter((s) => completedSteps[s.id]).length
  const total = roadmapSteps.length
  const remaining = total - completed
  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null

  // Per-week breakdown
  const weeklyPlan = getWeeklyPlan(roadmapSteps)
  const weekData = Object.entries(weeklyPlan)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([week, steps]) => ({
      label: `W${week}`,
      done: steps.filter((s) => completedSteps[s.id]).length,
      total: steps.length,
    }))

  // Milestones
  const milestones = [
    { label: "First Step", target: 1, icon: <Zap className="w-4 h-4" /> },
    { label: "25% Done", target: Math.ceil(total * 0.25), icon: <Target className="w-4 h-4" /> },
    { label: "Halfway", target: Math.ceil(total * 0.5), icon: <TrendingUp className="w-4 h-4" /> },
    { label: "75% Done", target: Math.ceil(total * 0.75), icon: <BookOpen className="w-4 h-4" /> },
    { label: "Complete!", target: total, icon: <CheckCircle2 className="w-4 h-4" /> },
  ]

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto">
      {/* Main stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Circle progress card with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-5 flex flex-col items-center justify-center col-span-1 border-glow"
        >
          <motion.div
            className="relative mb-3"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <CircleProgress percent={progress} size={120} stroke={10} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress}%
              </motion.span>
              <span className="text-xs text-muted-foreground">done</span>
            </div>
          </motion.div>
          <p className="text-foreground font-semibold text-sm">{goalInfo?.label ?? "Progress"}</p>
          <p className="text-muted-foreground text-xs capitalize">{profile.skillLevel} track</p>
        </motion.div>

        {/* Stat cards */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-3">
          {[
            { label: "Completed", value: completed, color: "var(--primary)", sub: "topics" },
            { label: "Remaining", value: remaining, color: "var(--foreground)", sub: "topics" },
            { label: "Total Topics", value: total, color: "oklch(0.70 0.18 160)", sub: "in roadmap" },
            { label: "Weekly Goal", value: `${profile.hoursPerWeek}h`, color: "oklch(0.65 0.20 280)", sub: "per week" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-2xl p-4 flex flex-col gap-1 group hover:border-primary/40 transition-colors"
            >
              <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
              <motion.p
                className="text-2xl font-bold"
                style={{ color: stat.color }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-muted-foreground text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress bar with labels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-foreground font-semibold text-sm">Overall Completion</h3>
          <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>{completed} / {total}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, oklch(0.68 0.22 195), oklch(0.65 0.20 280))",
              boxShadow: "0 0 12px var(--glow-cyan)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Weekly breakdown bar chart */}
      {weekData.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-5"
        >
          <h3 className="text-foreground font-semibold text-sm mb-4">Topics Per Week</h3>
          <BarChart data={weekData} />
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(to right, oklch(0.68 0.22 195), oklch(0.65 0.20 280))" }} />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "var(--border)" }} />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass rounded-2xl p-5"
      >
        <h3 className="text-foreground font-semibold text-sm mb-4">Milestones</h3>
        <div className="flex flex-col gap-3">
          {milestones.map((m, idx) => {
            const achieved = completed >= m.target
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                  style={
                    achieved
                      ? {
                          background: "linear-gradient(135deg, oklch(0.68 0.22 195), oklch(0.65 0.20 280))",
                          color: "var(--primary-foreground)",
                          boxShadow: achieved ? "0 0 12px var(--glow-cyan)" : "none",
                        }
                      : {
                          background: "var(--muted)",
                          color: "var(--muted-foreground)",
                        }
                  }
                  animate={achieved ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {m.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${achieved ? "text-foreground" : "text-muted-foreground"}`}>
                    {m.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achieved ? "Achieved!" : `${m.target - completed} more to go`}
                  </p>
                </div>
                {achieved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
