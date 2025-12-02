// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerProductos } from "../controladores/productos.js";

// IMPORTE MIDDLEWARES



// VARIABLES

const router = Router();

// RUTAS

router.get("/",obtenerProductos);


// EXPORTE
 
export default router;