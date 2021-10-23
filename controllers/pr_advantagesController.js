const pr_advantageDto = require("../dtos/pr_advantageDto");
const Pr_advantagesService = require("../services/Pr_advantagesService");

class pr_advantagesController {
  async getAll(req, res, next) {
    try {
      const pr_advantages = [];
      const collections = await Pr_advantagesService.getAll();

      collections.forEach((el) => {
        pr_advantages.push(new pr_advantageDto(el));
      });

      return res.json({ pr_advantages });
    } catch (e) {
      next(e);
    }
  }

  async createAdvantages(req, res, next) {
    try {
      let params = req.body;
      const layout = {
        text: params.text,
        projects_id: params.project_id,
      };
      const creating = await Pr_advantagesService.create(layout);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateAdvantages(req, res, next) {
    try {
      let params = req.body;

      const project = {
        text: params.text,
        projects_id: params.project_id,
      };
      const updating = await Pr_advantagesService.updateAdvantages(
        project,
        req.params.id
      );
      return res.json({ updating });
    } catch (e) {
      next(e);
    }
  }

  async deleteAdvantages(req, res, next) {
    try {
      let data = await Pr_advantagesService.deleteAdvantages(req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new pr_advantagesController();
