'use client'

import { Task } from '@prisma/client'
import { ColumnHeader, ColumnList } from '@/components/TaskBoard'
import { ListWithTasks } from '@/types'

interface ColumnProp {
  title: string
  column: ListWithTasks
  tasks: Task[]
}

export const Column: React.FC<ColumnProp> = ({ title, tasks, column }) => {
  return (
    <div>
      <div className="rounded-lg bg-gray-50 px-5 py-6">
        <ColumnHeader
          title={title}
          count={tasks.length ? tasks.length : 0}
          columnId={column.id}
        />
        <ColumnList tasks={tasks} column={column} />
      </div>
    </div>
  )
}
