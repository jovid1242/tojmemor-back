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
const videoController = require("../controllers/videoController");

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

// projects, delete project by id , create project , update project by id
router.get("/projects", projectsController.getAll);
router.get("/projects/:projectId", projectsController.getProject);
router.get("/get_projects", projectsController.getByPage);
router.post("/projects/create", projectsController.createProject);
router.put("/projects/update/:id", projectsController.updateProject);
router.delete("/projects/delete/:projectId", projectsController.deleteProject);

// news , delete news by id , create news , update news by id
router.get("/news", newsController.getAll);
router.get("/news/:newsId", newsController.getNews);
router.get("/get_news", newsController.getByPage);
router.post("/news/create", newsController.createNews);
router.put("/news/update/:newsId", newsController.updateNews);
router.delete("/news/delete/:newsId", newsController.deleteNews);

// events , delete events by id , create events , update events by id (акция)
router.get("/events", eventsController.getAll);
router.get("/events/:eventsId", eventsController.getEvent);
router.get("/get_events", eventsController.getByPage);
router.post("/events/create", eventsController.createEvents);
router.put("/events/update/:eventsId", eventsController.updateEvents);
router.delete("/events/delete/:eventsId", eventsController.deleteEvents);

// video , delete video by id , create video , update video by id (Видео)
router.get("/video", videoController.getAll);
router.get("/video/:videoId", videoController.getVideo);
router.get("/get_video", videoController.getByPage);
router.post("/video/create", videoController.createVideo);
router.put("/video/update/:videoId", videoController.updateVideo);
router.delete("/video/delete/:videoId", videoController.deleteVideo);

// получение картинки
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

module.exports = router;
