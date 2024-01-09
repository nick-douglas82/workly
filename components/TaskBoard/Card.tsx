import { BiDotsHorizontalRounded } from 'react-icons/bi'

export const Card = () => {
  return (
    <div className="rounded-lg bg-white px-3 py-5 shadow-md">
      <div className="flex items-center justify-between font-semibold">
        <span>Layout Design</span>
        <BiDotsHorizontalRounded className="h-6 w-6" />
      </div>
    </div>
  )
}
