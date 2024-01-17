import { Toaster } from 'sonner'
import { SideNav } from '@/components/Navigation/SideNav/SideNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster />
      <main className="flex h-full">
        <SideNav />
        <div className="w-full pl-72">
          <div className="px-6 py-4">{children}</div>
        </div>
      </main>
    </>
  )
}
