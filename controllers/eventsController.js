const { validationResult } = require("express-validator");
const eventsDto = require("../dtos/eventsDto");
const ApiError = require("../exceptions/apiError");
const EventsService = require("../services/collections/EventsService");
const path = require("path");
const uuid = require("uuid");

class eventsController {
  async getAll(req, res, next) {
    try {
      const events = [];
      const collections = await EventsService.getAll();
      collections.forEach((el) => {
        events.push(new eventsDto(el));
      });

      return res.json({ events });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await EventsService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const events = await EventsService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, events });
      }
      return res.json({ pages: countPage, events });
    } catch (e) {
      next(e);
    }
  }

  async createEvents(req, res, next) {
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

      const event = {
        text: params.text,
        title: params.title,
        url: params.url,
        image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
      };

      const creating = await EventsService.createEvents(event);
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async updateEvents(req, res, next) {
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

        const event = {
          text: params.text,
          title: params.title,
          url: params.url,
          image: `http://localhost:${process.env.PORT}/api/image/${newNameFile}`,
        };

        const creating = await EventsService.updateEvents(
          event,
          req.params.eventsId
        );
        return res.json({ creating });
      }

      const event = {
        text: params.text,
        title: params.title,
        url: params.url,
        image: params.image,
      };

      const creating = await EventsService.updateEvents(
        event,
        req.params.eventsId
      );
      return res.json({ creating });
    } catch (e) {
      next(e);
    }
  }

  async deleteEvents(req, res, next) {
    try {
      let event = await EventsService.deleteEvents(req.params.eventsId);

      return res.json({ event });
    } catch (e) {
      next(e);
    }
  }

  async getEvent(req, res, next) {
    try {
      let event = await EventsService.getEventst(req.params.eventsId);
      return res.json({ event });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new eventsController();
