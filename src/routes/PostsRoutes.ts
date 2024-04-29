import { Response,Request,Router,NextFunction } from "express";
import { IPosts } from "../interfaces/IPosts";
import Post from "../Schemas/PostSchema";
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

    async getPosts(req:Request, res:Response){

        //let posts = await PostSchema.countDocuments().find();
        let [Totals, Elements] = await Promise.all([Post.countDocuments(),Post.find<IPosts>()]);
        res.json({
            msg:"Total de Elementos Registrados",
            Totals,
            Elements
        });
    }

    async getPost(req:Request, res:Response){
        res.send("Post")
    }

    async CreatePosts(req:Request, res:Response){
        //console.log(<IPosts>req.body);
        let Bposts:IPosts= req.body;
        //console.log(`Post to save ${Bposts}`);
        Bposts.CreateAt = new Date();
        Bposts.UpdateAt = new Date();
        let post = new Post(Bposts);
        await post.save().then(()=> console.log("Post guardado")).catch((e)=> console.log(e));
        //console.log(post.toJSON());
        res.json({
            msg:"Post Guardado Exitosamente"
        });
    }
    UpdatePosts(req:Request, res:Response){
        res.send(`Hello world`);
    }
    DeletePosts(req:Request, res:Response){
        res.send(`Hello world`);
    }

    async Routes(){
        this.router.get('/getPosts',this.getPosts);
        this.router.get('/getPost',this.getPost);
        this.router.post('/CreatePosts',this.CreatePosts);
        this.router.put('/UpdatePosts',this.UpdatePosts);
        this.router.delete('/DeletePosts',this.DeletePosts);

    }

}