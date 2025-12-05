import { body } from "express-validator";


export const crearUsuarioDTO = [

    body("nombre_usuario")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio"),

    body("contrasenia")
        .isString()
        .notEmpty()
        .isLength({min:4})
        .withMessage("La contraseña es obligatoria"),

    body("id_empresa")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("ID de empresa inválido"),

    body("rol")
        .isString()
        .notEmpty()
        .isIn(["Vendedor","Administrador"])
        .withMessage("El rol es obligatorio"),

    body("documento")
        .isString()
        .matches(/^\d+$/)
        .withMessage("El documento debe contener solo números")
];

export const editarUsuarioDTO = [

    body("_id")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("El ID del usuario es inválido"),

    body("nombre_usuario")
        .optional()
        .isString()
        .trim()
        .notEmpty(),

    body("contrasenia")
        .optional()
        .isString()
        .isLength({min:3})
        .notEmpty(),

    body("id_interno")
        .optional()
        .isString()
        .trim()
        .notEmpty(),

    body("rol")
        .optional()
        .isString()
        .isIn(["Vendedor","Administrador"])
        .notEmpty(),
  
    body("documento")
        .optional()
        .isString()
        .matches(/^\d+$/)
        .withMessage("El documento debe contener solo números")
];
