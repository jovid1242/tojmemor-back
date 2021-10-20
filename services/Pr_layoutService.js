const db = require("../models");
const Pr_layouts = db.Pr_layouts;

class Pr_layoutService {
  async getAll() {
    return await Pr_layouts.findAll();
  }
  async createSlider(value) {
    return await Pr_layouts.create(value);
  }
  async updateSlider(value, id) {
    return Pr_layouts.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }
  async deleteLayout(id) {
    return Pr_layouts.destroy({ where: { id: id } });
  }
}

module.exports = new Pr_layoutService();
