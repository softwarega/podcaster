import { useParams } from "react-router-dom"

import { usePodcast } from "../hooks/usePodcast"
import { PodcastDetails } from "./PodcastDetails"
import { PodcastEpisodeList } from "./PodcastEpisodeList"

const PodcastDetailsContainer: React.FC = () => {
  const { id } = useParams()
  const { data, isLoading } = usePodcast(id)

  if (!id) {
    throw new Error("No podcast id provided")
  }

  if (isLoading || !data || !data.podcast) return null

  const { podcast, episodes } = data

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-1/4 p-2 shadow-md">
        <PodcastDetails podcast={podcast} />
      </div>
      <div className="flex-1 overflow-y-scroll scroll-smooth">
        <PodcastEpisodeList episodes={episodes} />
      </div>
    </div>
  )
}

export { PodcastDetailsContainer }
