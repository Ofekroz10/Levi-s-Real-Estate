"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.secret = (`${process.env.SECRET}`);
