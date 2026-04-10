"use client"

import { useApp } from "@/lib/app-context"
import { getWeeklyPlan, CAREER_GOALS } from "@/lib/roadmap-data"
import { TrendingUp, CheckCircle2, Target, Zap, BookOpen } from "lucide-react"

function CircleProgress({ percent, size = 120, stroke = 8 }: { percent: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (percent / 100) * circ
  const cx = size / 2
  const cy = size / 2

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.7s ease" }}
      />
    </svg>
  )
}

function BarChart({ data }: { data: { label: string; done: number; total: number }[] }) {
  const max = Math.max(...data.map((d) => d.total), 1)
  return (
    <div className="flex items-end gap-2 h-24 w-full">
      {data.map((d) => {
        const pct = d.total > 0 ? (d.done / d.total) * 100 : 0
        const height = Math.round((d.total / max) * 80)
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="relative w-full flex items-end justify-center" style={{ height: `${height}px` }}>
              {/* Background bar */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-t-lg"
                style={{ height: `${height}px`, background: "var(--border)" }}
              />
              {/* Filled bar */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-t-lg transition-all duration-700"
                style={{ height: `${(pct / 100) * height}px`, background: "var(--primary)" }}
              />
            </div>
            <span className="text-xs text-muted-foreground text-center leading-tight">{d.label}</span>
          </div>
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
        {/* Circle progress card */}
        <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center col-span-1">
          <div className="relative mb-3">
            <CircleProgress percent={progress} size={120} stroke={10} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{progress}%</span>
              <span className="text-xs text-muted-foreground">done</span>
            </div>
          </div>
          <p className="text-foreground font-semibold text-sm">{goalInfo?.label ?? "Progress"}</p>
          <p className="text-muted-foreground text-xs capitalize">{profile.skillLevel} track</p>
        </div>

        {/* Stat cards */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-3">
          {[
            { label: "Completed", value: completed, color: "var(--primary)", sub: "topics" },
            { label: "Remaining", value: remaining, color: "var(--foreground)", sub: "topics" },
            { label: "Total Topics", value: total, color: "oklch(0.75 0.16 60)", sub: "in roadmap" },
            { label: "Weekly Goal", value: `${profile.hoursPerWeek}h`, color: "oklch(0.65 0.15 150)", sub: "per week" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 flex flex-col gap-1">
              <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-muted-foreground text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar with labels */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-foreground font-semibold text-sm">Overall Completion</h3>
          <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>{completed} / {total}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: "var(--primary)" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Weekly breakdown bar chart */}
      {weekData.length > 1 && (
        <div className="glass rounded-2xl p-5">
          <h3 className="text-foreground font-semibold text-sm mb-4">Topics Per Week</h3>
          <BarChart data={weekData} />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "var(--primary)" }} />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "var(--border)" }} />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Milestones</h3>
        <div className="flex flex-col gap-3">
          {milestones.map((m) => {
            const achieved = completed >= m.target
            return (
              <div key={m.label} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                  style={
                    achieved
                      ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${achieved ? "text-foreground" : "text-muted-foreground"}`}>
                    {m.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achieved ? "Achieved!" : `${m.target - completed} more to go`}
                  </p>
                </div>
                {achieved && (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
