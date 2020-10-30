const { sequelize, Sequelize } = require(".");

const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license: {
            type: DataTypes.STRING
        }
    });
    return User;
};