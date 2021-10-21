const db = require("../models");
const Vacancies = db.Vacancies;

class vacanciesService {
  async getAll() {
    return await Vacancies.findAll();
  }
  async createVacancies(value) {
    return await Vacancies.create(value);
  }
  async updateVacancies(value, id) {
    return Vacancies.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }
  async getvacanciesById(id) {
    return await Vacancies.findOne({ where: { id: id } });
  }
  async deleteVacancies(id) {
    return Vacancies.destroy({ where: { id: id } });
  }
}

module.exports = new vacanciesService();
