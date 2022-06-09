const ficha = require('../modelos/ficha.modelo');
const empresa = require('../modelos/empresa.modelo');
const parametro = require('../modelos/parametro.modelo');

const mailer = require('./../template/envioCorreo')
async function crearFicha(req,res) {
    console.log('pasoooo');
    if(req.body.fichas){             // Si trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'Ya existe'
           };
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    try {
        let parametroEmp= parametro;

        console.log('correlativo:',req.params.numCorrelativo);

        if (req.params.numCorrelativo==='1'){  // El 0 indica que es la primera vez que entra
            console.log('paso1');
            parametroEmp= await parametro.findOneAndUpdate({empresa_id:  req.body.empresa.empresa_Id},{ $inc: { numeroFicha:+1}}, {new: true})//  {new: true}  devuelve el documento
        }else{
            console.log('paso2');
          //  query={'empresa_id':req.body.empresa.empresa_Id,estado: {$ne:'Borrado'}};
          //  parametroEmp= await parametro.find(query)//  {new: true}  devuelve el documento
          parametroEmp= await parametro.findOneAndUpdate({empresa_id:  req.body.empresa.empresa_Id},{ $inc: { numeroFicha:+0}}, {new: true})// mantiene el {new: true}  devuelve el documento
            
        }
        
        const ficha_resp = await new ficha(req.body).save();
        console.log('parametro:',parametroEmp);
        console.log('ficha_resp._id:',ficha_resp._id);
        console.log('parametroEmp.letra:',parametroEmp.letra);
        console.log('parametroEmp.numeroFicha:',parametroEmp.numeroFicha);
        console.log('req.params.numCorrelativo:',req.params.numCorrelativo);
        console.log('numero concatenado:',parametroEmp.letra+parametroEmp.numeroFicha+req.params.numCorrelativo);
        const update_resp = await ficha.updateOne({_id: ficha_resp._id},{  'fichaC.numeroFicha': parametroEmp.letra+parametroEmp.numeroFicha+req.params.numCorrelativo, 'fichaC.id_Ficha': parametroEmp.letra+parametroEmp.numeroFicha}, {new: true});
        console.log('update:',update_resp);
        respuesta = {
            error: false, 
            data: ficha_resp,
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

async function envioCorreo(req,res) {
    
    try {
        let query={};

        query={_id: req.params.ficha_id, estado: {$ne:'Borrado'}};
        const ficha_ = await ficha.find(query)

      //  console.log('ficha:',ficha_);
        query={_id: ficha_[0].empresa.empresa_Id, estado: {$ne:'Borrado'}};
        const empresa_ = await empresa.find(query)

     //   console.log('envia email empresa:',empresa_);
        if (empresa_!=null){
      //      console.log('paso email 1');
            let mailOptions = {
                envioEmail:{
                    emailEnvio: empresa_[0].envioEmail.emailEnvio,
                    password: empresa_[0].envioEmail.password,
                    nombreDesde: empresa_[0].envioEmail.nombreDesde,
                    asunto: empresa_[0].envioEmail.asunto,
                    tituloCuerpo: empresa_[0].envioEmail.tituloCuerpo,
                    tituloCuerpoMedio: empresa_[0].envioEmail.tituloCuerpoMedio,
                    tituloCuerpoPie: empresa_[0].envioEmail.tituloCuerpoPie
                },
                correoEnvioCliente: ficha_[0].fichaC.cliente.correoEnvioCliente,
                rutEmpresa: empresa_[0].rutEmpresa,
                nombreExamen: ficha_[0].fichaC.examen.nombre,
                numFicha: ficha_[0].fichaC.numeroFicha
              };
            mailer.enviar_mail(mailOptions, function (err,info) {
                if(err)
                    {
                        respuesta = {
                            error: true, 
                            data: '',
                            codigo: 500, 
                            mensaje: error
                        };
                        return res.status(500).json(respuesta);
                    }
            }
            );
        }
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

async function descargaArchivo(req,res) {
   // console.log('pasoooo sube arch');
    
    try {
  

        respuesta = {
            error: false, 
            data: '',
            codigo: 200, 
            mensaje: 'okkkk2'
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

async function actualizarFicha(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
        let ficha_actualiza = req.body.fichas[0];
        
        ficha_actualiza = Object.assign(ficha_actualiza,req.body);  // Object.assign( Asigna todas las variables y propiedades, devuelve el Objeto
        
        // queryModifica={usuarioModifica_id: '', estado:'Borrado'};
        const ficha_resp =await ficha.updateOne({_id: req.params.id},ficha_actualiza) 

        respuesta = {
            error: false, 
            data: ficha_resp,
            codigo: 200, 
            mensaje: 'ok'
        };
       
        
     //   console.log('respuesta envia',);
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

function buscarFicha(req,res) {
   
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

    if(req.body.fichas){  // si la función de busqueda encontro información
        respuesta = {
            error: false, 
            data: req.body.fichas,
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
        mensaje: 'No encontró la Ficha'
    };
    return res.status(200).json(respuesta);
}

async function eliminarFicha(req,res) {

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

    if(!req.body.fichas){             // Si no trae información de la búsqueda anterior
        respuesta = {       
            error: true, 
            data: '',
            codigo: 404, 
            mensaje: 'No Encontro la Ficha'
           };
            return res.status(200).json(respuesta);
    }

    // si encontro información reemplaza información
    try {
     //   console.log('antes de eliminar:',req.params.id)
      //  console.log('antes de eliminar2:',req.params.idUsu)
        
        queryModifica={usuarioModifica_id: req.params.idUsu, estado:'Borrado'};
        await ficha.updateOne({_id: req.params.id},queryModifica) 
        
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

async function buscarTodosFicha(req,res) {
    try {
        var privilegio_
        if (req.params.privilegio='Administrador'){
            privilegio=''
        }
   
        if (req.params.estadoFicha!='Todo'){
            query={'empresa.empresa_Id':req.params.empresaId,estadoFicha:req.params.estadoFicha,estado: {$ne:'Borrado'}};
        }else{
            query={'empresa.empresa_Id':req.params.empresaId,estado: {$ne:'Borrado'}};
        }
        const fichas = await ficha.find(query).sort('nombrePaciente');
        respuesta = {
            error: false, 
            data: fichas,
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
//next pasa a la siguiente función

 // next pasa a la siguiente función
async function buscaId(req,res,next){
    try {
        let query={};
        query={_id: req.params.id, estado: {$ne:'Borrado'}};
        const fichas = await ficha.find(query)
        if(!fichas.length) return next(); // si no tiene datos pasa a la siguiente funcion
        req.body.fichas=fichas;  // si tiene datos los guarda y pasa a la siguiente funcion
        return next();
    } catch(error) {
        req.body.error = error;  // si hay un error lo guarda y pasa a la siguiente funcion
        next();
    }
}

module.exports = {
    crearFicha,envioCorreo,actualizarFicha,buscarFicha,eliminarFicha,buscarTodosFicha,buscaId
}