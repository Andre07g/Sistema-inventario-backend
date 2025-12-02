// IMPORTE LIBRERIAS

import { ObjectId } from "mongodb";

// IMPORTE FUNCIONES


import { obtenerProductosServicio, crearUnProductoServicio, editarUnProductoServicio } from "../servicios/productos.js";

// FUNCIONES

export async function obtenerProductos(req, res){
    try {
        const productos = await obtenerProductosServicio(req.body.id_Empresa);
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener todos los platos"})
    }
}

export async function crearProducto(req, res){
    try {
        const {tipo, nombre, categoria, precio_de_compra, precio_de_venta,unidad_de_medida,id_empresa, SKU} = req.body
        const producto = { tipo, nombre, categoria, descripcion: "Sin descripcion", precio_de_compra, precio_de_venta, unidad_de_medida, id_empresa: new ObjectId(id_empresa), SKU}
        if (tipo === "simple"){
            producto.stock=req.body.stock
        } else {
            producto.stock= 0;
            producto.lotes= [];
        }
        if(req.body.descripcion){
            producto.descripcion = req.body.descripcion
        }
        const creado = await crearUnProductoServicio(producto)
        res.status(200).json(creado)
    } catch (error) {
        res.status(500).json({"Error":"Error al crear un nuevo producto"})
    }
}

export async function editarProducto(req, res){
    try {
        const campos_actualizados = req.body;
        const actualizacion = await editarUnProductoServicio(campos_actualizados)
        res.status(200).json({"mensaje":"Se actualizaron los datos"})
    } catch (error) {
        res.status(500).json({error:error})
    }
}
