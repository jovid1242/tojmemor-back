module.exports = class pr_advantageDto {
  id;
  text;
  project_id;

  constructor(model) {
    this.id = model.id;
    this.text = model.text;
    this.project_id = model.project_id;
  }
};
