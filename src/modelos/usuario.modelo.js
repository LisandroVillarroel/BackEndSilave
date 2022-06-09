const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const schemaUsuario = new Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    rutUsuario: {
        type: String,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true
    },
    apellidoMaterno: {
        type: String,
        required: true,
        trim: true
    },
    empresa: {
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
        menu_Id: {
            type: String,
            required: true,
            trim: true
        },
        tipoEmpresa: {
            type: String,
            required: true,
            trim: true
        },
    },
    cliente: {
        idCliente: {
            type: String,
            trim: true
        },
        nombreFantasia: {
            type: String,
            trim: true
        },
    },
    telefono: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    direccion:{
        type: String,
        trim: true
    },
    
    MenuItem:[{
        displayName: {
            type: String,
            trim: true
        },
        iconName: {
            type: String,
            trim: true
        },
        route: {
            type: String,
            trim: true
        },
        tipoPermiso: {
            type: String,
            trim: true
        },
        selected:{
            type: Boolean,
            trim: true
        },
        children: [{
            displayName: {
                type: String,
                trim: true
            },
            iconName: {
                type: String,
                trim: true
            },
            route: {
                type: String,
                trim: true
            },
            tipoPermiso: {
                type: String,
                trim: true
            },
            selected:{
                type: Boolean,
                trim: true
            },
        }],
    }],
    resetToken:{
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
    estadoUsuario: { 
        type: String, 
        default: 'Activo' 
    },
    estado: { 
        type: String, 
        default: 'Activo' 
    }
},{
    timestamps: { createdAt: 'fechaHora_crea', updatedAt: 'fechaHora_modifica'}
    // Guardar Fecha creacion y actualizacion
});

const usuarioModel = mongoose.model('Usuario', schemaUsuario);
module.exports =  usuarioModel;