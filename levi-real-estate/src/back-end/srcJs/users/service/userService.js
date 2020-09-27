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
exports.addUser = exports.checkIfPropUnique = void 0;
const firebase_1 = require("../../firebase/firebase");
const bcrypt = require("bcryptjs");
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
    return results.toJSON();
});
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.hash(password, 8);
});
const checkPassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(password, hash);
});
