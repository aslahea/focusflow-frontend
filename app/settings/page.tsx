"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Moon, Sun, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

const DEFAULT_WORK_DURATION = "25"
const DEFAULT_BREAK_DURATION = "5"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [workDuration, setWorkDuration] = useState(DEFAULT_WORK_DURATION)
  const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_DURATION)

  useEffect(() => {
    setMounted(true)
    const savedWork = localStorage.getItem("focusflow-work-duration") ?? DEFAULT_WORK_DURATION
    const savedBreak = localStorage.getItem("focusflow-break-duration") ?? DEFAULT_BREAK_DURATION

    setWorkDuration(savedWork)
    setBreakDuration(savedBreak)
  }, [])

  const handleSaveTimer = () => {
    const work = Number.parseInt(workDuration)
    const breakTime = Number.parseInt(breakDuration)

    if (isNaN(work) || work < 1 || work > 120) {
      toast.error("Work duration must be between 1 and 120 minutes")
      return
    }

    if (isNaN(breakTime) || breakTime < 1 || breakTime > 60) {
      toast.error("Break duration must be between 1 and 60 minutes")
      return
    }

    localStorage.setItem("focusflow-work-duration", work.toString())
    localStorage.setItem("focusflow-break-duration", breakTime.toString())
    toast.success("Timer settings saved")
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Customize your FocusFlow experience</p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Choose your preferred theme</CardDescription>
            </CardHeader>
            <CardContent>
              {mounted && (
                <div className="flex gap-3">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    const isActive = theme === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={cn(
                          "flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                          isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                        )}
                      >
                        <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                        <span className={cn("text-sm font-medium", isActive && "text-primary")}>{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timer Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Timer Settings</CardTitle>
              <CardDescription>Customize your Pomodoro timer durations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="work-duration">Work Duration (minutes)</Label>
                  <Input
                    id="work-duration"
                    type="number"
                    min="1"
                    max="120"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                  <Input
                    id="break-duration"
                    type="number"
                    min="1"
                    max="60"
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSaveTimer}>Save Timer Settings</Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About FocusFlow</CardTitle>
              <CardDescription>Version 1.0.0</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                FocusFlow is a productivity app that combines task management with the Pomodoro technique. Built with
                Next.js, React, and Tailwind CSS.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
