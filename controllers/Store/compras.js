import { getDB } from "../../db/basedatos.js";


export const crearCompra = async(data, callback)=>{
    const conexion = getDB();
    await conexion.collection('compras').insertOne(data, callback)
}