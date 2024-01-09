type ButtonProps = {
  icon?: React.ReactNode
  text: string
} & React.HTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ icon, text, ...props }) => {
  return (
    <button
      className="flex cursor-pointer items-center gap-x-1 rounded-lg bg-teal-700 px-4 py-3 text-base font-normal text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
      {...props}
      type="button"
    >
      {icon ? icon : null}
      {text}
    </button>
  )
}
