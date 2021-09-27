const db = require("../../models");
const Video = db.Video;

class videoService {
  async getAll() {
    return await Video.findAll();
  }

  async getByPage(page, limit) {
    return await Video.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async getVideo(videoId) {
    return await Video.findOne({ where: { id: videoId } });
  }

  async createVideo(value) {
    return await Video.create(value);
  }

  async updateVideo(value, id) {
    return Video.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteVideo(id) {
    return Video.destroy({ where: { id } });
  }
}

module.exports = new videoService();
