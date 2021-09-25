const db = require("../../models");
const Projects = db.Projects;

class ProjectsService {
  async getAll() {
    return await Projects.findAll();
  }

  async getByPage(page, limit) {
    return await Projects.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async getProject(projectsId) {
    return await Projects.findOne({ where: { id: projectsId } });
  }

  async createProject(value) {
    return await Projects.create(value);
  }

  async updateProject(value, id) {
    return Projects.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteProject(id) {
    return Projects.destroy({ where: { id: id } });
  }
}

module.exports = new ProjectsService();
