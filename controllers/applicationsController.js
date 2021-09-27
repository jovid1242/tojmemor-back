const { validationResult } = require("express-validator");
const applicationDto = require("../dtos/applicationDto");
const ApiError = require("../exceptions/apiError");
const ApplicationService = require("../services/collections/ApplicationService");
const path = require("path");
const uuid = require("uuid");

class applicationsController {
  async getAll(req, res, next) {
    try {
      const application = [];
      const collections = await ApplicationService.getAll();

      collections.forEach((el) => {
        application.push(new applicationDto(el));
      });

      return res.json({ application });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await ApplicationService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const application = await ApplicationService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, application });
      }
      return res.json({ pages: countPage, application });
    } catch (e) {
      next(e);
    }
  }

  async createApplication(req, res, next) {
    try {
      let params = req.body;
      const data = {
        name: params.name,
        phone: params.phone,
        theme: params.theme,
      };

      const creating = await ApplicationService.createApplication(data);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new applicationsController();
