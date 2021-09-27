const sliderDto = require("../dtos/sliderDto");
const ApiError = require("../exceptions/apiError");
const SliderService = require("../services/collections/SliderService");
const path = require("path");
const uuid = require("uuid");

class sliderController {
  async getAll(req, res, next) {
    try {
      const slider = [];
      const collections = await SliderService.getAll();

      collections.forEach((el) => {
        slider.push(new sliderDto(el));
      });

      return res.json({ slider });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await SliderService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const slider = await SliderService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, slider });
      }
      return res.json({ pages: countPage, slider });
    } catch (e) {
      next(e);
    }
  }

  async createSlider(req, res, next) {
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
        url: params.url,
        image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
      };

      const creating = await SliderService.createSlider(data);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateSlider(req, res, next) {
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
          url: params.url,
          image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await SliderService.updateSlider(
          data,
          req.params.sliderId
        );
        return res.json({ creating });
      }

      const data = {
        text: params.text,
        title: params.title,
        url: params.url,
        image: params.image,
      };

      const creating = await SliderService.updateSlider(
        data,
        req.params.sliderId
      );
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async deleteSlider(req, res, next) {
    try {
      let slider = await SliderService.deleteSlider(req.params.sliderId);

      return res.json({ slider });
    } catch (e) {
      next(e);
    }
  }

  async getSlider(req, res, next) {
    try {
      let slider = await SliderService.getSlider(req.params.sliderId);
      return res.json({ slider });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new sliderController();
