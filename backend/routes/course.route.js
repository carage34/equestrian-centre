var express  = require("express");
const courses = require("../controllers/course.controller");
const course = require("../models/course");
const { route } = require("./user.route");
var router = express.Router();

router.post("/add", courses.add);
router.get("/all", courses.getAllCourses);
router.get("/get/:id", courses.getOne);
router.post("/edit", courses.edit);

module.exports = router