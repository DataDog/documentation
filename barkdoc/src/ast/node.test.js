"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
const index_1 = __importDefault(require("../../index"));
const node_1 = __importDefault(require("./node"));
const variable_1 = __importDefault(require("./variable"));
const tag_1 = __importDefault(require("../tag"));
describe('Node object', function () {
    describe('traversal', function () {
        it('with a simple document', function () {
            const example = new node_1.default('document', {}, [
                new node_1.default('heading', { level: 1 }, [
                    new node_1.default('inline', {}, [
                        new node_1.default('text', { content: 'This is a heading' }),
                    ]),
                ]),
                new node_1.default('paragraph', {}, [
                    new node_1.default('inline', {}, [
                        new node_1.default('text', { content: 'This is a paragraph' }),
                    ]),
                ]),
            ]);
            const iter = example.walk();
            expect(typeof iter[Symbol.iterator]).toEqual('function');
            const output = [...iter];
            expect(output.length).toEqual(6);
        });
    });
    it('without slots', function () {
        const example = `
{% example %}
# bar

baz
{% /example %}
    `;
        const ast = index_1.default.parse(example, { slots: true });
        const iter = Array.from(ast.walk());
        expect(iter.map((n) => { var _a; return (_a = n.tag) !== null && _a !== void 0 ? _a : n.type; })).toEqual([
            'example',
            'heading',
            'inline',
            'text',
            'paragraph',
            'inline',
            'text',
        ]);
    });
    it('with slots', function () {
        const example = `
{% example %}
# bar

{% slot "foo" %}
baz
{% /slot %}
{% /example %}
    `;
        const ast = index_1.default.parse(example, { slots: true });
        const iter = Array.from(ast.walk());
        expect(iter.map((n) => { var _a; return (_a = n.tag) !== null && _a !== void 0 ? _a : n.type; })).toEqual([
            'example',
            'slot',
            'paragraph',
            'inline',
            'text',
            'heading',
            'inline',
            'text',
        ]);
    });
});
describe('transform', function () {
    function transform(content, config = {}) {
        return index_1.default.transform(content, config);
    }
    describe('built-in nodes', function () {
        it('a heading node', function () {
            const example = new node_1.default('heading', { level: 1 }, [
                new node_1.default('inline', {}, [
                    new node_1.default('text', { content: 'This is a heading' }),
                ]),
            ]);
            const output = transform(example);
            expect(output).toDeepEqual(new tag_1.default('h1', {}, ['This is a heading']));
        });
        describe('fenced code blocks', function () {
            it('fenced code block with language', function () {
                const example = new node_1.default('fence', {
                    language: 'ruby',
                    content: 'test',
                });
                const output = transform(example);
                expect(output).toDeepEqual(new tag_1.default('pre', { 'data-language': 'ruby' }, ['test']));
            });
        });
    });
    describe('transform functions', function () {
        it('with a simple render function', function () {
            const example = new node_1.default('foo', {});
            const foo = {
                transform() {
                    return new tag_1.default('foo', {}, []);
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output).toDeepEqual(new tag_1.default('foo', {}, []));
        });
        it('with a render function that renders attributes', function () {
            const example = new node_1.default('foo', { bar: 'baz', test: 100 });
            const foo = {
                attributes: {
                    bar: { type: String, render: true },
                    test: { type: Number, render: 'example' },
                },
                transform(node, config) {
                    return {
                        name: 'foo',
                        attributes: node.transformAttributes(config),
                    };
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output).toDeepEqual({
                name: 'foo',
                attributes: { bar: 'baz', example: 100 },
            });
        });
    });
    describe('tags', function () {
        const tags = {
            foo: {
                render: 'foo',
                attributes: {
                    bar: { type: 'String', render: true },
                },
            },
        };
        it('with a tag', function () {
            const example = new node_1.default('tag', { bar: 'baz' }, [new node_1.default('inline', {}, [new node_1.default('text', { content: 'test' })])], 'foo');
            const output = transform(example, { tags });
            expect(output).toDeepEqual(new tag_1.default('foo', { bar: 'baz' }, ['test']));
        });
        it('with a non-existing tag', function () {
            const example = new node_1.default('container', { bar: 'baz' }, [
                new node_1.default('inline', {}, [new node_1.default('text', { content: 'test' })]),
            ]);
            // @ts-ignore test mutating node in userland
            example.container = 'bar';
            const output = transform(example, { tags });
            expect(output).toDeepEqual(['test']);
        });
    });
    describe('tag name', function () {
        it('with a string value', function () {
            const example = new node_1.default('foo', {});
            const foo = { render: 'foo' };
            const output = transform(example, { nodes: { foo } });
            expect(output.name).toEqual('foo');
        });
        it('with no value', function () {
            const example = new node_1.default('foo', {}, [new node_1.default('bar', {})]);
            const output = transform(example, {
                nodes: { foo: {}, bar: { render: 'bar' } },
            });
            expect(output).toDeepEqual([new tag_1.default('bar', {}, [])]);
        });
    });
    describe('attributes', function () {
        it('with an id', function () {
            const example = new node_1.default('paragraph', { id: 'bar' });
            const output = transform(example);
            expect(output).toDeepEqualSubset({
                name: 'p',
                attributes: { id: 'bar' },
            });
        });
        it('with a class', function () {
            const example = new node_1.default('paragraph', {
                class: { foo: true, bar: false },
            });
            const output = transform(example);
            expect(output).toDeepEqual(new tag_1.default('p', { class: 'foo' }, []));
        });
        it('with boolean render attribute', function () {
            const example = new node_1.default('foo', { bar: 1, baz: 'test' });
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: Number, render: true },
                    baz: { type: String, render: true },
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output).toDeepEqual(new tag_1.default('foo', { bar: 1, baz: 'test' }));
        });
        it('with string render attribute', function () {
            const example = new node_1.default('foo', { bar: 1, baz: 'test' });
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: Number, render: 'data-bar' },
                    baz: { type: String, render: 'data-baz' },
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output).toDeepEqual(new tag_1.default('foo', { 'data-bar': 1, 'data-baz': 'test' }));
        });
        it('with a non-rendered attribute', function () {
            const example = new node_1.default('foo', { bar: 1, baz: 'test' });
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: Number, render: true },
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(Object.keys(output.attributes).includes('baz')).toBeFalse();
            expect(output).toDeepEqual(new tag_1.default('foo', { bar: 1 }, []));
        });
        it('with a default attribute value', function () {
            const example = new node_1.default('foo', {});
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: Number, render: true, default: 10 },
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output.attributes.bar).toEqual(10);
        });
        it('with an overriden default attribute value', function () {
            const example = new node_1.default('foo', { bar: 1 });
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: Number, render: true, default: 10 },
                },
            };
            const output = transform(example, { nodes: { foo } });
            expect(output.attributes.bar).toEqual(1);
        });
        it('variable nested in a hash', function () {
            const bar = new variable_1.default(['a', 'b', 'c']);
            const example = new node_1.default('foo', { bar });
            const foo = {
                render: 'foo',
                attributes: {
                    bar: { type: String, render: true },
                },
            };
            const output = transform(example, {
                nodes: { foo },
                variables: { a: { b: { c: 'example' } } },
            });
            expect(output).toDeepEqual(new tag_1.default('foo', { bar: 'example' }, []));
        });
        describe('custom types', () => {
            const cases = [
                {
                    name: 'should support default values',
                    type: class NonNullString {
                        transform(value) {
                            return value || '';
                        }
                    },
                    attributes: undefined,
                    expectedValue: '',
                },
                {
                    name: 'should support transforms',
                    type: class UpperCaseString {
                        transform(value) {
                            return (value || '').toUpperCase();
                        }
                    },
                    value: 'test',
                    expectedValue: 'TEST',
                },
            ];
            cases.forEach((test) => {
                it(test.name, () => {
                    const example = new node_1.default('tag', { bar: test.value });
                    const config = {
                        nodes: {
                            tag: {
                                render: 'tag',
                                attributes: {
                                    bar: {
                                        render: true,
                                        type: test.type,
                                    },
                                },
                            },
                        },
                    };
                    const output = transform(example, config);
                    expect(output.attributes.bar).toEqual(test.expectedValue);
                });
            });
        });
    });
    describe('annotations', () => {
        it('multiple values should be ordered correctly', () => {
            const example = index_1.default.parse(`\`\`\`js {% z=true .class y=2 x="1" #id %} \nContent\n\`\`\``);
            const fence = example.children[0];
            const { attributes, annotations } = fence;
            expect(attributes).toEqual({
                content: 'Content\n',
                language: 'js',
                id: 'id',
                class: { class: true },
                z: true,
                y: 2,
                x: '1',
            });
            expect(annotations).toDeepEqual([
                { type: 'attribute', name: 'z', value: true },
                { type: 'class', name: 'class', value: true },
                { type: 'attribute', name: 'y', value: 2 },
                { type: 'attribute', name: 'x', value: '1' },
                { type: 'attribute', name: 'id', value: 'id' },
            ]);
        });
    });
    describe('async support', () => {
        it('should allow for injecting an async transformer', async () => {
            const doc = `![img](/src)`;
            const config = {
                nodes: {
                    image: {
                        async transform() {
                            const value = await new Promise((res) => res('1'));
                            return value;
                        },
                    },
                },
            };
            // @ts-expect-error
            const content = await index_1.default.transform(index_1.default.parse(doc), config);
            // @ts-expect-error
            expect(content.children[0].children[0]).toEqual(['1']);
        });
    });
});
