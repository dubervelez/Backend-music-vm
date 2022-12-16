import Express  from 'express';
import { ConectarBD } from './db/basedatos.js';
import Cors from 'cors';
import Dotenv from "dotenv";
import rutasSlider from './views/slider/rutas.js';



Dotenv.config({ path: './.env' });
const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasSlider);


const main = ()=> {
    return app.listen(process.env.PORT,()=>{
        console.log(`escuchando el puerto: ${process.env.PORT}...`)
    });  
};

ConectarBD(main);




