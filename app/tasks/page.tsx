"use client"

import { useState, useCallback } from "react"
import useSWR from "swr"
import { Navbar } from "@/components/navbar"
import { TaskList } from "@/components/task-list"
import { AddTaskModal } from "@/components/add-task-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { Task } from "@/lib/types"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
  ? `http://${window.location.hostname}:5000`
  : 'http://localhost:5000'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  }
  return res.json()
}

export default function TasksPage() {
  const { data: tasks, error, isLoading, mutate } = useSWR<Task[]>(`${API_BASE_URL}/tasks`, fetcher)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAddTask = useCallback(
    async (text: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        })

        if (!res.ok) throw new Error("Failed to add task")

        await mutate()
        toast.success("Task added successfully")
      } catch (error) {
        toast.error("Failed to add task")
      }
    },
    [mutate],
  )

  const handleToggleTask = useCallback(
    async (task: Task) => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, completed: !task.completed }),
        })

        if (!res.ok) throw new Error("Failed to update task")

        const updated = await res.json()

        // Optimistically update SWR cache
        mutate((prev) => (prev ? prev.map((t) => (t.id === updated.id ? updated : t)) : prev), false)

        toast.success(updated.completed ? "Task completed" : "Task uncompleted")
      } catch (error) {
        toast.error("Failed to update task")
      }
    },
    [mutate],
  )

  const handleEditTask = useCallback(
    async (id: string, text: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        })

        if (!res.ok) throw new Error("Failed to update task")

        await mutate()
        toast.success("Task updated")
      } catch (error) {
        toast.error("Failed to update task")
      }
    },
    [mutate],
  )

  const handleDeleteTask = useCallback(async () => {
    if (!deleteId) return

    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${deleteId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete task")

      await mutate()
      toast.success("Task deleted")
    } catch (error) {
      toast.error("Failed to delete task")
    } finally {
      setDeleteId(null)
    }
  }, [deleteId, mutate])

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your tasks and stay organized</p>
          </div>
          <AddTaskModal onAdd={handleAddTask} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
            Failed to load tasks. Please try again.
          </div>
        ) : (
          <TaskList
            tasks={tasks || []}
            onToggle={handleToggleTask}
            onDelete={(id) => setDeleteId(id)}
            onEdit={handleEditTask}
          />
        )}

        <DeleteConfirmationModal
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={handleDeleteTask}
        />
      </main>
    </div>
  )
}
