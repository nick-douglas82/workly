import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { TbArrowMoveRight, TbArrowMoveLeft } from 'react-icons/tb'
import { CiEdit } from 'react-icons/ci'

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'

import { UpdateTask } from '@/components/UpdateTask/UpdateTask'
import { useState } from 'react'

interface TaskContextMenuProp {
  task: Task
  column: ListWithTasks
}

export const TaskContextMenu: React.FC<TaskContextMenuProp> = ({
  task,
  column,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
    <Dialog open={isDialogOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 hover:text-teal-700">
            <BiDotsHorizontalRounded className="h-6 w-6" />
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem
              className="flex cursor-pointer items-center font-medium"
              onClick={() => setIsDialogOpen(true)}
            >
              <CiEdit className="mr-1 h-4 w-4" />
              Edit Task
            </ContextMenuItem>
          </DialogTrigger>
          <ContextMenuSeparator />
          {!isFirstColumn ? (
            <>
              <ContextMenuItem
                className="flex cursor-pointer items-center font-medium"
                onClick={() => handleMoveStage('previous')}
              >
                <TbArrowMoveLeft className="mr-1 h-4 w-4" />
                Demote Task
              </ContextMenuItem>
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
          ) : (
            <ContextMenuSeparator />
          )}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <UpdateTask task={task} setIsDialogOpen={setIsDialogOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
