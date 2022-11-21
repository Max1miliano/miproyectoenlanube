import mongoose from "mongoose";

const collection = 'baseUsers';

const usersSchema = mongoose.Schema({
    avatar: String,
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
    phone:String,
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Carts'
    }
},{timestamps:true})

const usersModel = mongoose.model(collection,usersSchema);

export default usersModel;