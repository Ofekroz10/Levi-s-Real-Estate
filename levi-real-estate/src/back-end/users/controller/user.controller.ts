import {UserRequestVM} from '../interfaces/vm/user-request.vm'
import {ErrorResponse} from '../../error/interfaces/error.interface'
import {checkIfPropUnique, addUser, getUserByPhonePassword, generateAuthToken,transformDtoToResponseVM, authMiddleWare, saveUserInDB} from '../service/userService'
import {UserResponseVM} from '../interfaces/vm/user-response.vm'
import {UserLoginRequestVM} from '../interfaces/vm/user-login-request.vm'
import {UserLoginResponseVM} from '../interfaces/vm/user-login-response.vm'
import {IUserUpdateProfile} from '../interfaces/vm/user-update-profile.vm'
import {toUser} from '../transformer/user-transformer'
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
        return transformDtoToResponseVM(userDto);
    }
    catch(e){
        return e;
    }
    
}

export const loginUser = async (user:UserLoginRequestVM):Promise<UserLoginResponseVM|ErrorResponse> =>{
    try{
        const userDto = await getUserByPhonePassword(user);
        if(userDto === null || userDto === undefined)
            throw {message:'Inputs are invalid'};
        const token = generateAuthToken(userDto.id);
        const userToRes = transformDtoToResponseVM(userDto);
        return {...userToRes,token};
    }
    catch(e){
        return e;
    }
}

export const updateUser = async (token:string, user:IUserUpdateProfile):Promise<UserResponseVM>=>{
    const userDto = await authMiddleWare(token);
    const toUserDto = toUser(user,userDto);
    await saveUserInDB(toUserDto);
    return transformDtoToResponseVM(toUserDto); // if wants to return only the changes write 'return updateUser'
}

loginUser({phone:'43', password:'0544'}).then((x:UserLoginResponseVM|ErrorResponse)=>{
    const user = x as UserLoginResponseVM;
    updateUser(user.token,{name:'ofek', phone:'56'}).then(x=>{
        console.log(x);
    })
})
