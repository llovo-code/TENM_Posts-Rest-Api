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
exports.DbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DbConnection {
    constructor() {
        var _a, _b, _c, _d;
        this.MONGO_URI = (_d = (_a = process.env.MONGODB_URI) === null || _a === void 0 ? void 0 : _a.replace('<urs>', (_b = process.env.MONGOOSE_USER) !== null && _b !== void 0 ? _b : "").replace('<passwd>', (_c = process.env.MONGOOSE_PASSWORD) !== null && _c !== void 0 ? _c : "")) !== null && _d !== void 0 ? _d : "";
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(this.MONGO_URI, {
                autoIndex: true,
                dbName: process.env.MONGOOSE_DB,
            })
                .then(db => console.log(`db connect `, db.connection.readyState))
                .catch(e => console.log(e));
        });
    }
}
exports.DbConnection = DbConnection;
