const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

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

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            const user = await User.findOne({ where: { email } });
            if (!user) return done(null, false);
            if (!bcrypt.compareSync(password, user.password))
                return done(null, false);
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id } });
    done(null, user);
});

app.use(
    session({
        secret: "secret",
        saveUninitialized: true,
        resave: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);

db.sync({ force: false }).then(() => {
    app.listen(port, console.log(`App is running on port ${port}`));
});
