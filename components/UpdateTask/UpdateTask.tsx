'use client'

import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useAction } from '@/hooks/useAction'
import { Button } from '@/components/ui/Button'
import { FormTextarea } from '@/components/Form/FormTextarea'

import { useQueryClient } from '@tanstack/react-query'

import { Task } from '@prisma/client'
import { updateTask } from '@/actions/updateTask'

type UpdateTaskProps = {
  task: Task
  setIsDialogOpen: (value: boolean) => void
}

export const UpdateTask: React.FC<UpdateTaskProps> = ({
  task,
  setIsDialogOpen,
}) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const queryClient = useQueryClient()

  const formRef = useRef<ElementRef<'form'>>(null)
  const titleRef = useRef<ElementRef<'textarea'>>(null)
  const descriptionRef = useRef<ElementRef<'textarea'>>(null)

  titleRef.current?.focus()

  const { execute } = useAction(updateTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })

      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })

      toast.success(`Task Updated`)
      setTitle(data.title)
      setDescription(data.description)
      setIsDialogOpen(false)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = String(formData.get('title'))
    const description = String(formData.get('description'))

    if (title === task.title) {
      return
    }

    execute({
      title,
      description,
      id: task.id,
    })
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col space-y-6">
      <FormTextarea
        id="title"
        ref={titleRef}
        placeholder="Enter a title for this card..."
        defaultValue={title}
      />
      <FormTextarea
        id="description"
        ref={descriptionRef}
        placeholder="Enter a description..."
        defaultValue={description || ''}
      />
      <Button text="Update Card" type="submit" className="mx-auto mt-12" />
    </form>
  )
}

UpdateTask.displayName = 'UpdateTask'
