import { PageHeaderBar } from '@/components/Page/PageHeaderBar'
import { TaskBoard } from '@/components/TaskBoard'
import { db } from '@/lib/db'
import { CreateTask } from '@/components/CreateTask/CreateTask'

const Tasks = async () => {
  const taskBoardData = await db.list.findMany({
    include: {
      tasks: true,
    },
    orderBy: {
      order: 'asc',
    },
  })

  // console.log(
  //   'taskBoardData',
  //   taskBoardData[0].tasks.sort((a, b) => a.order - b.order)
  // )

  // for (let i = 0; i < 10; i++) {
  //   await db.task.create({
  //     data: {
  //       title: `Task ${i}`,
  //       description: `Task ${i} description`,
  //       order: i,
  //       listId: 'e35fbe77-8a94-431a-9b90-ce8c176b23bc',
  //     },
  //   })
  // }

  // await db.list.create({
  //   data: {
  //     title: 'To Do',
  //     order: 0,
  //   },
  // })
  // await db.list.create({
  //   data: {
  //     title: 'In Progress',
  //     order: 1,
  //   },
  // })
  // await db.list.create({
  //   data: {
  //     title: 'In Review',
  //     order: 2,
  //   },
  // })
  // await db.list.create({
  //   data: {
  //     title: 'Completed',
  //     order: 3,
  //   },
  // })

  return (
    <>
      <PageHeaderBar title="Team Tasks" action={<CreateTask />} />
      <TaskBoard data={taskBoardData} />
    </>
  )
}

export default Tasks
