import { body } from "express-validator";

export const crearProductoDTO = [

    // Tipo
    body("tipo")
        .isString()
        .withMessage("El tipo debe ser texto")
        .isIn(["simple", "perecedero", "no-perecedero"])
        .withMessage("Tipo inválido. Debe ser simple, perecedero o no-perecedero"),

    body("nombre")
        .isString()
        .trim()
        .notEmpty(),

    body("categoria")
        .isString()
        .notEmpty()
        .trim(),

    body("descripcion")
        .optional()
        .isString()
        .trim(),

    body("precio_de_compra")
        .isFloat({ min: 1 }),

    body("precio_de_venta")
        .isFloat({ min: 1 }),

    body("unidad_de_medida")
        .isString()
        .isIn(["unidad","kilogramo","litro"]),

    body("id_empresa")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("ID de empresa inválido"),

    // STOCK SOLO PARA SIMPLE
    body("stock")
        .if(body("tipo").equals("simple"))
        .notEmpty().withMessage("El stock es obligatorio para productos simples")
        .isFloat({ min: 0 }),

    body("lotes")
        .optional()
        .isArray()
        .withMessage("Lotes debe ser una lista (array)"),

    body("SKU")
        .isString()
        .trim()
        .notEmpty()
];

export const agregarLoteDTO = [
    body("numero_lote")
    .isString()
    .notEmpty()
    .withMessage("El numero de lote no debe estar vacio"),

    body("cantidad")
        .isFloat({ min: 0 })
        .withMessage("Cantidad debe ser un número"),

    body("fecha_ingreso")
        .isISO8601()
        .withMessage("Fecha de ingreso inválida"),

    // Fecha de vencimiento para perecederos
    body("fecha_vencimiento")
        .optional()
        .custom((value, { req }) => {
            if (req.body.tipo === "perecedero" && !value) {
                throw new Error("Los productos perecederos requieren fecha de vencimiento");
            }
            return true;
        })
        .isISO8601().withMessage("Fecha de vencimiento inválida")
];

export const eliminarLoteDTO = [
    body("id_lote")
        .isString()
        .withMessage("id_lote debe ser un texto válido")
];

export const editarProductoDTO = [
       // Tipo (opcional en edición)
    body("tipo")
        .optional()
        .isString()
        .isIn(["simple", "perecedero", "no-perecedero"])
        .withMessage("Tipo inválido"),

    // _id del producto obligatorio
    body("_id")
        .matches(/^[0-9a-fA-F]{24}$/)
        .withMessage("El ID del producto es inválido"),

    // Nombre
    body("nombre")
        .optional()
        .isString()
        .trim()
        .notEmpty(),

    // Categoría
    body("categoria")
        .optional()
        .isString()
        .trim()
        .notEmpty(),

    // Descripción
    body("descripcion")
        .optional()
        .isString()
        .trim(),

    // Precio compra
    body("precio_de_compra")
        .optional()
        .isFloat({ min: 1 }),

    // Precio venta
    body("precio_de_venta")
        .optional()
        .isFloat({ min: 1 }),

    // Unidad de medida
    body("unidad_de_medida")
        .optional()
        .isString()
        .isIn(["unidad", "kilogramo", "litro"]),

    // SKU
    body("SKU")
        .optional()
        .isString()
        .trim()
        .notEmpty(),

    // STOCK solo editable si es simple
    body("stock")
        .optional()
        .custom((value, { req }) => {
            if (req.body.tipo === "perecedero" || req.body.tipo === "no-perecedero") {
                throw new Error("Solo los productos simples pueden tener stock numérico");
            }
            return true;
        })
        .isFloat({ min: 0 }),

];


export const editarLoteDTO = [

    body("cantidad")
    .optional()
        .isFloat({ min: 0 })
        .withMessage("Cantidad debe ser un número"),

    // Fecha de vencimiento para perecederos
    body("fecha_vencimiento")
        .optional()
        .custom((value, { req }) => {
            if (req.body.tipo === "perecedero" && !value) {
                throw new Error("Los productos perecederos requieren fecha de vencimiento");
            }
            return true;
        })
        .isISO8601().withMessage("Fecha de vencimiento inválida")
];
