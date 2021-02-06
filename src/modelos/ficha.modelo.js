const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaFicha = new Schema({
    numeroFicha: {
        type: Number,
       required: true,
        trim: true
    },
    nombrePaciente: {
        type: String,
        required: true,
        required: true,
        trim: true  
    },
    fechaNacimientoPaciente: {
        type: String,
        required: true,
        trim: true
    },
    especie: {
        type: String,
        required: true,
        trim: true
    },
    raza: {
        type: String,
        trim: true
    },
    sexo: {
        type: String,
        required: true,
        trim: true
    },
    propietario: [{
        rutPropietario: {
            type: String,
        // required: true,
            trim: true
        },
        nombres: {
            type: String,
            required: true,
            required: true,
            trim: true  
        },
        apellidoPaterno: {
            type: String,
            trim: true
        },
        apellidoMaterno: {
            type: String,
            trim: true
        },
        region: {
            type: String,
            trim: true
        },
        comuna: {
            type: String,
            trim: true
        },
        direccion: {
            type: String,
            trim: true
        },
        telefono: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
    }],
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
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
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const fichaModel = mongoose.model('tabFicha', schemaFicha);
module.exports =  fichaModel;