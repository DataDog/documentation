"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("./react"));
const static_1 = __importDefault(require("./static"));
const tag_1 = __importDefault(require("../../tag"));
const React = {
    Fragment: 'fragment',
    createElement(name, attributes, ...children) {
        return { name, attributes, children };
    },
};
describe('React dynamic renderer', function () {
    it('rendering a null node', function () {
        const example = { name: 'h1', children: ['test', null] };
        const output = (0, react_1.default)(example, React);
        expect(output).toDeepEqual({
            name: 'h1',
            attributes: null,
            children: ['test', null],
        });
    });
    it('rendering a tag', function () {
        const example = { name: 'h1', children: ['test'] };
        const output = (0, react_1.default)(example, React);
        expect(output).toDeepEqualSubset(example);
    });
    it('rendering string and number child nodes', function () {
        const example = { name: 'h1', children: ['test ', 1] };
        const output = (0, react_1.default)(example, React);
        expect(output).toDeepEqualSubset(example);
    });
    it('rendering nested tags', function () {
        const example = {
            name: 'div',
            children: [{ name: 'p', children: ['test'] }],
        };
        const output = (0, react_1.default)(example, React);
        expect(output).toDeepEqualSubset(example);
    });
    it('rendering parallel tags', function () {
        const children = [
            { name: 'p', children: ['foo'] },
            { name: 'p', children: ['bar'] },
        ];
        const output = (0, react_1.default)(children, React);
        expect(output).toDeepEqualSubset({ name: 'fragment', children });
    });
    it('rendering an external component', function () {
        const components = { Foo: 'bar' };
        const example = new tag_1.default('Foo', undefined, ['test']);
        const output = (0, react_1.default)(example, React, { components });
        expect(output).toDeepEqualSubset({
            name: 'bar',
            children: ['test'],
        });
    });
    describe('attributes', function () {
        it('with an id attribute', function () {
            const example = {
                name: 'h1',
                attributes: { id: 'foo' },
                children: ['test'],
            };
            const output = (0, react_1.default)(example, React);
            expect(output).toDeepEqualSubset(example);
        });
        it('with a class attribute', function () {
            const example = new tag_1.default('h1', { class: 'foo bar' }, ['test']);
            const output = (0, react_1.default)(example, React);
            expect(output).toDeepEqualSubset({
                name: 'h1',
                attributes: { className: 'foo bar' },
                children: ['test'],
            });
        });
        it('with a number attribute value', function () {
            const example = {
                name: 'h1',
                attributes: { 'data-foo': 42 },
                children: ['test'],
            };
            const output = (0, react_1.default)(example, React);
            expect(output).toDeepEqualSubset(example);
        });
    });
    describe('rendering built-in nodes', function () {
        it('rendering a fenced code block', function () {
            const example = new tag_1.default('pre', { class: 'code code-ruby' }, ['test']);
            const output = (0, react_1.default)(example, React);
            expect(output).toDeepEqual({
                name: 'pre',
                attributes: { className: 'code code-ruby' },
                children: ['test'],
            });
        });
    });
});
describe('React static renderer', function () {
    it('rendering a null node', function () {
        const example = { name: 'h1', children: ['test', null] };
        const code = (0, static_1.default)(example);
        const output = eval(code)();
        expect(output).toDeepEqual(Object.assign(Object.assign({}, example), { attributes: null }));
    });
    it('rendering a tag', function () {
        const example = { name: 'h1', children: ['test'] };
        const code = (0, static_1.default)(example);
        const output = eval(code)();
        expect(output).toDeepEqualSubset(example);
    });
    it('rendering nested tags', function () {
        const example = {
            name: 'div',
            children: [{ name: 'p', children: ['test'] }],
        };
        const code = (0, static_1.default)(example);
        const output = eval(code)();
        expect(output).toDeepEqualSubset(example);
    });
    it('rendering a fragment', function () {
        const example = [
            { name: 'p', children: ['foo'] },
            { name: 'p', children: ['bar'] },
        ];
        const code = (0, static_1.default)(example);
        const output = eval(code)();
        expect(output).toDeepEqual({
            name: 'fragment',
            attributes: null,
            children: [
                { name: 'p', attributes: null, children: ['foo'] },
                { name: 'p', attributes: null, children: ['bar'] },
            ],
        });
    });
    it('rendering an external component', function () {
        const components = { Foo: 'bar' };
        const example = new tag_1.default('Foo', undefined, ['test']);
        const code = (0, static_1.default)(example);
        const output = eval(code)({ components });
        expect(output).toDeepEqualSubset({
            name: 'bar',
            children: ['test'],
        });
    });
    describe('attributes', function () {
        it('with an id attribute', function () {
            const example = {
                name: 'h1',
                attributes: { id: 'foo' },
                children: ['test'],
            };
            const code = (0, static_1.default)(example);
            const output = eval(code)();
            expect(output).toDeepEqualSubset(example);
        });
        it('with a number attribute value', function () {
            const example = {
                name: 'h1',
                attributes: { 'data-foo': 42 },
                children: ['test'],
            };
            const code = (0, static_1.default)(example);
            const output = eval(code)();
            expect(output).toDeepEqualSubset(example);
        });
    });
});
