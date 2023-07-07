export interface IPodcastDetailsResponse {
  results: {
    kind: "podcast" | "podcast-episode"
    trackCount: number
    artistName: string
    trackId: number
    trackName: string
    releaseDate: string
    trackTimeMillis: number
    primaryGenreName: string
    artworkUrl600: string
    description: string
    episodeUrl: string
  }[]
}
