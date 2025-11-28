"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { toast } from "sonner"

export default function PomodoroPage() {
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  useEffect(() => {
    // Load settings from localStorage
    const savedWork = localStorage.getItem("focusflow-work-duration")
    const savedBreak = localStorage.getItem("focusflow-break-duration")

    if (savedWork) setWorkDuration(Number.parseInt(savedWork))
    if (savedBreak) setBreakDuration(Number.parseInt(savedBreak))
  }, [])

  const handleSessionComplete = (type: "work" | "break") => {
    if (type === "work") {
      toast.success("Focus session complete! Time for a break.")
    } else {
      toast.success("Break over! Ready to focus again?")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Focus in intervals and take regular breaks</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <PomodoroTimer
            workDuration={workDuration}
            breakDuration={breakDuration}
            onSessionComplete={handleSessionComplete}
          />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">The Pomodoro Technique</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Work for {workDuration} minutes with full focus</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Take a {breakDuration}-minute break to recharge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              <span>Repeat the cycle to build momentum</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
