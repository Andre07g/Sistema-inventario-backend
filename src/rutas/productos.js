// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerProductos, crearProducto, editarProducto, eliminarProducto } from "../controladores/productos.js";
import { añadirLote, editarLote } from "../controladores/productos.js";

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

// Lotes

router.put("/:id_producto/aniadir_lote/",añadirLote)
router.patch("/:id_producto/editar_lote/:numero_lote", editarLote)

// EXPORTE
 
export default router;