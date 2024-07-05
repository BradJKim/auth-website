const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const db = require('./queries')

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Set the view engine to Pug

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serves static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware

/* app.use((req, res, next) => {
    const error = new Error('Something went Wrong');
    next(error);
})

// error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
}) */

// Routes

app.get('/', (request, response) => {
    response.render('pages/dashboard', { title: 'Express App', message: 'message'});
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})