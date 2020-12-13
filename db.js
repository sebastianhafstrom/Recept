const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.gypbn.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var recept

client.connect(err => {
    if (err) return console.log(err)
    console.log('Connected to Database')

    const db = client.db('Recept_hemsida')
    recept = db.collection('Recept')
})

function getRecipe(test) {
    let query = {url: test}
    let doc = recept.findOne(query).catch(error => console.log(error))
    return doc
}

function getAllRecipe() {
    let doc = recept.find().sort({titel: 1}).toArray().catch(error => console.log(error))
    return doc
}

module.exports = {
    getRecipe,
    getAllRecipe
}