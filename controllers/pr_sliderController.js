const pr_sliderDto = require("../dtos/pr_sliderDto");
const ApiError = require("../exceptions/apiError");
const Pr_sliderService = require("../services/Pr_sliderService");
const path = require("path");
const uuid = require("uuid");

class pr_sliderController {
  async getAll(req, res, next) {
    try {
      const pr_sliders = [];
      const collections = await Pr_sliderService.getAll();

      collections.forEach((el) => {
        pr_sliders.push(new pr_sliderDto(el));
      });

      return res.json({ pr_sliders });
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
      const project = {
        project_id: params.project_id,
        image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
      };
      const creating = await Pr_sliderService.createSlider(project);
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

        const project = {
          project_id: params.project_id,
          image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
        };

        const updating = await Pr_sliderService.updateSlider(
          project,
          req.params.id
        );
        return res.json({ updating });
      }

      const project = {
        project_id: params.project_id,
        image: params.image,
      };

      const updating = await Pr_sliderService.updateSlider(
        project,
        req.params.id
      );
      return res.json({ updating });
    } catch (e) {
      next(e);
    }
  }

  async deleteSlider(req, res, next) {
    try {
      let pr_slider = await Pr_sliderService.deleteSlider(req.params.id);

      return res.json({ pr_slider });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new pr_sliderController();
