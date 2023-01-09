import productsModel from "./models/products.dao.js";

export default class ProductosDao {
 
    getAll = () => {
        return productsModel.find()
    }

    getById = (id) => {
        return productsModel.find({_id:id})
    }

    getByCategory = (category) => {
        return productsModel.find({category:category})
    }

    save = product => {
        return productsModel.create(product)
    }

    update = (id, product) => {
        return productsModel.findByIdAndUpdate(id, {$set: product})
    }

    delete = (id) => {
        return productsModel.deleteOne(id)
    }
}