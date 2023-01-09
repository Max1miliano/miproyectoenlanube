import { assertUnionType } from "graphql";
import { productsServices } from "../../services/index.js";

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
   
    let result = await productsServices.updateProduct(idProduct, product)
    res.send({status:"success", payload:result})
}


export default {
    createProduct,
    deleteProduct,
    updateProduct
} 