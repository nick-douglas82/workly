'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/createSafeAction'

import { UpdateTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, ...values } = data
  let task

  try {
    task = await db.task.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to update.',
    }
  }

  revalidatePath(`/tasks`)
  return { data: task }
}

export const updateTask = createSafeAction(UpdateTask, handler)
