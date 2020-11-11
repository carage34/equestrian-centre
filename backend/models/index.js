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

db.user = require('./user.js')(sequelize, Sequelize);
db.role = require('./role.js')(sequelize, Sequelize);
db.horse = require('./horse')(sequelize, Sequelize);

//db.user.hasOne(db.role, {foreignKey: 'id'});
//db.role.belongsTo(db.user);

module.exports = db;
