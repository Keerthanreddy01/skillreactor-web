"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Menu } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"

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
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 h-full">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-14 border-b"
          style={{ borderColor: "var(--border)", background: "var(--background)" }}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
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
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--primary)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
              {goalInfo.label}
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
