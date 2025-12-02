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

export async function crearUnProductoServicio(producto){
    const db = await obtenerBD()
    return await db.collection(COLECCION_PRODUCTOS).insertOne(producto);
}

export async function editarUnProductoServicio (producto){
    const id_producto = producto._id
    delete producto._id
    const db = await obtenerBD()
    return await db.collection(COLECCION_PRODUCTOS).updateOne({_id:new ObjectId(id_producto)},{ $set: producto })
}

export async function añadirLoteServicio (lote_info, id_producto){
    const db = await obtenerBD()
    return await db.collection(COLECCION_PRODUCTOS).updateOne({_id:new ObjectId(id_producto)},{$push:{lotes:lote_info}})
}

export async function calcularStockPorLotesServicio(id_producto) {
    const db = await obtenerBD()
    const producto = await db.collection(COLECCION_PRODUCTOS).findOne({_id:new ObjectId(id_producto)})
    if (!producto){throw new Error("El producto buscado no existe");
    }
    if (!Array.isArray(producto.lotes) || producto.lotes.length === 0) {
        return 0;
    }

    const total = producto.lotes.reduce((acum, lote) => {
        return acum + (lote.cantidad || 0);
    }, 0);

    const actualizar_stock = await db.collection(COLECCION_PRODUCTOS).updateOne({_id:new ObjectId(id_producto)},{$set:{stock:total}})
    return actualizar_stock;
}
