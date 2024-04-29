import mongoose from "mongoose";

export class DbConnection {
    MONGO_URI:string;
    constructor() {
        this.MONGO_URI = process.env.MONGODB_URI?.replace('<urs>',process.env.MONGOOSE_USER?? "").replace('<passwd>',process.env.MONGOOSE_PASSWORD ?? "") ?? "";
    }
    async connect(){
        await mongoose.connect(this.MONGO_URI, {
            autoIndex:true,
            dbName:process.env.MONGOOSE_DB,
            
        })
            .then(db=> console.log(`db connect `,db.connection.readyState))
            .catch(e=> console.log(e));
    }
}