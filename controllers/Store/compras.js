import { getDB } from "../../db/basedatos.js";


export const crearCompra = async(data, callback)=>{
    const conexion = getDB();
    await conexion.collection('compras').insertOne(data, callback)
}

export const obtenerCompras = async( callback )=>{
    const conexion = getDB();
    await conexion.collection('compras').find({}).sort({ _id: -1 }).toArray(callback)
}