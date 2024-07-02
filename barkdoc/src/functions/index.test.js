"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const ast_1 = __importDefault(require("../ast"));
describe('built-in functions', function () {
    describe('equals function', function () {
        it('true match with variable', function () {
            const example = new ast_1.default.Function('equals', {
                0: new ast_1.default.Variable(['foo']),
                1: 'bar',
            });
            const output = example.resolve({
                functions: index_1.default,
                variables: { foo: 'bar' },
            });
            expect(output).toBeTrue();
        });
        it('false match with variable', function () {
            const example = new ast_1.default.Function('equals', {
                0: new ast_1.default.Variable(['foo']),
                1: 'bar',
            });
            const output = example.resolve({
                functions: index_1.default,
                variables: { foo: 'baz' },
            });
            expect(output).toBeFalse();
        });
    });
});
