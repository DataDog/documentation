"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAst = isAst;
exports.isFunction = isFunction;
exports.isVariable = isVariable;
exports.getAstValues = getAstValues;
exports.resolve = resolve;
function isAst(value) {
    return !!(value === null || value === void 0 ? void 0 : value.$$mdtype);
}
function isFunction(value) {
    return !!((value === null || value === void 0 ? void 0 : value.$$mdtype) === 'Function');
}
function isVariable(value) {
    return !!((value === null || value === void 0 ? void 0 : value.$$mdtype) === 'Variable');
}
function* getAstValues(value) {
    if (value == null || typeof value !== 'object')
        return;
    if (Array.isArray(value))
        for (const v of value)
            yield* getAstValues(v);
    if (isAst(value))
        yield value;
    if (Object.getPrototypeOf(value) !== Object.prototype)
        return;
    for (const v of Object.values(value))
        yield* getAstValues(v);
}
function resolve(value, config = {}) {
    if (value == null || typeof value !== 'object')
        return value;
    if (Array.isArray(value))
        return value.map((item) => resolve(item, config));
    if (isAst(value) && (value === null || value === void 0 ? void 0 : value.resolve) instanceof Function) {
        return value.resolve(config);
    }
    if (Object.getPrototypeOf(value) !== Object.prototype)
        return value;
    const output = {};
    for (const [k, v] of Object.entries(value))
        output[k] = resolve(v, config);
    return output;
}
