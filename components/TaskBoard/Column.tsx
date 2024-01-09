import { ColumnHeader, ColumnList } from '@/components/TaskBoard'

interface ColumnProp {
  title: string
}

export const Column: React.FC<ColumnProp> = ({ title }) => {
  return (
    <div className="rounded-lg bg-gray-100 px-5 py-6">
      <ColumnHeader title={title} />
      <ColumnList />
    </div>
  )
}
