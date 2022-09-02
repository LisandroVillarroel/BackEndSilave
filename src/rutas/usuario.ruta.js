const Usuarios = require('../controladores/usuario.controlador.js');
const permiso = require('../middelware/permiso');

module.exports = (router) => {
    router.post('/usuario',  Usuarios.crearUsuario);
    router.get('/resetContrasena/:usuario', Usuarios.buscaUsuario, Usuarios.reseteaUsuarioContrasena); 
    router.put('/usuario/:id',permiso, Usuarios.buscaId, Usuarios.actualizarUsuario);
    router.put('/usuarioContrasena/:id',permiso, Usuarios.buscaId, Usuarios.actualizarUsuarioContrasena);
    router.put('/usuarioContrasenaReset/:id', Usuarios.buscaId, Usuarios.actualizarUsuarioContrasenaReset);
    router.get('/usuario/:id',permiso, Usuarios.buscaId, Usuarios.buscarUsuario);
    router.delete('/usuario/:id/:idUsu',permiso, Usuarios.buscaId, Usuarios.eliminarUsuario);
    router.get('/usuarioTodo/:empresaId/:idCliente', permiso, Usuarios.buscarTodosUsuariosEmpresa);
    router.get('/usuarioTodoLaboratorio/:empresaId', permiso, Usuarios.buscarTodosUsuariosEmpresaLaboratorio);
    router.get('/usuarioTodo', permiso, Usuarios.buscarTodosUsuarios);
}
