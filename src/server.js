// IMPORTACIONES LIBRERIAS

import express from "express";

// IMPORTACIONES FUNCIONES

import { conectarBD } from "./config/db.js"; // Funcion para conectar a la base de datos

// IMPORTACIONES RUTAS


// CONFIGURACION DE LA APLICACION

const app = express();

app.use(express.json());


// USO DE RUTAS


// Ruta para verificar funcionamiento del server
app.get("/health", (req, res) => {
  res.status(200).json({ mensaje: "Backend funcionando" });
});


// FUNCIONAMIENTO DEL SERVER

const PUERTO = process.env.PORT;
const HOST = process.env.HOST_NAME;

conectarBD().then(() => {
  app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PUERTO}`);
  });
}).catch(err => {
  console.error("Error conectando a la BD:", err);
});