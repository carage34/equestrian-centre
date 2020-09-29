const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;

//Create and persist new user
exports.create = (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            licence: req.body.licence
        }
        User.create(newUser)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message
                })
            })
    })
}