import mongoose from "mongoose";

const collection = 'baseUsers';

const usersSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:String,
    age:Number,
    phone:String
},{timestamps:true})

const usersService = mongoose.model(collection,usersSchema);

export default usersService;