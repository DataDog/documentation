"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variable {
    constructor(path = []) {
        this.$$mdtype = 'Variable';
        this.path = path;
    }
    /* NEW */
    resolve({ variables } = {}) {
        if (variables instanceof Function) {
            return variables(this.path);
        }
        const value = this.path.reduce((obj = {}, key) => obj[key], variables);
        return {
            $$mdtype: 'Variable',
            path: this.path,
            value,
        };
    }
}
exports.default = Variable;
