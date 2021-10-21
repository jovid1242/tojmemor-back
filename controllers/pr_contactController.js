const pr_contactDto = require("../dtos/pr_contactDto");
const Pr_contactService = require("../services/Pr_contactService");

class pr_contactController {
  async getAll(req, res, next) {
    try {
      const pr_layouts = [];
      const collections = await Pr_contactService.getAll();

      collections.forEach((el) => {
        pr_layouts.push(new pr_contactDto(el));
      });

      return res.json({ pr_layouts });
    } catch (e) {
      next(e);
    }
  }

  async createContact(req, res, next) {
    try {
      let params = req.body;
      const layout = {
        adress: params.adress,
        phone: params.phone,
        email: params.email,
        url: params.url,
        project_id: params.project_id,
      };
      const creating = await Pr_contactService.createContact(layout);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateContact(req, res, next) {
    try {
      let params = req.body;

      const project = {
        adress: params.adress,
        phone: params.phone,
        email: params.email,
        url: params.url,
        project_id: params.project_id,
      };
      const updating = await Pr_contactService.updateContact(
        project,
        req.params.id
      );
      return res.json({ updating });
    } catch (e) {
      next(e);
    }
  }

  async deleteContact(req, res, next) {
    try {
      let data = await Pr_contactService.deleteContact(req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new pr_contactController();
