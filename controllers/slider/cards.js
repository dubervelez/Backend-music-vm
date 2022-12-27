import { ObjectId } from 'mongodb';
import { getDB } from '../../db/basedatos.js';

const crearCard = async(datosCard, callback)=>{
    const conexion = getDB();
    // pendiente codigo para validaciones --------------------------------------
    const llaves = Object.values(datosCard);
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
    await conexion.collection('ultimos-lanzamientos').find({}).sort({ _id: -1 }).toArray(callback);
};

const eliminarCard = async ( datosCard,callback )=>{
    const filtro = { cancion: datosCard.cancion };
    const conexion = getDB();
    await conexion.collection('ultimos-lanzamientos').deleteOne(filtro, callback);
};

const editarCard = async (datosCard, callback)=>{
    const filtro = { _id: new ObjectId(datosCard.id) }
    const operacion ={
        $set: datosCard
    };
    delete datosCard.id
    const conexion = getDB();
    await conexion.collection('ultimos-lanzamientos').findOneAndUpdate(filtro, operacion, callback);
}


export { crearCard, obtenerCards, eliminarCard, editarCard };