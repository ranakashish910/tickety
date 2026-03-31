require('dotenv').config();
const mongoose=require('mongoose');
const connectdb=async(req,res)=>{
    try{
    await mongoose.connect(process.env.MONGO_STRING);
    console.log("Connected Successfully")
    }catch(err){
        console.log("Error in connecting with database",err)
    }
}
module.exports=connectdb;