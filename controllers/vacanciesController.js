const vacanciesDto = require("../dtos/vacanciesDto");
const vacanciesService = require("../services/vacanciesService");

class vacanciesController {
  async getAll(req, res, next) {
    try {
      const vacancies = [];
      const collections = await vacanciesService.getAll();

      collections.forEach((el) => {
        vacancies.push(new vacanciesDto(el));
      });

      return res.json({ vacancies });
    } catch (e) {
      next(e);
    }
  }

  async createVacancies(req, res, next) {
    try {
      let params = req.body;
      const layout = {
        title: params.title,
        text: params.text,
        description: params.description,
      };
      const creating = await vacanciesService.createVacancies(layout);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateVacancies(req, res, next) {
    try {
      let params = req.body;

      const project = {
        title: params.title,
        text: params.text,
        description: params.description,
      };
      const updating = await vacanciesService.updateVacancies(
        project,
        req.params.id
      );
      return res.json({ updating });
    } catch (e) {
      next(e);
    }
  }

  async deleteVacancies(req, res, next) {
    try {
      let data = await vacanciesService.deleteVacancies(req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
  async getById(req, res, next) {
    try {
      let vacancies = await vacanciesService.getvacanciesById(req.params.id);
      return res.json({ vacancies });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new vacanciesController();
