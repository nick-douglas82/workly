import { z } from 'zod'
import { Task } from '@prisma/client'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateTaskOrder } from './schema'

export type InputType = z.infer<typeof UpdateTaskOrder>
export type ReturnType = ActionState<InputType, Task[]>
