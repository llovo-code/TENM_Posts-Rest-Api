"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const PostSchema_1 = __importDefault(require("../Schemas/PostSchema"));
// import PostSchema from "../Schemas/PostSchema";
class PostRoutes {
    /**
     *
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //let posts = await PostSchema.countDocuments().find();
            let [Totals, Elements] = yield Promise.all([PostSchema_1.default.countDocuments(), PostSchema_1.default.find()]);
            res.json({
                msg: "Total de Elementos Registrados",
                Totals,
                Elements
            });
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("Post");
        });
    }
    CreatePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(<IPosts>req.body);
            let Bposts = req.body;
            //console.log(`Post to save ${Bposts}`);
            Bposts.CreateAt = new Date();
            Bposts.UpdateAt = new Date();
            let post = new PostSchema_1.default(Bposts);
            yield post.save().then(() => console.log("Post guardado")).catch((e) => console.log(e));
            //console.log(post.toJSON());
            res.json({
                msg: "Post Guardado Exitosamente"
            });
        });
    }
    UpdatePosts(req, res) {
        res.send(`Hello world`);
    }
    DeletePosts(req, res) {
        res.send(`Hello world`);
    }
    Routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/getPosts', this.getPosts);
            this.router.get('/getPost', this.getPost);
            this.router.post('/CreatePosts', this.CreatePosts);
            this.router.put('/UpdatePosts', this.UpdatePosts);
            this.router.delete('/DeletePosts', this.DeletePosts);
        });
    }
}
exports.PostRoutes = PostRoutes;
