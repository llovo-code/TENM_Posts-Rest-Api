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
const UserSchema_1 = __importDefault(require("../Schemas/UserSchema"));
// import PostSchema from "../Schemas/PostSchema";
class PostRoutes {
    /**
     *
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    getPostsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { Email } = req.body;
                let user = yield UserSchema_1.default.findOne({ Email });
                if (!user) {
                    return res.status(404).json({ error: "Usuario no encontrado" });
                }
                let [Total, Posts] = yield Promise.all([PostSchema_1.default.countDocuments({ Author: user === null || user === void 0 ? void 0 : user.id }), PostSchema_1.default.find({ Author: user === null || user === void 0 ? void 0 : user.id }).populate('Author')]);
                return res.status(201).json({
                    msg: `Los Post Realizados por el usuario ${user.Name}`,
                    Total,
                    Posts
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: `Se ha presentado un error al momento de procesar la solicitud ${error}, ${error.menssage}`
                });
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let [Totals, Elements] = yield Promise.all([PostSchema_1.default.countDocuments(), PostSchema_1.default.find().populate('Author')]);
            res.json({
                msg: "Total de Elementos Registrados",
                Totals,
                Elements
            });
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqPost = req.body;
            let post = yield PostSchema_1.default.findOne({ Title: reqPost.Title });
            res.json({
                msg: "Documento",
                post
            });
        });
    }
    CreatePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Bposts = req.body;
                let user = yield UserSchema_1.default.findOne({ Email: Bposts.Author.Email });
                if (!user) {
                    return res.status(404).json({ error: "Usuario no encontrado." });
                }
                let post = new PostSchema_1.default(Bposts);
                post.Author = user.id;
                yield post.save().then(() => console.log("Post guardado")).catch((e) => console.log(e));
                return res.status(201).json({
                    msg: "Post Guardado Exitosamente",
                    post
                });
            }
            catch (error) {
                res.status(500).json({ error: `Ha ocurrido un problema al procesar la peticion:  ${error.message}, ${error.name}` });
            }
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
            this.router.get('/getPostsByUser', this.getPostsByUser);
            this.router.get('/getPosts', this.getPosts);
            this.router.get('/getPost', this.getPost);
            this.router.post('/CreatePosts', this.CreatePosts);
            this.router.put('/UpdatePosts', this.UpdatePosts);
            this.router.delete('/DeletePosts', this.DeletePosts);
        });
    }
}
exports.PostRoutes = PostRoutes;
