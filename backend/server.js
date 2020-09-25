const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsParam = {
    origin: "http://localhost:4200"
};

app.use(cors(corsParam));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

user = require("./routes/user.route");

app.use('/api/user', user);

app.get("/", function(req, res) {
    res.json("Api status: Ok");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
})