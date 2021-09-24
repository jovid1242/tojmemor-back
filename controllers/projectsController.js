const { validationResult } = require("express-validator");
const projectsDto = require("../dtos/projectsDto");
const ApiError = require("../exceptions/apiError");
const ProjectsService = require("../services/collections/ProjectsService");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

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

  async createProject(req, res, next) {
    try {
      let params = req.body;
      let file = req.files.image;
      const typeImage = file.mimetype.split("/").splice(1, 1);
      const newNameFile = `${uuid.v4()}.${typeImage}`;

      file.mv(
        path.join(__dirname + "/../uploads", "images/") + newNameFile,
        (err) => {
          if (err) {
            throw ApiError.BadRequest("Ошибка при загрузка файла");
          }
        }
      );

      const project = {
        text: params.text,
        title: params.title,
        url: params.url,
        image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
      };

      const creating = await ProjectsService.createProject(project);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateProject(req, res, next) {
    try {
      let params = req.body;
      if (req.files !== null) {
        let file = req.files.image;
        const typeImage = file.mimetype.split("/").splice(1, 1);
        const newNameFile = `${uuid.v4()}.${typeImage}`;

        file.mv(
          path.join(__dirname + "/../uploads", "images/") + newNameFile,
          (err) => {
            if (err) {
              throw ApiError.BadRequest("Ошибка при загрузка файла");
            }
          }
        );

        const project = {
          text: params.text,
          title: params.title,
          url: params.url,
          image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await ProjectsService.updateProject(
          project,
          req.params.id
        );
        return res.json({ creating });
      }

      const project = {
        text: params.text,
        title: params.title,
        url: params.url,
        image: params.image,
      };

      const creating = await ProjectsService.updateProject(
        project,
        req.params.id
      );
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async getProject(req, res, next) {
    try {
      let project = await ProjectsService.getProject(req.params.projectId);
      project = project ? new projectsDto(project) : {};

      return res.json({ project });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new projectsController();
