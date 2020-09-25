const { Sequelize } = require('sequelize');

var sequelize = new Sequelize("equestre", "equestre", "equestre", {
    host: "192.168.1.17:3307",
    dialect: "mysql",

    pool: {
        max: 10,
        min: 5,
    }
})

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tutorials = require('./user')(sequelize, Sequelize);

module.exports = db;
