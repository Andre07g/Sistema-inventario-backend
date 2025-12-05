// IMPORTE LIBRERIAS

import { ObjectId } from "mongodb";

// IMPORTE FUNCIONES

import { obtenerProductosServicio, crearUnProductoServicio, editarUnProductoServicio, eliminarUnProductoServicio } from "../servicios/productos.js";
import { añadirLoteServicio, calcularStockPorLotesServicio, editarLoteServicio, eliminarLoteServicio, restarInventarioLotesServicio, restarInventarioSimpleServicio } from "../servicios/productos.js";

// FUNCIONES

export async function obtenerProductos(req, res) {
    try {
        const productos = await obtenerProductosServicio(req.body.id_Empresa);
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todos los platos" })
    }
}

export async function crearProducto(req, res) {
    try {
        const { tipo, nombre, categoria, precio_de_compra, precio_de_venta, unidad_de_medida, id_empresa, SKU } = req.body
        const producto = { tipo, nombre, categoria, descripcion: "Sin descripcion", precio_de_compra, precio_de_venta, unidad_de_medida, id_empresa: new ObjectId(id_empresa), SKU }
        if (tipo === "simple") {
            producto.stock = req.body.stock
        } else {
            producto.stock = 0;
            producto.lotes = [];
        }
        if (req.body.descripcion) {
            producto.descripcion = req.body.descripcion
        }
        const creado = await crearUnProductoServicio(producto)
        res.status(200).json(creado)
    } catch (error) {
        res.status(500).json({ "Error": "Error al crear un nuevo producto" })
    }
}

export async function editarProducto(req, res) {
    try {
        const campos_actualizados = req.body;
        const actualizacion = await editarUnProductoServicio(campos_actualizados, req.params.id_producto)
        res.status(200).json({ "mensaje": "Se actualizaron los datos" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function eliminarProducto(req, res) {
    try {
        const eliminacion = await eliminarUnProductoServicio(req.params.id_producto)
        if (eliminacion.deletedCount === 0) {
            throw new Error("No se pudo eliminar el producto");
        }
        res.status(200).json({ "mensaje": "Se eliminó el producto correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export async function añadirLote(req, res) {
    try {
        const { numero_lote, cantidad, fecha_ingreso } = req.body;
        if (req.body.fecha_vencimiento && fecha_ingreso > req.body.fecha_vencimiento) {
            throw new Error("La fecha de vencimiento no puede ser antes que la fecha de ingreso");
        }
        const lote = { numero_lote, cantidad, fecha_ingreso }
        if (req.body.tipo === "perecedero") {
            lote.fecha_vencimiento = req.body.fecha_vencimiento
        }
        const lote_creacion = await añadirLoteServicio(lote, req.body.id_producto)
        const nuevoStock = await calcularStockPorLotesServicio(req.body.id_producto)
        res.status(200).json({ "Mensaje": "Lote creado correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function editarLote(req, res) {
    try {
        const { tipo, cantidad } = req.body
        const numero_lote = req.params.numero_lote
        const lote_info = { cantidad, numero_lote }
        if (tipo === "perecedero") {
            lote_info.fecha_vencimiento = req.body.fecha_vencimiento
        }
        const resultado = await editarLoteServicio(lote_info, req.params.id_producto, tipo)
        if (resultado.modifiedCount === 0) { throw new Error("Error al modificar lote"); }
        await calcularStockPorLotesServicio(req.params.id_producto)
        res.status(200).json({ "Mensaje": "Lote modificado correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function eliminarLote(req, res) {
    try {
        const resultado = await eliminarLoteServicio(req.params.numero_lote, req.params.id_producto);
        if (resultado.modifiedCount === 0) { throw new Error("Error al eliminar lote"); }
        await calcularStockPorLotesServicio(req.params.id_producto)
        res.status(200).json({ "Mensaje": "Se eliminó el lote correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function restarInventarioSimple(req, res) {
    try {
        const cantidad = req.body.cantidad
        const resultado = await restarInventarioSimpleServicio(cantidad, req.params.id_producto)
        if (resultado.modifiedCount === 0) { throw new Error("Error al restar stock"); }
        res.status(200).json({ "Mensaje": "Se restó del stock correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function restarInventarioLotes(req, res) {
    try {
        const cantidad = req.body.cantidad
        const resultado = await restarInventarioLotesServicio(cantidad, req.params.id_producto, req.params.numero_lote)
        if (resultado.modifiedCount === 0) { throw new Error("Error al restar stock del lote"); }
        await calcularStockPorLotesServicio(req.params.id_producto)
        res.status(200).json({ "Mensaje": "Se restó del stock del lote correctamente" })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

