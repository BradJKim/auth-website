const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

const registerView = (req, res) => {
    res.render("pages/register");
};

const loginView = (req, res) => {
    res.render("pages/login");
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render("register", { error: "Please fill all fields" });
    }

    if (await User.findOne({ where: { email } })) {
        return res.render("register", {
            error: "A user account already exists with this email",
        });
    }

    const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
    });
    res.redirect("/register");
};

const loginUser = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/?loginsuccess",
        failureRedirect: "/login?error",
    })(req, res);
};

const logoutUser = (req, res) => {
    res.redirect("/login");
};

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser,
};
