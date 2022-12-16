import {ConectarBD, getDB} from './db/basedatos.js';
import Express  from 'express';
import { ObjectId } from 'mongodb';
import Cors from 'cors';
import Dotenv from "dotenv";




Dotenv.config({ path: './.env' });
const app = Express();
app.use(Express.json());
app.use(Cors());

//peticion tipo Get
app.get("/admin/informacion-slider", (req, res)=>{
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

app.post("/admin/creacion-slider", (req, res)=>{
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

app.patch('/admin/modificar-slider', (req, res)=>{
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

const main = ()=> {
    return app.listen(process.env.PORT,()=>{
        console.log(`escuchando el puerto: ${process.env.PORT}...`)
    });  
};

ConectarBD(main);




