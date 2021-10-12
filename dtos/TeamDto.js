module.exports = class projectsDto {
  id;
  name;
  profession;
  image;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.profession = model.profession;
    this.image = model.image;
  }
};
