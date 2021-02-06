"use strict"
require('dotenv').config(); // Variables glovales en .env
const cors = require('cors');
const authRoutes = require('./auth/auth.routes.js');
const clienteRuta = require('./rutas/cliente.ruta.js');
const propietarioRuta = require('./rutas/propietario.ruta.js');
const examenRuta = require('./rutas/examen.ruta.js');
const formato1Ruta = require('./rutas/formato1.ruta.js');
const fichaRuta = require('./rutas/ficha.ruta.js');
const empresaRuta = require('./rutas/empresa.ruta.js');
const accesoRuta = require('./rutas/acceso.ruta.js');
const express = require('express');
const propiedadesDb = require('./config/propiedades');
const DB = require('./config/db');

// Iniciar DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

 app.use(cors());

var helmet = require('helmet');
app.use(helmet());

 //No muestra la cabecera en Network

 app.use(function (req, res, next) {  
    res.header("X-powered-by", "");
    next();
  });

 // Router
 ////Autentica Usuario
app.use('./api', router);
authRoutes(router);
//// cliente
app.use('./api',router);
clienteRuta(router);

//// propietario
app.use('./api',router);
propietarioRuta(router);

//// examen
app.use('./api',router);
examenRuta(router);

//// formato1
app.use('./api',router);
formato1Ruta(router);

//// ficha
app.use('./api',router);
fichaRuta(router);

//// Empresa
app.use('./api',router);
empresaRuta(router);

//// Acceso
app.use('./api',router);
accesoRuta(router);

router.get('/', (req,res) => {
    res.send('Ruta Inicial');
});
app.use(router);


app.listen(propiedadesDb.PORT,() => console.log(`Servidor en puerto ${propiedadesDb.PORT}`));
