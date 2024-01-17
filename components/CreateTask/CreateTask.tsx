'use client'

import {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import { FiPlus } from 'react-icons/fi'
import { useEventListener } from 'usehooks-ts'
import { useAction } from '@/hooks/useAction'
import { Button } from '@/components/ui/Button'
import { SiteModal } from '@/components/SiteModal/SiteModal'
import { FormTextarea } from '@/components/Form/FormTextarea'
import { createTask } from '@/actions/createTask'

type CreateTaskProp = {
  isSmall?: boolean
  columnId?: string
}

export const CreateTask = forwardRef<HTMLTextAreaElement, CreateTaskProp>(
  ({ isSmall = false, columnId }, ref) => {
    const [isActive, setIsActive] = useState(false)
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createTask, {
      onSuccess: (data) => {
        toast.success(`Task "${data.title}" created`)
        formRef.current?.reset()
        setIsActive(false)
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

      execute({ title, description, listId: columnId || null })
    }

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsActive(false)
      }
    }

    useEventListener('keydown', onKeyDown)

    return (
      <>
        {!isSmall ? (
          <Button
            icon={<FiPlus className="h-6 w-6" />}
            text="Create Task"
            type="button"
            onClick={() => setIsActive(true)}
          />
        ) : (
          <button type="button" onClick={() => setIsActive(true)}>
            <FiPlus className="h-6 w-6 text-neutral-400" />
          </button>
        )}

        <SiteModal isActive={isActive} onClose={() => setIsActive(false)}>
          <form ref={formRef} onSubmit={onSubmit}>
            <FormTextarea
              id="title"
              onKeyDown={onTextareakeyDown}
              ref={ref}
              placeholder="Enter a title for this card..."
              errors={fieldErrors}
            />
            <FormTextarea
              id="description"
              onKeyDown={onTextareakeyDown}
              ref={ref}
              placeholder="Enter a description..."
              errors={fieldErrors}
            />
            <Button
              icon={<FiPlus className="h-6 w-6" />}
              text="Add Card"
              type="submit"
              className="mx-auto mt-12"
            />
          </form>
        </SiteModal>
      </>
    )
  }
)

CreateTask.displayName = 'CreateTask'
