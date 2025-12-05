// IMPORTE LIBRERIAS

import { ObjectId } from "mongodb";

// IMPORTE FUNCIONES

import { obtenerBD } from "../config/db.js";

// VARIABLES

const COLECCION_USUARIOS = "usuarios"

// FUNCIONES

// Usuarios
 
export async function obtenerUsuariosServicio(id_empresa) {
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).find({ id_empresa: new ObjectId(id_empresa) }).toArray()
}

export async function crearUsuarioServicio(usuario) {
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).insertOne(usuario)
}

export async function editarUsuarioServicio(id_usuario, usuario_informacion) {
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).updateOne({_id: new ObjectId(id_usuario)},{$set:usuario_informacion})
}

export async function eliminarUsuarioServicio(id_usuario) {
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).deleteOne({ _id: new ObjectId(id_usuario) })
}

export async function buscarUsuarioPorNombre(id_empresa, nombre_usuario){
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).findOne({id_empresa:new ObjectId(id_empresa),nombre_usuario:nombre_usuario})
}
