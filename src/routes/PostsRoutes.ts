import { Response,Request,Router,NextFunction } from "express";
import { IPosts } from "../interfaces/IPosts";
import Post from "../Schemas/PostSchema";
import UserSchema from "../Schemas/UserSchema";
import { IUser } from "../interfaces/IUser";
// import PostSchema from "../Schemas/PostSchema";

export class PostRoutes{
    public router:Router
    /**
     *
     */
    constructor() {
        this.router = Router();
        this.Routes();
    }

    async getPostsByUser(req:Request, res:Response):Promise<any>{
        try {
            let {Email} = <IUser>req.body
            let user  = await UserSchema.findOne<IUser>({Email});
            if(!user){
                return res.status(404).json({error:"Usuario no encontrado"})
            }
            let [Total,Posts] =  await Promise.all([Post.countDocuments({Author: user?.id}),Post.find<IPosts>({Author: user?.id}).populate('Author')]);
            
            return res.status(201).json({
                msg:`Los Post Realizados por el usuario ${user.Name}`,
                Total,
                Posts
            });
        } catch (error:any) {
            console.error(error);
            return res.status(500).json({
                error:`Se ha presentado un error al momento de procesar la solicitud ${error}, ${error.menssage}`
            });
        }
    }
    async getPosts(req:Request, res:Response){

        let [Totals, Elements] = await Promise.all([Post.countDocuments(),Post.find<IPosts>().populate('Author')]);
        res.json({
            msg:"Total de Elementos Registrados",
            Totals,
            Elements
        });
    }
    
    async getPost(req:Request, res:Response){
        
        let reqPost:IPosts = req.body;
        let post = await Post.findOne<IPosts>({Title:reqPost.Title});
        res.json({
            msg: "Documento",
            post
        })
    }

    async CreatePosts(req:Request, res:Response):Promise<any>{
        try{
            let Bposts:IPosts= req.body;
            let user = await UserSchema.findOne<IUser>({Email: Bposts.Author.Email});
            if(!user){
                return res.status(404).json({error:"Usuario no encontrado."})
            }
            let post = new Post(Bposts);
            post.Author = user.id;
            await post.save().then(()=> console.log("Post guardado")).catch((e)=> console.log(e));
            return res.status(201).json({
                msg:"Post Guardado Exitosamente",
                post
            });
        }catch(error:any){
            res.status(500).json({error:`Ha ocurrido un problema al procesar la peticion:  ${error.message}, ${error.name}`});
        }
    }


    UpdatePosts(req:Request, res:Response){
        res.send(`Hello world`);
    }
    DeletePosts(req:Request, res:Response){
        res.send(`Hello world`);
    }

    async Routes(){
        this.router.get('/getPostsByUser',this.getPostsByUser);
        this.router.get('/getPosts',this.getPosts);
        this.router.get('/getPost',this.getPost);
        this.router.post('/CreatePosts',this.CreatePosts);
        this.router.put('/UpdatePosts',this.UpdatePosts);
        this.router.delete('/DeletePosts',this.DeletePosts);

    }

}