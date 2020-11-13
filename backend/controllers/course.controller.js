const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Course = db.course;
const UserCourse = db.userCourse;

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
            success: false,
            title: "Erreur",
            message: "Erreur lors de la mise à jour"
        });
    })
}

exports.addUserCourse = (req, res) => {
    let idUser = req.params.idUser;
    let idCourse = req.params.idCourse;
    console.log("values");
    console.log(idCourse);
    console.log(idUser);
    const userToCourse = {
        idUser: idUser,
        idCourse: idCourse
    }

    UserCourse.create(userToCourse)
    .then(userCourse => {
        res.json({
            sucess:true,
            title:"Inscription au cours",
            message:"Vous avez bien été inscrit à ce cours"
        })
    })
    .catch(result => {
        console.log(result);
        res.json({
            sucess:false,
            title:"Inscription au cours",
            message:"Erreur lors de l'inscription"
        })
    })
}

exports.removeUserCourse = (req, res) => {
    let idUser = req.params.idUser;
    let idCourse = req.params.idCourse;

    UserCourse.destroy({
        where: {
            idUser:idUser,
            idCourse:idCourse
        }
    })
    .then(result => {
        res.json({
            sucess:true,
            title:"Désinscription au cours",
            message:"Vous avez bien été desinscris de ce cours"
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            sucess:false,
            title:"Désinscription au cours",
            message:"Erreur avec la base de données"
        })
    })
}

exports.isRegistered = (req, res) => {
    let idUser = req.params.idUser;
    let idCourse = req.params.idCourse;
    arr = [];

    UserCourse.findAll({
        where: {
            idUser:idUser,
        }
    })
    .then(userCourse => {
        //console.log(userCourse)
        console.log("plz");
        for(let key in userCourse) {
            console.log(key);
            console.log(userCourse[key])
        }
        if(userCourse) {
            res.json({
                userCourse
            })
        } else {
            res.json({
                isRegistered:false
            })
        }
    })
    .catch(error => {
        console.log(error)
    })
}