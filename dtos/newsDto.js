module.exports = class NewsDto {
  id;
  title;
  text;
  data;
  image;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.image = this.getStorageLink(model.image);
    this.data = model.data;
  }

  getStorageLink(link) {
    const storageUrl = process.env.STORAGE_URL + "/storage/uploads";
    return storageUrl + link;
  }
};
