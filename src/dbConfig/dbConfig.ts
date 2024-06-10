import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected' ,()=>{
            console.log('MOngo');
            console.log('MOngob connected successfully');
            
        })
    } catch (error) {
        console.log('MOngo db connection error ' + error);
        process.exit();
                
    }
}