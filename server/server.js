require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser') 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//rutas de servicios
app.use(require('./routes/index'));

//conexion a bd mongoo
mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (err,res) => {
  if(err) throw err;
});
db.once('open', (err,res) =>  {
  console.log("BD conectada")
});
/*
mongoose.connect('mongodb://localhost:27017/cafe', (err,res) => {
   useNewUrlParser: true
  if(err) throw err;
  console.log('Base de datos conectada');
});*/
app.listen(process.env.PORT, () => {
	console.log("Escuchando puerto:",process.env.PORT);
})