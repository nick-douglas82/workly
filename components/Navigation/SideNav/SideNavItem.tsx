'use client'

import { useActivePath } from '@/app/helpers/useActivePath'
import { cn } from '@/lib/utils'

interface SideNavItemProp {
  item: {
    name: string
    href: string
    icon: React.ReactNode
    active?: boolean
  }
}

export const SideNavItem: React.FC<SideNavItemProp> = ({ item }) => {
  const checkActivePath = useActivePath()

  return (
    <li className="w-full">
      <a
        href={item.href}
        className={cn(
          'flex w-full items-center rounded-md px-2 py-2 font-medium text-neutral-500 hover:bg-teal-600/15 hover:text-teal-800',
          checkActivePath(item.href) &&
            'bg-teal-600/15 !font-semibold text-teal-800',
          !item.active &&
            'hover:text-neutral-500w cursor-not-allowed opacity-50 hover:bg-transparent'
        )}
      >
        {item.icon}
        {item.name}
      </a>
    </li>
  )
}
