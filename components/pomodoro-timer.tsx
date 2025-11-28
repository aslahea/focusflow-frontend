"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface PomodoroTimerProps {
  workDuration?: number // in minutes
  breakDuration?: number // in minutes
  onSessionComplete?: (type: "work" | "break") => void
}

export function PomodoroTimer({ workDuration = 25, breakDuration = 5, onSessionComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalTime = isWorkSession ? workDuration * 60 : breakDuration * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const circumference = 2 * Math.PI * 120

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleComplete = useCallback(() => {
    setIsRunning(false)
    onSessionComplete?.(isWorkSession ? "work" : "break")

    if (isWorkSession) {
      setSessionsCompleted((prev) => prev + 1)
      setIsWorkSession(false)
      setTimeLeft(breakDuration * 60)
    } else {
      setIsWorkSession(true)
      setTimeLeft(workDuration * 60)
    }
  }, [isWorkSession, breakDuration, workDuration, onSessionComplete])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, handleComplete])

  useEffect(() => {
    // Update time when duration props change
    if (!isRunning) {
      setTimeLeft(isWorkSession ? workDuration * 60 : breakDuration * 60)
    }
  }, [workDuration, breakDuration, isWorkSession, isRunning])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(isWorkSession ? workDuration * 60 : breakDuration * 60)
  }

  const switchMode = () => {
    setIsRunning(false)
    setIsWorkSession(!isWorkSession)
    setTimeLeft(!isWorkSession ? workDuration * 60 : breakDuration * 60)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode indicator */}
      <div className="flex items-center gap-2">
        {isWorkSession ? (
          <>
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">Focus Time</span>
          </>
        ) : (
          <>
            <Coffee className="h-5 w-5 text-accent" />
            <span className="text-lg font-medium">Break Time</span>
          </>
        )}
      </div>

      {/* Circular timer */}
      <div className="relative flex h-64 w-64 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className={cn("transition-all duration-1000", isWorkSession ? "text-primary" : "text-accent")}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold tracking-tight">{formatTime(timeLeft)}</span>
          <span className="mt-2 text-sm text-muted-foreground">Session {sessionsCompleted + 1}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button size="lg" variant="outline" className="h-12 w-12 rounded-full p-0 bg-transparent" onClick={resetTimer}>
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full p-0",
            !isWorkSession && "bg-accent text-accent-foreground hover:bg-accent/90",
          )}
          onClick={toggleTimer}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>
        <Button size="lg" variant="outline" className="h-12 w-12 rounded-full p-0 bg-transparent" onClick={switchMode}>
          {isWorkSession ? <Coffee className="h-5 w-5" /> : <Brain className="h-5 w-5" />}
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-center">
        <div>
          <p className="text-2xl font-bold">{sessionsCompleted}</p>
          <p className="text-sm text-muted-foreground">Sessions</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{sessionsCompleted * workDuration}</p>
          <p className="text-sm text-muted-foreground">Minutes Focused</p>
        </div>
      </div>
    </div>
  )
}
