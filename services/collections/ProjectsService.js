const db = require("../../models");
const Projects = db.Projects;

class ProjectsService {
  async getAll() {
    return await Projects.findAll();
  }

  async getBook(projectsId) {
    return await Projects.findOne({ where: { id: projectsId } });
  }
}

module.exports = new ProjectsService();
