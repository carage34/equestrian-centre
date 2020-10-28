const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UseExistingWebDriver } = require("protractor/built/driverProviders");
const User = db.user;

//Create and persist new user
exports.create = (req, res) => {
    console.log(req.body);

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user) {
            res.json({
                success: false,
                title: "Erreur d'inscription",
                message: "Cet email est déjà associé à un utilisateur"
            });
            return;
        }
    })
    
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            license: req.body.licence
        }

        User.create(newUser)
            .then(user => {
                let token = jwt.sign(user.dataValues, "secret_key", {
                    expiresIn: 1440
                })
                res.json({
                    token: token,
                    sucess: true,
                    title: "Inscription",
                    message: "Compte créé avec succès"
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    title: "Erreur inscription",
                    message: "Une erreur est survenue lors de l'inscription",
                    messageFull: err.message
                })
            })
    })
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, "secret_key", {
                expiresIn: 1440
            })
            res.json(
                {
                    token: token,
                    success: true,
                    title: "Authentification",
                    message: "Authentification réussi",
                }
            )
        } else {
            res.send({
                success: false,
                title: "Authentification",
                message: "Les identifiants ne correspondent pas"
            })
        }
    })
    .catch(err => {
        res.send({
            success: false,
            message: "Erreur de connexion avec la base de données"
        })
    })
}

exports.info = (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], 'secret_key');

    User.findOne({
        where: {
            id: decoded.id
        }
    })
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.send("L'utilisateur n'existe pas")
        }
    })
    .catch(err => {
        res.send('Erreur avec la base de données');
    })
}