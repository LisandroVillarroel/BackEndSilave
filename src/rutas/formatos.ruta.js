const Formatos = require('../controladores/formatos.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/formatos',  Formatos.crearFormatos);
    router.put('/formatos/:id',permiso, Formatos.buscaId, Formatos.actualizarFormatos);
    router.get('/formatos/:id',permiso, Formatos.buscaId, Formatos.buscarFormatos);
    router.delete('/formatos/:id/:idUsu',permiso, Formatos.buscaId, Formatos.eliminarFormatos);
    router.get('/formatosTodo', permiso, Formatos.buscarTodosFormatos);
}
