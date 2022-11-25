import usersModel from "./models/users.js";

export default class UsersDao {

    getAll = () =>{
        return usersModel.find();
    }

    getById = (id) =>{
        return usersModel.findOne({_id:id});
    }
    
    getByEmail = (email) =>{
        return usersModel.findOne({email})
    }

    save = (user) =>{
        return usersModel.create(user);
    }

    update = (email, user) => {
        return usersModel.findByIdAndUpdate(email, {role: user.role})
    }

    delete = (email) => {
        return usersModel.deleteOne({ _email:email })
    }
}