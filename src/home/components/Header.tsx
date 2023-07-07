import { useIsFetching } from "react-query"
import { Link } from "react-router-dom"
import classNames from "classnames"

import { Loading } from "commons"

const Header: React.FC = () => {
  const isLoading = useIsFetching()

  return (
    <div className="flex w-full items-center justify-between shadow-md p-5 mb-15 bg-white">
      <h1 className="text-2xl hover:text-teal-600">
        <Link to="/">Podcaster</Link>
      </h1>
      <h1 className="text-2xl">
        <div className={classNames("flex w-full justify-center items-center h-full", { "opacity-0": !isLoading })}>
          <Loading />
        </div>
      </h1>
    </div>
  )
}

export { Header }
