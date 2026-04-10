"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { CareerGoal, SkillLevel, RoadmapStep } from "./roadmap-data"
import { getRoadmap } from "./roadmap-data"
import { generateCustomRoadmap, type CustomGoal } from "./custom-goals"

export interface User {
  name: string
  email: string
}

export interface UserProfile {
  goal: CareerGoal | string | null
  skillLevel: SkillLevel | null
  hoursPerWeek: number
}

export interface AppState {
  user: User | null
  profile: UserProfile
  completedSteps: Record<string, boolean>
  roadmapSteps: RoadmapStep[]
  currentPage: Page
}

export type Page = "auth" | "goal-select" | "dashboard" | "roadmap" | "journey" | "planner" | "progress" | "mentor"

interface AppContextValue extends AppState {
  login: (name: string, email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
  setCurrentPage: (page: Page) => void
  saveProfile: (goal: CareerGoal | CustomGoal, skillLevel: SkillLevel, hoursPerWeek: number) => void
  toggleStepComplete: (stepId: string) => void
  getProgressPercent: () => number
}

const defaultState: AppState = {
  user: null,
  profile: { goal: null, skillLevel: null, hoursPerWeek: 10 },
  completedSteps: {},
  roadmapSteps: [],
  currentPage: "auth",
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("skillreactor_state")
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>
        setState((prev) => ({ ...prev, ...saved }))
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const persist = useCallback((newState: AppState) => {
    setState(newState)
    try {
      localStorage.setItem("skillreactor_state", JSON.stringify(newState))
    } catch {
      // ignore
    }
  }, [])

  const login = useCallback(
    (name: string, email: string, _password: string) => {
      const user: User = { name, email }
      const savedProfile = (() => {
        try {
          const raw = localStorage.getItem("skillreactor_state")
          if (raw) return (JSON.parse(raw) as Partial<AppState>).profile ?? defaultState.profile
        } catch {}
        return defaultState.profile
      })()
      const steps = savedProfile.goal && savedProfile.skillLevel
        ? getRoadmap(savedProfile.goal, savedProfile.skillLevel)
        : []
      persist({
        ...state,
        user,
        profile: savedProfile,
        roadmapSteps: steps,
        currentPage: savedProfile.goal ? "dashboard" : "goal-select",
      })
    },
    [state, persist]
  )

  const register = useCallback(
    (name: string, email: string, _password: string) => {
      const user: User = { name, email }
      persist({ ...state, user, currentPage: "goal-select" })
    },
    [state, persist]
  )

  const logout = useCallback(() => {
    localStorage.removeItem("skillreactor_state")
    setState(defaultState)
  }, [])

  const setCurrentPage = useCallback(
    (page: Page) => {
      persist({ ...state, currentPage: page })
    },
    [state, persist]
  )

  const saveProfile = useCallback(
    (goal: CareerGoal | CustomGoal, skillLevel: SkillLevel, hoursPerWeek: number) => {
      let steps: RoadmapStep[] = []
      let goalId: string = ""

      // Check if it's a custom goal (object with topics) or predefined (string)
      if (typeof goal === "object" && goal !== null && "topics" in goal) {
        // Custom goal
        steps = generateCustomRoadmap(goal, skillLevel)
        goalId = goal.id
      } else {
        // Predefined career goal (string)
        steps = getRoadmap(goal as CareerGoal, skillLevel)
        goalId = goal as string
      }

      persist({
        ...state,
        profile: { goal: goalId, skillLevel, hoursPerWeek },
        roadmapSteps: steps,
        completedSteps: {},
        currentPage: "dashboard",
      })
    },
    [state, persist]
  )

  const toggleStepComplete = useCallback(
    (stepId: string) => {
      const updated = { ...state.completedSteps, [stepId]: !state.completedSteps[stepId] }
      persist({ ...state, completedSteps: updated })
    },
    [state, persist]
  )

  const getProgressPercent = useCallback(() => {
    if (!state.roadmapSteps.length) return 0
    const done = state.roadmapSteps.filter((s) => state.completedSteps[s.id]).length
    return Math.round((done / state.roadmapSteps.length) * 100)
  }, [state])

  if (!hydrated) return null

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        setCurrentPage,
        saveProfile,
        toggleStepComplete,
        getProgressPercent,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used inside AppProvider")
  return ctx
}
