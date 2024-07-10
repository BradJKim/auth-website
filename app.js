const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env.local") });

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

//const db = require('./queries')
const db = require("./db.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Set the view engine to Pug

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serves static files from public
app.use(express.static(path.join(__dirname, "public")));

// Middleware

/* app.use((req, res, next) => {
    const error = new Error('Something went Wrong');
    next(error);
})

// error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
})  */

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

db.sync({ force: false }).then(() => {
    app.listen(port, console.log(`App is running on port ${port}`));
});
