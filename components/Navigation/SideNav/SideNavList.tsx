import { SideNavItem } from '@/components/Navigation/SideNav/SideNavItem'

type Props = {
  list: {
    name: string
    href: string
    icon: React.ReactNode
  }[]
  hasDivider?: boolean
}

export const SideNavList: React.FC<Props> = ({ list, hasDivider }) => {
  return (
    <nav>
      <ul className="w-full">
        {list.map((item, index) => (
          <SideNavItem
            item={{
              name: item.name,
              href: item.href,
              icon: item.icon,
            }}
            key={index}
          />
        ))}
      </ul>
      {hasDivider && (
        <div className="my-6 border-b border-gray-200" aria-hidden="true" />
      )}
    </nav>
  )
}
