const db = require("../models");
const Pr_contacts = db.Pr_contacts;

class Pr_contactService {
  async getAll() {
    return await Pr_contacts.findAll();
  }
  async createContact(value) {
    return await Pr_contacts.create(value);
  }
  async updateContact(value, id) {
    return Pr_contacts.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }
  async deleteContact(id) {
    return Pr_contacts.destroy({ where: { id: id } });
  }
}

module.exports = new Pr_contactService();
