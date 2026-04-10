"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { CAREER_GOALS, type CareerGoal, type SkillLevel } from "@/lib/roadmap-data"
import { BarChart2, Brain, Code2, Cloud, Shield, CheckCircle2, ArrowRight, Clock } from "lucide-react"
import { motion } from "framer-motion"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
      />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full text-xs font-bold border-2 border-blue-200 bg-white/60 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            Step {step} of 2
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 text-balance">
            {step === 1 ? "Choose Your Career Goal" : "Customize Your Path"}
          </h2>
          <p className="text-gray-600 text-balance max-w-md mx-auto">
            {step === 1
              ? "Select the field you want to master and we'll generate your personalized roadmap."
              : "Tell us about your experience and available time."}
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            {(Object.entries(CAREER_GOALS) as [CareerGoal, typeof CAREER_GOALS[CareerGoal]][]).map(([key, goal], idx) => {
              const active = selectedGoal === key
              const gradients: Record<CareerGoal, string> = {
                "data-science":     "from-blue-100 to-cyan-100",
                "machine-learning": "from-purple-100 to-pink-100",
                "web-development":  "from-green-100 to-teal-100",
                "cloud-computing":  "from-orange-100 to-amber-100",
                "cybersecurity":    "from-red-100 to-rose-100",
              }
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedGoal(key)}
                  whileHover={{ scale: active ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 group cursor-pointer ${
                    active
                      ? "border-blue-400 shadow-lg shadow-blue-200/50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  style={{
                    background: active
                      ? `linear-gradient(135deg, ${goal.color}22, ${goal.color}11)`
                      : "white",
                  }}
                >
                  {/* Gradient background */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[key]} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{
                          background: active ? goal.color : "var(--muted)",
                          color: active ? "white" : "var(--muted-foreground)",
                        }}
                        animate={active ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        {ICONS[goal.icon]}
                      </motion.div>
                      {active && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: goal.color }} />
                        </motion.div>
                      )}
                    </div>
                    <h3 className="font-bold text-sm mb-1 text-gray-900">{goal.label}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{goal.description}</p>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 mb-6"
          >
            {/* Skill Level */}
            <div className="glass rounded-2xl p-6 border border-white/40">
              <h3 className="text-gray-900 font-bold mb-2 text-sm">Your Current Skill Level</h3>
              <p className="text-gray-600 text-xs mb-4">This shapes the content and pacing of your roadmap.</p>
              <div className="grid grid-cols-2 gap-3">
                {(["beginner", "intermediate"] as const).map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setSkillLevel(level)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 font-semibold text-sm ${
                      skillLevel === level
                        ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-900 shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {level === "beginner" ? "🌱 Beginner" : "📈 Intermediate"}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Study hours */}
            <div className="glass rounded-2xl p-6 border border-white/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900 font-bold text-sm">Study Hours Per Week</h3>
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                    color: "white",
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Clock className="w-3 h-3" />
                  {hours}h/week
                </motion.div>
              </div>
              <p className="text-gray-600 text-xs mb-4">How many hours can you commit each week?</p>
              <input
                type="range"
                min={2}
                max={40}
                step={2}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-blue-200 to-cyan-200 cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0066ff 0%, #0066ff ${((hours - 2) / 38) * 100}%, #e5e7eb ${((hours - 2) / 38) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2 font-medium">
                <span>2h (casual)</span>
                <span>20h (dedicated)</span>
                <span>40h (intensive)</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleContinue}
          disabled={!selectedGoal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="gradient-btn w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 flex items-center justify-center gap-2 mt-6"
        >
          {step === 1 ? "Continue to Customize" : "Generate My Roadmap"}
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {step === 2 && (
          <motion.button
            onClick={() => setStep(1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-3 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl transition-all"
          >
            Back to goal selection
          </motion.button>
        )}
      </div>
    </div>
  )
}
