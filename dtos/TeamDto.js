module.exports = class projectsDto {
  id;
  name;
  profession;
  image;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.profession = model.profession;
    this.image = this.getStorageLink(model.image);
  }

  getStorageLink(link) {
    const storageUrl = process.env.STORAGE_URL + "/storage/uploads";
    return storageUrl + link;
  }
};
