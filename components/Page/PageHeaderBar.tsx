type Props = {
  title: string
  action?: React.ReactNode
}

export const PageHeaderBar: React.FC<Props> = ({ title, action }) => {
  return (
    <header className="relative mb-8 flex w-full items-center justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <span className="absolute right-0 top-0">{action ? action : null}</span>
    </header>
  )
}
