import cartsModel from "./models/cart.dao.js";

export default class CartsDao {

    getById = (id) => {
        return cartsModel.findOne({ _id: id }).lean();
    }

    save = () => {
        return cartsModel.create({ products: [] })
    }

    update = (id,cart) =>{
        return cartsModel.findByIdAndUpdate(id,{$set:{products:cart.products}})
    }

    refreshCard = (id, cart) => {
        return cartsModel.deleteMany({carrito: cart.products})
    }

}