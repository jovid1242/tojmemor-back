const db = require("../models");
const Pr_advantage = db.Pr_advantage;

class Pr_advantagesService {
  async getAll() {
    return await Pr_advantage.findAll();
  }
  async create(value) {
    return await Pr_advantage.create(value);
  }
  async updateAdvantages(value, id) {
    return Pr_advantage.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }
  async deleteAdvantages(id) {
    return Pr_advantage.destroy({ where: { id: id } });
  }
}

module.exports = new Pr_advantagesService();
