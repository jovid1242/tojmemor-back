module.exports = class projectsDto {
  id;
  title;
  text;
  urlVideo;
  image;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.urlVideo = model.urlVideo;
    this.image = this.getStorageLink(model.image);
  }

  getStorageLink(link) {
    const storageUrl = process.env.STORAGE_URL + "/storage/uploads";
    return storageUrl + link;
  }
};
