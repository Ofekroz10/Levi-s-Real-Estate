"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const userService_1 = require("../service/userService");
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield userService_1.checkIfPropUnique('phone', user.phone.toString())))
            throw { message: 'phone already exists' };
        if (user.email !== null && user.email !== '') {
            if (!(yield userService_1.checkIfPropUnique('email', user.phone.toString())))
                throw { message: 'email already exists' };
        }
        const userDto = yield userService_1.addUser(user);
        const { password } = userDto, other = __rest(userDto, ["password"]);
        return other;
    }
    catch (e) {
        return e;
    }
});
/*export const loginUser = async (user:UserLoginRequestVM):Promise<UserLoginResponseVM|ErrorResponse> =>{
    try{
        const userDto = await getUserByPhonePassword(user);
        if(userDto === null || userDto === undefined)
            throw {message:'Inputs are invalid'};
        
        
    }
    catch(e){

    }
}*/ 
