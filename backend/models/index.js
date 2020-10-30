const { Sequelize } = require('sequelize');

var sequelize = new Sequelize("jully", "jully", "toto77370", {
    host: "dwarves.iut-fbleau.fr",
    dialect: "mysql",

    pool: {
        max: 10,
        min: 5,
    }
})

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.role = require('./role')(sequelize, Sequelize);

db.role.hasOne(db.role);

module.exports = db;
