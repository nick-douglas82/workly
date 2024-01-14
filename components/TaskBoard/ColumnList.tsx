'use client'

import { Droppable } from '@hello-pangea/dnd'
import { Card } from '@/components/TaskBoard'
import type { Task } from '@prisma/client'

interface ColumnListProp {
  tasks: Task[]
  columnId: string
}

export const ColumnList: React.FC<ColumnListProp> = ({ tasks, columnId }) => {
  return (
    <Droppable droppableId={columnId} type="card">
      {(provided) => (
        <div
          className="mt-6 flex flex-col gap-y-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks
            ? tasks.map((task, index) => (
                <Card key={task.id} task={task} index={index} />
              ))
            : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
