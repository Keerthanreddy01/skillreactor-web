import type { RoadmapStep } from "./roadmap-data"

export interface CustomGoal {
  id: string
  name: string
  description: string
  topics: string[]
  color: string
  createdAt: number
}

const CUSTOM_GOALS_KEY = "skillreactor_custom_goals"

export function getCustomGoals(): CustomGoal[] {
  try {
    const raw = localStorage.getItem(CUSTOM_GOALS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCustomGoal(goal: CustomGoal): void {
  try {
    const goals = getCustomGoals()
    const index = goals.findIndex((g) => g.id === goal.id)
    if (index >= 0) {
      goals[index] = goal
    } else {
      goals.push(goal)
    }
    localStorage.setItem(CUSTOM_GOALS_KEY, JSON.stringify(goals))
  } catch (error) {
    console.error("[v0] Failed to save custom goal:", error)
  }
}

export function deleteCustomGoal(goalId: string): void {
  try {
    const goals = getCustomGoals()
    localStorage.setItem(CUSTOM_GOALS_KEY, JSON.stringify(goals.filter((g) => g.id !== goalId)))
  } catch (error) {
    console.error("[v0] Failed to delete custom goal:", error)
  }
}

export function generateCustomRoadmap(goal: CustomGoal, skillLevel: "beginner" | "intermediate"): RoadmapStep[] {
  const weeksPerTopic = skillLevel === "beginner" ? 2 : 1.5
  const steps: RoadmapStep[] = []

  goal.topics.forEach((topic, idx) => {
    const week = Math.ceil((idx + 1) * weeksPerTopic)
    const duration = skillLevel === "beginner" ? "2 weeks" : "1-2 weeks"

    steps.push({
      id: `custom-${goal.id}-${idx}`,
      title: topic,
      description: `Learn and master ${topic}`,
      duration,
      week,
      resources: ["Official Documentation", "Online Tutorials", "Practice Projects"],
    })
  })

  return steps
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#6366f1",
  "#14b8a6",
]

export function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export function generateId(): string {
  return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
