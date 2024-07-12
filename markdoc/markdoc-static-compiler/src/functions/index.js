"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conditional_1 = require("../tags/conditional");
const and = {
    transform(parameters) {
        const value = Object.values(parameters).every((p) => {
            if (typeof p === 'object') {
                return (0, conditional_1.truthy)(p.value);
            }
            else {
                return (0, conditional_1.truthy)(p);
            }
        });
        return {
            $$mdtype: 'Function',
            name: 'and',
            value,
            parameters,
        };
    },
};
const or = {
    transform(parameters) {
        const value = Object.values(parameters).find((p) => (0, conditional_1.truthy)(p.value)) !== undefined;
        return {
            $$mdtype: 'Function',
            name: 'or',
            value,
            parameters,
        };
    },
};
const not = {
    parameters: {
        0: { required: true },
    },
    transform(parameters) {
        const value = !(0, conditional_1.truthy)(parameters[0].value);
        return {
            $$mdtype: 'Function',
            name: 'not',
            value,
            parameters,
        };
    },
};
const equals = {
    transform(parameters) {
        const values = Object.values(parameters).map((p) => {
            if (typeof p === 'object') {
                return p.value;
            }
            else {
                return p;
            }
        });
        const value = values.every((v) => v === values[0]);
        return {
            $$mdtype: 'Function',
            name: 'equals',
            value,
            parameters,
        };
    },
};
const debug = {
    transform(parameters) {
        if (typeof parameters[0] === 'object') {
            return JSON.stringify(parameters[0].value, null, 2);
        }
        else {
            return JSON.stringify(parameters[0], null, 2);
        }
    },
};
const defaultFn = {
    transform(parameters) {
        let value;
        Object.values(parameters).forEach((p) => {
            if (value !== undefined)
                return;
            if (typeof p === 'object') {
                value = p.value;
            }
            else {
                value = p;
            }
        });
        return {
            $$mdtype: 'Function',
            name: 'default',
            value,
            parameters,
        };
    },
};
exports.default = { and, or, not, equals, default: defaultFn, debug };
