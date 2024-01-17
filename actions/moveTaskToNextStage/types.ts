import { z } from 'zod'
import { Task } from '@prisma/client'

import { ActionState } from '@/lib/createSafeAction'

import { MoveTask } from './schema'

export type InputType = z.infer<typeof MoveTask>
export type ReturnType = ActionState<InputType, Task>
