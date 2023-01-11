
export default class OrdersService {
    constructor(dao){
        this.dao = dao;
    }

    totalOrders = () => {
        return this.dao.getAll()
    }

    create = order =>{
        return this.dao.createOrder(order);
    }
}