const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosRoutePath ='/api/users';
        //Conectar a base de datos
        this.connectBD();

        this.middlewares();

        this.routes();
    }

    async connectBD()
    {

        dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //LECTURA Y PARSEO
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes()
    {
        this.app.use(this.usuariosRoutePath, require('../routes/user'));
    }

    listener(){
        this.app.listen(this.port)
    }
}

module.exports = Server;