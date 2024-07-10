const express = require("express");
const dashboardController = require("../controllers/dashboard");

const router = express.Router();
router.get("/", (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login?next=" + req.url);
    },
    dashboardController.dashboardView
);

module.exports = router;
