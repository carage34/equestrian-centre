const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const horse = require("../models/horse");
const userCourseHorse = require("../models/userCourseHorse");
const Course = db.course;
const UserCourse = db.userCourse;
const User = db.user;
const UserCourseHorse = db.userCourseHorse
const Horse = db.horse;

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
        console.log(course);
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
            success:true,
            title:"Désinscription au cours",
            message:"Vous avez bien été desinscris de ce cours"
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            success:false,
            title:"Désinscription au cours",
            message:"Erreur avec la base de données"
        })
    })
}

exports.getUserByIds = (ids) => {

}

exports.getAllUserCourse = (req, res) => {
    let idCourse = req.params.idCourse;
    idArr = [];
    UserCourse.findAll({
        attributes: ['idUser'],
        where: {
            idCourse: idCourse
        }
    }).then(userCourse => {
        for(let [key, value] of Object.entries(userCourse)) {
            //console.log(value.dataValues);
            idArr.push(value.dataValues.idUser);
        }
        User.findAll({
            where: {
                id: {
                    [Op.in]: idArr
                }
            }
        }).then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => {
            console.log(err);
        })
        
    })
    .catch(err => {
        console.log(err);

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

exports.assignHorse = (req, res) => {
    idUser = req.params.idUser;
    idCourse = req.params.idCourse;
    idHorse = req.params.idHorse;

    newAssignHorse = {
        idUser: idUser,
        idCourse: idCourse,
        idHorse:  idHorse
    }

    UserCourseHorse.create(newAssignHorse)
    .then(newAssignHorse => {
        res.json({
            success:true,
            title:"Assignation",
            message:"Le cheval a été assigné avec succès"
        })
    })
    .catch(err => {
        res.json({
            success:false,
            title:"Assignation",
            message:"Erreur lors de l'assignation"
        })
    })
}

exports.getAvailableHorses = (req, res) => {
    idCourse = req.params.idCourse;
    horseId = [];
    // get all horse id already taken
    UserCourseHorse.findAll({
        attributes: ['idHorse'],
        where: {
            idCourse: idCourse
        }
    })
    .then(userCourseHorse => {
        for(let [key, value] of Object.entries(userCourseHorse)) {
            console.log(value.dataValues);
            horseId.push(value.dataValues.idHorse);
        }
        console.log("id values");
        console.log(horseId);

        Horse.findAll({
            where: {
                id: {
                    [Op.notIn]: horseId
                }
            }
        })
        .then(horses => {
            console.log(horses);
            res.json(horses);
            if(horses.length === 0) {
                console.log("empty");
            } else {
                console.log("pas empty");
            }
        })
        .catch(err => {
            console.log(err);
        })

    })
    .catch(err => {
        console.log(err);
    })
}

exports.getUserRegisteredCourse = (req, res) => {
    let courseId = req.params.courseId;
    userId = [];

    UserCourse.findAll({
        attributes: ["idUser"],
        where: {
            idCourse: courseId
        }
    })
    .then(userCourse => {
        for(let [key, value] of Object.entries(userCourse)) {
            console.log(value.dataValues);
            userId.push(value.dataValues.idUser);
        }
        console.log("testtest");
        console.log(userId);

        User.findAll({
            where: {
                id: {
                    [Op.in]: userId
                }
            }
        })
        .then(users => {
            console.log(users);
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(error => {
        console.log(error);
    })
}

exports.getAllHorsesUsers = (req, res) => {
    let courseId = req.params.courseId;
    UserCourseHorse.findAll({
        where: {
            idCourse: courseId
        }
    })
    .then(userCourseHorse => {
        res.json(userCourseHorse);
    })
}