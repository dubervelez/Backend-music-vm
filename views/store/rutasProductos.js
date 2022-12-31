import Express  from 'express';
import { crearProducto, eliminarProducto, modificarProducto, obtenerProductos } from '../../controllers/Store/productos.js';
import { getDB } from '../../db/basedatos.js';


const rutasproductos = Express.Router()

const genericCallback = (res)=>{
    return( (err, result)=>{
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.send("error consultando la base de datos");
        }else{
            res.status(200);
            res.json(result);
            console.log('la operacion se ejecutó con exito')
        }
    })
}
const validaciones = (res)=>{
    return  res.status(400).send({ error: "solicitud no cumple con las validaciones"})
}

rutasproductos.route('/store/obtener-productos').get((req, res)=>{
    obtenerProductos(genericCallback(res));
    
})

rutasproductos.route('/store/nuevo-producto').post( (req, res)=>{ 
    if (crearProducto(req.body)){
        const conexion = getDB();
        conexion.collection('productosStore').insertOne(req.body, genericCallback(res))
    }else{
        validaciones(res);
    }
})

rutasproductos.route('/store/modificar-producto').patch((req, res)=>{
    modificarProducto(req.body, genericCallback(res));
})

rutasproductos.route('/store/eliminar-producto').delete((req, res)=>{
    eliminarProducto(req.body, genericCallback(res));
})

export default rutasproductos;