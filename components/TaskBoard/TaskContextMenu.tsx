import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { TbArrowMoveRight, TbArrowMoveLeft } from 'react-icons/tb'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/ContextMenu'
import { toast } from 'sonner'
import { useAction } from '@/hooks/useAction'
import { deleteTask } from '@/actions/deleteTask'
import { moveToNextStage } from '@/actions/moveTaskToNextStage'
import { Task } from '@prisma/client'
import { ListWithTasks } from '@/types'

interface TaskContextMenuProp {
  task: Task
  column: ListWithTasks
}

export const TaskContextMenu: React.FC<TaskContextMenuProp> = ({
  task,
  column,
}) => {
  const isLastColumn = column.order === 3
  const isFirstColumn = column.order === 0

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteTask,
    {
      onSuccess: (data) => {
        toast.success(`Task "${data.title}" deleted`)
      },
      onError: (error) => {
        toast.error(error)
      },
    }
  )
  const { execute: executeMoveTask } = useAction(moveToNextStage, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" stage changed`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const handleMoveStage = (direction: string) => {
    executeMoveTask({ id: task.id, direction })
  }

  const handleTaskDelete = () => {
    executeDeleteCard({ id: task.id })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 hover:text-teal-700">
          <BiDotsHorizontalRounded className="h-6 w-6" />
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {!isFirstColumn ? (
          <>
            <ContextMenuItem
              className="flex cursor-pointer items-center font-medium"
              onClick={() => handleMoveStage('previous')}
            >
              <TbArrowMoveLeft className="mr-1 h-4 w-4" />
              Demote Task
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        ) : null}
        {!isLastColumn ? (
          <>
            <ContextMenuItem
              className="flex cursor-pointer items-center font-medium"
              onClick={() => handleMoveStage('next')}
            >
              <TbArrowMoveRight className="mr-1 h-4 w-4" />
              Promote Task
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        ) : null}
        <ContextMenuItem
          className="flex cursor-pointer items-center font-medium hover:!text-red-600"
          onClick={handleTaskDelete}
          disabled={isLoadingDelete}
        >
          <IoTrashOutline className="mr-1 h-4 w-4" />
          Delete Task
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
