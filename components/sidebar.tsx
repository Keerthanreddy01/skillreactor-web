"use client"

import { useApp, type Page } from "@/lib/app-context"
import { CAREER_GOALS } from "@/lib/roadmap-data"
import {
  Zap,
  LayoutDashboard,
  Map,
  CalendarDays,
  TrendingUp,
  MessageSquare,
  LogOut,
  ChevronRight,
  Target,
  X,
} from "lucide-react"
import { motion } from "framer-motion"

const NAV_ITEMS: { label: string; page: Page; icon: React.ReactNode }[] = [
  { label: "Dashboard", page: "dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Roadmap", page: "roadmap", icon: <Map className="w-4 h-4" /> },
  { label: "Weekly Planner", page: "planner", icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Progress", page: "progress", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Chat Mentor", page: "mentor", icon: <MessageSquare className="w-4 h-4" /> },
]

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const { currentPage, setCurrentPage, user, profile, logout, getProgressPercent } = useApp()

  const goalInfo = profile.goal ? CAREER_GOALS[profile.goal] : null
  const progress = getProgressPercent()

  const navigate = (page: Page) => {
    setCurrentPage(page)
    onClose?.()
  }

  return (
    <aside
      className={`flex flex-col h-full ${mobile ? "w-full" : "w-64"}`}
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent text-base tracking-tight">
            SkillReactor
          </span>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="mx-3 mb-4 p-3 rounded-xl" style={{ background: "var(--sidebar-accent)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
            style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-foreground text-sm font-medium truncate">{user?.name ?? "User"}</p>
            <p className="text-muted-foreground text-xs truncate">{user?.email ?? ""}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = currentPage === item.page
          return (
            <motion.button
              key={item.page}
              onClick={() => navigate(item.page)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? "text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
              style={active ? { background: "linear-gradient(135deg, #0066ff, #00b4ff)" } : {}}
            >
              {/* Active indicator glow */}
              {active && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
                  style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
                />
              )}
              <span className={`relative z-10 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground transition-colors"}`}>
                {item.icon}
              </span>
              <span className="relative z-10">{item.label}</span>
              {active && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  className="relative z-10 ml-auto"
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              )}
            </motion.button>
          )
        })}

        {/* Change Goal */}
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
          <button
            onClick={() => navigate("goal-select")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
          >
            <Target className="w-4 h-4" />
            Change Goal
          </button>
        </div>
      </nav>

      {/* Progress summary */}
      {goalInfo && (
        <div className="mx-3 mb-3 p-3 rounded-xl" style={{ background: "var(--sidebar-accent)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">{goalInfo.label}</span>
            <span className="text-xs font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
            />
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
