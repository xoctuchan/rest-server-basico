const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req, res = response) =>{
    const {limite = 5, desde = 0} = req.query;
    const query={estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) =>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await usuario.save();
    
    res.json({
        "nombre":nombre,
        "res":usuario,
    })
}

const usuariosPut = async(req, res = response) =>{
    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;
    //Validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        "id":id,
        usuario
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json('PATCH API - Controlador')
}

const usuariosDelete = async (req, res = response) =>{
    const id = req.params.id;

    //Fisicamente lo borramos
        //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        "id":id,
        usuario
    });
}


module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}