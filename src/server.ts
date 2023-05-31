import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const connect = async () =>{
    try {  
        await mongoose.connect(config.database_url as string);
        console.log("Connect successfully!!!");
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        })
    }
    catch (error) {
        console.log("Connect failure!!!");
    }

}
connect()