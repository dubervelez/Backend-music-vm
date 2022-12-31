import { ObjectId } from 'mongodb';
import { getDB } from '../../db/basedatos.js';


export const obtenerProductos = async (callback)=>{
	const conexion = getDB();
	await conexion.collection('productosStore').find({}).toArray(callback)
}

export const crearProducto = ( productoData )=>{
  if (
		Object.keys(productoData).length === 0 
		|| Object.values(productoData).some(valor => valor ==="" || valor === undefined)) 
	{
    console.log("el objeto que se intenta crear tiene valores vacios, operacion rechazada")
    return false
  }else{
		console.log("validaciones del request ok")
		return true
  }
    
};

export const modificarProducto = async( productoData, callback )=>{
	const filtro = { _id: new ObjectId(productoData._id) }
	const nuevaData = {
		$set: productoData
	}
	delete productoData._id
	const conexion = getDB();
	await conexion.collection('productosStore').findOneAndUpdate(filtro, nuevaData, callback)
}

export const eliminarProducto = async( productoData, callback )=>{
	const filtro = { _id: new ObjectId(productoData._id) }
	const conexion = getDB();
	await conexion.collection('productosStore').deleteOne(filtro, callback)
}