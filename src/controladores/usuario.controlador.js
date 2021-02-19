const usuario = require('./../auth/auth.model');


async function actualizarUsuario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let usuario_actualiza = req.body.usuarios[0];
        usuario_actualiza = Object.assign(usuario_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        await usuario.updateOne({_id: req.params.id},usuario_actualiza) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        console.log(respuesta);
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: error.codigo, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(error.codigo).json(respuesta);
      }   

}

function buscarUsuario(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        console.log(respuesta);
        return res.status(500).json(respuesta);
    }

    if(req.body.usuarios){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    }
   //si no encontro registros
    respuesta = {
        error: false, 
        data: '',
        codigo: 404, 
        mensaje: 'No encontró el Usuario'
    };
    return res.status(404).json(respuesta);
}

async function eliminarUsuario(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(500).json(respuesta);
    }

    if(!req.body.usuarios){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Usuario'
           };
            return res.status(404).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await usuario.updateOne({_id: req.params.id},queryModifica) 
        
        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'ok'
        };
        console.log(respuesta);
        res.status(200).json(respuesta)
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
          console.log(respuesta);
          return res.status(500).json(respuesta);
      }   

}

async function buscarTodosUsuarios(req,res) {
    try {
        
        query={empresa_id:req.params.empresa_id, estado: {$ne:'Borrado'}};
        const usuarios = await usuario.find(query).sort('apellidoPaterno');
        respuesta = {
            error: false, 
            data: usuarios,
            codigo: 200, 
            mensaje: 'ok'
        };
        return res.status(200).json(respuesta);
    } catch(error) {
        respuesta = {
          error: true, 
          data: '',
          codigo: 500, 
          mensaje: error
         };
        console.log(respuesta);
        return res.status(500).json(respuesta);
      }   
}


 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const usuarios = await usuario.find(query)
        if(!usuarios.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.usuarios=usuario;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    actualizarUsuario,buscarUsuario,eliminarUsuario,buscarTodosUsuarios,buscaId
}