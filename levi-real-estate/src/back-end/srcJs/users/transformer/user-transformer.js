"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUser = void 0;
exports.toUser = (user, userDto) => {
    Object.keys(userDto).forEach(x => {
        user[x] ? userDto[x] = user[x] : null;
    });
    return userDto;
};
