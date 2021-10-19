module.exports = class pr_sliderDto {
  id;
  project_id;
  image;

  constructor(model) {
    this.id = model.id;
    this.project_id = model.project_id;
    this.image = model.image;
  }
};
