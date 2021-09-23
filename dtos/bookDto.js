module.exports = class BookDto {
    id
    name
    author
    description
    image
    file 

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.author = model.author
        this.description = model.description
        this.image = this.getStorageLink(model.image)
        this.file = this.getStorageLink(model.file)
    }

    getStorageLink(link) {
        const storageUrl = process.env.STORAGE_URL + '/storage/uploads'
        return storageUrl + link
    }
}