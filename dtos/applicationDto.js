module.exports = class projectsDto {
  id;
  name;
  phone;
  theme;
  createdAt;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.phone = model.phone;
    this.theme = model.theme;
    this.createdAt = model.createdAt;
  }
};
