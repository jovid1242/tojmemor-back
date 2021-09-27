const userDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");
const UserService = require("../services/userService");

class userController {
  async getAll(req, res, next) {
    try {
      const users = [];
      const collections = await UserService.getAll();

      collections.forEach((el) => {
        users.push(new userDto(el));
      });

      return res.json({ users });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await UserService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const user = await UserService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, user });
      }
      return res.json({ pages: countPage, user });
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      let user = await UserService.getUser(req.params.id);
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      let user = await UserService.deleteUser(req.params.id);

      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
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
          email: params.email,
          status: params.status,
          image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await UserService.updateUser(data, req.params.id);
        return res.json({ creating });
      }

      const data = {
        tname: params.name,
        email: params.email,
        status: params.status,
        image: params.image,
      };

      const creating = await UserService.updateUser(data, req.params.id);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new userController();
