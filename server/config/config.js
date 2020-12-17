//PUERTO local o producción
process.env.PORT = process.env.PORT || 3000;

//Vencimiento del token
//60 segundos, 60 minutos ,24 horas = 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//sed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';