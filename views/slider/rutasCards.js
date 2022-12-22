import Express  from 'express';
import { crearCard } from '../../controllers/slider/cards.js';

const rutasCards = Express.Router();

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


rutasCards.route("/admin/ultimos-lanzamientos/nuevo").post((req, res)=>{
    crearCard(req.body, genericCallback(res));
    console.log("el usuario agregó un nuevo dato a la colección");
})



export default rutasCards