'use client'

import { useEffect, useState } from 'react'
import { IoCloseSharp as CloseIcon } from 'react-icons/io5'

type SiteModalProp = {
  isActive: boolean
  onClose: () => void
  children: React.ReactNode
}

export const SiteModal: React.FC<SiteModalProp> = ({
  isActive,
  onClose,
  children,
}) => {
  const [modalIsActive, setModalIsActive] = useState(isActive)

  useEffect(() => {
    setModalIsActive(isActive)
  }, [isActive])

  return (
    <>
      {modalIsActive ? (
        <>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}
          />
          <div className="fixed inset-1/2 z-[101] min-h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-3 pt-8 text-base font-normal">
            <button
              type="button"
              className="absolute right-1 top-1"
              onClick={onClose}
            >
              <CloseIcon className="h-8 w-8 text-neutral-800" />
            </button>
            {children}
          </div>
        </>
      ) : null}
    </>
  )
}
