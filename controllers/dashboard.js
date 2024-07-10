const { sequelize } = require("../db");

const dashboardView = (req, res) => {
    res.render('pages/dashboard');
}

module.exports = {
    dashboardView,
}