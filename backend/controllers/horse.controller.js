const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Horse = db.horse;

exports.add = (req, res) => {
    console.log(req.body);
    const newHorse = {
        name: req.body.name,
        age: req.body.age,
        race: req.body.race
    }

    Horse.create(newHorse)
        .then(horse => {
            res.json({
                success: true,
                title: "Ajouter un cheval",
                message: "Cheval ajouté avec succès"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                success: false,
                title: "Erreur",
                message: "Une erreur est survenue lors de l'ajout",
                messageFull: err.message
            })
        })
}

exports.getAllHorses = (req, res) => {
    Horse.findAll()
    .then(horses => {
        res.json(horses);
    })
    .catch(err => {
        console.log(err);
    })  
}