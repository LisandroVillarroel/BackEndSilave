const Fichas = require('../controladores/ficha.controlador.js');
const permiso = require('../middelware/permiso');
const upload_ = require('../middelware/multer');
const path = require('path');

module.exports = (router) => {
    router.post('/ficha',  Fichas.crearFicha);
    router.put('/ficha/:id',permiso, Fichas.buscaId, Fichas.actualizarFicha);
    router.get('/ficha/:id',permiso, Fichas.buscaId, Fichas.buscarFicha);
    router.delete('/ficha/:id/:idUsu',permiso, Fichas.buscaId, Fichas.eliminarFicha);
    router.get('/fichaTodo/:empresaId/:estadoFicha/:usuario/:privilegio', permiso, Fichas.buscarTodosFicha);

    router.post('/fichaSubeArchivo/:empresa_id/:rutEmpresa/:nombreExamen/:numFicha', permiso, upload_(),Fichas.subeArchivo);
    
  /*  router.post('/fichaSubeArchivo/:directorio', upload_(),(req,res)=>{
        console.log('paso sube:',req.file);
        res.send('ok');
    });
    */
    //router.post('/fichaDescargaArchivo', permiso, Fichas.subeArchivo);
    router.post('/fichaDescargaArchivo', (req,res,next)=>{
        filepath = path.join(__dirname,'../../public/pdfs/'+ req.body.filename) ;
        console.log('ruta:',filepath);
        res.sendFile(filepath);
    });
}
