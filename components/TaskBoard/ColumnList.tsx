'use client'

import { Droppable } from '@hello-pangea/dnd'
import { Card } from '@/components/TaskBoard'
import type { Task } from '@prisma/client'
import { ListWithTasks } from '@/types'
import { cn } from '@/lib/utils'

interface ColumnListProp {
  tasks: Task[]
  column: ListWithTasks
}

export const ColumnList: React.FC<ColumnListProp> = ({ tasks, column }) => {
  return (
    <Droppable droppableId={column.id} type="card">
      {(provided) => (
        <div
          className={cn(`flex flex-col gap-y-4`, tasks.length > 0 && 'mt-6')}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks
            ? tasks.map((task, index) => (
                <Card key={task.id} task={task} column={column} index={index} />
              ))
            : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
