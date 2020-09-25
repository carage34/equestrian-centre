var express  = require("express");
const { ModuleResolutionKind } = require("typescript");
const users = require("../controllers/user.controller");
var router = express.Router();

// Create user
router.post("/", users.create);

module.exports = router