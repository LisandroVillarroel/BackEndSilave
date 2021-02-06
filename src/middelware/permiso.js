'use strict'

const jwt = require('jwt-simple');
const moment =require('moment');
const codSecretoToken = require('../config/propiedades');

console.log('paso1');
async function  isPermiso(req, res, next){
    try{
        console.log('paso2',req.headers.authorization);
        if (!req.headers.authorization){
            return res.status(403).send({ message: 'No tienes autorizaciónn'})
        }
        console.log('paso 3');
        const token = await req.headers.authorization.split(' ')[1];
        console.log('paso 4', token);
        const payload = jwt.decode(token, codSecretoToken.SECRET_KEY);
        console.log('paso 5',payload.exp);
        if (payload.exp <= moment().unix()){
            return res.status(401).send({ message: 'El token ha expirado'})
        }

        req.user = payload.sub
        next();
    }catch(error){
        return  res.status(401).send({ message: 'El token ha expirado '})
    }
}
module.exports = isPermiso