"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../../src/grammar/tag");
const variable_1 = __importDefault(require("../../src/ast/variable"));
describe('Markdoc tag parser', function () {
    describe('tag parsing', function () {
        it('with a simple opening tag', function () {
            const example = (0, tag_1.parse)('foo');
            expect(example).toDeepEqual({
                type: 'tag_open',
                nesting: 1,
                meta: { tag: 'foo', attributes: null },
            });
        });
        it('with an opening tag that has attributes', function () {
            const example = (0, tag_1.parse)('foo foo=1 bar=true');
            expect(example).toDeepEqual({
                type: 'tag_open',
                nesting: 1,
                meta: {
                    tag: 'foo',
                    attributes: [
                        { type: 'attribute', name: 'foo', value: 1 },
                        { type: 'attribute', name: 'bar', value: true },
                    ],
                },
            });
        });
        it('with a self-closing tag', function () {
            const example = (0, tag_1.parse)('foo /');
            expect(example).toDeepEqual({
                type: 'tag',
                nesting: 0,
                meta: { tag: 'foo', attributes: null },
            });
        });
        it('with a self-closing tag that has attributes', function () {
            const example = (0, tag_1.parse)('foo foo=1 bar=true /');
            expect(example).toDeepEqual({
                type: 'tag',
                nesting: 0,
                meta: {
                    tag: 'foo',
                    attributes: [
                        { type: 'attribute', name: 'foo', value: 1 },
                        { type: 'attribute', name: 'bar', value: true },
                    ],
                },
            });
        });
        it('with a closing tag', function () {
            const example = (0, tag_1.parse)('/foo');
            expect(example).toDeepEqual({
                type: 'tag_close',
                nesting: -1,
                meta: { tag: 'foo' },
            });
        });
        it('with an invalid closing tag', function () {
            expect(() => (0, tag_1.parse)('/foo/')).toThrowError(SyntaxError);
        });
        it('with an invalid closing tag that has attributes', function () {
            expect(() => (0, tag_1.parse)('/foo test=1')).toThrowError(SyntaxError);
        });
    });
    describe('variable parsing', function () {
        it('with a simple variable', function () {
            const example = (0, tag_1.parse)('$foo', { Variable: variable_1.default });
            expect(example).toDeepEqual({
                type: 'variable',
                meta: { variable: new variable_1.default(['foo'], null) },
            });
        });
        it('with multiple levels of depth', function () {
            const example = (0, tag_1.parse)('$foo.bar.baz', { Variable: variable_1.default });
            expect(example).toDeepEqual({
                type: 'variable',
                meta: { variable: new variable_1.default(['foo', 'bar', 'baz'], null) },
            });
        });
        it('with an array index', function () {
            const example = (0, tag_1.parse)('$foo[1]', { Variable: variable_1.default });
            expect(example).toDeepEqual({
                type: 'variable',
                meta: { variable: new variable_1.default(['foo', 1], null) },
            });
        });
        it('with multiple array indexes', function () {
            const example = (0, tag_1.parse)('$foo[1][2]', { Variable: variable_1.default });
            expect(example).toDeepEqual({
                type: 'variable',
                meta: { variable: new variable_1.default(['foo', 1, 2], null) },
            });
        });
        it('with array indexes and properties', function () {
            const example = (0, tag_1.parse)('$foo[1].bar.baz[2].test', { Variable: variable_1.default });
            expect(example).toDeepEqual({
                type: 'variable',
                meta: {
                    variable: new variable_1.default(['foo', 1, 'bar', 'baz', 2, 'test'], null),
                },
            });
        });
        it('with an invalid array index', function () {
            expect(() => (0, tag_1.parse)('$foo[asdf]', { Variable: variable_1.default })).toThrowError(SyntaxError);
        });
        it('with an invalid namespace', function () {
            expect(() => (0, tag_1.parse)('$.foo:bar.baz', { Variable: variable_1.default })).toThrowError(SyntaxError);
        });
    });
    describe('parsing attributes', function () {
        it('parsing annotation with a single attribute', function () {
            const example = (0, tag_1.parse)('test=1');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'test', value: 1 },
            ]);
        });
        it('with an id', function () {
            const example = (0, tag_1.parse)('#test');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'id', value: 'test' },
            ]);
        });
        it('with hyphens', function () {
            const example = (0, tag_1.parse)('#test-1 .foo-bar');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'id', value: 'test-1' },
                { type: 'class', name: 'foo-bar', value: true },
            ]);
        });
        it('with chained classes', function () {
            const example = (0, tag_1.parse)('.foo .bar');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'class', name: 'foo', value: true },
                { type: 'class', name: 'bar', value: true },
            ]);
        });
        it('with chained id and classes', function () {
            const example = (0, tag_1.parse)('#test-1 .foo .bar');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'id', value: 'test-1' },
                { type: 'class', name: 'foo', value: true },
                { type: 'class', name: 'bar', value: true },
            ]);
        });
        it('with an invalid id', () => {
            expect(() => (0, tag_1.parse)('#foo@bar.baz@test')).toThrowError(SyntaxError);
        });
        it('with key/value pairs', function () {
            const example = (0, tag_1.parse)('foo="bar" baz=3 test=true');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'foo', value: 'bar' },
                { type: 'attribute', name: 'baz', value: 3 },
                { type: 'attribute', name: 'test', value: true },
            ]);
        });
        it('with shortcuts and key/value pairs', function () {
            const example = (0, tag_1.parse)('#foo .bar test="asdf"', { Variable: variable_1.default });
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'id', value: 'foo' },
                { type: 'class', name: 'bar', value: true },
                { type: 'attribute', name: 'test', value: 'asdf' },
            ]);
        });
        it('with boolean key/value pairs', function () {
            const example = (0, tag_1.parse)('test=true foo=false bar=true');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'test', value: true },
                { type: 'attribute', name: 'foo', value: false },
                { type: 'attribute', name: 'bar', value: true },
            ]);
        });
        it('with null key/value pair', function () {
            const example = (0, tag_1.parse)('foo=null');
            expect(example.meta.attributes).toDeepEqual([
                { type: 'attribute', name: 'foo', value: null },
            ]);
        });
        describe('with variables as values', function () {
            it('with a simple variable', function () {
                const example = (0, tag_1.parse)('test=$foo', { Variable: variable_1.default });
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'test',
                        value: new variable_1.default(['foo'], null),
                    },
                ]);
            });
            it('with multiple levels of depth', function () {
                const example = (0, tag_1.parse)('test=$foo.bar.baz', { Variable: variable_1.default });
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'test',
                        value: new variable_1.default(['foo', 'bar', 'baz'], null),
                    },
                ]);
            });
            it('with an array index', function () {
                const example = (0, tag_1.parse)('test=$foo[1]', { Variable: variable_1.default });
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'test',
                        value: new variable_1.default(['foo', 1], null),
                    },
                ]);
            });
            it('with multiple array indexes', function () {
                const example = (0, tag_1.parse)('test=$foo[1][2]', { Variable: variable_1.default });
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'test',
                        value: new variable_1.default(['foo', 1, 2], null),
                    },
                ]);
            });
            it('with array indexes and properties', function () {
                const example = (0, tag_1.parse)('test=$foo[1].bar.baz[2].test', { Variable: variable_1.default });
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'test',
                        value: new variable_1.default(['foo', 1, 'bar', 'baz', 2, 'test'], null),
                    },
                ]);
            });
            it('with an invalid array index', function () {
                expect(() => (0, tag_1.parse)('test=$foo[asdf]', { Variable: variable_1.default })).toThrowError(SyntaxError);
            });
        });
        describe('with complex values', function () {
            it('with a simple hash literal value', function () {
                const example = (0, tag_1.parse)('foo={bar: true}');
                expect(example.meta.attributes).toDeepEqual([
                    { type: 'attribute', name: 'foo', value: { bar: true } },
                ]);
            });
            it('with a nested hash literal value', function () {
                const example1 = (0, tag_1.parse)('foo={bar: true, baz: {test: "this is a test"}}');
                const example2 = (0, tag_1.parse)('foo={bar:true,baz:{test:"this is a test"}}');
                const expected = [
                    {
                        type: 'attribute',
                        name: 'foo',
                        value: {
                            bar: true,
                            baz: { test: 'this is a test' },
                        },
                    },
                ];
                expect(example1.meta.attributes).toDeepEqual(expected);
                expect(example2.meta.attributes).toDeepEqual(expected);
            });
            it('with a hash literal that has string keys', function () {
                const example = (0, tag_1.parse)('foo={bar: true, "baz": 1}');
                expect(example.meta.attributes).toDeepEqual([
                    { type: 'attribute', name: 'foo', value: { bar: true, baz: 1 } },
                ]);
            });
            it('with multiple hash literal values', function () {
                const example = (0, tag_1.parse)('foo={bar: true} baz={test: "testing"}');
                expect(example.meta.attributes).toDeepEqual([
                    { type: 'attribute', name: 'foo', value: { bar: true } },
                    { type: 'attribute', name: 'baz', value: { test: 'testing' } },
                ]);
            });
            it('with an array literal value', function () {
                const example1 = (0, tag_1.parse)('foo=[1, 2, 3]');
                const example2 = (0, tag_1.parse)('foo=[1,2,3]');
                const expected = [{ type: 'attribute', name: 'foo', value: [1, 2, 3] }];
                expect(example1.meta.attributes).toDeepEqual(expected);
                expect(example2.meta.attributes).toDeepEqual(expected);
            });
            it('with nested array literal values', function () {
                const example1 = (0, tag_1.parse)('foo=[1, 2, ["test", true, null]]');
                const example2 = (0, tag_1.parse)('foo=[1,2,["test",true,null]]');
                const expected = [
                    {
                        type: 'attribute',
                        name: 'foo',
                        value: [1, 2, ['test', true, null]],
                    },
                ];
                expect(example1.meta.attributes).toDeepEqual(expected);
                expect(example2.meta.attributes).toDeepEqual(expected);
            });
            it('with multiple nested array literal values', function () {
                const example = (0, tag_1.parse)('foo=[1, 2, ["test", true, null]] bar=["baz"]');
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'foo',
                        value: [1, 2, ['test', true, null]],
                    },
                    { type: 'attribute', name: 'bar', value: ['baz'] },
                ]);
            });
            it('with array and object literals', function () {
                const example = (0, tag_1.parse)('foo=[1, 2, {bar: "baz", test: [1, 2, 3]}]');
                expect(example.meta.attributes).toDeepEqual([
                    {
                        type: 'attribute',
                        name: 'foo',
                        value: [1, 2, { bar: 'baz', test: [1, 2, 3] }],
                    },
                ]);
            });
        });
        it('with an invalid value', function () {
            const examples = ['foo=bar', 'foo=a1', 'foo=1a'];
            for (const example of examples)
                expect(() => (0, tag_1.parse)(example)).toThrowError(SyntaxError);
        });
    });
});
