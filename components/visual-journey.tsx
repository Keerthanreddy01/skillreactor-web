"use client"

import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Clock, 
  Zap, 
  Trophy,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  BookOpen,
  Target,
  Star,
  Video,
  FileText,
  MessageSquare,
  Calendar,
  ArrowRight,
  TrendingUp
} from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// Month names for calendar strip
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Week calendar data generator
function generateWeekCalendar(currentWeek: number) {
  const weeks = []
  const now = new Date()
  
  for (let i = -2; i <= 12; i++) {
    const weekDate = new Date(now)
    weekDate.setDate(now.getDate() + (i * 7))
    weeks.push({
      week: currentWeek + i,
      date: weekDate.getDate(),
      month: MONTHS[weekDate.getMonth()],
      isActive: i === 0,
      isPast: i < 0
    })
  }
  return weeks
}

// Premium Objective Card Component
function ObjectiveCard({ 
  title, 
  subtitle, 
  isCompleted, 
  isCurrent,
  colorScheme,
  onClick 
}: { 
  title: string
  subtitle: string
  isCompleted: boolean
  isCurrent: boolean
  colorScheme: "dark" | "light" | "purple" | "yellow" | "green"
  onClick: () => void
}) {
  const schemes = {
    dark: { bg: "bg-gray-900", text: "text-white", subtext: "text-gray-400", check: "text-white" },
    light: { bg: "bg-white", text: "text-gray-800", subtext: "text-gray-500", check: "text-gray-400" },
    purple: { bg: "bg-purple-100", text: "text-purple-900", subtext: "text-purple-600", check: "text-purple-500" },
    yellow: { bg: "bg-amber-100", text: "text-amber-900", subtext: "text-amber-600", check: "text-amber-500" },
    green: { bg: "bg-emerald-100", text: "text-emerald-900", subtext: "text-emerald-600", check: "text-emerald-500" },
  }
  
  const scheme = schemes[colorScheme]

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative ${scheme.bg} rounded-2xl p-5 text-left transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px] flex-shrink-0`}
    >
      {isCurrent && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      <p className={`${scheme.text} font-semibold text-sm line-clamp-2 mb-2`}>
        {isCompleted && <span className="line-through opacity-70">{title}</span>}
        {!isCompleted && title}
      </p>
      <p className={`${scheme.subtext} text-xs`}>{subtitle}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs ${scheme.subtext}`}>
          {isCurrent ? "current" : isCompleted ? "done" : "upcoming"}
        </span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isCompleted ? "bg-gray-800 border-gray-800" : "border-gray-300"
        }`}>
          {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>
    </motion.button>
  )
}

// Practical Skill Card with colorful design
function PracticalCard({ 
  title, 
  subtitle,
  progress,
  color,
  isCompleted,
  onClick
}: {
  title: string
  subtitle: string
  progress: number
  color: "purple" | "gray" | "yellow" | "blue" | "green"
  isCompleted: boolean
  onClick: () => void
}) {
  const colors = {
    purple: { bg: "bg-gradient-to-br from-purple-400 to-purple-600", icon: "bg-purple-300" },
    gray: { bg: "bg-gradient-to-br from-gray-400 to-gray-600", icon: "bg-gray-300" },
    yellow: { bg: "bg-gradient-to-br from-amber-300 to-amber-500", icon: "bg-amber-200" },
    blue: { bg: "bg-gradient-to-br from-blue-400 to-blue-600", icon: "bg-blue-300" },
    green: { bg: "bg-gradient-to-br from-emerald-400 to-emerald-600", icon: "bg-emerald-300" },
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative group"
    >
      <div className={`${colors[color].bg} rounded-3xl p-5 w-40 h-44 flex flex-col justify-between shadow-xl relative overflow-hidden`}>
        {/* Decorative shape */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-8 -left-4 w-16 h-16 bg-white/10 rounded-full" />
        
        {/* Icon area */}
        <div className={`w-10 h-10 ${colors[color].icon} rounded-xl flex items-center justify-center`}>
          <FileText className="w-5 h-5 text-gray-700" />
        </div>
        
        {/* Completed check */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </motion.div>
        )}
        
        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <ArrowRight className="w-4 h-4 text-gray-800" />
        </div>
      </div>
      
      <div className="mt-3 px-1">
        <p className="text-gray-800 font-semibold text-sm line-clamp-2">{title}</p>
        <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
      </div>
    </motion.button>
  )
}

// Theory Video Card
function TheoryCard({
  title,
  duration,
  thumbnail,
  isPlaying,
  onClick
}: {
  title: string
  duration: string
  thumbnail: string
  isPlaying: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl min-w-[280px] flex-shrink-0"
    >
      {/* Thumbnail area */}
      <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">Design</p>
          <p className="text-white font-serif italic text-2xl">Matters</p>
        </div>
        
        {/* Play controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Play className="w-5 h-5 text-gray-900 fill-gray-900 ml-0.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-white/80 text-xs font-mono">{duration}</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-white font-medium text-sm">{title}</p>
      </div>
    </motion.button>
  )
}

// Community Message Card
function CommunityCard({
  name,
  message,
  avatar,
  timeAgo
}: {
  name: string
  message: string
  avatar: string
  timeAgo: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-2xl p-4 max-w-[200px] shadow-xl"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-yellow-400 font-semibold text-sm">Hey {name}!</p>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">{message}</p>
        </div>
      </div>
      <p className="text-gray-500 text-xs mt-3">{timeAgo}</p>
    </motion.div>
  )
}

// Main Visual Journey Component
export function VisualJourney() {
  const { roadmapSteps, completedSteps, toggleStepComplete, profile, getProgressPercent, setCurrentPage } = useApp()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth())
  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -30])

  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal as keyof typeof CAREER_GOALS] : null
  const progress = getProgressPercent()
  
  // Find current level (week group)
  const currentStepIdx = roadmapSteps.findIndex(s => !completedSteps[s.id])
  const currentStep = currentStepIdx >= 0 ? roadmapSteps[currentStepIdx] : roadmapSteps[roadmapSteps.length - 1]
  const currentLevel = Math.floor((currentStep?.week || 1) / 4) + 1
  const currentWeek = currentStep?.week || 1
  
  // Generate week calendar
  const weekCalendar = useMemo(() => generateWeekCalendar(currentWeek), [currentWeek])

  // Group steps by category
  const currentObjectives = roadmapSteps.slice(0, 4) // First 4 as current objectives
  const practicalSkills = roadmapSteps.slice(0, 5) // First 5 as practical
  const theoryTopics = roadmapSteps.slice(0, 3) // First 3 as theory

  const levelTitles: Record<number, string> = {
    1: "Foundations",
    2: "Core Concepts", 
    3: "Intermediate Skills",
    4: "Advanced Topics",
    5: "Mastery"
  }

  if (!roadmapSteps.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <div className="text-center">
          <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No roadmap yet. Please select a career goal first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Subtle background gradients */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
        style={{ 
          background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
          y: parallaxY 
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ 
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)" 
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo/Brand */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">SkillReactor</span>
            </div>
            
            {/* Level Title */}
            <h1 className="text-4xl md:text-5xl font-light text-gray-800">
              Level
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {String(currentLevel).padStart(2, '0')}: {levelTitles[currentLevel] || "Learning"}
            </h2>
          </motion.div>

          {/* Right side - View toggle + Mentor button */}
          <div className="flex items-center gap-4">
            {/* Daily/Overview Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex items-center">
              <button className="px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-gray-800">
                Daily
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">
                Overview
              </button>
            </div>
            
            {/* Call to Mentor Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("mentor")}
              className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-full font-medium text-sm shadow-lg hover:bg-gray-800 transition-colors"
            >
              <Video className="w-4 h-4" />
              Call to mentor
            </motion.button>
            
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {profile.goal?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </div>
        </div>

        {/* Session Notification Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-24 right-32 bg-gray-800 rounded-2xl p-4 shadow-xl max-w-[200px] hidden lg:block"
        >
          <p className="text-white/70 text-xs">your next session with</p>
          <p className="text-white font-semibold text-sm">AI Mentor</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/70 text-xs">in 10 minutes,<br/>17:00</span>
            <button className="px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-full text-xs font-semibold hover:bg-yellow-300 transition-colors">
              call now
            </button>
          </div>
        </motion.div>

        {/* Calendar Strip */}
        <motion.div
          ref={calendarRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 overflow-x-auto pb-4 -mx-6 px-6"
        >
          <div className="flex items-end gap-1 min-w-max">
            {MONTHS.map((month, idx) => {
              const isCurrentMonth = idx === new Date().getMonth()
              const monthWeeks = weekCalendar.filter(w => MONTHS.indexOf(w.month) === idx)
              
              return (
                <div key={month} className="flex flex-col items-start">
                  <span className={`text-sm mb-2 ${isCurrentMonth ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                    {month.toLowerCase()}
                  </span>
                  <div className="flex gap-1">
                    {monthWeeks.length > 0 ? monthWeeks.map((week, widx) => (
                      <motion.button
                        key={`${month}-${widx}`}
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-xs transition-all ${
                          week.isActive 
                            ? "bg-yellow-400 text-gray-900 font-bold shadow-lg" 
                            : week.isPast
                            ? "bg-gray-100 text-gray-400"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span className="font-semibold">{week.date}</span>
                      </motion.button>
                    )) : (
                      // Placeholder for months without weeks
                      [1,2,3,4].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-gray-300">
                          -
                        </div>
                      ))
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 ml-2">
                    {monthWeeks[0]?.isActive ? "thu" : ""}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Current Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h3 className="text-xl font-light text-gray-800 mb-1">current objectives</h3>
          <p className="text-xl font-semibold text-gray-900 mb-6">to solve</p>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
            {currentObjectives.map((step, idx) => {
              const isCompleted = !!completedSteps[step.id]
              const isCurrent = !isCompleted && idx === currentStepIdx
              const colors: ("dark" | "light" | "purple" | "yellow" | "green")[] = ["dark", "dark", "light", "light"]
              
              return (
                <ObjectiveCard
                  key={step.id}
                  title={step.title}
                  subtitle={isCurrent ? "main" : isCompleted ? "completed" : "personal"}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  colorScheme={colors[idx % colors.length]}
                  onClick={() => {
                    if (!isCompleted || isCurrent) {
                      toggleStepComplete(step.id)
                    }
                  }}
                />
              )
            })}
          </div>
        </motion.div>

        {/* Two Column Layout: Practical + Theory */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Practical Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">practical</h3>
            
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
              {practicalSkills.slice(0, 3).map((step, idx) => {
                const isCompleted = !!completedSteps[step.id]
                const colors: ("purple" | "gray" | "yellow" | "blue" | "green")[] = ["gray", "purple", "purple", "yellow", "blue"]
                
                return (
                  <PracticalCard
                    key={step.id}
                    title={step.title}
                    subtitle={step.duration}
                    progress={isCompleted ? 100 : 0}
                    color={colors[idx % colors.length]}
                    isCompleted={isCompleted}
                    onClick={() => toggleStepComplete(step.id)}
                  />
                )
              })}
            </div>
          </motion.div>

          {/* Level Theory Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">level theory</h3>
            
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
              {theoryTopics.map((step, idx) => (
                <TheoryCard
                  key={step.id}
                  title={step.title}
                  duration={step.duration}
                  thumbnail=""
                  isPlaying={idx === 0}
                  onClick={() => setSelectedNode(step.id)}
                />
              ))}
              
              {/* Community cards */}
              <div className="flex flex-col gap-3 ml-4">
                <CommunityCard
                  name="Anna"
                  message="If you need any help, I'm here to support. Ping me any time!"
                  avatar=""
                  timeAgo="1 year ago"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{progress}%</p>
                <p className="text-gray-500 text-sm">Journey Complete</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {Object.keys(completedSteps).length}/{roadmapSteps.length}
                </p>
                <p className="text-gray-500 text-sm">Topics Completed</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">Week {currentWeek}</p>
                <p className="text-gray-500 text-sm">Current Progress</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">Level {currentLevel}</p>
                <p className="text-gray-500 text-sm">Current Level</p>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* SVG Journey Path Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg overflow-hidden"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Your Learning Path
          </h3>
          
          <div className="relative h-[400px] overflow-x-auto">
            <svg className="absolute inset-0 w-full h-full" style={{ minWidth: roadmapSteps.length * 150 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Curved path */}
              <motion.path
                d={`M 60 200 ${roadmapSteps.map((_, i) => {
                  const x = 60 + i * 140
                  const y = 200 + Math.sin(i * 0.8) * 80
                  return `Q ${x + 70} ${y + (i % 2 === 0 ? -60 : 60)}, ${x + 140} ${200 + Math.sin((i + 1) * 0.8) * 80}`
                }).join(' ')}`}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth={4}
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Background path (gray) */}
              <path
                d={`M 60 200 ${roadmapSteps.map((_, i) => {
                  const x = 60 + i * 140
                  const y = 200 + Math.sin(i * 0.8) * 80
                  return `Q ${x + 70} ${y + (i % 2 === 0 ? -60 : 60)}, ${x + 140} ${200 + Math.sin((i + 1) * 0.8) * 80}`
                }).join(' ')}`}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="8 8"
              />
            </svg>
            
            {/* Journey Nodes */}
            {roadmapSteps.map((step, idx) => {
              const isCompleted = !!completedSteps[step.id]
              const isCurrent = !isCompleted && idx === currentStepIdx
              const x = 60 + idx * 140
              const y = 200 + Math.sin(idx * 0.8) * 80
              
              return (
                <motion.div
                  key={step.id}
                  className="absolute"
                  style={{ left: x - 24, top: y - 24 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{
                    opacity: { delay: 0.5 + idx * 0.1 },
                    scale: { delay: 0.5 + idx * 0.1, type: "spring" },
                    y: { duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleStepComplete(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isCompleted 
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500" 
                        : isCurrent
                        ? "bg-gradient-to-br from-blue-400 to-cyan-500"
                        : "bg-white border-2 border-gray-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </motion.div>
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.button>
                  
                  {/* Node label */}
                  <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center ${
                    idx % 2 === 0 ? "top-14" : "bottom-14"
                  }`}>
                    <p className="text-xs font-semibold text-gray-700 max-w-[100px] truncate">{step.title}</p>
                    <p className="text-xs text-gray-400">Week {step.week}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
