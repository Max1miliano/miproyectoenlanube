
export default class ProductsServices {
    constructor(dao) {
        this.dao = dao
    }

    getProducts = async() => {
        let result = await this.dao.getAll()
        return result.map(product => product.toObject())
    }

    getProductsById = async(id) => {
        let result = await this.dao.getById(id)
        return result.toObject()
    }

    createProducts = product => {
        return this.dao.save(product)
    }

    updateProduct = (id, product) => {
        return this.dao.update(id, product)
    }
}