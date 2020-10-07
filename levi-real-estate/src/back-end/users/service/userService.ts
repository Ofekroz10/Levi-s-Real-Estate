import {firebase} from '../../firebase/firebase'
import { UserRole } from '../enums/user-role.enums';
import { UserRequestVM } from '../interfaces/vm/user-request.vm';
import { UserDto} from '../interfaces/dto/user.dto';
import bcrypt = require('bcryptjs')
import { UserLoginRequestVM } from '../interfaces/vm/user-login-request.vm';
import jwt = require('jsonwebtoken')
import { UserResponseVM } from '../interfaces/vm/user-response.vm';
const dotenv = require('dotenv');



export const checkIfPropUnique = async (prop:string, value:string):Promise<boolean>=>{
    const ref = firebase.ref('Users');
    const results = await ref.orderByChild(prop).equalTo(value).once('value');
    const resultsJSON = results.toJSON();
    return resultsJSON === undefined || resultsJSON === null;
}

export const addUser = async(user:UserRequestVM):Promise<UserDto>=>{
    user.password = await hashPassword(user.password);
    const ref = firebase.ref('Users');
    const userInDB = await ref.push(user);
    const results=  await userInDB.once('value');
    const userDto=  results.toJSON();
    //@ts-ignore
    return {id:Object.keys(userDto)[0],...userDto[Object.keys(userDto)[0]]};
}

export const getUserByPhonePassword = async (user:UserLoginRequestVM):Promise<UserDto|null>=>{
    const ref = firebase.ref('Users');
    const results = await ref.orderByChild('phone').equalTo(user.phone).once('value');
    const resultsJSON = results.toJSON();
    if(resultsJSON === null || resultsJSON === undefined)
        return null;
    //@ts-ignore
    const resultWithId = {id:Object.keys(resultsJSON)[0],...resultsJSON[Object.keys(resultsJSON)[0]]};
    if(await checkPassword(user.password,resultWithId.password))
    {
        console.log(resultWithId);
        return resultWithId;
    }
    return null;
}


const hashPassword = async (password:string): Promise<string> =>{
    return await bcrypt.hash(password, 8);
}

const checkPassword = async (password:string,hash:string):Promise<boolean>=>{
    return await bcrypt.compare(password,hash);
}

export const generateAuthToken = (id:string):string =>{
    dotenv.config();
    const secret = (`${process.env.SECRET}`);
    const token = jwt.sign({id:id},secret);
    return token;

}

export const transformDtoToResponseVM = (user:UserDto):UserResponseVM=>{
    const {password, ...other} = user;
    return other;
}

export const saveUserInDB = async(user:UserDto)=>{
    const ref = firebase.ref('Users');
    const results = await ref.child(user.id).once('value');
    const resultsJSON = results.toJSON() as UserDto;

    Object.keys(user).forEach(x=>{
        user[x] !== resultsJSON[x] ? resultsJSON[x] = user[x] : null; 
    })

    return await ref.child(user.id).update(resultsJSON);
}

//need to checkg
export const authMiddleWare =async (token:string):Promise<UserDto>=>{
    dotenv.config();
    const secret = (`${process.env.SECRET}`);
    const {id} = jwt.verify(token, secret) as {id:string};
    const ref = firebase.ref('Users');
    const results = await ref.child(id).once('value');
    const resultsJSON = results.toJSON() as UserDto;
    if(resultsJSON === null || resultsJSON === undefined)
        throw {message:'please authenticate'};
    else{
        //@ts-ignore
        const resultWithId = {id:id,...resultsJSON};
        return resultWithId;
    }
}

export const authRoleMidddleWare = async (token:string):Promise<UserRole>=>{
    const {role} = await authMiddleWare(token);
    return role;
}