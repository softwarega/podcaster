import { FC } from "react"
import { Link } from "react-router-dom"

import { CustomError } from "../types"

const ManyRequests: FC<Props> = ({ error }) => {
  const message = error.cause?.message ?? "Too many requests"

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black text-white">
      <div className="text-center">
        <p className="text-secondary">429 Error</p>
        <h1 className="text-4xl py-2 font-bold">{error.message}</h1>
        <p className="text-sm pt-2 pb-4 mb-10">{message}</p>
        <Link
          to="/"
          className="text-black bg-white hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-base xl:text-xl w-1/2 md:w-1/2 px-5 py-2.5 text-center"
        >
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  )
}

type Props = { error: CustomError }

export { ManyRequests }
