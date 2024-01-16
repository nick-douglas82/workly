'use client'

import { BsCalendar3 } from 'react-icons/bs'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { PiSquaresFour } from 'react-icons/pi'
import { LuLineChart, LuUser } from 'react-icons/lu'
import { SideNavList } from '@/components/Navigation/SideNav/SideNavList'

export const SideNav = () => {
  return (
    <div className="h-full xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div className="h-full bg-gray-50 px-3">
        <SideNavList
          hasDivider
          list={[
            {
              name: 'Activity',
              href: '/activity',
              icon: <LuLineChart className="mr-2 h-5 w-5" />,
              active: false,
            },
            {
              name: 'My Profile',
              href: '/user/profile',
              icon: <LuUser className="mr-2 h-5 w-5" />,
              active: false,
            },
          ]}
        />

        <SideNavList
          hasDivider
          list={[
            {
              name: 'Dashboard',
              href: '/',
              icon: <PiSquaresFour className="mr-2 h-5 w-5" />,
              active: true,
            },
            {
              name: 'Tasks',
              href: '/tasks',
              icon: <IoDocumentTextOutline className="mr-2 h-5 w-5" />,
              active: true,
            },
            {
              name: 'Calendar',
              href: '/calendar',
              icon: <BsCalendar3 className="mr-2 h-4 w-4" />,
              active: false,
            },
          ]}
        />
      </div>
    </div>
  )
}
