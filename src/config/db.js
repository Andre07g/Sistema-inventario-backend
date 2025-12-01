import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_URI
const db_name = process.env.DB_NAME

const client = new MongoClient (uri);
let db;

export async function conectarBD() {
    try {
        await client.connect();
        console.log("Conectado a la base de datos");
        db = client.db(db_name);
    } catch (error) {
        console.error("Error al conectar con la base de datos", error);
        process.exit(1);
    }
}

export function obtenerBD() {
    if(!db){
        throw new Error("No está conectado a la base de datos");
    }
    return db;
}