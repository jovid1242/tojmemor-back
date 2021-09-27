const db = require("../../models");
const Slider = db.Slider;

class SliderService {
  async getAll() {
    return await Slider.findAll();
  }

  async getByPage(page, limit) {
    return await Slider.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async getSlider(sliderId) {
    return await Slider.findOne({ where: { id: sliderId } });
  }

  async createSlider(value) {
    return await Slider.create(value);
  }

  async updateSlider(value, id) {
    return Slider.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteSlider(id) {
    return Slider.destroy({ where: { id } });
  }
}

module.exports = new SliderService();
