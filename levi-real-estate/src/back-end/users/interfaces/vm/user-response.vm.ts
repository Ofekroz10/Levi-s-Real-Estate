import {UserRole} from '../../enums/user-role.enums'

export interface UserResponseVM{
    name:string,
    phone:string,
    email:string,
    role:UserRole,
} 