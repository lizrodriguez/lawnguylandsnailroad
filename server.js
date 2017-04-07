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

app.use(session({
  secret: 'super_secred_string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = pgp('postgres://liz@localhost:5432/lirr_db');

// app.get('/', function(req, res){
//   res.render('index');
// });

app.get('/', function(req, res){
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
    res.render('index', data);
    // res.redirect('/trainlist');
  } else {
    res.render('index');
  }
});

app.get('/trainlist', function(req, res){
  db.any("SELECT * FROM trains")
    .then(function(data){
        let trains_data = {
          trains: data
          }
      // console.log(trains_data);
      res.render('trainlist/index', trains_data); //gets list of trains to put on /trainslist
    });
});

app.get('/signup', function(req, res){
  res.render('signup/index');
});

app.post('/signup', function(req, res){
  let data = req.body;
  bcrypt
    .hash(data.password, 10, function(err, hash){
      db.none(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [data.email, hash]
      ).catch(function(e){
        res.send('Failed to create user: ' + e);
      }).then(function(){
        console.log(data.email + hash + "User created!");
        // res.send('User created!');
        res.redirect('/');
      });
    });
});

app.post('/login', function(req, res){
  let data = req.body;
  let auth_error = "Authorization Failed: Invalid email/password";
  db
    .one("SELECT * FROM users WHERE email = $1", [data.email])
    .catch(function(){
      res.send(auth_error);
    })
    .then(function(user){
      bcrypt.compare(data.password, user.password, function(err, cmp){
        if(cmp){
          req.session.user = user;
          res.redirect("/");
        } else {
          res.send(auth_error);
        }
      });
    });
});

app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server running, listening on port 3000 ┬──┬◡ﾉ(°-°ﾉ)');
});
