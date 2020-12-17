const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/Usuario');
const {verificaToken,verificaAdmin_Role} = require('../middlewares/autenticacion');
const _ = require('underscore');
//Despues de '/usuarios' agregamos un middleware

app.get('/usuarios',verificaToken ,(req, res) => {
  /*return res.json({
    usuario: req.usuario,
    nombre: req.usuario.nombre,
    email: req.usuario.email
  })*/
  let desde = req.query.desde || 0
  let limite = req.query.limite || 5
  limite = Number(limite)
  desde = Number(desde)
  Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios) => {
      if(err) {
        return res.status(400).json({
          ok:false,
          err
        })
      }
       Usuario.count({}, (err, conteo)=> {
        res.json({
          ok:true,
          usuarios,
          conteo
        });
      })
    })
})

app.post('/usuarios',[verificaToken,verificaAdmin_Role], (req, res) => {
  //obtenemos toda la informacion de lo que venga en el post
  let body = req.body;
  //creamos objeto de instancia del schema usuario
  let usuario = new Usuario({
    nombre:body.nombre,
    email:body.email,
    //encriptamos contraseña
    password:bcrypt.hashSync(body.password,10),
    role:body.role
  });
  usuario.save( (err,usuarioDB) => {
    if(err) {
      return res.status(400).json({
        ok:false,
        err
      })
    }

    //usuarioDB.password = null;
    res.json({
      ok:true,
      usuario:usuarioDB
    })
  });
  //validacion para que el nombre en el form sea obligatorio
 /* if(body.nombre === undefined){
  	res.status(400).json({
  		ok:false,
  		mensaje:"El nombre es necesario"
  	});
  } else {
	  	 res.json({
	  		persona:body
	  	})
  } 
*/})
//actualizacion de registro
app.put('/usuarios/:id',verificaToken, function (req, res) {
  //obtenemos id por url
  let id = req.params.id;
  let body = _.pick(req.body,['nombre','email','img','role','estado']);
  //Forma 1 para no actualizar datos innecesarios y la forma 2 es con underscore
  // delete body.password;
  // delete body.google;

  //buscamos en la base de datos
  Usuario.findByIdAndUpdate( id, body, {new:true,runValidators:true}, (err, usuarioDB) => {
    if(err) {
      return res.status(400).json({
        ok:false,
        err
      })
    }
    res.json({
      ok:true,
      usuario:usuarioDB
    })
  })  
})

app.delete('/usuarios/:id',verificaToken, function (req, res) {
  let id  = req.params.id;
  Usuario.findByIdAndRemove(id,(err,borrar) => {
    if(err) {
      return res.status(400).json({
        ok:false,
        err
      })
    }
    if(!borrar){
      return res.status(400).json({
        ok:false,
        error:{
          message:'Usuario no encontrado'
        }
      })
    }
    res.json({
      ok:true,
      usuario:borrar
    })
  })
})

module.exports = app;