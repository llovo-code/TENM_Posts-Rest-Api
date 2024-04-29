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
        default: new Date()
    },
    UpdateAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    Author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
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
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Renombrar _id a id
            delete ret._id; // Eliminar _id
            delete ret.__v; // Eliminar __v
            return ret;
        }
    }
});
exports.default = mongoose_1.default.model('Posts', PostSchema);
