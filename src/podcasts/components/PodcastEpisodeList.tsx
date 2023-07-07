import { faClock, faPlay, faSortAlphaAsc, faSortAlphaDesc, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { format, intervalToDuration, parseISO } from "date-fns"
import { Parser } from "html-to-react"
import { startTransition, useMemo, useRef, useState } from "react"

import { PodcastDetailsModel } from "model"

enum SORT_ORDER {
  ASC,
  DESC,
}

const PodcastEpisodeList: React.FC<Props> = ({ episodes }) => {
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState(SORT_ORDER.ASC)
  const [episodeSelected, setEpisodeSelected] = useState<PodcastDetailsModel>()
  const audioRef = useRef<HTMLAudioElement>(null)

  const play = (episodeSelected?: PodcastDetailsModel) => {
    if (audioRef.current) {
      if (episodeSelected) {
        audioRef.current.src = episodeSelected.getEpisodeUrl()
      } else {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current.src = ""
      }
    }

    setEpisodeSelected(episodeSelected)
  }

  const filteredEpisodes = useMemo(() => {
    return episodes
      .reduce<PodcastDetailsModel[]>((prev, podcast) => {
        if (podcast.getTitle().toLowerCase().includes(filter.toLowerCase())) {
          return [...prev, podcast]
        }

        return prev
      }, [])
      .sort((a, b) =>
        sort === SORT_ORDER.ASC
          ? a.getTitle().localeCompare(b.getTitle(), "en", { sensitivity: "base" })
          : b.getTitle().localeCompare(a.getTitle(), "en", { sensitivity: "base" }),
      )
  }, [episodes, filter, sort])

  const sortIcon = useMemo(() => (sort === SORT_ORDER.ASC ? faSortAlphaAsc : faSortAlphaDesc), [sort])

  return (
    <div className="relative w-full">
      <div className="flex justify-between border px-40 py-5">
        <h3 className="font-semibold text-2xl">Episodes</h3>
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
            title="Total episodes"
            className="absolute text-center text-gray-950 rounded-l-md w-14 right-100 text-md bg-slate-300 p-1.5"
          >
            {filteredEpisodes?.length ?? 0}
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
      <ul className="divide-y px-10">
        {filteredEpisodes.map((episode) => (
          <PodcastEpisodeItem
            key={episode.getId()}
            episode={episode}
            play={play}
            isListening={episodeSelected?.getId() === episode.getId()}
          />
        ))}
      </ul>
      <div className={classNames("fixed pt-2 w-full bottom-0 bg-slate-100", { "opacity-0": !episodeSelected })}>
        <p className="ml-5 font-semibold">{episodeSelected?.getTitle()}</p>
        <audio ref={audioRef} autoPlay controls className="w-full">
          <source src={episodeSelected?.getEpisodeUrl()} type="audio/mp3"></source>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

const PodcastEpisodeItem: React.FC<EpisodeProps> = ({ episode, play, isListening }) => {
  const htmlParser = Parser()
  const date = format(parseISO(episode.getReleaseDate()), "MMM do, yyyy")
  const duration = intervalToDuration({ start: 0, end: episode.getTrackTimeMillis() })

  const episodeDuration = `${duration.hours ? `${duration.hours} hr` : ""}${
    duration.minutes ? ` ${duration.minutes} min` : ""
  }`

  const playIcon = isListening ? faStop : faPlay

  return (
    <li id={`episode-${episode.getId()}`} className="px-32 py-8">
      {episode.getCategory()}
      <p title="Release date" className="text-sm text-slate-700 mb-5">
        {date}
      </p>
      <p title="Title" className="text-xl font-semibold mb-5">
        {episode.getTitle()}
      </p>
      <p title="Author" className="text-md mb-5">
        {episode.getAuthor()}
      </p>
      <p title="Description" className="text-justify">
        {htmlParser.parse(episode.getDescription())}
      </p>
      <div className="mt-5 space-x-2 flex items-center">
        <div className="relative">
          {isListening && (
            <span className="absolute flex h-3 w-3 -right-1 -top-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              play(isListening ? undefined : episode)
            }}
            className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 active:ring-2"
          >
            <FontAwesomeIcon className="text-green-600" icon={playIcon} />
            Listen
          </button>
        </div>
        <span title="Duration" className="text-slate-700 text-xs space-x-1">
          <FontAwesomeIcon className="text-slate-700" icon={faClock} />
          <span>{episodeDuration}</span>
        </span>
      </div>
    </li>
  )
}

type Props = {
  episodes: PodcastDetailsModel[]
}

type EpisodeProps = {
  episode: PodcastDetailsModel
  isListening?: boolean
  play(episoudeSelected?: PodcastDetailsModel): void
}

export { PodcastEpisodeList }
