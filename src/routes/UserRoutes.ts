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

        //let User = await Userchema.countDocuments().find();
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
        //console.log(<IUser>req.body);
        let BUser:IUser= req.body;
        //console.log(`User to save ${BUser}`);
        BUser.CreateAt = new Date();
        BUser.UpdateAt = new Date();
        let user = new User(BUser);
        await user.save().then(()=> console.log("User guardado")).catch((e)=> console.log(e));
        //console.log(User.toJSON());
        res.json({
            msg:"User Guardado Exitosamente"
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