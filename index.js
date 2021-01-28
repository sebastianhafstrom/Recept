var express = require('express');
const bodyParser = require('body-parser');
var app = express();
require('dotenv').config()

var db = require('./db.js')


// view engine setup
app.set(('views', 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    db.getAllRecipe().then(results => {
        res.render('allRecipes', {title: 'Alla recept', allRecipes: results})
    })
})

app.get('/add-recipe', function (req, res) {
    res.render('newRecipe', {backendUrl: process.env.URL, title: 'Lägg till nytt recept'})
})

app.post('/submit-recipe', function (req, res) {
    console.log("Skickat recept")
    console.log(req.body)
    db.submitRecipe(req.body).then(results => {
        res.sendStatus(200) 
    })
})

app.post('/update-recipe', function (req, res) {
    var newData = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    }
    db.updateRecipe(req.body._id, newData).then(results => {
        res.sendStatus(200) 
    })
})

app.get('/recipe/:url', function (req, res) {
    db.getRecipe(req.params.url).then(results => {
        res.render('recipe', {backendUrl: process.env.URL, id: results._id.toString(), title: results.title, ingredients: results.ingredients, instructions: results.instructions, url: results.url})
    })
})

app.delete('/recipe/:url', function (req, res) {
    db.deleteRecipe(req.params.url).then(results => {
        res.sendStatus(200) 
    })
})

app.get('/recipe/:url/edit', function (req, res){
    db.getRecipe(req.params.url).then(results => {
        console.log(results)
        res.render('editRecipe', {backendUrl: process.env.URL, id: results._id.toString(), title: results.title, ingredients: results.ingredients, instructions: results.instructions, url: results.url})
    })
})

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res) => {
    res.status(error.status || 500);
    return res.json({
        error: {
        message: error.message,
        },
    });
});

var env = app.get('env')

app.listen(process.env.PORT, function (err) {
    if (err) throw err
    console.log(`Listening on port ${process.env.PORT}, in ${env} mode!`);
})