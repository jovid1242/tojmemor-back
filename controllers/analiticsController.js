const { validationResult } = require("express-validator");
const applicationDto = require("../dtos/applicationDto");
const ApiError = require("../exceptions/apiError");
const ApplicationService = require("../services/collections/ApplicationService");

class analiticsController {
  async getAll(req, res, next) {
    try {
      const analitics = [];

      const collections = await ApplicationService.getAll();
      collections.forEach((el) => {
        analitics.push(new applicationDto(el));
      });

      let arrMonth = [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Мая",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ];
      var arrData = [
        0,0,0,0,0,0,0,0,0,0,0,0
      ]; 
      analitics.map((el) => {
        let a = el.createdAt.toLocaleString(); 
      console.log('colec', typeof (a));
        // arrData[a.toString().split(",")[0].split(".")[1].split("")[1] - 1] +=
        //   +1;
      });

      return res.json({ arrMonth, arrData });
    } catch (e) {
      next(e);
    }
  }

  // async getBook(req, res, next) {
  //     try {
  //         let book = await BookService.getBook(req.params.bookId)
  //         book = book ? new BookDto(book) : {}

  //         return res.json({book})
  //     } catch (e) {
  //         next(e)
  //     }
  // }
}

module.exports = new analiticsController();
