import { Link } from "react-router-dom"

const UnauthorizedErrorView = () => (
  <div className="flex items-center justify-center w-full h-screen bg-black text-white">
    <div className="text-center">
      <p className="text-secondary">401 Error</p>
      <h1 className="text-4xl py-2 font-bold">Unauthorized</h1>
      <p className="text-sm py-2 pb-4 mb-10">Sorry, you not shall pass</p>
      <Link
        to="/"
        className="text-black bg-white hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-base xl:text-xl w-1/2 md:w-1/2 px-5 py-2.5 text-center"
      >
        <span>Go home</span>
      </Link>
    </div>
  </div>
)

export { UnauthorizedErrorView }
