"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
class Class {
    validate(value, _config, key) {
        if (typeof value === 'string' || typeof value === 'object')
            return [];
        return [
            {
                id: 'attribute-type-invalid',
                level: 'error',
                message: `Attribute '${key}' must be type 'string | object'`,
            },
        ];
    }
    transform(value) {
        if (!value || typeof value === 'string')
            return value;
        const classes = [];
        for (const [k, v] of Object.entries(value !== null && value !== void 0 ? value : {}))
            if (v)
                classes.push(k);
        return classes.join(' ');
    }
}
exports.Class = Class;
