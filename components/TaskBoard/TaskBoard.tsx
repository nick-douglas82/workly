import { Column } from '@/components/TaskBoard'

export const TaskBoard: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-x-3">
      <Column title="To Do" />
      <Column title="In Progress" />
      <Column title="In Review" />
      <Column title="Complete" />
    </div>
  )
}
