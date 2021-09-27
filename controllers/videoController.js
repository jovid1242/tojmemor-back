const projectsDto = require("../dtos/projectsDto");
const ApiError = require("../exceptions/apiError");
const VideoService = require("../services/collections/VideoService");
const path = require("path");
const uuid = require("uuid");

class videoController {
  async getAll(req, res, next) {
    try {
      const video = [];
      const collections = await VideoService.getAll();

      collections.forEach((el) => {
        video.push(new projectsDto(el));
      });

      return res.json({ video });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await VideoService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const video = await VideoService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, video });
      }
      return res.json({ pages: countPage, video });
    } catch (e) {
      next(e);
    }
  }

  async createVideo(req, res, next) {
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

      const data = {
        text: params.text,
        title: params.title,
        urlVideo: params.urlVideo,
        image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
      };

      const creating = await VideoService.createVideo(data);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateVideo(req, res, next) {
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

        const data = {
          text: params.text,
          title: params.title,
          urlVideo: params.urlVideo,
          image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await VideoService.updateVideo(
          data,
          req.params.videoId
        );
        return res.json({ creating });
      }

      const data = {
        text: params.text,
        title: params.title,
        urlVideo: params.urlVideo,
        image: params.image,
      };

      const creating = await VideoService.updateVideo(data, req.params.videoId);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async deleteVideo(req, res, next) {
    try {
      let video = await VideoService.deleteVideo(req.params.videoId);

      return res.json({ video });
    } catch (e) {
      next(e);
    }
  }

  async getVideo(req, res, next) {
    try {
      let video = await VideoService.getVideo(req.params.videoId);
      return res.json({ video });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new videoController();
