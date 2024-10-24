"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = __importDefault(require("./html"));
const react_1 = __importDefault(require("./react/react"));
const static_1 = __importDefault(require("./react/static"));
const incremental_1 = __importDefault(require("./incremental"));
exports.default = { html: html_1.default, react: react_1.default, reactStatic: static_1.default, incremental: incremental_1.default };
