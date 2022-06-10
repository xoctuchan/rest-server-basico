const {response} = require('express');

const usuariosGet = (req, res = response) =>{
    const {pagina=10, nombre='No name'} = req.query
    res.json({
        "pagina":pagina,
        "nombre":nombre
    })
}

const usuariosPost = (req, res = response) =>{
    const {nombre, edad} = req.body;
    
    res.json({
        "nombre":nombre,
        "edad":edad,
    })
}

const usuariosPut = (req, res = response) =>{
    const id = req.params.id;
    res.json({
        "id":id
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json('PATCH API - Controlador')
}

const usuariosDelete = (req, res = response) =>{
    const id = req.params.id;
    res.json({
        "id":id
    });
}


module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}