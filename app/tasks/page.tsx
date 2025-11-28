"use client"

import { useState, useCallback, useEffect } from "react"
import useSWR from "swr"
import { Navbar } from "@/components/navbar"
import { TaskList } from "@/components/task-list"
import { AddTaskModal } from "@/components/add-task-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { Task } from "@/lib/api"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function TasksPage(): JSX.Element {
  const { data: tasks, error, isLoading, mutate } = useSWR<Task[], { message: string }>(
    'tasks',
    () => apiClient.getTasks(),
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  )
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAddTask = useCallback(
    async (text: string): Promise<void> => {
      try {
        const newTask = await apiClient.createTask(text)
        await mutate()
        toast.success("Task added successfully")
      } catch (error: any) {
        toast.error(error?.message || "Failed to add task")
      }
    },
    [mutate],
  )

  const handleToggleTask = useCallback(
    async (task: Task): Promise<void> => {
      try {
        const updated = await apiClient.updateTask(task.id, { 
          ...task, 
          completed: !task.completed 
        })
        mutate((prev) => (prev ? prev.map((t) => (t.id === updated.id ? updated : t)) : prev), false)
        toast.success(updated.completed ? "Task completed" : "Task uncompleted")
      } catch (error: any) {
        toast.error(error?.message || "Failed to update task")
      }
    },
    [mutate],
  )

  const handleEditTask = useCallback(
    async (id: string, text: string): Promise<void> => {
      try {
        const updated = await apiClient.updateTask(id, { text })
        mutate((prev) => (prev ? prev.map((t) => (t.id === updated.id ? updated : t)) : prev), false)
        toast.success("Task updated")
      } catch (error: any) {
        toast.error(error?.message || "Failed to update task")
      }
    },
    [mutate],
  )

  const handleDeleteTask = useCallback(async (): Promise<void> => {
    if (!deleteId) return

    try {
      await apiClient.deleteTask(deleteId)
      await mutate()
      toast.success("Task deleted")
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete task")
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
