const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const path = require("path");
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
router.get("/projects/:projectId", projectsController.getProject);
// create project
router.post("/projects/create", projectsController.createProject);
// update project by id
router.put("/projects/update/:id", projectsController.updateProject);
// delete project by id
router.delete("/projects/delete/:projectId", projectsController.deleteProject);

// получение картинки
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

// films
// router.get("/film", filmController.getAll);
// router.get("/film/:filmId", filmController.getFilm);

module.exports = router;
