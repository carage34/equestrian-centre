const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = db.user;
const Role = db.role;
const SUPER_ADMIN = 2;
const ADMIN = 1;
const USER = 3;
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

    User.findOne({
        where: {
            telephone: req.body.telephone
        }
    })
    .then(user => {
        if(user) {
            res.json({
                success: false,
                title: "Erreur d'inscription",
                message: "Cet numéro de téléphone est déjà associé à un utilisateur"
            });
            return;
        }
    })
    
    bcrypt.hash(req.body.password, 10).then(hash => {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            telephone: req.body.telephone,
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
                    success: true,
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
    console.log(req.body.password);
    User.findOne({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { telephone: req.body.email }
            ]
            
        }
    })
    .then(user => {
        if(!user) {
            res.send({
                success: false,
                title: "Authentification",
                message: "Les identifiants ne correspondent pas"
            })
        }
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
        }
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            message: "Erreur de connexion avec la base de données"
        })
    })
}

exports.info = (req, res) => {
    console.log(req.headers);
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

exports.getSuperAdmin = (req, res) => {
    User.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.json({err: err});
    })
}

exports.removeAdminAccess = (req, res) => {

    let id = req.params.id;

    User.update(
        {roleId: USER},
        {where: {id: id}}
    )
    .then(function(result) {
        res.json({
            success: true,
            title: "Succès",
            message: "Droits administrateur retirés avec succès"
        });
    })
    .catch(function(result) {
        res.json({
            success: true,
            title: "Erreur",
            message: "Erreur du retrait des droits administrateur"
        });
    })
}

exports.addAdminAccess = (req, res) => {
    let id = req.params.id;

    User.update(
        {roleId: ADMIN},
        {where: {id: id}}
    )
    .then(function(result) {
        res.json({
            success: true,
            title: "Succès",
            message: "Droits administrateur ajoutés avec succès"
        });
    })
    .catch(function(result) {
        res.json({
            success: true,
            title: "Erreur",
            message: "Erreur lors de l'ajout des droits administrateur"
        });
    })
}