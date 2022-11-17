import mongoose from 'mongoose';

const collection = "Carts";

const schema = new mongoose.Schema({
    products: [
        {
            artwork:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'cartProduct'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
}) 

const cartsModel =  mongoose.model(collection,schema);

export default cartsModel;
