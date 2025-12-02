// IMPORTE LIBRERIAS

import { ObjectId } from "mongodb";

// IMPORTE FUNCIONES

import { obtenerBD } from "../config/db.js";

// VARIABLES

const COLECCION_PRODUCTOS = "productos"

// FUNCIONES

export async function obtenerProductosServicio(empresa) {
    const db = await obtenerBD()
    return await db.collection(COLECCION_PRODUCTOS).find({id_empresa:new ObjectId(empresa)}).toArray();
}

