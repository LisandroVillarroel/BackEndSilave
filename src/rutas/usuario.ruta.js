const Usuarios = require('../controladores/usuario.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.put('/usuario/:id',permiso, Usuarios.buscaId, Usuarios.actualizarUsuario);
    router.get('/usuario/:id',permiso, Usuarios.buscaId, Usuarios.buscarUsuario);
    router.delete('/usuario/:id/:idUsu',permiso, Usuarios.buscaId, Usuarios.eliminarUsuario);
    router.get('/usuarioTodo', permiso, Usuarios.buscarTodosUsuarios);
}
