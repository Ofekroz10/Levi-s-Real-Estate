import {UserRequestVM} from '../interfaces/vm/user-request.vm'
import {ErrorResponse} from '../../error/interfaces/error.interface'
import {checkIfPropUnique, addUser} from '../service/userService'
import {UserResponseVM} from '../interfaces/vm/user-response.vm'
import axios = require('axios');


export const createUser = async (user:UserRequestVM) : Promise<UserResponseVM|ErrorResponse> => {
    try{
        if(!await checkIfPropUnique('phone',user.phone.toString()))
            throw {message:'phone already exists'};
        if(user.email !== null && user.email !== '') {
            if(!await checkIfPropUnique('email',user.phone.toString()))
                throw {message:'email already exists'};
        }

        const userDto = await addUser(user);
        const {password, ...other} = userDto;
        return other;

    }
    catch(e){
        return e;
    }
    
}