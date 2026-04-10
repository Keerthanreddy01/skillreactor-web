"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { AppShell } from "@/components/app-shell"
import { AuthPage } from "@/components/auth-page"
import { GoalSelectPage } from "@/components/goal-select-page"
import { DashboardPage } from "@/components/dashboard-page"
import { RoadmapPage } from "@/components/roadmap-page"
import { PlannerPage } from "@/components/planner-page"
import { ProgressPage } from "@/components/progress-page"
import { MentorPage } from "@/components/mentor-page"

function AppRouter() {
  const { user, currentPage } = useApp()

  if (!user) return <AuthPage />

  if (currentPage === "goal-select") {
    return (
      <AppShell>
        <GoalSelectPage />
      </AppShell>
    )
  }

  return (
    <AppShell>
      {currentPage === "dashboard" && <DashboardPage />}
      {currentPage === "roadmap" && <RoadmapPage />}
      {currentPage === "planner" && <PlannerPage />}
      {currentPage === "progress" && <ProgressPage />}
      {currentPage === "mentor" && <MentorPage />}
    </AppShell>
  )
}

export default function LoginPage() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}
