const pr_layoutDto = require("../dtos/pr_layoutDto");
const ApiError = require("../exceptions/apiError");
const Pr_layoutService = require("../services/Pr_layoutService");
const path = require("path");
const uuid = require("uuid");

class pr_layoutController {
  async getAll(req, res, next) {
    try {
      const pr_layouts = [];
      const collections = await Pr_layoutService.getAll();

      collections.forEach((el) => {
        pr_layouts.push(new pr_layoutDto(el));
      });

      return res.json({ pr_layouts });
    } catch (e) {
      next(e);
    }
  }

  async createLayout(req, res, next) {
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
      const layout = {
        room: params.room,
        floor: params.floor,
        square: params.square,
        project_id: params.project_id,
        image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
      };
      const creating = await Pr_layoutService.createSlider(layout);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateLayout(req, res, next) {
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
          room: params.room,
          floor: params.floor,
          square: params.square,
          project_id: params.project_id,
          image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
        };

        const updating = await Pr_layoutService.updateSlider(
          project,
          req.params.id
        );
        return res.json({ updating });
      }

      const project = {
        room: params.room,
        floor: params.floor,
        square: params.square,
        project_id: params.project_id,
        image: params.image,
      };

      const updating = await Pr_layoutService.updateSlider(
        project,
        req.params.id
      );
      return res.json({ updating });
    } catch (e) {
      next(e);
    }
  }

  async deleteLayout(req, res, next) {
    try {
      let data = await Pr_layoutService.deleteLayout(req.params.id);

      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new pr_layoutController();
