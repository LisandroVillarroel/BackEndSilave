const Clientes = require('../controladores/cliente.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/cliente', Clientes.buscaRut, Clientes.crearCliente);
    router.put('/cliente/:id',permiso, Clientes.buscaId, Clientes.actualizarCliente);
    router.get('/cliente/:id',permiso, Clientes.buscaId, Clientes.buscarCliente);
    router.delete('/cliente/:id/:idUsu',permiso, Clientes.buscaId, Clientes.eliminarCliente);
    router.get('/clienteTodo/:empresaId', permiso, Clientes.buscarTodosCliente);
}
