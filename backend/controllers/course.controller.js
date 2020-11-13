const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Course = db.course;

exports.add = (req, res) => {
    console.log("data");
    console.log(req.body);
    const newCourse = {
        title: req.body.title,
        courseDate: req.body.courseDate,
        maxUser: req.body.maxUser,
        galop: req.body.galop
    }

    Course.create(newCourse)
        .then(course => {
            res.json({
                success: true,
                title: "Ajouter une reprise",
                message: "Reprise ajouté avec succès"
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

exports.getAllCourses = (req, res) => {
    Course.findAll()
    .then(courses => {
        res.json(courses);
    })
    .catch(err => {
        res.json({err: err});
    })
}

exports.getOne = (req, res) => {
    let id = req.params.id;

    Course.findOne({
        where: {
            id: id
        }
    })
    .then(course => {
        res.json(course);
    })
    .catch(err => {
        res.json({err: err});
    })
}

exports.edit = (req, res) => {
    Course.update(
        {
            title: req.body.title,
            courseDate: req.body.courseDate,
            maxUser: req.body.maxUser,
            galop: req.body.galop
        },
        {where: {id: req.body.id}}
    )
    .then(function(result) {
        res.json({
            success: true,
            title: "Succès",
            message: "Reprise mise à jour"
        });
    })
    .catch(function(result) {
        console.log(result);
        res.json({
            success: true,
            title: "Erreur",
            message: "Erreur lors de la mise à jour"
        });
    })
}