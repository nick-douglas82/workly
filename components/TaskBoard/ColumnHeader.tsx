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
    <div className="flex items-center justify-between text-lg font-semibold text-neutral-500">
      <span className="flex items-center">
        {title}
        <span className="ml-3 flex aspect-square h-6 w-6 items-center justify-center rounded-md bg-gray-200 p-1 text-sm text-neutral-800">
          {count}
        </span>
      </span>
      <CreateTask isSmall columnId={columnId} />
    </div>
  )
}
