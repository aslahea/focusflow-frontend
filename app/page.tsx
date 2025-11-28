import type React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ListTodo, Timer, Settings, ArrowRight, Zap, Target, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span>Boost your productivity</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Stay Focused.
            <br />
            <span className="text-primary">Get More Done.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            FocusFlow combines a powerful task manager with the Pomodoro technique to help you manage your time, stay
            focused, and accomplish your goals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/tasks">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pomodoro">Try Pomodoro</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <ListTodo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Task Management</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create, organize, and track your tasks with a clean, intuitive interface.
              </p>
              <Link
                href="/tasks"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Manage tasks
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                <Timer className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Pomodoro Timer</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Work in focused intervals with breaks to maintain peak productivity.
              </p>
              <Link
                href="/pomodoro"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                Start timer
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-border bg-card sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                <Settings className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Customizable Settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Adjust timer durations and theme to match your workflow preferences.
              </p>
              <Link
                href="/settings"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                Customize
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold">How It Works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 font-semibold">Add Your Tasks</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create a list of tasks you want to accomplish today</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 font-semibold">Start the Timer</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Focus on one task for 25 minutes without distractions
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 font-semibold">Take a Break</h3>
              <p className="mt-2 text-sm text-muted-foreground">Rest for 5 minutes, then repeat the cycle</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-24 rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <Target className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 text-3xl font-bold">25 min</p>
              <p className="mt-1 text-sm text-muted-foreground">Focus sessions</p>
            </div>
            <div>
              <Coffee className="mx-auto h-8 w-8 text-accent" />
              <p className="mt-4 text-3xl font-bold">5 min</p>
              <p className="mt-1 text-sm text-muted-foreground">Break time</p>
            </div>
            <div>
              <Clock className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-3xl font-bold">4x</p>
              <p className="mt-1 text-sm text-muted-foreground">More productive</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Timer className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">FocusFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  )
}
