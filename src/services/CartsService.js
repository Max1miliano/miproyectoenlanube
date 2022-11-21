
export default class CartsService {
    constructor(dao){
        this.dao = dao;
    }

    createCart = () =>{
        return this.dao.save();
    }

    getCartById = cartId =>{
        return this.dao.getById(cartId);
    }

    update = (cartId,cart) =>{
        return this.dao.update(cartId,cart);
    }

    refresListProducts = (cartId,cart) =>{
        return this.dao.refreshCard(cartId,cart);
    }
}