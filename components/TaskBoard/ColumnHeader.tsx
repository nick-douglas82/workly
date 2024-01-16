import { CreateTask } from '@/components/CreateTask/CreateTask'

interface ColumnHeaderProps {
  title: string
  count: number
  columnId: string
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  title,
  count,
  columnId,
}) => {
  return (
    <div className="flex items-center justify-between text-xl font-semibold">
      <span>
        {title}
        <span className="ml-1 text-neutral-300">{count}</span>
      </span>
      <CreateTask isSmall columnId={columnId} />
    </div>
  )
}
