'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/createSafeAction'

import { MoveTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, direction } = data
  let task

  try {
    task = await db.task.findFirst({
      where: {
        id,
      },
    })

    if (!task) {
      return {
        error: 'Task not found',
      }
    }

    const currentList = await db.list.findFirst({
      where: {
        id: task.listId,
      },
    })

    if (!currentList) {
      return {
        error: 'Failed to move task.',
      }
    }

    const newList = await db.list.findFirst({
      where: {
        order:
          direction == 'next' ? currentList.order + 1 : currentList.order - 1,
      },
    })

    if (!newList) {
      return {
        error: 'Failed to move task.',
      }
    }

    await db.task.update({
      where: {
        id,
      },
      data: {
        listId: newList.id,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to move task.',
    }
  }

  revalidatePath(`/tasks`)
  return { data: task }
}

export const moveToNextStage = createSafeAction(MoveTask, handler)
