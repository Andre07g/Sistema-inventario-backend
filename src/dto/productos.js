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


