import Express  from 'express';
import { getDB } from '../../db/basedatos.js';
import { ObjectId } from 'mongodb';
import { queryallslider, crearSlider } from '../../controllers/slider/controller.js';

const rutasSlider = Express.Router();

const genericCallback = (res)=>{
    return( (err, result)=>{
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.send("error consultando la base de datos");
        }else{
            res.json(result);
        }
    })
}


//peticion tipo Get
rutasSlider.route("/admin/informacion-slider").get ( (req, res)=>{
    console.log("alguien hizo get en la ruta /login")
    queryallslider(genericCallback(res))
})
    
rutasSlider.route("/admin/creacion-slider").post((req, res)=>{
    console.log("el usuario envio el requerimiento"+ req.body)
    crearSlider(req.body, genericCallback(res))
})

rutasSlider.route('/admin/modificar-slider').patch((req, res)=>{
    const edicion = req.body;
    const operacion = {
        $set:edicion
    }
    const idEdicion = { _id: new ObjectId(edicion.id) }
    delete edicion.id;
    const conexion = getDB();
    conexion.collection('slider').findOneAndUpdate(idEdicion, operacion, (err, result)=>{
        if (err) {
            console.error('error actualizando el slider')
            res.sendStatus(500)
        }else{
            console.log('slider actualizado')
            res.sendStatus(200)
        }
    })
})

export default rutasSlider;