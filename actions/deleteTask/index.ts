'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/createSafeAction'

import { DeleteTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data
  let task

  try {
    task = await db.task.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to delete.',
    }
  }

  revalidatePath(`/tasks`)
  return { data: task }
}

export const deleteTask = createSafeAction(DeleteTask, handler)
