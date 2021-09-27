const db = require("../../models");
const Application = db.Application;

class ApplicationService {
  async getAll() {
    return await Application.findAll();
  }

  async getByPage(page, limit) {
    return await Application.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async createApplication(value) {
    return await Application.create(value);
  }
}

module.exports = new ApplicationService();
