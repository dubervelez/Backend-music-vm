import { MongoClient} from 'mongodb';
import Dotenv from "dotenv";

Dotenv.config({ path: './.env' });

const url = process.env.DATABASE_URL || 'mongodb+srv://DuberVelez:Codeba1129535664@proyecto-music-vm.1zorlpc.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

let conexion;
const getDB = ()=>{
    return conexion;
}

const ConectarBD = (callback)=>{
    client.connect((err, db)=>{
        if (err){
            console.error("error de conexion a la base de datos");
            return err;
        }
        conexion = db.db('adminindex');
        console.log("conexion exitosa");
        return callback();
    });
};

export {ConectarBD, getDB};

 