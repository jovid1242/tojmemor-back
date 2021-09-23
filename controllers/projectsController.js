const { validationResult } = require("express-validator");
const projectsDto = require("../dtos/projectsDto");
const ApiError = require("../exceptions/apiError");
const ProjectsService = require("../services/collections/ProjectsService");

class projectsController {
  async getAll(req, res, next) {
    try {
      const projects = [];
      const collections = await ProjectsService.getAll();

      collections.forEach((el) => {
        projects.push(new projectsDto(el));
      });

      return res.json({ projects });
    } catch (e) {
      next(e);
    }
  }

  async getProject(req, res, next) {
    try {
      let project = await ProjectsService.getProject(req.params.bookId);
      project = project ? new projectsDto(project) : {};

      return res.json({ project });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new projectsController();
