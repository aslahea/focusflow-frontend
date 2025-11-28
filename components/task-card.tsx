"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Trash2, Pencil, Check, X } from "lucide-react"

interface TaskCardProps {
  task: Task
  onToggle: (task: Task) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onEdit: (id: string, text: string) => Promise<void>
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(task.text ?? "")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSave = async (): Promise<void> => {
    if (editText.trim()) {
      setIsLoading(true)
      try {
        await onEdit(task.id, editText.trim())
        setIsEditing(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleStartEdit = (): void => {
    setEditText(task.text ?? "")
    setIsEditing(true)
  }

  const handleCancel = (): void => {
    setEditText(task.text ?? "")
    setIsEditing(false)
  }

  const handleDelete = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await onDelete(task.id)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await onToggle(task)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("group flex items-center gap-3 p-4 rounded-lg bg-gray-900 transition-all")}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        className="h-5 w-5"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave().catch(console.error)
              }
              if (e.key === "Escape") {
                handleCancel()
              }
            }}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => handleSave().catch(console.error)} 
            disabled={isLoading}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleCancel} 
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <p className={cn("text-sm", task.completed ? "line-through opacity-60 text-muted-foreground" : "")}>{task.text}</p>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8" 
              onClick={handleStartEdit}
              disabled={isLoading}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
