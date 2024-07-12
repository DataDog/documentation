"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateType = validateType;
exports.default = validator;
exports.walkWithParents = walkWithParents;
exports.validateTree = validateTree;
const transformer_1 = require("./transformer");
const index_1 = __importDefault(require("./ast/index"));
const utils_1 = require("./utils");
const TypeMappings = {
    String: String,
    Number: Number,
    Array: Array,
    Object: Object,
    Boolean: Boolean,
};
function validateType(type, value, config, key) {
    var _a, _b;
    if (!type)
        return true;
    if (index_1.default.isFunction(value) && ((_a = config.validation) === null || _a === void 0 ? void 0 : _a.validateFunctions)) {
        const schema = (_b = config.functions) === null || _b === void 0 ? void 0 : _b[value.name];
        return !(schema === null || schema === void 0 ? void 0 : schema.returns)
            ? true
            : Array.isArray(schema.returns)
                ? schema.returns.find((t) => t === type) !== undefined
                : schema.returns === type;
    }
    if (index_1.default.isAst(value))
        return true;
    if (Array.isArray(type))
        return type.some((t) => validateType(t, value, config, key));
    if (typeof type === 'string')
        type = TypeMappings[type];
    if (typeof type === 'function') {
        const instance = new type();
        if (instance.validate) {
            return instance.validate(value, config, key);
        }
    }
    return value != null && value.constructor === type;
}
function typeToString(type) {
    if (typeof type === 'string')
        return type;
    if (Array.isArray(type))
        return type.map(typeToString).join(' | ');
    return type.name;
}
function validateFunction(fn, config) {
    var _a, _b, _c;
    const schema = (_a = config.functions) === null || _a === void 0 ? void 0 : _a[fn.name];
    const errors = [];
    if (!schema)
        return [
            {
                id: 'function-undefined',
                level: 'critical',
                message: `Undefined function: '${fn.name}'`,
            },
        ];
    if (schema.validate)
        errors.push(...schema.validate(fn, config));
    if (schema.parameters) {
        for (const [key, value] of Object.entries(fn.parameters)) {
            const param = (_b = schema.parameters) === null || _b === void 0 ? void 0 : _b[key];
            if (!param) {
                errors.push({
                    id: 'parameter-undefined',
                    level: 'error',
                    message: `Invalid parameter: '${key}'`,
                });
                continue;
            }
            if (index_1.default.isAst(value) && !index_1.default.isFunction(value))
                continue;
            if (param.type) {
                const valid = validateType(param.type, value, config, key);
                if (valid === false) {
                    errors.push({
                        id: 'parameter-type-invalid',
                        level: 'error',
                        message: `Parameter '${key}' of '${fn.name}' must be type of '${typeToString(param.type)}'`,
                    });
                }
                else if (Array.isArray(valid)) {
                    errors.push(...valid);
                }
            }
        }
    }
    for (const [key, { required }] of Object.entries((_c = schema.parameters) !== null && _c !== void 0 ? _c : {}))
        if (required && fn.parameters[key] === undefined)
            errors.push({
                id: 'parameter-missing-required',
                level: 'error',
                message: `Missing required parameter: '${key}'`,
            });
    return errors;
}
function displayMatches(matches, n) {
    if (matches.length <= n)
        return JSON.stringify(matches);
    const items = matches.slice(0, n).map((item) => JSON.stringify(item));
    return `[${items.join(',')}, ... ${matches.length - n} more]`;
}
function validator(node, config) {
    var _a, _b;
    const schema = node.findSchema(config);
    const errors = [...(node.errors || [])];
    if (!schema) {
        errors.push({
            id: node.tag ? 'tag-undefined' : 'node-undefined',
            level: 'critical',
            message: node.tag
                ? `Undefined tag: '${node.tag}'`
                : `Undefined node: '${node.type}'`,
        });
        return errors;
    }
    if (schema.inline != undefined && node.inline !== schema.inline)
        errors.push({
            id: 'tag-placement-invalid',
            level: 'critical',
            message: `'${node.tag}' tag should be ${schema.inline ? 'inline' : 'block'}`,
        });
    if (schema.selfClosing && node.children.length > 0)
        errors.push({
            id: 'tag-selfclosing-has-children',
            level: 'critical',
            message: `'${node.tag}' tag should be self-closing`,
        });
    const attributes = Object.assign(Object.assign({}, transformer_1.globalAttributes), schema.attributes);
    for (const key of Object.keys(node.slots)) {
        const slot = (_a = schema.slots) === null || _a === void 0 ? void 0 : _a[key];
        if (!slot)
            errors.push({
                id: 'slot-undefined',
                level: 'error',
                message: `Invalid slot: '${key}'`,
            });
    }
    for (let [key, value] of Object.entries(node.attributes)) {
        const attrib = attributes[key];
        if (!attrib) {
            errors.push({
                id: 'attribute-undefined',
                level: 'error',
                message: `Invalid attribute: '${key}'`,
            });
            continue;
        }
        let { type, matches, errorLevel } = attrib;
        if (index_1.default.isAst(value)) {
            if (index_1.default.isFunction(value) && ((_b = config.validation) === null || _b === void 0 ? void 0 : _b.validateFunctions))
                errors.push(...validateFunction(value, config));
            else if (index_1.default.isVariable(value) && config.variables) {
                let missing = false;
                let variables = config.variables;
                for (const key of value.path) {
                    if (!Object.prototype.hasOwnProperty.call(variables, key)) {
                        missing = true;
                        break;
                    }
                    variables = variables[key];
                }
                if (missing) {
                    errors.push({
                        id: 'variable-undefined',
                        level: 'error',
                        message: `Undefined variable: '${value.path.join('.')}'`,
                    });
                }
            }
            else
                continue;
        }
        value = value;
        if (type) {
            const valid = validateType(type, value, config, key);
            if (valid === false) {
                errors.push({
                    id: 'attribute-type-invalid',
                    level: errorLevel || 'error',
                    message: `Attribute '${key}' must be type of '${typeToString(type)}'`,
                });
            }
            if (Array.isArray(valid)) {
                errors.push(...valid);
            }
        }
        if (typeof matches === 'function')
            matches = matches(config);
        if (Array.isArray(matches) && !matches.includes(value))
            errors.push({
                id: 'attribute-value-invalid',
                level: errorLevel || 'error',
                message: `Attribute '${key}' must match one of ${displayMatches(matches, 8)}. Got '${value}' instead.`,
            });
        if (matches instanceof RegExp && !matches.test(value))
            errors.push({
                id: 'attribute-value-invalid',
                level: errorLevel || 'error',
                message: `Attribute '${key}' must match ${matches}. Got '${value}' instead.`,
            });
        if (typeof attrib.validate === 'function') {
            const attribErrors = attrib.validate(value, config, key);
            if (Array.isArray(attribErrors))
                errors.push(...attribErrors);
        }
    }
    for (const [key, { required }] of Object.entries(attributes))
        if (required && node.attributes[key] === undefined)
            errors.push({
                id: 'attribute-missing-required',
                level: 'error',
                message: `Missing required attribute: '${key}'`,
            });
    if (schema.slots)
        for (const [key, { required }] of Object.entries(schema.slots))
            if (required && node.slots[key] === undefined)
                errors.push({
                    id: 'slot-missing-required',
                    level: 'error',
                    message: `Missing required slot: '${key}'`,
                });
    for (const { type } of node.children) {
        if (schema.children && type !== 'error' && !schema.children.includes(type))
            errors.push({
                id: 'child-invalid',
                level: 'warning',
                message: `Can't nest '${type}' in '${node.tag || node.type}'`,
            });
    }
    if (schema.validate) {
        const schemaErrors = schema.validate(node, config);
        if ((0, utils_1.isPromise)(schemaErrors)) {
            return schemaErrors.then((e) => errors.concat(e));
        }
        errors.push(...schemaErrors);
    }
    return errors;
}
function* walkWithParents(node, parents = []) {
    yield [node, parents];
    for (const child of [...Object.values(node.slots), ...node.children])
        yield* walkWithParents(child, [...parents, node]);
}
function validateTree(content, config) {
    const output = [...walkWithParents(content)].map(([node, parents]) => {
        const { type, lines, location } = node;
        const updatedConfig = Object.assign(Object.assign({}, config), { validation: Object.assign(Object.assign({}, config.validation), { parents }) });
        const errors = validator(node, updatedConfig);
        if ((0, utils_1.isPromise)(errors)) {
            return errors.then((e) => e.map((error) => ({ type, lines, location, error })));
        }
        return errors.map((error) => ({ type, lines, location, error }));
    });
    if (output.some(utils_1.isPromise)) {
        return Promise.all(output).then((o) => o.flat());
    }
    return output.flat();
}
