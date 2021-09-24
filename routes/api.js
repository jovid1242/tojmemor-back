const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authController = require("../controllers/authController");
const projectsController = require("../controllers/projectsController");
const newsController = require("../controllers/newsController");
const eventsController = require("../controllers/eventsController");

router.post(
  "/register",
  body("name").isLength({ min: 3 }),
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post(
  "/login",
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.login
);

// course
// router.get("/course", courseController.getAll);
// router.get("/course/:courseId", courseController.getCourse);

// lessions
// router.get("/course/:courseId/lession", lessionController.getAll);
// router.get("/course/lession/:lessionId", lessionController.getLession);

// projects, delete project by id , create project , update project by id
router.get("/projects", projectsController.getAll);
router.get("/projects/:projectId", projectsController.getProject);
router.post("/projects/create", projectsController.createProject);
router.put("/projects/update/:id", projectsController.updateProject);
router.delete("/projects/delete/:projectId", projectsController.deleteProject);

// news , delete news by id , create news , update news by id
router.get("/news", newsController.getAll);
router.get("/news/:newsId", newsController.getNews);
router.post("/news/create", newsController.createNews);
router.put("/news/update/:newsId", newsController.updateNews);
router.delete("/news/delete/:newsId", newsController.deleteNews);

// events , delete events by id , create events , update events by id (акция)
router.get("/events", eventsController.getAll);
router.get("/events/:eventsId", eventsController.getEvent);
router.post("/events/create", eventsController.createEvents);
router.put("/events/update/:eventsId", eventsController.updateEvents);
router.delete("/events/delete/:eventsId", eventsController.deleteEvents);

// получение картинки
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

// films
// router.get("/film", filmController.getAll);
// router.get("/film/:filmId", filmController.getFilm);

module.exports = router;
