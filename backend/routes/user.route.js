var express  = require("express");
const users = require("../controllers/user.controller");
const user = require("../models/user");
var router = express.Router();

// Create user
router.post("/", users.create);
router.post("/login", users.login);
router.get("/profile", users.info);
router.get("/getSuperAdmin", users.getSuperAdmin);
router.get("/removeAdminAccess/:id", users.removeAdminAccess);
router.get("/addAdminAccess/:id", users.addAdminAccess);
router.get("/profile/:id", users.infoById);

module.exports = router