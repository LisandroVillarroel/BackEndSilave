const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const schemaFicha = new Schema({
    fichaC:{
       
        numeroFicha: {
            type: String,
            unique: true,
          //  trim: true
        },
        id_Ficha: {
            type: String,
            unique: false,
          //  trim: true
        },
        cliente:{
            idCliente:{
                type: String,
                required: true,
                trim: true
            },
            rutCliente: {
                type: String,
                required: true,
                trim: true
            },
            razonSocial: {
                type: String,
                required: true,
                trim: true
                
            },
            nombreFantasia: {
                type: String,
                required: true,
                trim: true
            },
            correoRecepcionCliente: {
                type: String,
                required: true,
                trim: true
            },
        },
        rutPropietario: {      
            type: String,
            trim: true
        },
        nombrePropietario: {      
            type: String,
            trim: true
        },
        nombrePaciente: {
            type: String,
            required: true,
            trim: true  
        },
        edadPaciente: {
            type: String,
            required: true,
            trim: true
        },
        especie: {
            idEspecie:{
                type: String,
                required: true,
                trim: true    
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
        },
        raza: {
            idRaza:{
                type: String,
                required: true,
                trim: true    
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
        },
        sexo: {
            type: String,
            required: true,
            trim: true
        },
        doctorSolicitante:{ 
            idDoctorSolicitante: {
                type: String,
                required: true,
                trim: true    
            },
            nombreDoctorSolicitante: {
                type: String,
                required: true,
                trim: true    
            },
        },
        examen:{
            idExamen:{
                type: String,
                required: true,
                trim: true    
            },
            codigoExamen: {
                type: String,
                required: true,
                trim: true
            },
            codigoInterno: {
                type: Number,
                required: true,
                trim: true
            },
            nombre: {
                type: String,
                required: true,
                trim: true  
            },
            nombreExamen: {
                type: String,
                trim: true  
            },
        },
        validador:{
            idValidador:{
                type: String,
           //     required: true,
                trim: true    
            },
            rutValidador: {
                type: String,
           //     required: true,
                trim: true
            },
            nombres: {
                type: String,
           //     required: true,
                trim: true
                
            },
            apellidoPaterno: {
                type: String,
           //     required: true,
                trim: true
            },
            apellidoMaterno: {
                type: String,
            //    required: true,
                trim: true
            },
            profesion: {
                type: String,
           //     required: true,
                trim: true
            },
            telefono: {
                type: String,
           //     required: true,
                trim: true
            },
            nombreFirma: {
                type: String,
            //    required: true,
                trim: true
            },
        },
        correoClienteFinal: {
            type: String,
            trim: true
        },
    },

    formatoResultado:{
 
        hemograma:{
            serieRoja: {
                IHemogramaSerieRoja:[{
                    parametro: {
                        type: String,
                        trim: true  
                    },
                    resultado: {
                        type: String,
                        trim: true  
                    },
                    unidad: {
                        type: String,
                        trim: true  
                    },
                    caninos: {
                        type: String,
                        trim: true  
                    },
                    felinos: {
                        type: String,
                        trim: true  
                    },
                }],
            },
            serieBlanca:{
                IHemogramaSerieBlanca:[{
                    parametro: {
                        type: String,
                        trim: true  
                    },
                    resultadoPrc: {
                        type: String,
                        trim: true  
                    },
                    resultadoNum: {
                        type: String,
                        trim: true  
                    },
                    caninos: {
                        type: String,
                        trim: true  
                    },
                    felinos: {
                        type: String,
                        trim: true  
                    },
                }],
            },
            total: {
                type: Number
            },
            eritrocitos: {
                type: String,
                trim: true  
            },
            leucocitos: {
                type: String,
                trim: true  
            },
            plaquetas: {
                type: String,
                trim: true  
            },
            
           
        },
        perfilBioquimico:{
            resultado:[{
                parametro: {
                    type: String,
                    trim: true
                },
                resultado: {
                    type: String,
                    trim: true
                },
                unidad: {
                    type: String,
                    trim: true
                },
                caninos: {
                    type: String,
                    trim: true
                },
                felinos: {
                    type: String,
                    trim: true
                },
                flag:{
                    type: Boolean
                },
            }],
            observaciones: {
                type: String,
                trim: true
            },
        },
        pruebasDeCoagulacion:{
            resultado:[{
                parametro: {
                    type: String,
                    trim: true
                },
                resultado: {
                    type: String,
                    trim: true
                },
                unidad: {
                    type: String,
                    trim: true
                },
                caninos: {
                    type: String,
                    trim: true
                },
                felinos: {
                    type: String,
                    trim: true
                },
                flag:{
                    type: Boolean
                },
            }],
            observaciones: {
                type: String,
                trim: true
            },
        }

    },
    datoArchivo:{
        nombreArchivo: {
            type: String,
            trim: true
        },
        archivo64: {
            type: String,
            trim: true
        }
    },
    usuarioAsignado:{
            idUsuario: {
                type: String,
                trim: true
            },
            usuario: {
                type: String,
                trim: true
            },
            rutUsuario: {
                type: String,
                trim: true
            },
            nombreCompleto: {
                type: String,
                trim: true
            },
            
        },
    empresa:{
        empresa_Id: {
                type: String,
                required: true,
                trim: true
        },
        rutEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        nombreLogo: {
            type: String,
            trim: true
        },
        
    },
    ingresadoPor:{
        tipoEmpresa: {
            type: String,
            trim: true
        },
        idIngreso: {
            type: String,
            trim: true
        },
        rutIngreso: {
            type: String,
            trim: true
        },
        razonSocial: {
            type: String,
            trim: true
        },
        nombreFactasia: {
            type: String,
            trim: true
        },
    },
    facturacion:{
        estadoFacturacion: { 
            type: String, 
            default: 'Pendiente' 
        },
        fechaFacturacion: { 
            type: Date
        },
        fechaPagoFacturacion: { 
            type: Date
        },
    },
    estadoFicha:{
        type: String, 
        default: 'Ingresado' 
    },
    usuarioCrea_id: {
        type: String,
        required: false,
        trim: true
    },
    usuarioModifica_id: {
        type: String,
        required: true,
        trim: true
    },
    usuarioEnvioCrea_id: {
        type: String,
        trim: true  
    },
    usuarioEnvioModifica_id: {
        type: String,
        trim: true  
    },
    usuarioRecepcionaCrea_id: {
        type: String,
        trim: true  
    },
    fechaHora_envia_crea: { 
        type: Date
    },
    fechaHora_envia_modifica:{
        type: Date
    },
    fechaHora_recepciona_crea: { 
        type: Date
    },
    estado: { 
        type: String, 
        default: 'Activo' 
    },
   
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});


const fichaModel = mongoose.model('tabFicha', schemaFicha);
module.exports =  fichaModel;