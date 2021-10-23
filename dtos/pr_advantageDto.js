module.exports = class pr_advantageDto {
  id;
  text;
  projects_id;

  constructor(model) {
    this.id = model.id;
    this.text = model.text;
    this.projects_id = model.projects_id;
  }
};
