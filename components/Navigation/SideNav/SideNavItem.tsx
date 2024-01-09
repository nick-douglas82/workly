'use client'

import { useActivePath } from '@/app/helpers/useActivePath'

interface SideNavItemProp {
  item: {
    name: string
    href: string
    icon: React.ReactNode
  }
}

export const SideNavItem: React.FC<SideNavItemProp> = ({ item }) => {
  const checkActivePath = useActivePath()

  return (
    <li className="w-full">
      <a
        href={item.href}
        className={`flex w-full items-center rounded-md px-2 py-2 font-medium text-neutral-500 hover:bg-teal-600/15 hover:text-teal-800 ${
          checkActivePath(item.href)
            ? 'bg-teal-600/15 !font-semibold text-teal-800'
            : ''
        }`}
      >
        {item.icon}
        {item.name}
      </a>
    </li>
  )
}
