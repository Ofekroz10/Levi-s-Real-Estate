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
exports.authRoleMidddleWare = exports.authMiddleWare = exports.saveUserInDB = exports.transformDtoToResponseVM = exports.generateAuthToken = exports.getUserByPhonePassword = exports.addUser = exports.checkIfPropUnique = void 0;
const firebase_1 = require("../../firebase/firebase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
exports.checkIfPropUnique = (prop, value) => __awaiter(void 0, void 0, void 0, function* () {
    const ref = firebase_1.firebase.ref('Users');
    const results = yield ref.orderByChild(prop).equalTo(value).once('value');
    const resultsJSON = results.toJSON();
    return resultsJSON === undefined || resultsJSON === null;
});
exports.addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield hashPassword(user.password);
    const ref = firebase_1.firebase.ref('Users');
    const userInDB = yield ref.push(user);
    const results = yield userInDB.once('value');
    const userDto = results.toJSON();
    //@ts-ignore
    return Object.assign({ id: Object.keys(userDto)[0] }, userDto[Object.keys(userDto)[0]]);
});
exports.getUserByPhonePassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const ref = firebase_1.firebase.ref('Users');
    const results = yield ref.orderByChild('phone').equalTo(user.phone).once('value');
    const resultsJSON = results.toJSON();
    if (resultsJSON === null || resultsJSON === undefined)
        return null;
    //@ts-ignore
    const resultWithId = Object.assign({ id: Object.keys(resultsJSON)[0] }, resultsJSON[Object.keys(resultsJSON)[0]]);
    if (yield checkPassword(user.password, resultWithId.password)) {
        console.log(resultWithId);
        return resultWithId;
    }
    return null;
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.hash(password, 8);
});
const checkPassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(password, hash);
});
exports.generateAuthToken = (id) => {
    dotenv.config();
    const secret = (`${process.env.SECRET}`);
    const token = jwt.sign({ id: id }, secret);
    return token;
};
exports.transformDtoToResponseVM = (user) => {
    const { password } = user, other = __rest(user, ["password"]);
    return other;
};
exports.saveUserInDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const ref = firebase_1.firebase.ref('Users');
    const results = yield ref.child(user.id).once('value');
    const resultsJSON = results.toJSON();
    Object.keys(user).forEach(x => {
        user[x] !== resultsJSON[x] ? resultsJSON[x] = user[x] : null;
    });
    return yield ref.child(user.id).update(resultsJSON);
});
//need to checkg
exports.authMiddleWare = (token) => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    const secret = (`${process.env.SECRET}`);
    const { id } = jwt.verify(token, secret);
    const ref = firebase_1.firebase.ref('Users');
    const results = yield ref.child(id).once('value');
    const resultsJSON = results.toJSON();
    if (resultsJSON === null || resultsJSON === undefined)
        throw { message: 'please authenticate' };
    else {
        //@ts-ignore
        const resultWithId = Object.assign({ id: id }, resultsJSON);
        return resultWithId;
    }
});
exports.authRoleMidddleWare = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = yield exports.authMiddleWare(token);
    return role;
});
