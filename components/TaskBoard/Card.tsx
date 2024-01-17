'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Task } from '@prisma/client'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

interface CardProp {
  task: Task
  index: number
}

export const Card: React.FC<CardProp> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="rounded-lg bg-white px-3 py-5 shadow-md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between text-lg font-medium">
            <span>{task.title}</span>
            <BiDotsHorizontalRounded className="h-6 w-6" />
          </div>
          {task.description ? (
            <p className="mt-1 text-sm text-gray-400">{task.description}</p>
          ) : null}
        </div>
      )}
    </Draggable>
  )
}
