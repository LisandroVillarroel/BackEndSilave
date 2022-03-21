const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaFormatos = new Schema({
    nombreFormato: {
        type: String,
       required: true,
        trim: true
    },
    descripcion:{
            type: String,
        required: true,
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

const formatosModel = mongoose.model('tabFormatos', schemaFormatos);
module.exports =  formatosModel;