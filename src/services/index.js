import UsersDao from "../dao/UsersDao.js";
import CartsDao from "../dao/CartsDao.js";
import ProductosDao from "../dao/productsDao.js";

import UserService from "./UserService.js";
import CartsService from "./CartsService.js";
import ProductsServices from "./productsService.js";

export const usersService =  new UserService(new UsersDao());
export const cartsService = new CartsService(new CartsDao());
export const productsServices = new ProductsServices(new ProductosDao())