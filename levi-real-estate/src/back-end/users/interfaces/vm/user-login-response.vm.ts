import { UserResponseVM } from "./user-response.vm";

export interface UserLoginResponseVM extends UserResponseVM{
    token:string;
} 