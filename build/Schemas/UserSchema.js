"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Userchema = new mongoose_1.default.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Username: { type: String, required: true },
    CreateAt: {
        type: Date,
        require: true,
        //default: new Date().toISOString()
    },
    UpdateAt: {
        type: Date,
        require: true
    }
}
//,{
//     toJSON: {
//         transform: function (doc, ret) {
//             ret.id = ret._id; // Renombrar _id a id
//             delete ret._id; // Eliminar _id
//             delete ret.__v; // Eliminar __v
//             return ret;
//         }
//     }
// }
);
Userchema.methods.toJSON = function () {
    const postObject = this.toObject(); // Obtener el objeto de documento
    // Renombrar _id a id y eliminar _id y __v del objeto de documento
    postObject.id = postObject._id;
    delete postObject._id;
    delete postObject.__v;
    return postObject; // Devolver el objeto de documento modificado
};
exports.default = mongoose_1.default.model('User', Userchema);
