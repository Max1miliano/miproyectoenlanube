import mongoose from 'mongoose';

const collection = "Carts";

const schema = new mongoose.Schema({ 
    products: [
        {
            product:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Products'
            },
            quantity:{
                type:Number,
                default:1
            },
            productId: String,
            productTitle: String,
            productPrice: String,
            productDescription: String
        }
    ]
}) 

const cartsModel =  mongoose.model(collection,schema);

export default cartsModel;
