module.exports = class FilmDto {
    id
    name
    lenk
    description
    image 

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.link = model.link
        this.description = model.description
        this.image = this.getStorageLink(model.image)
    }

    getStorageLink(link) {
        const storageUrl = process.env.STORAGE_URL + '/storage/uploads'
        return storageUrl + link
    }
}