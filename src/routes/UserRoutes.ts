import { Response,Request,Router,NextFunction } from "express";
import { IUser } from "../interfaces/IUser";
import User from "../Schemas/UserSchema";
// import Userchema from "../Schemas/Userchema";

export class UserRoutes{
    public router:Router
    /**
     *
     */
    constructor() {
        this.router = Router();
        this.Routes();
    }

    async getUsers(req:Request, res:Response){

        let [Totals, Elements] = await Promise.all([User.countDocuments(),User.find<IUser>()]);
        res.json({
            msg:"Total de Elementos Registrados",
            Totals,
            Elements
        });
    }

    async getUser(req:Request, res:Response){
        res.send("User")
    }

    async CreateUser(req:Request, res:Response){
        let BUser:IUser= req.body;
        let user = new User(BUser);
        await user.save().then(()=> console.log("User guardado")).catch((e)=> console.log(e));
        res.json({
            msg:"User Guardado Exitosamente",
            user
        });
    }
    UpdateUser(req:Request, res:Response){
        res.send(`Hello world`);
    }
    DeleteUser(req:Request, res:Response){
        res.send(`Hello world`);
    }

    async Routes(){
        this.router.get('/getUsers',this.getUsers);
        this.router.get('/getUser',this.getUser);
        this.router.post('/CreateUser',this.CreateUser);
        this.router.put('/UpdateUser',this.UpdateUser);
        this.router.delete('/DeleteUser',this.DeleteUser);

    }

}