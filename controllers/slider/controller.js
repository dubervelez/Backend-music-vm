import { getDB } from '../../db/basedatos.js';

const queryallslider = async (callback)=>{
    const conexion = getDB(); 
    await conexion.collection('slider').find({}).limit(50).toArray(callback);
} 

const crearSlider = (datosSlider, callback)=>{
    const conexion = getDB();
    conexion.collection('slider').insertOne(datosSlider, callback)
}


export { queryallslider, crearSlider };