class PodcastModel {
  private id
  private author
  private image
  private title
  private category
  private longTitle

  constructor(id: string, author: string, image: string, title: string, longTitle: string, category: string) {
    this.id = id
    this.author = author
    this.image = image
    this.title = title
    this.category = category
    this.longTitle = longTitle
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

  getLongTitle() {
    return this.longTitle
  }

  getCategory() {
    return this.category
  }
}

export { PodcastModel }
