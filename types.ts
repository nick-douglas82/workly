import { List, Task } from '@prisma/client'

export type ListWithTasks = List & { tasks: Task[] }
