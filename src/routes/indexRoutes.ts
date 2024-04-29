
import {Request,Response,Router} from 'express'
export class IndexRoutes{
    public router:Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get("/",(req:Request,res:Response)=>{
            res.send(`The Api is : /api/posts`);
        });
    }
}
