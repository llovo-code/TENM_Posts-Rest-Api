"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    Title: {
        type: String,
        require: true
    },
    SubTitle: {
        type: String,
        require: false
    },
    Content: {
        type: String,
        require: true
    },
    CreateAt: {
        type: Date,
        require: true,
        //default: new Date().toISOString()
    },
    UpdateAt: {
        type: Date,
        require: true
    },
    Author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        //type:String,
        require: true
    },
    Image: {
        type: String
    },
    Url: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
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
PostSchema.methods.toJSON = function () {
    const postObject = this.toObject(); // Obtener el objeto de documento
    // Renombrar _id a id y eliminar _id y __v del objeto de documento
    postObject.id = postObject._id;
    delete postObject._id;
    delete postObject.__v;
    return postObject; // Devolver el objeto de documento modificado
};
exports.default = mongoose_1.default.model('Posts', PostSchema);
