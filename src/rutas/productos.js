// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerProductos, crearProducto, editarProducto } from "../controladores/productos.js";

// IMPORTE MIDDLEWARES

import { validarCampos } from "../middlewares/validador_campos.js";

// IMPORTE DTOS

import { crearProductoDTO, editarProductoDTO } from "../dto/productos.js";

// VARIABLES

const router = Router();

// RUTAS

router.get("/",obtenerProductos);
router.post("/",crearProductoDTO, validarCampos, crearProducto)
router.patch("/",editarProductoDTO, validarCampos, editarProducto)

// EXPORTE
 
export default router;