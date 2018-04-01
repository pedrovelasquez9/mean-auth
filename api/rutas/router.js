var express = require('express');
var router = express.Router();
var User = require('../modelos/usuario');

var sessionId = null;
//middleware
function requiresLogin(req, res, next) {
    if (sessionId != null) {
      return next();
    } else {
      var err = new Error('Debes iniciar sesión para ver tu perfil');
      err.status = 401;
      return next(err);
    }
  }

//Rutas para registrar usuario/iniciar sesión
router.post('/usuario', function (req, res, next) {

  if (req.body.email &&
    req.body.username &&
    req.body.password) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        sessionId = user._id;
        return res.redirect('/perfil');
      }
    });

  } else if (req.body.login && req.body.password) {
    User.authenticate(req.body.login, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Por favor revise sus credenciales');
        err.status = 401;
        return next(err);
      } else {
        sessionId = user._id;
          if(err){console.log(err);}
          return res.redirect('/perfil');
      }
    });
  } else {
    var err = new Error('Todos los campos son requeridos');
    err.status = 400;
    return next(err);
  }
})

// Obtener data de perfil
router.get('/perfil', requiresLogin, function (req, res, next) {
  User.findById(sessionId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
          return res.send(user)
      }
    });
});

//Cerrar sesión
router.get('/salir', function (req, res, next) {
  if(sessionId != null){
    sessionId = null;
    return res.send(true);
  }
});


module.exports = router;