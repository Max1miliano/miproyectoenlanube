import UsersDao from "../dao/UsersDao.js";
import CartsDao from "../dao/CartsDao.js";


import UserService from "./UserService.js";
import CartsService from "./CartsService.js";

export const usersService =  new UserService(new UsersDao());
export const cartsService = new CartsService(new CartsDao());