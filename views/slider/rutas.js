import Express  from 'express';
import { getDB } from '../../db/basedatos.js';
import { ObjectId } from 'mongodb';
const rutasSlider = Express.Router();



//peticion tipo Get
rutasSlider.route("/admin/informacion-slider").get ( (req, res)=>{
    console.log("alguien hizo get en la ruta /login")
    const conexion = getDB(); 
    conexion.collection('slider').find({}).limit(50).toArray((err, result)=>{
        if (err) {
            console.log(err)
            res.sendStatus(500)
            res.send("error consultando la base de datos");
        }else{
            res.json(result);
        }
    })
})

rutasSlider.route("/admin/creacion-slider").post((req, res)=>{
    const datosSlider = req.body;
    console.log("el usuario envio el requerimiento"+ req.body)
    const conexion = getDB();
    conexion.collection('slider').insertOne(datosSlider, (err, result)=>{
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    } )
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