import {UserRole} from '../enums/user-role.enums'
import { UserDto } from '../interfaces/dto/user.dto'
import {IUserUpdateProfile} from '../interfaces/vm/user-update-profile.vm'
import {authMiddleWare} from '../service/userService'

export const toUser = (user:IUserUpdateProfile,userDto:UserDto):UserDto=>{
    Object.keys(userDto).forEach(x=>{
        user[x] ? userDto[x] = user[x] : null;
    })

    return userDto;
}