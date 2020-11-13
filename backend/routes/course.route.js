var express  = require("express");
const { couldStartTrivia } = require("typescript");
const courses = require("../controllers/course.controller");
const course = require("../models/course");
const { route } = require("./user.route");
var router = express.Router();

router.post("/add", courses.add);
router.get("/all", courses.getAllCourses);
router.get("/get/:id", courses.getOne);
router.post("/edit", courses.edit);
router.get("/addUserCourse/:idUser/:idCourse", courses.addUserCourse);
router.get("/removeUserCourse/:idUser/:idCourse", courses.removeUserCourse);
router.get("/isRegistered/:idUser/:idCourse", courses.isRegistered);
router.get("/getUserCourse/:idCourse", courses.getAllUserCourse);
router.get("/assignHorse/:idUser/:idCourse/:idHorse", courses.assignHorse);
router.get("/getAvailableHorse/:idCourse", courses.getAvailableHorses)
router.get("/getUserRegistered/:courseId", courses.getUserRegisteredCourse);

module.exports = router