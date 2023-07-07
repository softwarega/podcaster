class PodcastDetailsModel {
  private id
  private author
  private image
  private title
  private category

  private kind
  private description
  private totalEpisodes
  private episodeUrl
  private releaseDate
  private trackTimeMillis

  constructor(
    id: number,
    author: string,
    image: string,
    title: string,
    category: string,
    kind: "podcast" | "podcast-episode",
    description: string,
    totalEpisodes: number,
    episodeUrl: string,
    releaseDate: string,
    trackTimeMillis: number,
  ) {
    this.id = id
    this.author = author
    this.image = image
    this.title = title
    this.category = category

    this.kind = kind
    this.description = description
    this.totalEpisodes = totalEpisodes
    this.episodeUrl = episodeUrl
    this.releaseDate = releaseDate
    this.trackTimeMillis = trackTimeMillis
  }

  getId() {
    return this.id
  }

  getAuthor() {
    return this.author
  }

  getImage() {
    return this.image
  }

  getTitle() {
    return this.title
  }

  getCategory() {
    return this.category
  }

  getKind() {
    return this.kind
  }

  getDescription() {
    return this.description
  }

  getTotalEpisodes() {
    return this.totalEpisodes
  }

  getEpisodeUrl() {
    return this.episodeUrl
  }

  getReleaseDate() {
    return this.releaseDate
  }

  getTrackTimeMillis() {
    return this.trackTimeMillis
  }
}

export { PodcastDetailsModel }
