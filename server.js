const express = require('express');
const app = express();

const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const methodOverride = require('method-override')
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

var db = pgp('postgres://liz@localhost:5432/lirr_db');

app.get('/', function(req, res){
    res.render('index');
});

app.get('/signup', function(req, res){
    res.render('signup');
});

app.listen(3000, function () {
  console.log('Server running, listening on port 3000 ┬──┬◡ﾉ(°-°ﾉ)');
});
