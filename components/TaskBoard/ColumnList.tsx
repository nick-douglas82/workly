'use client'

import { Droppable } from '@hello-pangea/dnd'
import { Card } from '@/components/TaskBoard'
import { Task } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ColumnListProp {
  tasks: Task[]
  columnId: string
}

export const ColumnList: React.FC<ColumnListProp> = ({ tasks, columnId }) => {
  const [orderedTasks, setOrderedTasks] = useState(tasks)

  useEffect(() => {
    const reorderedTasks = tasks.sort((a, b) => a.order - b.order)
    setOrderedTasks(reorderedTasks)
  }, [tasks])
  return (
    <Droppable droppableId={columnId} type="card">
      {(provided) => (
        <div
          className="mt-6 flex flex-col gap-y-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks
            ? orderedTasks.map((task, index) => (
                <Card key={task.id} task={task} index={index} />
              ))
            : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
