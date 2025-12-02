// IMPORTE LIBRERIAS

// IMPORTE FUNCIONES

    import { obtenerProductosServicio } from "../servicios/productos.js";


// FUNCIONES

export async function obtenerProductos(req, res){
    try {
        const productos = await obtenerProductosServicio(req.body.id_Empresa);
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener todos los platos"})
    }
}
