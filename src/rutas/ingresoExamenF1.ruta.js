const IngresoExamenesF1 = require('../controladores/ingresoExamen.controladorF1.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/ingresoExamenF1',  IngresoExamenesF1.crearIngresoExamenF1);
    router.put('/ingresoExamenF1/:id',permiso, IngresoExamenesF1.buscaId, IngresoExamenesF1.actualizarIngresoExamenF1);
    router.get('/ingresoExamenF1/:id',permiso, IngresoExamenesF1.buscaId, IngresoExamenesF1.buscarIngresoExamenF1);
    router.delete('/ingresoExamenF1/:id/:idUsu',permiso, IngresoExamenesF1.buscaId, IngresoExamenesF1.eliminarIngresoExamenF1);
    router.get('/ingresoExamenF1Todo', permiso, IngresoExamenesF1.buscarTodosIngresoExameneF1);
}
