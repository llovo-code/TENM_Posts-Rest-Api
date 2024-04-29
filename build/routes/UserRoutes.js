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
exports.UserRoutes = void 0;
const express_1 = require("express");
const UserSchema_1 = __importDefault(require("../Schemas/UserSchema"));
// import Userchema from "../Schemas/Userchema";
class UserRoutes {
    /**
     *
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.Routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let [Totals, Elements] = yield Promise.all([UserSchema_1.default.countDocuments(), UserSchema_1.default.find()]);
            res.json({
                msg: "Total de Elementos Registrados",
                Totals,
                Elements
            });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("User");
        });
    }
    CreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let BUser = req.body;
            let user = new UserSchema_1.default(BUser);
            yield user.save().then(() => console.log("User guardado")).catch((e) => console.log(e));
            res.json({
                msg: "User Guardado Exitosamente",
                user
            });
        });
    }
    UpdateUser(req, res) {
        res.send(`Hello world`);
    }
    DeleteUser(req, res) {
        res.send(`Hello world`);
    }
    Routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/getUsers', this.getUsers);
            this.router.get('/getUser', this.getUser);
            this.router.post('/CreateUser', this.CreateUser);
            this.router.put('/UpdateUser', this.UpdateUser);
            this.router.delete('/DeleteUser', this.DeleteUser);
        });
    }
}
exports.UserRoutes = UserRoutes;
