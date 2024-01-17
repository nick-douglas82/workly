'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { Column } from '@/components/TaskBoard'
import { ListWithTasks } from '@/types'
import { updateTaskOrder } from '@/actions/updateTaskOrder'
import { useAction } from '@/hooks/useAction'

interface TaskBoardProp {
  data: ListWithTasks[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const TaskBoard: React.FC<TaskBoardProp> = ({ data }) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const { execute: executeUpdateTaskOrder } = useAction(updateTaskOrder, {
    onSuccess: () => {
      toast.success('Card reordered')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'card') {
      const newOrderedData = [...orderedData]

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destList) {
        return
      }

      if (!sourceList.tasks) {
        sourceList.tasks = []
      }

      if (!destList.tasks) {
        destList.tasks = []
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedTasks = reorder(
          sourceList.tasks,
          source.index,
          destination.index
        )

        reorderedTasks.forEach((task, idx) => {
          task.order = idx
        })

        sourceList.tasks = reorderedTasks

        setOrderedData(newOrderedData)
        executeUpdateTaskOrder({
          items: reorderedTasks,
        })
      } else {
        const [movedTask] = sourceList.tasks.splice(source.index, 1)

        // Assign the new listId to the moved card
        movedTask.listId = destination.droppableId

        // Add card to the destination list
        destList.tasks.splice(destination.index, 0, movedTask)

        sourceList.tasks.forEach((task, idx) => {
          task.order = idx
        })

        // Update the order for each card in the destination list
        destList.tasks.forEach((task, idx) => {
          task.order = idx
        })

        setOrderedData(newOrderedData)
        executeUpdateTaskOrder({
          items: destList.tasks,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists">
        {(provided) => (
          <div
            className="grid w-full grid-cols-4 gap-x-3"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedData
              ? orderedData.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    title={column.title}
                    tasks={column.tasks.sort((a, b) => a.order - b.order)}
                  />
                ))
              : null}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
