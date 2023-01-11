import UsersDao from "../dao/UsersDao.js";
import CartsDao from "../dao/CartsDao.js";
import ProductosDao from "../dao/productsDao.js";
import OrdersDao from "../dao/ordersDao.js";

import UserService from "./UserService.js";
import CartsService from "./CartsService.js";
import ProductsServices from "./productsService.js";
import OrdersServices from "./ordersServices.js";

export const usersService =  new UserService(new UsersDao());
export const cartsService = new CartsService(new CartsDao());
export const productsServices = new ProductsServices(new ProductosDao())
export const ordersServices = new OrdersServices(new OrdersDao())