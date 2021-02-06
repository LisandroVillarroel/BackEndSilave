const Fichas = require('../controladores/ficha.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/ficha',  Fichas.crearFicha);
    router.put('/ficha/:id',permiso, Fichas.buscaId, Fichas.actualizarFicha);
    router.get('/ficha/:id',permiso, Fichas.buscaId, Fichas.buscarFicha);
    router.delete('/ficha/:id/:idUsu',permiso, Fichas.buscaId, Fichas.eliminarFicha);
    router.get('/fichaTodo', permiso, Fichas.buscarTodosFicha);
}
