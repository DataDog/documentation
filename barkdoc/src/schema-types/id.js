"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
class Id {
    validate(value) {
        if (typeof value === 'string' && value.match(/^[a-zA-Z]/))
            return [];
        return [
            {
                id: 'attribute-value-invalid',
                level: 'error',
                message: "The 'id' attribute must start with a letter",
            },
        ];
    }
}
exports.Id = Id;
