module.exports = class pr_sliderDto {
  id;
  project_id;
  adress;
  phone;
  email;
  url;

  constructor(model) {
    this.id = model.id;
    this.project_id = model.project_id;
    this.adress = model.adress;
    this.phone = model.phone;
    this.email = model.email;
    this.url = model.url;
  }
};
