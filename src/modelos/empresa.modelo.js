const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaEmpresa = new Schema({
    rutEmpresa: {
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
    direccion: {
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

const empresaModel = mongoose.model('tabEmpresa', schemaEmpresa);
module.exports =  empresaModel;