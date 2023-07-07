import { useQuery } from "react-query"

import { useClient, IPodcastsResponse } from "api"
import { CustomError, displayNotificationError } from "errors"
import { Podcast } from "model"

const usePodcasts = () => {
  const { search } = useClient()
  const queryKey = ["podcasts"]

  const { data, isLoading } = useQuery(
    queryKey,
    async ({ signal }) => {
      const podcastsResponse = await search<IPodcastsResponse>(
        "us/rss/toppodcasts/limit=100/genrer=1310/json",
        undefined,
        signal,
      )

      return podcastsResponseToPodcast(podcastsResponse)
    },
    {
      onError: (error: CustomError) => {
        displayNotificationError(error)
      },
      cacheTime: 24 * 60 * 60000, // one day
      refetchOnWindowFocus: false,
    },
  )

  return { podcasts: data as Podcast[], isLoading }
}

const podcastsResponseToPodcast = (response: IPodcastsResponse) => {
  const {
    feed: { entry },
  } = response

  return entry.reduce<Podcast[]>((prev, entry) => {
    const image = entry["im:image"].find(({ attributes }) => attributes.height === "170")?.label ?? ""

    return [
      ...prev,
      new Podcast(
        entry.id.attributes["im:id"],
        entry["im:name"].label,
        image,
        entry.title.label,
        entry.category.attributes.label,
        entry["im:releaseDate"].attributes.label,
      ),
    ]
  }, [])
}

export { usePodcasts }
