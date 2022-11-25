export default class UserService {
    
    constructor(dao) {
        this.dao = dao;
    }

    getUsers = () =>{
        return this.dao.getAll();
    }
    getUserById = (id) =>{
        return this.dao.getById(id);
    }
    
    getUserByEmail = (email) =>{
        return this.dao.getByEmail(email)
    }
    saveUser = (user) =>{
        return this.dao.save(user);
    }

    updateUser = (email, user) => {
        return this.dao.update(email, user)
    }
    
    deleteUserByEmail = (email) =>{
        return this.dao.delete(email);
    }
}