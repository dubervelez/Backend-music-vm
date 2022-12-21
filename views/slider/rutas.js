import Express  from 'express';


import { queryallslider, crearSlider, actualizarSlider, eliminarSlider } from '../../controllers/slider/controller.js';

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
    console.log("el usuario envio el requerimiento"+ req.body);
    crearSlider(req.body, genericCallback(res));
})

rutasSlider.route('/admin/modificar-slider').patch((req, res)=>{
    console.log("el usuario quiere editar la db slider");
    actualizarSlider(req.body, genericCallback(res));
});

rutasSlider.route('/admin/eliminar-slider').delete((req, res)=>{
    eliminarSlider(req.body, genericCallback(res));
    console.log("el usuario eliminó un dato de la BD Slider");
});

export default rutasSlider;