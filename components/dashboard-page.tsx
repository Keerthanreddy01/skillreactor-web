"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import {
  BarChart2, Brain, Code2, Cloud, Shield,
  TrendingUp, CheckCircle2, Clock, BookOpen,
  ArrowRight, Map, CalendarDays, MessageSquare, Zap,
} from "lucide-react"
import type { Page } from "@/lib/app-context"

const ICONS: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-1">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="text-foreground text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-muted-foreground text-xs">{sub}</p>
    </div>
  )
}

function QuickActionCard({ icon, label, desc, page, onClick }: {
  icon: React.ReactNode; label: string; desc: string; page: Page; onClick: (p: Page) => void
}) {
  return (
    <button
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
    </button>
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

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Welcome hero */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: "var(--primary)" }} />
        <div className="flex items-start justify-between gap-4">
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
              {ICONS[goalInfo.icon]}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {totalSteps > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Overall Progress</span>
              <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: "var(--primary)" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Completed"
          value={completed}
          sub={`of ${totalSteps} topics`}
          color="var(--primary)"
        />
        <StatCard
          label="Remaining"
          value={remaining}
          sub="topics to go"
          color="var(--foreground)"
        />
        <StatCard
          label="Progress"
          value={`${progress}%`}
          sub="completion rate"
          color={progress >= 75 ? "oklch(0.72 0.18 145)" : "var(--primary)"}
        />
        <StatCard
          label="Weekly Goal"
          value={`${profile.hoursPerWeek}h`}
          sub="per week"
          color="oklch(0.75 0.16 60)"
        />
      </div>

      {/* Next Up */}
      {nextStep && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold text-sm">Up Next</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-foreground font-semibold mb-1">{nextStep.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{nextStep.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {nextStep.duration}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                  {nextStep.resources.slice(0, 2).join(", ")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage("roadmap")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              View
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {recentDone.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold text-sm">Recent Completions</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentDone.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b last:border-0"
                style={{ borderColor: "var(--border)" }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-medium">{s.title}</p>
                  <p className="text-muted-foreground text-xs">{s.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
