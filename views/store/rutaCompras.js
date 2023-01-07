import Express  from 'express';
import { crearCompra } from '../../controllers/Store/compras.js';

const rutasCompras = Express.Router()

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

rutasCompras.route('/store/nueva-compra').post(( req, res )=>{
    crearCompra(req.body, genericCallback(res))

})


export default rutasCompras;