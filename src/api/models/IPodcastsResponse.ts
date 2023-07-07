export interface IPodcastsResponse {
  feed: {
    entry: IPodcastEntryResponse[]
  }
}

export interface IPodcastEntryResponse {
  id: IPodcastEntryIdResponse
  "im:name": { label: string }
  "im:artist": { label: string }
  title: { label: string }
  "im:image": IPodcastEntryImageResponse[]
  category: IPodcastEntryCategoryResponse
}

export interface IPodcastEntryImageResponse {
  label: string
  attributes: { height: string }
}

export interface IPodcastEntryIdResponse {
  attributes: { "im:id": string }
}

export interface IPodcastEntryCategoryResponse {
  attributes: { label: string }
}
