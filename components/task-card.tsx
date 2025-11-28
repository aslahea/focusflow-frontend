"use client"

import { useState } from "react"
import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash2, Pencil, Check, X } from "lucide-react"

interface TaskCardProps {
  task: Task
  onToggle: (task: Task) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text ?? "")

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleStartEdit = () => {
    setEditText(task.text ?? "")
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditText(task.text ?? "")
    setIsEditing(false)
  }

  return (
    <div className={cn("group flex items-center gap-3 p-4 rounded-lg bg-gray-900 transition-all")}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task)}
        className="h-5 w-5"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
          />
          <Button size="icon" variant="ghost" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <p className={cn("text-sm", task.completed ? "line-through opacity-60 text-muted-foreground" : "")}>{task.text}</p>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleStartEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
