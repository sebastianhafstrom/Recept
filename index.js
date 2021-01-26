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
        // console.log('Resultat: ' + results)
        res.render('allRecipes', {title: 'Alla recept', allRecipes: results})
    })
})

app.get('/add-recipe', function (req, res) {
    res.render('newRecipe', {title: 'Lägg till nytt recept'})
})

app.post('/submit-recipe', function (req, res) {
    console.log("Skickat recept")
    console.log(req.body)
    db.submitRecipe(req.body)
    res.sendStatus(200)
})

app.post('/update-recipe', function (req, res) {
    console.log("Uppdaterat recept")
    console.log(req.body)
    var newData = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    }
    db.updateRecipe(req.body._id, newData)
    res.sendStatus(200)
})

app.get('/recipe/:url', function (req, res) {
    // console.log(req.params.url)
    db.getRecipe(req.params.url).then(results => {
        // console.log('Results: ' + results)
        res.render('recipe', {title: results.title, ingredients: results.ingredients, instructions: results.instructions, url: results.url})
    })
})

app.get('/recipe/:url/edit', function (req, res){
    db.getRecipe(req.params.url).then(results => {
        console.log(results)
        res.render('editRecipe', {id: results._id.toString(), title: results.title, ingredients: results.ingredients, instructions: results.instructions, url: results.url})
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