const registerView = (req, res) => {
    res.render('pages/register');
}

const loginView = (req, res) => {
    res.render('pages/login');
}

const registerUser = (req, res) => {
    res.redirect('pages/register');
}

const loginUser = (req, res) => {
    res.redirect('pages/login');
}

const logoutUser = (req, res) => {
    res.redirect('pages/login');
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser,
}