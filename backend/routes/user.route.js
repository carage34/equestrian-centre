var express  = require("express");
const { ModuleResolutionKind } = require("typescript");
const users = require("../controllers/user.controller");
const user = require("../models/user");
var router = express.Router();

// Create user
router.post("/", users.create);
router.post("/login", users.login);
router.get("/profile", users.info);

module.exports = router