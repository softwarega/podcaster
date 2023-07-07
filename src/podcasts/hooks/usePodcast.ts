import { useQuery } from "react-query"

import { useClient, IPodcastDetailsResponse } from "api"
import { CustomError, displayNotificationError } from "errors"
import { PodcastDetailsModel } from "model"

const usePodcast = (id: string = "") => {
  const { search } = useClient()
  const queryKey = ["podcast", id]

  const { data, isLoading } = useQuery(
    queryKey,
    async ({ signal }) => {
      const podcastFilters = new URLSearchParams({
        id,
        media: "podcast",
      })

      const podcastDetailsResponse = await search<IPodcastDetailsResponse>("lookup", podcastFilters, signal, true)

      if (!podcastDetailsResponse.results?.[0]) {
        throw new Error("No podcast found")
      }

      const podcastResponse = podcastDetailsResponse.results[0]

      const podcast = new PodcastDetailsModel(
        podcastResponse.trackId,
        podcastResponse.artistName,
        podcastResponse.artworkUrl600 ?? "",
        podcastResponse.trackName,
        podcastResponse.primaryGenreName,
        podcastResponse.kind,
        podcastResponse.description,
        podcastResponse.trackCount,
        podcastResponse.episodeUrl,
        podcastResponse.releaseDate,
        podcastResponse.trackTimeMillis,
      )

      const episodeFilters = new URLSearchParams({
        id,
        media: "podcast",
        entity: "podcastEpisode",
        limit: podcast.getTotalEpisodes().toString(),
      })

      const episodeDetailsResponse = await search<IPodcastDetailsResponse>("lookup", episodeFilters, signal, true)

      return { podcast, episodes: podcastDetailsResponseToPodcastDetail(episodeDetailsResponse) }
    },
    {
      onError: (error: CustomError) => {
        displayNotificationError(error)
      },
      cacheTime: 24 * 60 * 60000, // one day
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  )

  return { data, isLoading }
}

const podcastDetailsResponseToPodcastDetail = (response: IPodcastDetailsResponse) => {
  const { results } = response

  return results.reduce<PodcastDetailsModel[]>((prev, result) => {
    if (result.kind === "podcast-episode") {
      const image = result.artworkUrl600 ?? ""
      const episode = new PodcastDetailsModel(
        result.trackId,
        result.artistName,
        image,
        result.trackName,
        result.primaryGenreName,
        result.kind,
        result.description,
        result.trackCount,
        result.episodeUrl,
        result.releaseDate,
        result.trackTimeMillis,
      )

      return [...prev, episode]
    }

    return prev
  }, [])
}

export { usePodcast }
