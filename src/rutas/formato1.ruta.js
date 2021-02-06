const Formatos1 = require('../controladores/formato1.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/formato1',  Formatos1.crearFormato1);
    router.put('/formato1/:id',permiso, Formatos1.buscaId, Formatos1.actualizarFormato1);
    router.get('/formato1/:id',permiso, Formatos1.buscaId, Formatos1.buscarFormato1);
    router.delete('/formato1/:id/:idUsu',permiso, Formatos1.buscaId, Formatos1.eliminarFormato1);
    router.get('/formato1Todo', permiso, Formatos1.buscarTodosFormato1);
}
