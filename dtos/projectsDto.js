module.exports = class projectsDto {
  id;
  title;
  text;
  url;
  image;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.url = model.url;
    this.image = model.image;
  }
};
