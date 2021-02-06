const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaFormato1 = new Schema({
    nombre: {
        type: String,
       required: true,
        trim: true
    },
    cuadros: [{
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        titulos1: {
            campo1: {
                type: String,
                required: true,
                trim: true
            },
            campo2: {
                type: String,
                required: true,
                trim: true
            },
            campo3: {
                type: String,
                required: true,
                trim: true
            },
            campo4: {
                type: String,
                required: true,
                trim: true
            },
        },
        titulos2: {
            campo1: {
                type: String,
                required: true,
                trim: true
            },
            campo2: {
                type: String,
                required: true,
                trim: true
            },
            campo3: {
                type: String,
                required: true,
                trim: true
            },
            campo4: {
                type: String,
                required: true,
                trim: true
            },
            campo5: {
                type: String,
                required: true,
                trim: true
            },
        },
        datos: [{
            campo1: {
                type: String,
                required: true,
                trim: true
            },
            ingresoSN1: {
                type: String,
                required: true,
                trim: true
            },
            campo2: {
                type: String,
                required: true,
                trim: true
            },
            ingresoSN2: {
                type: String,
                required: true,
                trim: true
            },
            campo3: {
                type: String,
                required: true,
                trim: true
            },
            ingresoSN3: {
                type: String,
                required: true,
                trim: true
            },
            campo4: {
                type: String,
                required: true,
                trim: true
            },
            ingresoSN4: {
                type: String,
                required: true,
                trim: true
            },
            campo5: {
                type: String,
                required: true,
                trim: true
            },
            ingresoSN5: {
                type: String,
                required: true,
                trim: true
            },
            valor: {
                type: Number,
                required: true,
                trim: true
            },
        }],
        observacion: {
            type: String,
            required: true,
            trim: true
        },
          
    }],
    
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
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const formato1Model = mongoose.model('tabFormato1', schemaFormato1);
module.exports =  formato1Model;