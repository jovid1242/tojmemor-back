const { validationResult } = require("express-validator");
const newsDto = require("../dtos/newsDto");
const ApiError = require("../exceptions/apiError");
const NewsService = require("../services/collections/NewsService");
const path = require("path");
const uuid = require("uuid");

class newsController {
  async getAll(req, res, next) {
    try {
      const news = [];
      const collections = await NewsService.getAll();

      collections.forEach((el) => {
        news.push(new newsDto(el));
      });

      return res.json({ news });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await NewsService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const news = await NewsService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, news });
      }
      return res.json({ pages: countPage, news });
    } catch (e) {
      next(e);
    }
  }

  async createNews(req, res, next) {
    try {
      let params = req.body;
      let file = req.files.image;
      const typeImage = file.mimetype.split("/").splice(1, 1);
      const newNameFile = `${uuid.v4()}.${typeImage}`;

      file.mv(
        path.join(__dirname + "/../uploads", "images/") + newNameFile,
        (err) => {
          if (err) {
            throw ApiError.BadRequest("Ошибка при загрузка файла");
          }
        }
      );

      const news = {
        text: params.text,
        title: params.title,
        data: params.data,
        url: params.url,
        image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
      };

      const creating = await NewsService.createNews(news);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateNews(req, res, next) {
    try {
      let params = req.body;
      if (req.files !== null) {
        let file = req.files.image;
        const typeImage = file.mimetype.split("/").splice(1, 1);
        const newNameFile = `${uuid.v4()}.${typeImage}`;

        file.mv(
          path.join(__dirname + "/../uploads", "images/") + newNameFile,
          (err) => {
            if (err) {
              throw ApiError.BadRequest("Ошибка при загрузка файла");
            }
          }
        );

        const news = {
          text: params.text,
          title: params.title,
          data: params.data,
          url: params.url,
          image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
        };

        const creating = await NewsService.updateNews(news, req.params.newsId);
        return res.json({ creating });
      }

      const news = {
        text: params.text,
        title: params.title,
        url: params.url,
        data: params.data,
        image: params.image,
      };

      const creating = await NewsService.updateNews(news, req.params.newsId);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async deleteNews(req, res, next) {
    try {
      let news = await NewsService.deleteNews(req.params.newsId);

      return res.json({ news });
    } catch (e) {
      next(e);
    }
  }

  async getNews(req, res, next) {
    try {
      let news = await NewsService.getNews(req.params.newsId);
      return res.json({ news });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new newsController();
