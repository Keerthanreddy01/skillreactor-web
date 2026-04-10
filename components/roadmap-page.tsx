"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import { CheckCircle2, Circle, Clock, ExternalLink, ChevronDown, ChevronUp, BookOpen } from "lucide-react"
import { useState } from "react"

export function RoadmapPage() {
  const { roadmapSteps, completedSteps, toggleStepComplete, profile, getProgressPercent } = useApp()
  const [expanded, setExpanded] = useState<string | null>(null)

  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null
  const progress = getProgressPercent()
  const completed = roadmapSteps.filter((s) => completedSteps[s.id]).length

  if (!roadmapSteps.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <div className="text-center">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No roadmap yet. Please select a career goal first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">{goalInfo?.label} Roadmap</h2>
            <p className="text-muted-foreground text-sm">
              {roadmapSteps.length} topics · {profile.skillLevel === "beginner" ? "Beginner" : "Intermediate"} track
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-2xl font-bold" style={{ color: "var(--primary)" }}>{progress}%</p>
            <p className="text-muted-foreground text-xs">{completed}/{roadmapSteps.length} done</p>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: "var(--primary)" }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
        />

        <div className="flex flex-col gap-3">
          {roadmapSteps.map((step, idx) => {
            const done = !!completedSteps[step.id]
            const isExpanded = expanded === step.id
            const isNext = !done && roadmapSteps.findIndex((s) => !completedSteps[s.id]) === idx

            return (
              <div key={step.id} className="relative pl-14">
                {/* Circle indicator */}
                <button
                  onClick={() => toggleStepComplete(step.id)}
                  className="absolute left-2.5 top-5 -translate-y-1/2 z-10 transition-all duration-200 hover:scale-110"
                  aria-label={done ? "Mark incomplete" : "Mark complete"}
                >
                  {done ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  ) : (
                    <Circle className={`w-5 h-5 ${isNext ? "text-primary" : "text-muted-foreground/50"}`} />
                  )}
                </button>

                {/* Card */}
                <div
                  className={`glass rounded-2xl border transition-all duration-200 overflow-hidden ${
                    done ? "opacity-70" : isNext ? "border-primary/30 glow" : ""
                  }`}
                  style={isNext ? { boxShadow: "0 0 12px var(--glow-color)" } : {}}
                >
                  {/* Card header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs text-muted-foreground font-mono">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {isNext && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                            >
                              Up Next
                            </span>
                          )}
                          {done && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                            >
                              Completed
                            </span>
                          )}
                        </div>
                        <h3 className={`font-semibold ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleStepComplete(step.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            done
                              ? "bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive-foreground"
                              : "hover:opacity-90"
                          }`}
                          style={!done ? { background: "var(--primary)", color: "var(--primary-foreground)" } : {}}
                        >
                          {done ? "Undo" : "Mark Done"}
                        </button>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : step.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-3 mb-3">{step.description}</p>
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Resources</p>
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((r) => (
                            <span
                              key={r}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-colors hover:border-primary/50"
                              style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}
                            >
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
