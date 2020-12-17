const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario')
const app = express();

app.post('/login',(req, res) => {
	let body = req.body;
	Usuario.findOne({email:body.email}, (err,usuarioDB) => {
		if(err) {
	        return res.status(500).json({
	          ok:false,
	          err
	        })
	    }

	    if(!usuarioDB){
	    	return res.status(400).json({
		        ok:false,
		        err:{
		          	message:"(Usuario) o contraseña incorrectos"
		          }
		    })
	    }
	    //desencriptamos la contraseña
	    if ( !bcrypt.compareSync(body.password,usuarioDB.password)){
	    	return res.status(400).json({
		        ok:false,
		        err:{
		          	message:"Usuario o (contraseña) incorrectos"
		          }
		    })
	    }
	    //generamos token Y NUESTRO PILOT ES NUESTRO USUARIO DE BASE DE DATOS
	    let token = jwt.sign({
	    	usuario: usuarioDB,
	    },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
	    res.json({
	    	ok:true,
	    	usuario:usuarioDB,
	    	token
	    })

	})

	//res.json({ok:true});
})



module.exports = app;