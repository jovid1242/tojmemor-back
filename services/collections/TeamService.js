const db = require("../../models");
const Team = db.Team;

class TeamService {
  async getAll() {
    return await Team.findAll();
  }

  async getByPage(page, limit) {
    return await Team.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async getTeam(id) {
    return await Team.findOne({ where: { id } });
  }

  async createTeam(value) {
    return await Team.create(value);
  }

  async updateTeam(value, id) {
    return Team.findOne({ where: { id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteTeam(id) {
    return Team.destroy({ where: { id } });
  }
}

module.exports = new TeamService();
