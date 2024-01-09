import { Button } from '@/components/Button/Button'
import { FiPlus } from 'react-icons/fi'
import { PageHeaderBar } from '@/components/Page/PageHeaderBar'
import { TaskBoard } from '@/components/TaskBoard'

export default function Tasks() {
  return (
    <>
      <PageHeaderBar
        title="Team Tasks"
        action={
          <Button icon={<FiPlus className="h-6 w-6" />} text="Create Task" />
        }
      />
      <TaskBoard />
    </>
  )
}
