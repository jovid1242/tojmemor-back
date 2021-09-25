const db = require("../../models");
const News = db.News;

class NewsService {
  async getAll() {
    return await News.findAll();
  }

  async getByPage(page, limit) {
    return await News.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async getNews(newsId) {
    return await News.findOne({ where: { id: newsId } });
  }

  async createNews(value) {
    return await News.create(value);
  }

  async updateNews(value, id) {
    return News.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deleteNews(id) {
    return News.destroy({ where: { id: id } });
  }
}

module.exports = new NewsService();
