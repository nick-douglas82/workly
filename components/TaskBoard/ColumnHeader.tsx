import { FiPlus } from 'react-icons/fi'

interface ColumnHeaderProps {
  title: string
  count: number
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title, count }) => {
  return (
    <div className="flex items-center justify-between text-xl font-semibold">
      <span>
        {title}
        <span className="ml-1 text-neutral-300">{count}</span>
      </span>
      <FiPlus className="h-6 w-6 text-neutral-400" />
    </div>
  )
}
