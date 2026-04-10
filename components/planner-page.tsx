"use client"

import { useApp } from "@/lib/app-context"
import { getWeeklyPlan } from "@/lib/roadmap-data"
import { CheckCircle2, Circle, Clock, CalendarDays, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-3 mb-1">
          <CalendarDays className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2 className="text-foreground font-bold text-xl">Weekly Planner</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Your roadmap broken down into weekly goals. Focus on one week at a time.
        </p>
      </motion.div>

      {/* Weeks */}
      {weeks.map((week, weekIdx) => {
        const steps = weeklyPlan[week]
        const doneCount = steps.filter((s) => completedSteps[s.id]).length
        const allDone = doneCount === steps.length
        const isFocus = week === currentFocusWeek
        const isOpen = openWeeks[week] ?? false

        return (
          <motion.div
            key={week}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: weekIdx * 0.1 }}
            className={`glass rounded-2xl border overflow-hidden transition-all duration-200 ${
              isFocus && !allDone ? "border-primary/40" : "border-border"
            }`}
            style={isFocus && !allDone ? { boxShadow: "inset 0 0 20px var(--glow-cyan), 0 0 20px var(--glow-cyan)" } : {}}
          >
            {/* Week header */}
            <motion.button
              onClick={() => toggleWeek(week)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors ripple"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0`}
                  style={
                    allDone
                      ? {
                          background: "linear-gradient(135deg, oklch(0.68 0.22 195), oklch(0.65 0.20 280))",
                          color: "var(--primary-foreground)",
                        }
                      : isFocus
                      ? { background: "var(--primary)22", color: "var(--primary)" }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                  animate={allDone ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {allDone ? <CheckCircle2 className="w-4 h-4" /> : week}
                </motion.div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold text-sm">Week {week}</p>
                    {isFocus && !allDone && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                      >
                        Current
                      </motion.span>
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
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(doneCount / steps.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      background: "linear-gradient(90deg, oklch(0.68 0.22 195), oklch(0.65 0.20 280))",
                    }}
                  />
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </motion.button>

            {/* Tasks */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="flex flex-col gap-2 mt-3">
                    {steps.map((step, stepIdx) => {
                      const done = !!completedSteps[step.id]
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: stepIdx * 0.1 }}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 group hover:border-primary/40 ${
                            done ? "opacity-50" : ""
                          }`}
                          style={{ background: "var(--muted)", borderColor: "var(--border)" }}
                        >
                          <motion.button
                            onClick={() => toggleStepComplete(step.id)}
                            className="mt-0.5 flex-shrink-0 transition-all duration-200"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={done ? "Mark incomplete" : "Mark complete"}
                          >
                            {done ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--primary)" }} />
                              </motion.div>
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </motion.button>
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
                          <motion.button
                            onClick={() => toggleStepComplete(step.id)}
                            className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ripple ${
                              done
                                ? "text-muted-foreground hover:text-foreground"
                                : "hover:opacity-90"
                            }`}
                            style={!done ? { background: "var(--primary)", color: "var(--primary-foreground)" } : {
                              background: "var(--border)",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {done ? "Undo" : "Done"}
                          </motion.button>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Incomplete moved notice */}
                  {doneCount < steps.length && week < currentFocusWeek && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-start gap-2 p-3 rounded-xl"
                      style={{ background: "oklch(0.55 0.22 25 / 0.1)", borderColor: "oklch(0.55 0.22 25 / 0.3)" }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.22 25)" }} />
                      <p className="text-xs" style={{ color: "oklch(0.65 0.22 25)" }}>
                        {steps.length - doneCount} incomplete task(s) from this week. Consider catching up before moving forward.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
