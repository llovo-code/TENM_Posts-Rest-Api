
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema =new mongoose.Schema<IUser>({
    Name:{ type:String,required:true},
    Email:{ type:String,required:true, unique:true},
    Password:{ type:String,required:true},
    Username:{type:String,required:true},
    CreateAt:{type:Date,require:true,default: new Date()},
    UpdateAt:{type:Date,require:true,default:new Date()}
}
,{
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id; // Renombrar _id a id
            delete ret._id; // Eliminar _id
            delete ret.__v; // Eliminar __v
            delete ret.Password; //Eliminamos el password al Obtener un usuario al ser un campo sensible
            return ret;
        }
    }
}
);

export default mongoose.model('User',UserSchema);