module.exports = class vacanciesDto {
  id;
  title;
  text;
  description;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.description = model.description;
  }
};
