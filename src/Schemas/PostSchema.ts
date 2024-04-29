
import mongoose from "mongoose";
import { IPosts } from "../interfaces/IPosts";


const PostSchema:mongoose.Schema =new mongoose.Schema({
    Title:{
        type:String,
        require:true
    },
    SubTitle:{
        type:String,
        require:false
    },
    Content:{
        type:String,
        require:true
    },
    CreateAt:{
        type:Date,
        require:true,
        default: new Date()
    },
    UpdateAt:{
        type:Date,
        require:true,
        default: new Date()
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    Image:{
        type:String
    },
    Url:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    }

}
,{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Renombrar _id a id
            delete ret._id; // Eliminar _id
            delete ret.__v; // Eliminar __v
            return ret;
        }
    }
}
);

export default mongoose.model('Posts',PostSchema);