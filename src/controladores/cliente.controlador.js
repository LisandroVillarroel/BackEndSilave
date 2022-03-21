const cliente = require('../modelos/cliente.modelo');

async function crearCliente(req,res) {
    if(req.body.clientes){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Rut Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        console.log('agrega', req.body)
        const cliente_resp = await new cliente(req.body).save()
    
        respuesta = {
            error: false, 
            data: cliente_resp,
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
        return res.status(200).json(respuesta);
    }   
}

async function actualizarCliente(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }

    if(!req.body.clientes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Cliente'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let cliente_actualiza = req.body.clientes[0];
        
        cliente_actualiza = Object.assign(cliente_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        // const cliente_resp = cliente.save(cliente_actualiza);
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
         await cliente.updateOne({_id: req.params.id},cliente_actualiza) 

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

function buscarCliente(req,res) {
   
    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
        };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }

    if(req.body.clientes){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.clientes,
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
        mensaje: 'No encontró el Cliente'
    };
    return res.status(200).json(respuesta);
}

async function eliminarCliente(req,res) {

    if(req.body.error){ // Si biene un error de la busueda anterior
        respuesta = {
            error: true, 
            data: '',
            codigo: 500, 
            mensaje: req.body.error
           };
            console.log(respuesta);
            return res.status(200).json(respuesta);
    }

    if(!req.body.clientes){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro el Cliente'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        await cliente.updateOne({_id: req.params.id},queryModifica) 
        
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
          return res.status(200).json(respuesta);
      }   

}

async function buscarTodosCliente(req,res) {
    try {
        query={empresa_Id:req.params.empresaId, estado: {$ne:'Borrado'}};
        const clientes = await cliente.find(query).sort('razonSocial');
        respuesta = {
            error: false, 
            data: clientes,
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
        return res.status(200).json(respuesta);
      }   
}
//next pasa a la siguiente función
async function buscaRut(req,res,next){
    const newCliente = {
        rutCliente: req.body.rutCliente,
        razonSocial: req.body.razonSocial,
        nombreFantasia: req.body.nombreFantasia,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        nombreContacto: req.body.nombreContacto,
        usuarioCrea_id: req.body.usuarioCrea_id,
        usuarioModifica_id: req.body.usuarioModifica_id
    }
    try {
        let query={};
        query={rutCliente:newCliente.rutCliente, estado: {$ne:'Borrado'}};
        console.log(query);
        const clientes = await cliente.find(query)
    
        if(!clientes.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.clientes=clientes;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}


 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const clientes = await cliente.find(query)
        if(!clientes.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.clientes=clientes;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearCliente,actualizarCliente,buscarCliente,eliminarCliente,buscarTodosCliente,buscaRut,buscaId
}