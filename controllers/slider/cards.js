import { getDB } from '../../db/basedatos.js';

const crearCard = async(datosCard, callback)=>{
    const conexion = getDB();
    // pendiente codigo para validaciones --------------------------------------
    const llaves = Object.values(datosCard)
    let datosok = true;
    llaves.forEach((i)=>{
        if (i) {
           console.log(i)
        }
    })
    await conexion.collection('ultimos-lanzamientos').insertOne(datosCard, callback);
    
};

const obtenerCards = async(callback)=>{
    const conexion = getDB();
    await conexion.collection('ultimos-lanzamientos').find({}).toArray(callback);
}


export { crearCard, obtenerCards };