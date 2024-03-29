'use server'

import type { Task } from '@prisma/client'
import { UpdateTaskOrder } from '@/actions/updateTaskOrder/schema'
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/createSafeAction'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { items } = data
  let updatedCards

  try {
    const transaction = items.map((task: Task) =>
      db.task.update({
        where: {
          id: task.id,
        },
        data: {
          order: task.order,
          listId: task.listId,
        },
      })
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder.',
    }
  }

  revalidatePath(`/tasks`)
  return { data: updatedCards }
}

export const updateTaskOrder = createSafeAction(UpdateTaskOrder, handler)
