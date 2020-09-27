import {UserRole} from '../../enums/user-role.enums'

export interface UserRequestVM{
    name:string,
    phone:string,
    email:string,
    role:UserRole,
    password:string
} 