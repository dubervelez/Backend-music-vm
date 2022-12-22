import { getDB } from '../../db/basedatos.js';


const queryallslider = async (callback)=>{
    const conexion = getDB(); 
    await conexion.collection('slider').find({}).limit(50).toArray(callback);
} 

const crearSlider = async(datosSlider, callback)=>{
    const conexion = getDB();
    await conexion.collection('slider').insertOne(datosSlider, callback)
}

const actualizarSlider = async(edicion, callback)=>{
    const operacion = {
        $set:edicion
    }
    const idEdicion = { idSlider: edicion.idSlider }
    const conexion = getDB();
    await conexion.collection('slider').findOneAndUpdate(idEdicion, operacion, callback)
}

const eliminarSlider = async(elementoEliminar, callback)=>{
    const query = { idSlider: elementoEliminar.idSlider };
    const conexion = getDB();
    await conexion.collection('slider').deleteOne(query, callback);
}

export { queryallslider, crearSlider, actualizarSlider, eliminarSlider };