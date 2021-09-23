const db = require("../../models");
const Projects = db.Projects;

class ProjectsService {
  async getAll() {
    return await Projects.findAll();
  }

  async getProject(projectsId) {
    return await Projects.findOne({ where: { id: projectsId } });
  }
}

module.exports = new ProjectsService();
