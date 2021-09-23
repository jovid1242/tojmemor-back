const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const lessionController = require("../controllers/lessionController");
const projectsController = require("../controllers/projectsController");
const filmController = require("../controllers/filmController");

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

// projects
router.get("/projects", projectsController.getAll);
router.get("/projects/:projectsId", projectsController.getProject);

// films
// router.get("/film", filmController.getAll);
// router.get("/film/:filmId", filmController.getFilm);

module.exports = router;
