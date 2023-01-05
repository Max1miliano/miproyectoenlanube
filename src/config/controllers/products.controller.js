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

export default {
    createProduct
} 