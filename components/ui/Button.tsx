import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  text: string
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, text, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          `flex cursor-pointer items-center gap-x-1 rounded-lg bg-teal-700 px-4 py-3 text-base font-normal text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2`,
          className
        )}
        {...props}
        ref={ref}
      >
        {icon ? icon : null}
        {text}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
