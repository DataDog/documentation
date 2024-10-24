"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Function {
    constructor(name, parameters) {
        this.$$mdtype = 'Function';
        this.name = name;
        this.parameters = parameters;
    }
    resolve(config = {}) {
        var _a, _b;
        const fn = (_a = config === null || config === void 0 ? void 0 : config.functions) === null || _a === void 0 ? void 0 : _a[this.name];
        if (!fn)
            return null;
        const parameters = (0, base_1.resolve)(this.parameters, config);
        return (_b = fn.transform) === null || _b === void 0 ? void 0 : _b.call(fn, parameters, config);
    }
}
exports.default = Function;
