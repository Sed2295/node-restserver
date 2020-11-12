require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser') 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.get('/usuarios', function (req, res) {
  res.json('get Usuario')
})

app.post('/usuarios', function (req, res) {
  //para formularios
  let body = req.body;
  //validacion para que el nombre en el form sea obligatorio
  if(body.nombre === undefined){
  	res.status(400).json({
  		ok:false,
  		mensaje:"El nombre es necesario"
  	});
  } else {
	  	 res.json({
	  		persona:body
	  	})
  } 
})

app.put('/usuarios/:id', function (req, res) {
  //obtenemos id por url
  let id = req.params.id;
  res.json({
  	id
  })
})

app.delete('/usuarios', function (req, res) {
  res.json('delete Usuario')
})

app.listen(process.env.PORT, () => {
	console.log("Escuchando puerto:",process.env.PORT);
})