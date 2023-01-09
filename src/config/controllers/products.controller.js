import { assertAbstractType, assertUnionType } from "graphql";
import { productsServices } from "../../services/index.js";
import __dirname from "../../utils.js";

const createProduct = async(req,res)=>{

    if(!req.file) return res.status(500).send({status:"error",error:'Error al cargar imagen'});
    const {title,price,description,stock, category} = req.body;
    if(!title||!price||!description||!stock) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const product = {
        title,
        price,
        description,
        stock,
        image: `${req.protocol}://${req.hostname}:8080/img/${req.file.filename}`,
        category
    }
    let result = await productsServices.createProducts(product)
    res.send({status:"success",payload:result})
}

const deleteProduct = async(req, res) => {
    const idProduct = req.body;
    if(!idProduct) return res.status(400).send({status: "error", message: "Debes colocar el id del producto"})
    let result = await productsServices.deleteProductById(idProduct)
}

const updateProduct = async(req, res) => {
    // if(!req.file) return res.status(500).send({status:"error",error:'Error al cargar imagen'});
   const { idProduct, title, price, description, category, stock } = req.body
    const productBase = await productsServices.getProductsById(idProduct)
    console.log(productBase);
    
    const product = {
        idProduct,
        title: title == '' ? productBase[0].title : title,
        price: price == '' || price == null ? productBase[0].price : price,
        description: description == '' ? productBase[0].description : description,
        category : category == '' ? productBase[0].category : category,
        stock: stock == '' || stock == null ? productBase[0].stock : stock,
        image: req.file?.filename == '' || req.file?.filename == undefined ? productBase[0].image : `${req.protocol}://${req.hostname}:8080/img/${req.file?.filename}`
    }
    console.log(product);
    let result = await productsServices.updateProduct(idProduct, product)
    res.send({status:"success", payload:result})
}


export default {
    createProduct,
    deleteProduct,
    updateProduct
} 