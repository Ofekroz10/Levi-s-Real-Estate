import {UserRole} from '../../enums/user-role.enums'

export interface UserDto{
    name:string,
    phone:string,
    email:string,
    role:UserRole,
    password:string,
    id:string,
    [index: string]:any
}