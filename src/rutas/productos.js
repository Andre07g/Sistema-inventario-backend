// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerProductos, crearProducto, editarProducto, eliminarProducto } from "../controladores/productos.js";
import { añadirLote, editarLote, eliminarLote, restarInventarioLotes, restarInventarioSimple } from "../controladores/productos.js";

// IMPORTE MIDDLEWARES

import { validarCampos } from "../middlewares/validador_campos.js";

// IMPORTE DTOS

import { crearProductoDTO, editarProductoDTO } from "../dto/productos.js";

// VARIABLES

const router = Router();

// RUTAS

// Productos

router.get("/obtener/",obtenerProductos);
router.post("/crear/",crearProductoDTO, validarCampos, crearProducto)
router.patch("/editar/:id_producto",editarProductoDTO, validarCampos, editarProducto)
router.delete("/eliminar/:id_producto",eliminarProducto)
router.patch("/restar_stock/:id_producto", restarInventarioSimple)

// Lotes

router.put("/aniadir_lote/:id_producto/:numero_lote",añadirLote)
router.patch("/editar_lote/:id_producto/:numero_lote", editarLote)
router.patch("/eliminar_lote/:id_producto/:numero_lote", eliminarLote)
router.patch("/restar_lote/:id_producto/:numero_lote", restarInventarioLotes)

// EXPORTE
 
export default router;