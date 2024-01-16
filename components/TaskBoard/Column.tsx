'use client'

import { Task } from '@prisma/client'
import { ColumnHeader, ColumnList } from '@/components/TaskBoard'

interface ColumnProp {
  title: string
  columnId: string
  tasks: Task[]
}

export const Column: React.FC<ColumnProp> = ({ title, tasks, columnId }) => {
  return (
    <div>
      <div className="rounded-lg bg-gray-100 px-5 py-6">
        <ColumnHeader
          title={title}
          count={tasks.length ? tasks.length : 0}
          columnId={columnId}
        />
        <ColumnList tasks={tasks} columnId={columnId} />
      </div>
    </div>
  )
}
