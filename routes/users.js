var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users')
});

router.get('/create', function(req, res, next){
  res.render('createUser')
});

router.get('/login', function(req, res, next){
  res.render('login')
});

router.post('/create', function(req, res, next){
  console.log(req.body)
  if (req.body.password === req.body.confirm){
      bcrypt.hash(req.body.password, 7, function(err, hash){
        knex.raw(`insert into users (username, age, email, password) values ('${req.body.username}', ${req.body.age}, '${req.body.email}', '${hash}')`)
          .then(function(){
            res.send("User Created!")
          })
      });
  } else {
    res.redirect('/create');
  }
});

router.post('/login', function(req, res, next){
  knex.raw(`select * from users where username = '${req.body.username}'`)
    .then(function(user){
      bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp){
        if (resp){
          res.send(user.rows[0])
        } else {
          res.send("Fail")
        }
      })
    })
});



module.exports = router;
