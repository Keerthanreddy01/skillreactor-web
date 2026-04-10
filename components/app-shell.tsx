"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Menu } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import { motion, AnimatePresence } from "framer-motion"

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  roadmap: "My Roadmap",
  planner: "Weekly Planner",
  progress: "Progress Tracker",
  mentor: "Chat Mentor",
  "goal-select": "Career Goal",
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentPage, profile } = useApp()
  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.div
                className="relative w-72 h-full"
                initial={{ x: -288 }}
                animate={{ x: 0 }}
                exit={{ x: -288 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Sidebar mobile onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b backdrop-blur-sm bg-background/80"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <motion.button
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSidebarOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-foreground font-semibold text-sm">
                {PAGE_TITLES[currentPage] ?? "SkillReactor"}
              </h1>
              {goalInfo && currentPage !== "goal-select" && (
                <p className="text-muted-foreground text-xs hidden sm:block">
                  {goalInfo.label} · {profile.skillLevel === "beginner" ? "Beginner" : "Intermediate"}
                </p>
              )}
            </div>
          </div>

          {/* Right: goal badge */}
          {goalInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
                color: "var(--primary)",
                boxShadow: "0 0 12px var(--glow-cyan)",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {goalInfo.label}
            </motion.div>
          )}
        </header>

        {/* Page content */}
        <motion.main
          className="flex-1 overflow-y-auto p-4 md:p-6 page-fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          key={currentPage}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
