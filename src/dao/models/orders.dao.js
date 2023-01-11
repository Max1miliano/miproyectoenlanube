import mongoose from 'mongoose';

const collection = "Orders";

const schema = new mongoose.Schema({ 
    userCartId:{
        type: String
    },
    productos:{
        type: Array
    },
    orderNumber: {
        type: Number
    }
},{timestamps:true}) 

const cartsModel =  mongoose.model(collection,schema);

export default cartsModel;