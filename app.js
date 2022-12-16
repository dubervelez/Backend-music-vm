import Express  from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(Cors());

// url de conexion a la base de datos de mongo
const url = 'mongodb+srv://DuberVelez:Codeba1129535664@proyecto-music-vm.1zorlpc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true

});

let conexion;

const main = ()=> {
    client.connect((err, db)=>{
        if (err){
            console.error("error de conexion a la base de datos");
        }
        conexion = db.db('adminindex');
        console.log("conexion exitosa");
        return app.listen(5000,()=>{
            console.log("escuchando puerto 5000")
        });
    });
};

main();

//peticion tipo Get
app.get("/admin/informacion-slider", (req, res)=>{
    console.log("alguien hizo get en la ruta /login")
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



