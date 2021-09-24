const db = require("../../models");
const Events = db.Events;

class EventsService {
  async getAll() {
    return await Events.findAll();
  }

  async getEvents(eventsId) {
    return await Events.findOne({ where: { id: eventsId } });
  }

  async createEvents(value) {
    return await Events.create(value);
  }

  async updateEvents(value, id) {
    return Events.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteEvents(id) {
    return Events.destroy({ where: { id: id } });
  }
}

module.exports = new EventsService();
