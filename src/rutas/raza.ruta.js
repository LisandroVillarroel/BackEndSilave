const Razas = require('../controladores/raza.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/raza',  Razas.crearRaza);
    router.put('/raza/:id',permiso, Razas.buscaId, Razas.actualizarRaza);
    router.get('/raza/:id',permiso, Razas.buscaId, Razas.buscarRaza);
    router.delete('/raza/:id/:idUsu',permiso, Razas.buscaId, Razas.eliminarRaza);
    router.get('/razaTodo/:empresaId', permiso, Razas.buscarTodosRaza);
}
