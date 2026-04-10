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

export interface StreakData {
  currentStreak: number
  lastActivityDate: string | null
  longestStreak: number
}

export interface AppState {
  user: User | null
  profile: UserProfile
  completedSteps: Record<string, boolean>
  completedDates: Record<string, string> // stepId -> ISO date
  roadmapSteps: RoadmapStep[]
  currentPage: Page
  streak: StreakData
  currentTopicIndex: number
}

export type Page = "auth" | "goal-select" | "dashboard" | "roadmap" | "journey" | "planner" | "progress" | "mentor"

interface AppContextValue extends AppState {
  login: (name: string, email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
  setCurrentPage: (page: Page) => void
  saveProfile: (goal: CareerGoal | CustomGoal, skillLevel: SkillLevel, hoursPerWeek: number) => void
  toggleStepComplete: (stepId: string) => void
  markStepDone: (stepId: string) => void
  getProgressPercent: () => number
  getCurrentTopic: () => RoadmapStep | null
  updateStreakIfNeeded: () => void
}

const defaultState: AppState = {
  user: null,
  profile: { goal: null, skillLevel: null, hoursPerWeek: 10 },
  completedSteps: {},
  completedDates: {},
  roadmapSteps: [],
  currentPage: "auth",
  streak: { currentStreak: 0, lastActivityDate: null, longestStreak: 0 },
  currentTopicIndex: 0,
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
        completedDates: {},
        currentTopicIndex: 0,
        streak: { currentStreak: 0, lastActivityDate: null, longestStreak: 0 },
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

  const getCurrentTopic = useCallback(() => {
    if (!state.roadmapSteps.length) return null
    // Find first incomplete topic
    const current = state.roadmapSteps.find((s) => !state.completedSteps[s.id])
    return current || state.roadmapSteps[state.roadmapSteps.length - 1]
  }, [state])

  const updateStreakIfNeeded = useCallback(() => {
    const today = new Date().toISOString().split("T")[0]
    const lastDate = state.streak.lastActivityDate
    
    if (!lastDate) {
      // First activity
      persist({
        ...state,
        streak: { currentStreak: 1, lastActivityDate: today, longestStreak: 1 },
      })
      return
    }

    const lastDateObj = new Date(lastDate)
    const todayObj = new Date(today)
    const diffDays = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // Already counted today
      return
    } else if (diffDays === 1) {
      // Consecutive day
      const newStreak = state.streak.currentStreak + 1
      const newLongest = Math.max(newStreak, state.streak.longestStreak)
      persist({
        ...state,
        streak: { currentStreak: newStreak, lastActivityDate: today, longestStreak: newLongest },
      })
    } else {
      // Gap in streak, reset
      persist({
        ...state,
        streak: { currentStreak: 1, lastActivityDate: today, longestStreak: state.streak.longestStreak },
      })
    }
  }, [state, persist])

  const markStepDone = useCallback(
    (stepId: string) => {
      const today = new Date().toISOString().split("T")[0]
      const completed = { ...state.completedSteps, [stepId]: true }
      const dates = { ...state.completedDates, [stepId]: today }
      
      // Find next incomplete topic
      let nextIndex = state.currentTopicIndex
      const nextIncomplete = state.roadmapSteps.findIndex((s, i) => i > state.currentTopicIndex && !completed[s.id])
      if (nextIncomplete !== -1) {
        nextIndex = nextIncomplete
      }

      updateStreakIfNeeded()

      persist({
        ...state,
        completedSteps: completed,
        completedDates: dates,
        currentTopicIndex: nextIndex,
      })
    },
    [state, persist, updateStreakIfNeeded]
  )

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
        markStepDone,
        getProgressPercent,
        getCurrentTopic,
        updateStreakIfNeeded,
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
