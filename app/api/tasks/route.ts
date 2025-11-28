import { NextResponse } from "next/server"
import { getTasks, createTask } from "@/lib/tasks"

export async function GET() {
  try {
    const tasks = getTasks()
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.text || typeof body.text !== "string" || body.text.trim() === "") {
      return NextResponse.json({ error: "Task text is required" }, { status: 400 })
    }

    const task = createTask(body.text.trim())
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
