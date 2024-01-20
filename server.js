const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Import the path module

const app = express();
const PORT = process.env.PORT || 6061;

var corsOptions = {
    origin: "http://localhost:6061"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync();

// Serve static files from the 'html' folder
app.use(express.static(path.join(__dirname, "views")));

// Root route ("/") will serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server berjalan pada PORT ${PORT}.`);
});
