import { ObjectId } from "mongoose";
import { IUser } from "./IUser";

export interface IPosts{
    id:string;
    Title:string;
    SubTitle:string;
    Content:string;
    CreateAt:Date;
    UpdateAt:Date;
    Author:IUser["id"];
    Url:string;
    Image:string;
}