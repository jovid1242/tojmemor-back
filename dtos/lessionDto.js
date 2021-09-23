module.exports = class LessionDto {
    id
    courseId
    name
    image
    videos
    nextLessionId

    constructor(model) {
        this.id = model.id
        this.courseId = model.courseId
        this.name = model.name
        this.image = this.getStorageLink(model.image)
        this.videos = model.data
        this.nextLessionId = model.id + 1
    }

    getStorageLink(link) {
        const storageUrl = process.env.STORAGE_URL + '/storage/uploads'
        return storageUrl + link
    }
}