'use server'

import { CreateTask } from '@/actions/createTask/schema'
import { InputType, ReturnType } from '@/actions/createTask/types'
import { createSafeAction } from '@/lib/createSafeAction'
import { Task } from '@prisma/client'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, listId } = data

  let task: Task
  let list_id: string

  if (!title) {
    return {
      error: 'Title is required',
    }
  }

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId || undefined,
      },
    })

    if (!list) {
      return {
        error: 'List not found',
      }
    }
    list_id = list.id

    const lastTask = await db.task.findFirst({
      where: { listId: listId || list_id },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastTask ? lastTask.order + 1 : 1

    task = await db.task.create({
      data: {
        title,
        listId: listId || list.id,
        order: newOrder,
      },
    })
  } catch (error) {
    return {
      error: `Failed to create. ${error}`,
    }
  }

  revalidatePath(`/tasks`)
  return { data: task }
}

export const createTask = createSafeAction(CreateTask, handler)
