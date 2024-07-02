"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = __importDefault(require("./variable"));
describe('variable', function () {
    const config = {
        variables: {
            foo: {
                bar: 'example',
                baz: [1, { qux: 'value' }, 2],
            },
        },
    };
    it('basic resolution', function () {
        const example = new variable_1.default(['foo', 'bar']);
        const output = example.resolve(config);
        expect(output).toEqual('example');
    });
    it('resolution with a number in the path', function () {
        const example = new variable_1.default(['foo', 'baz', 1, 'qux']);
        const output = example.resolve(config);
        expect(output).toEqual('value');
    });
    it('resolution with a function', function () {
        function variables(path) {
            expect(path).toDeepEqual(['foo', 'bar']);
            return 'example';
        }
        const example = new variable_1.default(['foo', 'bar']);
        const output = example.resolve({ variables });
        expect(output).toEqual('example');
    });
});
