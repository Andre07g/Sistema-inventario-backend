// IMPORTE LIBRERIAS

import { Router } from "express";

// IMPORTE CONTROLADORES

import { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario, loginUsuario } from "../controladores/usuarios.js";

// IMPORTE MIDDLEWARES

import { validarCampos } from "../middlewares/validador_campos.js";

// IMPORTE DTOS

import { crearUsuarioDTO, editarUsuarioDTO } from "../dto/usuarios.js";

// VARIABLES

const router = Router();

// RUTAS

// Usuarios

router.get("/lista/:id_empresa", obtenerUsuarios)
router.post("/crear/:id_empresa",crearUsuarioDTO,validarCampos, crearUsuario)
router.patch("/editar/:id_usuario", editarUsuarioDTO,editarUsuario)
router.delete("/eliminar/:id_usuario", eliminarUsuario)
router.get("/login/:id_empresa/:nombre_usuario", loginUsuario)

// EXPORTE
 
export default router;