const db = require("../models");
const Pr_slider = db.Pr_sliders;

class Pr_sliderService {
  async getAll() {
    return await Pr_slider.findAll();
  }
  async createSlider(value) {
    return await Pr_slider.create(value);
  }
  async updateSlider(value, id) {
    return Pr_slider.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }
  async deleteSlider(id) {
    return Pr_slider.destroy({ where: { id: id } });
  }
}

module.exports = new Pr_sliderService();
