import {firebase} from '../../firebase/firebase'
import { UserRole } from '../enums/user-role.enums';
import { UserRequestVM } from '../interfaces/vm/user-request.vm';
import { UserDto} from '../interfaces/dto/user.dto';
import bcrypt = require('bcryptjs')

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
    return results.toJSON() as UserDto;
}

const hashPassword = async (password:string): Promise<string> =>{
    return await bcrypt.hash(password, 8);
}

const checkPassword = async (password:string,hash:string):Promise<boolean>=>{
    return await bcrypt.compare(password,hash);
}