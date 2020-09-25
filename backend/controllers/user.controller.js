const db = require("../models");
const user = db.user;

//Create and persist new user
exports.create = (req, res) => {
    console.log(req.body);
}