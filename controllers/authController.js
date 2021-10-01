const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const path = require("path");
const uuid = require("uuid");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.ValidationError("Ошибка при валидации", errors.array())
        );
      }
      const { name, email, password, status } = req.body;
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

      const image = `${process.env.DOMEN_BACK}/api/image/${newNameFile}`;
      const userData = await userService.registrate(
        name,
        email,
        password,
        status,
        image
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.ValidationError("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
