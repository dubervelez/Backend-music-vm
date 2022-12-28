import Express  from 'express';
import { ConectarBD } from './db/basedatos.js';
import Cors from 'cors';
import Dotenv from "dotenv";
import rutasSlider from './views/slider/rutas.js';
import rutasCards from './views/slider/rutasCards.js';

const port = process.env.PORT || 5000;
Dotenv.config({ path: './.env' });
const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasSlider);
app.use(rutasCards)

const main = ()=> {
    return app.listen(port,()=>{
        console.log(`escuchando el puerto: ${port}...`)
    });  
};

ConectarBD(main);




