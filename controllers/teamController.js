const TeamDto = require("../dtos/TeamDto");
const ApiError = require("../exceptions/apiError");
const TeamService = require("../services/collections/TeamService");
const path = require("path");
const uuid = require("uuid");

class teamController {
  async getAll(req, res, next) {
    try {
      const team = [];
      const collections = await TeamService.getAll();

      collections.forEach((el) => {
        team.push(new TeamDto(el));
      });

      return res.json({ team });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await TeamService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const team = await TeamService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, team });
      }
      return res.json({ pages: countPage, team });
    } catch (e) {
      next(e);
    }
  }

  async createTeam(req, res, next) {
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
        name: params.name,
        profession: params.profession,
        image: `${process.env.DOMEN_BACK}/api/image/${newNameFile}`,
      };

      const creating = await TeamService.createTeam(data);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateTeam(req, res, next) {
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
          name: params.name,
          profession: params.profession,
          image: `${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await TeamService.updateTeam(data, req.params.id);
        return res.json({ creating });
      }

      const data = {
        name: params.name,
        profession: params.profession,
        image: params.image,
      };

      const creating = await TeamService.updateTeam(data, req.params.id);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      let team = await TeamService.deleteTeam(req.params.id);

      return res.json({ team });
    } catch (e) {
      next(e);
    }
  }

  async getTeam(req, res, next) {
    try {
      let team = await TeamService.getTeam(req.params.id);
      return res.json({ team });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new teamController();
