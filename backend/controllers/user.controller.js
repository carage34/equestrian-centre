const db = require("../models");
const bcrypt = require("bcrypt");
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
            licence: req.body.licence
        }

        User.create(newUser)
            .then(data => {
                req.session.username = req.body.firstname;
                res.send({
                    success: true,
                    title: "Compte créé",
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
            res.json({
                success: true,
                message: "Authentification réussi",
                user: user
            })
        } else {
            res.json({
                success: false,
                message: "Les identifiants ne correspondent pas"
            })
        }
    })
    .catch(err => {
        res.json({
            success: false,
            message: "Erreur de connexion avec la base de données"
        })
    })
}