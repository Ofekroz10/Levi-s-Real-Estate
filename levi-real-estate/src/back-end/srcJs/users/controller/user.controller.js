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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
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
        return userService_1.transformDtoToResponseVM(userDto);
    }
    catch (e) {
        return e;
    }
});
exports.loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDto = yield userService_1.getUserByPhonePassword(user);
        if (userDto === null || userDto === undefined)
            throw { message: 'Inputs are invalid' };
        const token = userService_1.generateAuthToken(userDto.id);
        const userToRes = userService_1.transformDtoToResponseVM(userDto);
        return Object.assign(Object.assign({}, userToRes), { token });
    }
    catch (e) {
        return e;
    }
});
