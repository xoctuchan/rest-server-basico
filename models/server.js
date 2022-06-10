const express = require('express')
const cors = require('cors')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosRoutePath ='/api/users';

        this.middlewares();

        this.routes();
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