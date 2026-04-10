"use client"

import { useApp } from "@/lib/app-context"
import { getWeeklyPlan } from "@/lib/roadmap-data"
import { CheckCircle2, Circle, Clock, CalendarDays, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function PlannerPage() {
  const { roadmapSteps, completedSteps, toggleStepComplete } = useApp()
  const [openWeeks, setOpenWeeks] = useState<Record<number, boolean>>({ 1: true })

  if (!roadmapSteps.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <div className="text-center">
          <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No roadmap yet. Please select a career goal first.</p>
        </div>
      </div>
    )
  }

  const weeklyPlan = getWeeklyPlan(roadmapSteps)
  const weeks = Object.keys(weeklyPlan).map(Number).sort((a, b) => a - b)

  const toggleWeek = (week: number) => {
    setOpenWeeks((prev) => ({ ...prev, [week]: !prev[week] }))
  }

  // Determine which week to focus on (first week with incomplete tasks)
  const currentFocusWeek = weeks.find((w) => weeklyPlan[w].some((s) => !completedSteps[s.id])) ?? weeks[weeks.length - 1]

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-1">
          <CalendarDays className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2 className="text-foreground font-bold text-xl">Weekly Planner</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Your roadmap broken down into weekly goals. Focus on one week at a time.
        </p>
      </div>

      {/* Weeks */}
      {weeks.map((week) => {
        const steps = weeklyPlan[week]
        const doneCount = steps.filter((s) => completedSteps[s.id]).length
        const allDone = doneCount === steps.length
        const isFocus = week === currentFocusWeek
        const isOpen = openWeeks[week] ?? false

        return (
          <div
            key={week}
            className={`glass rounded-2xl border overflow-hidden transition-all duration-200 ${
              isFocus && !allDone ? "border-primary/30" : "border-border"
            }`}
            style={isFocus && !allDone ? { boxShadow: "0 0 12px var(--glow-color)" } : {}}
          >
            {/* Week header */}
            <button
              onClick={() => toggleWeek(week)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0`}
                  style={
                    allDone
                      ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                      : isFocus
                      ? { background: "var(--primary)22", color: "var(--primary)" }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                >
                  {allDone ? <CheckCircle2 className="w-4 h-4" /> : week}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold text-sm">Week {week}</p>
                    {isFocus && !allDone && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                      >
                        Current
                      </span>
                    )}
                    {allDone && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "var(--primary)22", color: "var(--primary)" }}
                      >
                        Complete
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {doneCount}/{steps.length} tasks done
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Mini progress bar */}
                <div className="hidden sm:block w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(doneCount / steps.length) * 100}%`,
                      background: "var(--primary)",
                    }}
                  />
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Tasks */}
            {isOpen && (
              <div className="px-4 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex flex-col gap-2 mt-3">
                  {steps.map((step) => {
                    const done = !!completedSteps[step.id]
                    return (
                      <div
                        key={step.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                          done ? "opacity-60" : ""
                        }`}
                        style={{ background: "var(--muted)", borderColor: "var(--border)" }}
                      >
                        <button
                          onClick={() => toggleStepComplete(step.id)}
                          className="mt-0.5 flex-shrink-0 transition-all duration-200 hover:scale-110"
                          aria-label={done ? "Mark incomplete" : "Mark complete"}
                        >
                          {done ? (
                            <CheckCircle2 className="w-4 h-4" style={{ color: "var(--primary)" }} />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.description}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              {step.resources[0]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleStepComplete(step.id)}
                          className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                            done
                              ? "text-muted-foreground hover:text-foreground"
                              : "hover:opacity-90"
                          }`}
                          style={!done ? { background: "var(--primary)", color: "var(--primary-foreground)" } : {
                            background: "var(--border)",
                          }}
                        >
                          {done ? "Undo" : "Done"}
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Incomplete moved notice */}
                {doneCount < steps.length && week < currentFocusWeek && (
                  <div className="mt-3 flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: "oklch(0.55 0.22 25 / 0.1)", borderColor: "oklch(0.55 0.22 25 / 0.3)" }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.22 25)" }} />
                    <p className="text-xs" style={{ color: "oklch(0.65 0.22 25)" }}>
                      {steps.length - doneCount} incomplete task(s) from this week. Consider catching up before moving forward.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
