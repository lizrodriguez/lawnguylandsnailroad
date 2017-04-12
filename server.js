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

app.get('/', function(req, res){
  res.render('login/index');
});

app.get('/login', function(req, res){
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
    res.render('login/index', data);
  } else {
    res.render('login/index');
  }
});

app.get('/trainlist', function(req, res){
  db.any("SELECT * FROM trains")
    .then(function(data){
        let trains_data = {
          trains: data
          }
      res.render('trainlist/index', trains_data);
    });
});

// app.post('/trainlist', function(req, res){
//   let data = req.body;
//   console.log("req.body:", data)
//     db
//       .none(
//           "INSERT INTO users(stationid) VALUES ($1)",
//           [data.stationid]
//     ).then(function(){
//         db.none(
//           "INSERT INTO trains(shortname) VALUES ($1)",
//       [data.shortname]
//         ).then(function(){
//             res.redirect("/trainlist")
//             })
//             .catch(function(e){
//               res.send('data not accepted: ' + e);
//             });
//         });
//     });

app.get('/signup', function(req, res){
  res.render('signup/index');
});

app.get('/signup/tryagain', function(req, res){
  res.render('signup/tryagain');
});

app.post('/signup', function(req, res){
  let data = req.body;
  bcrypt
    .hash(data.password, 10, function(err, hash){
      db.none(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [data.email, hash]
      ).catch(function(e){
        res.redirect('/signup/tryagain');
      }).then(function(){
        console.log(data.email + hash + " User created! ");
        res.redirect('/trainlist');
      });
    });
});

app.get('/user', function(req, res){
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
    res.render('user/index', data);
    // res.redirect('/trainlist');
  } else {
    res.render('user/index');
  }
});

app.get('/user', function(req, res){
  res.render('user/index');
});

app.get('/user/success', function(req, res){
  res.render('user/success');
});

app.get('/user/tryagain', function(req, res){
  res.render('user/tryagain');
});


app.put('/user', function(req, res){
  db
    .none("UPDATE users SET email = $1 WHERE email = $2",
      [req.body.email, req.session.user.email])
      .then(function(){
      res.redirect("/user/success");
      // res.send('User updated.');
    })
      .catch(function(){
        res.redirect('/user/tryagain');
        // res.send('Failed to update user.');
    });
});

app.get('/tryagain', function(req, res){
  res.render('login/tryagain');
});//remove this

app.post('/login', function(req, res){
  let data = req.body;
  let auth_error = "Authorization Failed: Invalid email/password";
  db
    .one("SELECT * FROM users WHERE email = $1", [data.email])
    .catch(function(){
      res.redirect("/tryagain");
      // res.send(auth_error);
    })
    .then(function(user){
      bcrypt.compare(data.password, user.password, function(err, cmp){
        if(cmp){
          req.session.user = user;
          res.redirect("/trainlist");
        } else {
          res.redirect("/tryagain");
        }
      });
    });
});

app.get('/user/show', function(req, res){
  db
  .any("SELECT * FROM users")
  .then(function(data){
    let user_data = {
      users: data
    }
    res.render('user/show', user_data);
  })
});

app.get('/user/show/:id', function(req,res){
  let id = req.params.id;
  db
  .one("SELECT * FROM users WHERE id = $1", [id])
  .then(function(data){
    let user_data = {
      users: data
    }
    res.render("/user/show/", user_data);
  });
});

app.get('/delete/:id', function (req, res){
  let id = req.params.id;
  db
  .none("DELETE FROM users WHERE id = $1", [id])
  .then(function(){
  res.redirect("/user/success");
  })
  .catch(function(){
    res.redirect('/user/tryagain');
  });
});

app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Server running, listening on port 3000 ┬──┬◡ﾉ(°-°ﾉ)');
});
