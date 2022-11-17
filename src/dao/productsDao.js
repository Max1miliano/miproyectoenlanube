import productsModel from "./models/products.dao.js";

export default class ProductosDao {

    getAll = () => {
        return productsModel.find()
    }

    getById = () => {
        return productsModel.find({_id:id})
    }

    save = product => {
        return productsModel.create(product)
    }

    update = (id, product) => {
        return productsModel.findByIdAndUpdate(id, {$set: product})
    }
}