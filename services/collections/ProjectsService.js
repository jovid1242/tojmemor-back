const db = require("../../models");
const Projects = db.Projects;

class ProjectsService {
  async getAll() {
    return await Projects.findAll();
  }

  async getProject(projectsId) {
    return await Projects.findOne({ where: { id: projectsId } });
  }

  async createProject(value) {
    return await Projects.create(value);
  }
}

module.exports = new ProjectsService();
