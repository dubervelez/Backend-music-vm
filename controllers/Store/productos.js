import { getDB } from '../../db/basedatos.js';


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