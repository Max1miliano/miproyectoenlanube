import mongoose from "mongoose";

const collection = 'productsDataBase';

const productsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    }, 
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{timestamps:true})

const productsModel = mongoose.model(collection,productsSchema);

export default productsModel;