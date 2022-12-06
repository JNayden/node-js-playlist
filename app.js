var exps = require('express');
var app = exps();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:MVWWKD4j3ym47CB9@cluster0.lnhwqsk.mongodb.net/test')

var tournirSchema = new mongoose.Schema({
    item: String
})

var Tournir = mongoose.model('Tournir', tournirSchema);
var item = Tournir({ item: 'Chess Arena' }).save(function (err) {
    if (err) throw err;
    console.log("item saved");
})
app.set('view engine', 'ejs');
let globalVersion = 0;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);
const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);


app.use('/css', exps.static('css'));


app.get('/', function (req, res) {
    res.render('profile');

})
app.get('/test.js', function (req, res) {
    res.sendFile(__dirname + "/test.js");

})


app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/register', function (req, res) {
    res.render('register');
})
app.get('/view/:game', function (req, res) {
    if (req.params.game === "chess")
    {
        res.render('view', { template: req.params.game });
    }
    else if (req.params.game === "football")
    {
        res.render('view', { template: req.params.game });
    }
    else if (req.params.game === "basketball")
    {
        res.render('view', { template: req.params.game });
    }
    else if (req.params.game === "voleyball")
    {
        res.render('view', { template: req.params.game });
    }
})
app.get('/subscribe/:id', function (req, res) {
    //console.log(`${req.params.id}`);
    res.status(200).json({ "message": "cool story" })
    globalVersion++;
})
app.get('/sse', (req, res) => {
    var localVersion = 0;
    res.set("Content-Type", "text/event-stream");
    res.set("Connection", "keep-alive");
    res.set("Cache-Control", "no-cache");
    res.set("Access-Control-Allow-Origin", "*");
    console.log("Client connected");

    setInterval(function () {
        if (localVersion < globalVersion)
        {
            res.status(200).write(`data: TEST\n\n`)
            globalVersion = localVersion;
        }
    }, 10)
})


app.get('/route/:cool', (req, res) => {
    res.send('You requested id ' + req.params.cool);
})

app.get('/profile/:cool/:coolest', function (req, res) {
    res.render('profile', { name: req.params.cool, property: req.params.coolest });
    // res.render('profile', { property: req.params.coolest})
})

app.listen(80);
//module.exports.globalVersion = globalVersion;