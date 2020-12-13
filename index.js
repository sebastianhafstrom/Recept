var express = require('express');
var app = express();
require('dotenv').config()

var db = require('./db.js')


// view engine setup
app.set(('views', 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
    db.getAllRecipe().then(results => {
        // console.log('Resultat: ' + results)
        res.render('allaRecept', {titel: 'Alla recept', allaRecept: results})
    })
})

app.get('/:url', function (req, res) {
    // console.log(req.params.url)
    db.getRecipe(req.params.url).then(results => {
        // console.log('Results: ' + results)
        res.render('recept', {titel: results.titel, ingredienser: results.ingredienser, instruktioner: results.instruktioner})
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