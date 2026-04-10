"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { CAREER_GOALS, type CareerGoal, type SkillLevel } from "@/lib/roadmap-data"
import { BarChart2, Brain, Code2, Cloud, Shield, CheckCircle2, ArrowRight, Clock } from "lucide-react"

const ICONS: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
}

export function GoalSelectPage() {
  const { saveProfile } = useApp()
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null)
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner")
  const [hours, setHours] = useState(10)
  const [step, setStep] = useState<1 | 2>(1)

  const handleContinue = () => {
    if (!selectedGoal) return
    if (step === 1) { setStep(2); return }
    saveProfile(selectedGoal, skillLevel, hours)
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-medium border"
            style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--primary)" }}>
            Step {step} of 2
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">
            {step === 1 ? "Choose Your Career Goal" : "Customize Your Path"}
          </h2>
          <p className="text-muted-foreground text-balance">
            {step === 1
              ? "Select the field you want to master and we'll generate your personalized roadmap."
              : "Tell us about your experience and available time."}
          </p>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {(Object.entries(CAREER_GOALS) as [CareerGoal, typeof CAREER_GOALS[CareerGoal]][]).map(([key, goal]) => {
              const active = selectedGoal === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedGoal(key)}
                  className={`relative text-left p-5 rounded-2xl border transition-all duration-200 group ${
                    active ? "border-primary glow" : "border-border hover:border-primary/50"
                  }`}
                  style={{
                    background: active ? "var(--card)" : "var(--card)",
                    boxShadow: active ? `0 0 20px ${goal.color}33` : "",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: active ? goal.color : "var(--muted)",
                        color: active ? "var(--background)" : "var(--muted-foreground)",
                        transition: "all 0.2s",
                      }}
                    >
                      {ICONS[goal.icon]}
                    </div>
                    {active && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                    )}
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${active ? "text-foreground" : "text-foreground"}`}>
                    {goal.label}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{goal.description}</p>
                </button>
              )
            })}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 mb-6">
            {/* Skill Level */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-foreground font-semibold mb-1 text-sm">Your Current Skill Level</h3>
              <p className="text-muted-foreground text-xs mb-4">This shapes the content and pacing of your roadmap.</p>
              <div className="grid grid-cols-2 gap-3">
                {(["beginner", "intermediate"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSkillLevel(level)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      skillLevel === level ? "border-primary glow" : "border-border hover:border-primary/40"
                    }`}
                    style={{ background: skillLevel === level ? "var(--card)" : "var(--muted)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: skillLevel === level ? "var(--primary)" : "var(--muted-foreground)" }}
                      />
                      <span className="font-semibold text-sm text-foreground capitalize">{level}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {level === "beginner" ? "Little to no prior experience" : "Some foundation, ready to level up"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Study hours */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-foreground font-semibold text-sm">Study Hours Per Week</h3>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  <Clock className="w-3 h-3" />
                  {hours}h / week
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-4">How many hours can you commit each week?</p>
              <input
                type="range"
                min={2}
                max={40}
                step={2}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2h (casual)</span>
                <span>20h (dedicated)</span>
                <span>40h (intensive)</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!selectedGoal}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 glow"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {step === 1 ? "Continue" : "Generate My Roadmap"}
          <ArrowRight className="w-4 h-4" />
        </button>

        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="w-full mt-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to goal selection
          </button>
        )}
      </div>
    </div>
  )
}
