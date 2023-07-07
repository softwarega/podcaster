class Podcast {
  private id
  private name
  private image
  private title
  private category
  private releaseDate

  constructor(id: string, name: string, image: string, title: string, category: string, releaseDate: string) {
    this.id = id
    this.name = name
    this.image = image
    this.title = title
    this.category = category
    this.releaseDate = releaseDate
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
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

  getReleaseDate() {
    return this.releaseDate
  }
}

export { Podcast }
