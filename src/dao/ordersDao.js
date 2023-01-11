import ordersModel from "./models/orders.dao.js";

export default class OrdersDao {

    getAll = () => {
        return ordersModel.find()
    }

    createOrder = order => {
        return ordersModel.create(order)
    }

}