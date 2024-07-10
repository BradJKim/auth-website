const { sequelize } = require("../db");

const dashboardView = (req, res) => {
    res.render('pages/dashboard');
    funny();
}

const funny = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {
    dashboardView,
}