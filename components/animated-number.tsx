import { useEffect, useState } from "react"

export function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateValue = () => {
      const now = Date.now()
      if (now < endTime) {
        const progress = (now - startTime) / duration
        setDisplayValue(Math.floor(value * progress))
        requestAnimationFrame(updateValue)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(updateValue)
  }, [value, duration])

  return <>{displayValue}</>
}
