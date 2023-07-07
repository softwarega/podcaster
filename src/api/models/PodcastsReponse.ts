export interface PodcastsResponse {
  feed: {
    entry: PodcastEntryResponse
  }
}

export interface PodcastEntryResponse {
  id: PodcastEntryIdResponse
  "im:name": { label: string }
  "im:image": PodcastEntryImageResponse
  "im:price": { label: string }
  summary: { label: string }
  title: { label: string }
  "im:artist": { label: string }
  "im:releaseDate": ""
}

export interface PodcastEntryImageResponse {
  label: string
  attributes: { height: string }
}

export interface PodcastEntryIdResponse {
  attributes: { "im:id": string }
}

export interface PodcastEntryReleaseDateResponse {
  attributes: { label: string }
}
