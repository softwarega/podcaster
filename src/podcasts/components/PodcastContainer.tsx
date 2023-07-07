import { startTransition, useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAlphaAsc, faSortAlphaDesc } from "@fortawesome/free-solid-svg-icons"

import { usePodcasts } from "podcasts"
import { PodcastModel } from "model"

import { PodcastList } from "./PodcastList"

enum SORT_ORDER {
  ASC,
  DESC,
}

const PodcastContainer: React.FC = () => {
  const { podcasts } = usePodcasts()
  const [sort, setSort] = useState(SORT_ORDER.ASC)
  const [filter, setFilter] = useState("")

  const filteredPodcasts = useMemo(() => {
    return podcasts
      ?.reduce<PodcastModel[]>((prev, podcast) => {
        if (podcast.getLongTitle().toLowerCase().includes(filter.toLowerCase())) {
          return [...prev, podcast]
        }

        return prev
      }, [])
      .sort((a, b) =>
        sort === SORT_ORDER.ASC
          ? a.getLongTitle().localeCompare(b.getLongTitle(), "en", { sensitivity: "base" })
          : b.getLongTitle().localeCompare(a.getLongTitle(), "en", { sensitivity: "base" }),
      )
  }, [podcasts, filter, sort])

  const sortIcon = useMemo(() => (sort === SORT_ORDER.ASC ? faSortAlphaAsc : faSortAlphaDesc), [sort])

  return (
    <div className="p-5 overflow-y-auto h-full">
      <div className="w-full flex justify-end mb-5">
        <div className="relative flex items-center w-full md:w-1/3">
          <input
            value={filter}
            onChange={(e) => {
              startTransition(() => {
                setFilter(e.target.value)
              })
            }}
            type="text"
            className="block w-full rounded-md border-0 p-1.5 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6"
            placeholder="Filter podcasts..."
          />
          <span
            title="Total podcasts"
            className="absolute text-center text-gray-950 rounded-l-md w-14 right-100 text-md bg-slate-300 p-1.5"
          >
            {filteredPodcasts?.length ?? 0}
          </span>
          <button
            type="button"
            className="absolute right-0 inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => {
              setSort((prevSort) => (prevSort === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC))
            }}
          >
            <FontAwesomeIcon className="text-gray-400" icon={sortIcon} />
            Sort
          </button>
        </div>
      </div>
      <PodcastList podcasts={filteredPodcasts} />
    </div>
  )
}

export { PodcastContainer }
