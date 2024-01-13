import { Button } from '@/components/Button/Button'
import { FiPlus } from 'react-icons/fi'
import { PageHeaderBar } from '@/components/Page/PageHeaderBar'
import { TaskBoard } from '@/components/TaskBoard'
import { db } from '@/lib/db'

const Tasks = async () => {
  const taskBoardData = await db.list.findMany({
    include: {
      tasks: true,
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <>
      <PageHeaderBar
        title="Team Tasks"
        action={
          <Button icon={<FiPlus className="h-6 w-6" />} text="Create Task" />
        }
      />
      <TaskBoard data={taskBoardData} />
    </>
  )
}

export default Tasks
