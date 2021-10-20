module.exports = class pr_sliderDto {
  id;
  project_id;
  room;
  floor;
  square;
  image;

  constructor(model) {
    this.id = model.id;
    this.project_id = model.project_id;
    this.room = model.room;
    this.floor = model.floor;
    this.square = model.square;
    this.image = model.image;
  }
};
