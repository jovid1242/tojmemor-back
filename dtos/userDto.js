module.exports = class UserDto {
  id;
  name;
  activated;
  status;
  image;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.activated = model.activated;
    this.status = model.status;
    this.image = model.image;
  }
};
