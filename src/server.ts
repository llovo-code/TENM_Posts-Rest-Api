import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors'

import env from 'dotenv';
import path from 'path';

import {IndexRoutes} from './routes/indexRoutes'
import { PostRoutes } from './routes/PostsRoutes';
import { DbConnection } from './databases/dbConfig';
class Server {
    public app:express.Application;
    // public indexRoutes: express.Router;

    constructor(){
        this.app= express()
        // this.indexRoutes = new IndexRoutes().router;
        this.config();
        
        this.routes();
    }

    async config (){
        //Env
        env.config({path:path.resolve(process.cwd(), '.env')});

        //server config
        this.app.set('port', process.env.PORT  || 3000);
        new DbConnection().connect();

        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        
    }

    routes(){
        this.app.use(new IndexRoutes().router);
        this.app.use('/api',new PostRoutes().router);
    }

    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`server listening on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();