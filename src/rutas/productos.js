// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerProductos, crearProducto, editarProducto } from "../controladores/productos.js";
import { añadirLote } from "../controladores/productos.js";

// IMPORTE MIDDLEWARES

import { validarCampos } from "../middlewares/validador_campos.js";

// IMPORTE DTOS

import { crearProductoDTO, editarProductoDTO } from "../dto/productos.js";

// VARIABLES

const router = Router();

// RUTAS

// Productos

router.get("/",obtenerProductos);
router.post("/",crearProductoDTO, validarCampos, crearProducto)
router.patch("/",editarProductoDTO, validarCampos, editarProducto)

// Lotes

router.put("/aniadir_lote/",añadirLote)

// EXPORTE
 
export default router;