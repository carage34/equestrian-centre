var express  = require("express");
const horses = require("../controllers/horse.controller");
const horse = require("../models/horse");
var router = express.Router();

router.post("/add", horses.add);
router.get("/all", horses.getAllHorses);

module.exports = router