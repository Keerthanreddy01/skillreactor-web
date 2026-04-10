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
  X,
  BookOpen,
  Target,
  Star
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

interface JourneyNode {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "locked"
  week: number
  resources: string[]
}

// Generate curved path between two points
function generateCurvedPath(
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number,
  curveDirection: "right" | "left" = "right"
): string {
  const midX = (x1 + x2) / 2
  const controlOffset = Math.abs(y2 - y1) * 0.5
  
  if (curveDirection === "right") {
    return `M ${x1} ${y1} Q ${midX + controlOffset} ${y1}, ${midX} ${(y1 + y2) / 2} Q ${midX - controlOffset} ${y2}, ${x2} ${y2}`
  } else {
    return `M ${x1} ${y1} Q ${midX - controlOffset} ${y1}, ${midX} ${(y1 + y2) / 2} Q ${midX + controlOffset} ${y2}, ${x2} ${y2}`
  }
}

// Floating Node Component
function JourneyNodeCard({ 
  node, 
  index, 
  isSelected, 
  onSelect,
  onComplete,
  position 
}: { 
  node: JourneyNode
  index: number
  isSelected: boolean
  onSelect: () => void
  onComplete: () => void
  position: { x: number; y: number }
}) {
  const isCompleted = node.status === "completed"
  const isCurrent = node.status === "current"
  const isLocked = node.status === "locked"

  const statusColors = {
    completed: { bg: "from-emerald-400 to-teal-500", glow: "rgba(16, 185, 129, 0.4)", border: "#10b981" },
    current: { bg: "from-blue-500 to-cyan-400", glow: "rgba(59, 130, 246, 0.5)", border: "#3b82f6" },
    locked: { bg: "from-gray-300 to-gray-400", glow: "transparent", border: "#9ca3af" },
  }

  const colors = statusColors[node.status]

  return (
    <motion.div
      className="absolute"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: "translate(-50%, -50%)"
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: index * 0.15 },
        scale: { duration: 0.5, delay: index * 0.15, type: "spring" },
        y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
      }}
    >
      {/* Glow effect for current/completed */}
      {!isLocked && (
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl -z-10"
          style={{ background: colors.glow }}
          animate={isCurrent ? {
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Main card */}
      <motion.button
        onClick={onSelect}
        disabled={isLocked}
        whileHover={!isLocked ? { scale: 1.05, y: -4 } : {}}
        whileTap={!isLocked ? { scale: 0.98 } : {}}
        className={`relative w-44 bg-white rounded-2xl p-4 shadow-xl border-2 transition-all duration-300 text-left ${
          isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:shadow-2xl"
        } ${isSelected ? "ring-4 ring-blue-200" : ""}`}
        style={{ borderColor: colors.border }}
      >
        {/* Status icon */}
        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${colors.bg}`}>
          {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
          {isCurrent && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play className="w-4 h-4 text-white fill-white" />
            </motion.div>
          )}
          {isLocked && <Lock className="w-4 h-4 text-white" />}
        </div>

        {/* Week badge */}
        <div className="text-xs font-mono text-gray-400 mb-2">Week {node.week}</div>

        {/* Title */}
        <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${isLocked ? "text-gray-400" : "text-gray-800"}`}>
          {node.title}
        </h4>

        {/* Duration */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {node.duration}
        </div>

        {/* Progress indicator for current */}
        {isCurrent && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-b-2xl"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        )}
      </motion.button>
    </motion.div>
  )
}

// Node Detail Panel
function NodeDetailPanel({ 
  node, 
  onClose, 
  onComplete,
  onUndo 
}: { 
  node: JourneyNode
  onClose: () => void
  onComplete: () => void
  onUndo: () => void
}) {
  const isCompleted = node.status === "completed"
  const isCurrent = node.status === "current"

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", damping: 25 }}
      className="w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className={`p-6 bg-gradient-to-br ${
        isCompleted ? "from-emerald-400 to-teal-500" : 
        isCurrent ? "from-blue-500 to-cyan-400" : "from-gray-300 to-gray-400"
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-white/80 text-xs font-mono">Week {node.week}</span>
            <h3 className="text-white font-bold text-lg mt-1">{node.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-xs">
            <Clock className="w-3 h-3" />
            {node.duration}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-xs">
            {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Target className="w-3 h-3" />}
            {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Locked"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{node.description}</p>

        {/* Resources */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Learning Resources
          </h4>
          <div className="flex flex-wrap gap-2">
            {node.resources.map((resource, idx) => (
              <motion.span
                key={resource}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 cursor-pointer transition-colors"
              >
                {resource}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {!node.status.includes("locked") && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isCompleted ? onUndo : onComplete}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              isCompleted 
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Main Visual Journey Component
export function VisualJourney() {
  const { roadmapSteps, completedSteps, toggleStepComplete, profile, getProgressPercent } = useApp()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [pathsDrawn, setPathsDrawn] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])

  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal as keyof typeof CAREER_GOALS] : null
  const progress = getProgressPercent()

  // Convert roadmap steps to journey nodes
  const journeyNodes: JourneyNode[] = roadmapSteps.map((step, idx) => {
    const isCompleted = !!completedSteps[step.id]
    const firstIncompleteIdx = roadmapSteps.findIndex(s => !completedSteps[s.id])
    const isCurrent = !isCompleted && idx === firstIncompleteIdx
    const isLocked = !isCompleted && idx > firstIncompleteIdx

    return {
      id: step.id,
      title: step.title,
      description: step.description,
      duration: step.duration,
      status: isCompleted ? "completed" : isCurrent ? "current" : "locked",
      week: step.week,
      resources: step.resources
    }
  })

  // Calculate node positions in a curved path
  const getNodePositions = () => {
    const positions: { x: number; y: number }[] = []
    const totalNodes = journeyNodes.length
    const containerWidth = 900
    const startY = 120
    const rowHeight = 180
    const nodesPerRow = 3

    journeyNodes.forEach((_, idx) => {
      const row = Math.floor(idx / nodesPerRow)
      const col = idx % nodesPerRow
      const isEvenRow = row % 2 === 0
      
      // Zig-zag pattern
      const x = isEvenRow 
        ? 120 + col * ((containerWidth - 240) / (nodesPerRow - 1))
        : containerWidth - 120 - col * ((containerWidth - 240) / (nodesPerRow - 1))
      
      const y = startY + row * rowHeight
      
      // Add slight wave effect
      const waveOffset = Math.sin(idx * 0.8) * 20
      
      positions.push({ x, y: y + waveOffset })
    })

    return positions
  }

  const nodePositions = getNodePositions()

  // Generate SVG paths connecting nodes
  const generatePaths = () => {
    const paths: { d: string; completed: boolean }[] = []
    
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const start = nodePositions[i]
      const end = nodePositions[i + 1]
      const row = Math.floor(i / 3)
      const curveDirection = row % 2 === 0 ? "right" : "left"
      
      // Simple curved path
      const midX = (start.x + end.x) / 2
      const midY = (start.y + end.y) / 2
      const curvature = 40
      
      let d: string
      if (start.y === end.y) {
        // Horizontal with curve
        d = `M ${start.x} ${start.y} Q ${midX} ${midY - curvature}, ${end.x} ${end.y}`
      } else {
        // Vertical/diagonal with S-curve
        const cp1x = start.x
        const cp1y = start.y + (end.y - start.y) * 0.5
        const cp2x = end.x
        const cp2y = start.y + (end.y - start.y) * 0.5
        d = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`
      }
      
      paths.push({ 
        d, 
        completed: journeyNodes[i].status === "completed" 
      })
    }
    
    return paths
  }

  const paths = generatePaths()
  const selectedNodeData = selectedNode ? journeyNodes.find(n => n.id === selectedNode) : null

  useEffect(() => {
    // Trigger path animation after mount
    const timer = setTimeout(() => setPathsDrawn(true), 500)
    return () => clearTimeout(timer)
  }, [])

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

  const containerHeight = Math.ceil(journeyNodes.length / 3) * 180 + 200

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"
        style={{ y: parallaxY }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Learning Journey</h1>
              <p className="text-gray-500 text-sm">{goalInfo?.label || "Career Path"}</p>
            </div>
          </div>

          {/* Progress stats */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{progress}%</p>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {journeyNodes.filter(n => n.status === "completed").length}/{journeyNodes.length}
                </p>
                <p className="text-xs text-gray-500">Topics Done</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  Week {journeyNodes.find(n => n.status === "current")?.week || 1}
                </p>
                <p className="text-xs text-gray-500">Current</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journey visualization */}
      <div className="relative flex">
        {/* Main canvas */}
        <div 
          ref={containerRef}
          className="flex-1 relative overflow-x-auto"
          style={{ minHeight: containerHeight }}
        >
          <div className="relative" style={{ width: 900, minHeight: containerHeight, margin: "0 auto" }}>
            {/* SVG Paths */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ width: 900, height: containerHeight }}
            >
              <defs>
                <linearGradient id="pathGradientCompleted" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
                <linearGradient id="pathGradientPending" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d1d5db" />
                  <stop offset="100%" stopColor="#e5e7eb" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {paths.map((path, idx) => (
                <g key={idx}>
                  {/* Background path */}
                  <motion.path
                    d={path.d}
                    fill="none"
                    stroke={path.completed ? "url(#pathGradientCompleted)" : "url(#pathGradientPending)"}
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: pathsDrawn ? 1 : 0 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: idx * 0.2,
                      ease: "easeInOut"
                    }}
                    filter={path.completed ? "url(#glow)" : "none"}
                  />
                  
                  {/* Animated dot traveling along path */}
                  {path.completed && (
                    <motion.circle
                      r={4}
                      fill="#10b981"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: idx * 0.5 
                      }}
                    >
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={path.d}
                      />
                    </motion.circle>
                  )}
                </g>
              ))}
            </svg>

            {/* Journey Nodes */}
            {journeyNodes.map((node, idx) => (
              <JourneyNodeCard
                key={node.id}
                node={node}
                index={idx}
                isSelected={selectedNode === node.id}
                onSelect={() => setSelectedNode(node.id)}
                onComplete={() => toggleStepComplete(node.id)}
                position={nodePositions[idx]}
              />
            ))}

            {/* Start indicator */}
            <motion.div
              className="absolute"
              style={{ 
                left: nodePositions[0]?.x - 80, 
                top: nodePositions[0]?.y,
                transform: "translateY(-50%)"
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full shadow-lg">
                <Star className="w-4 h-4 fill-white" />
                <span className="text-sm font-semibold">Start</span>
              </div>
            </motion.div>

            {/* End indicator */}
            <motion.div
              className="absolute"
              style={{ 
                left: nodePositions[nodePositions.length - 1]?.x + 80, 
                top: nodePositions[nodePositions.length - 1]?.y,
                transform: "translateY(-50%)"
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-semibold">Goal</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedNodeData && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="relative z-20 p-4"
            >
              <NodeDetailPanel
                node={selectedNodeData}
                onClose={() => setSelectedNode(null)}
                onComplete={() => {
                  toggleStepComplete(selectedNodeData.id)
                  setSelectedNode(null)
                }}
                onUndo={() => {
                  toggleStepComplete(selectedNodeData.id)
                  setSelectedNode(null)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Journey progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-gray-100">
          <div className="flex items-center gap-2">
            {journeyNodes.slice(0, 7).map((node, idx) => (
              <motion.div
                key={node.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  node.status === "completed" 
                    ? "bg-emerald-500" 
                    : node.status === "current"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                animate={node.status === "current" ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
            {journeyNodes.length > 7 && (
              <span className="text-xs text-gray-500">+{journeyNodes.length - 7}</span>
            )}
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="text-sm font-semibold text-gray-800">{progress}% Complete</div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </motion.div>
    </div>
  )
}
