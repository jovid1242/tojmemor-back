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
const sliderController = require("../controllers/sliderController");
const userController = require("../controllers/userController");
const applicationController = require("../controllers/applicationsController");
const teamController = require("../controllers/teamController");
const analiticsController = require("../controllers/analiticsController");
const pr_sliderController = require("../controllers/pr_sliderController");
const pr_layoutController = require("../controllers/pr_layoutController");
const pr_advantagesController = require("../controllers/pr_advantagesController");
const pr_contactController = require("../controllers/pr_contactController");
const vacanciesController = require("../controllers/vacanciesController");

router.post(
  "/register",
  body("name").isLength({ min: 3 }),
  body("email").isLength({ min: 3 }),
  body("status").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post(
  "/login",
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.login
);

// user
router.get("/users", userController.getAll);
router.get("/user/:id", userController.getUser);
router.get("/get_users", userController.getByPage);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);

// projects, delete project by id , create project , update project by id
router.get("/projects", projectsController.getAll);
router.get("/projects/:projectId", projectsController.getProject);
router.get("/get_projects", projectsController.getByPage);
router.post("/projects/create", projectsController.createProject);
router.put("/projects/update/:id", projectsController.updateProject);
router.delete("/projects/delete/:projectId", projectsController.deleteProject);

router.post("/pr_slider/create", pr_sliderController.createSlider);
router.get("/pr_slider", pr_sliderController.getAll);
router.put("/pr_slider/update/:id", pr_sliderController.updateSlider);
router.delete("/pr_slider/delete/:id", pr_sliderController.deleteSlider);

router.post("/pr_layout/create", pr_layoutController.createLayout);
router.get("/pr_layout", pr_layoutController.getAll);
router.put("/pr_layout/update/:id", pr_layoutController.updateLayout);
router.delete("/pr_layout/delete/:id", pr_layoutController.deleteLayout);

router.post("/pr_advantages/create", pr_advantagesController.createAdvantages);
router.get("/pr_advantages", pr_advantagesController.getAll);
router.put(
  "/pr_advantages/update/:id",
  pr_advantagesController.updateAdvantages
);
router.delete(
  "/pr_advantages/delete/:id",
  pr_advantagesController.deleteAdvantages
);

//vacancies
router.get("/vacancies", vacanciesController.getAll);
router.get("/vacancies/:id", vacanciesController.getById);
router.post("/vacancies/create", vacanciesController.createVacancies);
router.put("/vacancies/update/:id", vacanciesController.updateVacancies);
router.delete("/vacancies/delete/:id", vacanciesController.deleteVacancies);

router.post("/pr_contact/create", pr_contactController.createContact);
router.get("/pr_contact/:id", pr_contactController.getById);
router.get("/pr_contact", pr_contactController.getAll);
router.put("/pr_contact/update/:id", pr_contactController.updateContact);
router.delete("/pr_contact/delete/:id", pr_contactController.deleteContact);

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

// slider , delete slider by id , create slider , update slider by id (Видео)
router.get("/slider", sliderController.getAll);
router.get("/slider/:sliderId", sliderController.getSlider);
router.get("/get_slider", sliderController.getByPage);
router.post("/slider/create", sliderController.createSlider);
router.put("/slider/update/:sliderId", sliderController.updateSlider);
router.delete("/slider/delete/:sliderId", sliderController.deleteSlider);

// application
router.get("/application", applicationController.getAll);
router.get("/get_application", applicationController.getByPage);
router.post("/application/create", applicationController.createApplication);

// team , delete team by id , create team , update team by id
router.get("/team", teamController.getAll);
router.get("/team/:id", teamController.getTeam);
router.get("/get_team", teamController.getByPage);
router.post("/team/create", teamController.createTeam);
router.put("/team/update/:id", teamController.updateTeam);
router.delete("/team/delete/:id", teamController.deleteTeam);

// analitics
router.get("/analitics", analiticsController.getAll);

// получение картинки
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

module.exports = router;
