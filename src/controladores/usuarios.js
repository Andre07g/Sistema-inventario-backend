// IMPORTE LIBRERIAS

import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// IMPORTE FUNCIONES

import { crearUsuarioServicio, obtenerUsuariosServicio, editarUsuarioServicio, eliminarUsuarioServicio, buscarUsuarioPorNombre } from "../servicios/usuarios.js";

// VARIABLES

const saltRounds = Number(process.env.SALT_ROUNDS);

// FUNCIONES

export async function obtenerUsuarios(req, res) {
    try {
        const resultado = await obtenerUsuariosServicio(req.params.id_empresa)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function crearUsuario(req, res) {
    try {
        const { nombre_usuario, contrasenia, id_interno, rol, documento } = req.body
        const contrasenia_hasheada = await bcrypt.hash(contrasenia, saltRounds)
        const usuario = { nombre_usuario, contrasenia:contrasenia_hasheada, id_interno, rol, documento, id_empresa: new ObjectId(req.params.id_empresa) }
        const resultado = await crearUsuarioServicio(usuario)
        res.status(200).json({ "Mensaje": "Usuario creado correctamente" })
    } catch (error) {
        res.status(500).json({ "Error": error.message })
    }
}

export async function editarUsuario(req, res){
    try {
        const usuario = req.body
        console.log(usuario)
        if(usuario.contrasenia){const contra = await bcrypt.hash(usuario.contrasenia,saltRounds);usuario.contrasenia=contra}
        const resultado = await editarUsuarioServicio(req.params.id_usuario,usuario)
        if(resultado.modifiedCount===0){throw new Error("No se pudo modificar el usuario");}
        res.status(200).json({"Mensaje":"Usuario modificado correctamente"})
    } catch (error) {
        res.status(500).json({"Error":error.message})
    }
}

export async function eliminarUsuario( req, res){
    try {
        const resultado = await eliminarUsuarioServicio(req.params.id_usuario)
        if(resultado.deletedCount===0){throw new Error("No se pudo eliminar el usuario");}
        res.status(200).json({"Mensaje":"Usuario eliminado correctamente"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function loginUsuario(req, res) {
    try {
        const contrasenia = req.body.contrasenia
        const usuario = await buscarUsuarioPorNombre(req.params.id_empresa, req.params.nombre_usuario)
        console.log(usuario)
        if (!usuario){throw new Error("No existe este usuario");}
        const contrasenia_valida = await bcrypt.compare(contrasenia, usuario.contrasenia)
        console.log(contrasenia_valida)
        if (contrasenia_valida){res.status(200).json({"Mensaje":"Inicio de sesion exitoso"})}
        else{res.status(400).json({"Mensaje":"Contraseña incorrecta"})}
    } catch (error) {
        res.status(500).json({"Mensaje":error.message})
    }
}

// DE FORMA TEMPORAL NO VOY A USAR ESTA MIERDA PARA VALIDAR NADA, YA VEREMOS DESPUES SI USO USUARIOS O NO