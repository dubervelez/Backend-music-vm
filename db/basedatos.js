import { MongoClient } from 'mongodb';
import Dotenv from "dotenv";

Dotenv.config({ path: './.env' });

const url = process.env.DATABASE_URL;
console.log(url)
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

let conexion;
const getDB = ()=>{
    return conexion;
} 

const ConectarBD = (callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology:true},(err, db)=>{
        if (err){
            console.error("Error, no se logró conectar a la base de datos");
            console.log(err)
            return err;
        }
        conexion = db.db('adminindex');
        console.log("conexion exitosa");
        return callback();
    });
};


export {ConectarBD, getDB};
