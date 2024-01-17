'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/createSafeAction'

import { CreateTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { title, description, listId } = data
  let task
  let list_id = listId as string

  if (!listId) {
    const firstList = await db.list.findFirst({
      orderBy: { order: 'asc' },
      select: { id: true },
    })

    if (!firstList) {
      return {
        error: 'List not found',
      }
    }

    list_id = firstList?.id
  }

  try {
    const list = await db.list.findUnique({
      where: {
        id: list_id,
      },
    })

    if (!list) {
      return {
        error: 'List not found',
      }
    }

    const lastCard = await db.task.findFirst({
      where: { listId: list_id },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    task = await db.task.create({
      data: {
        title,
        description,
        listId: list_id,
        order: newOrder,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/tasks`, 'page')
  return { data: task }
}

export const createTask = createSafeAction(CreateTask, handler)
