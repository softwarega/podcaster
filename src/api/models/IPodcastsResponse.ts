export interface IPodcastsResponse {
  feed: {
    entry: IPodcastEntryResponse[]
  }
}

export interface IPodcastEntryResponse {
  id: IPodcastEntryIdResponse
  "im:name": { label: string }
  "im:image": IPodcastEntryImageResponse[]
  title: { label: string }
  category: IPodcastEntryCategoryResponse
  "im:releaseDate": IPodcastEntryReleaseDateResponse
}

export interface IPodcastEntryImageResponse {
  label: string
  attributes: { height: string }
}

export interface IPodcastEntryIdResponse {
  attributes: { "im:id": string }
}

export interface IPodcastEntryReleaseDateResponse {
  attributes: { label: string }
}

export interface IPodcastEntryCategoryResponse {
  attributes: { label: string }
}
