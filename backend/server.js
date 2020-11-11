const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session');
const cors = require("cors");
var morgan = require('morgan')
const db = require("./models");

const secret = 'secret';

const app = express();

app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false }
}));

var corsParam = {
    credentials: true,
    origin: "http://localhost:4200"
};

app.use(cors(corsParam));

app.use(bodyParser.json());

app.use(morgan());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

user = require("./routes/user.route");

horse = require("./routes/horse.route");

app.use('/api/user', user);

app.use('/api/horse', horse);

app.get("/", function(req, res) {
    res.json("Api status: Ok");
})

app.get("/session", function(req, res) {
    res.json({session: req.session});
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
})