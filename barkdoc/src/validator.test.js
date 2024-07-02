"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../index"));
function validate(string, config) {
    return index_1.default.validate(index_1.default.parse(string), config);
}
describe('validate', function () {
    describe('function validation', function () {
        it('ensures that function exists', function () {
            const example = '{% foo bar=baz() /%}';
            const output = validate(example, {
                validation: { validateFunctions: true },
                tags: {
                    foo: {
                        attributes: {
                            bar: { type: String },
                        },
                    },
                },
            });
            expect(output).toDeepEqualSubset([
                {
                    error: {
                        id: 'function-undefined',
                        message: "Undefined function: 'baz'",
                    },
                },
            ]);
        });
        describe('return type checking', function () {
            const example = '{% foo bar=baz() /%}';
            const schema = {
                validation: { validateFunctions: true },
                functions: {
                    baz: {
                        returns: String,
                    },
                    number: {
                        returns: Number,
                    },
                    nested: {
                        returns: String,
                        parameters: {
                            0: { type: String },
                            1: { type: Number },
                        },
                    },
                    withUnion: {
                        returns: [String, Number],
                        parameters: {},
                    },
                },
                tags: {
                    foo: {
                        attributes: {
                            bar: { type: String },
                        },
                    },
                    'union-tag-1': {
                        attributes: {
                            foo: { type: String },
                            bar: { type: Number },
                            baz: { type: Boolean },
                        },
                    },
                },
            };
            it('correctly handles union types', function () {
                const example = '{% union-tag-1 foo=withUnion() bar=withUnion() /%}';
                expect(validate(example, schema)).toEqual([]);
                const example2 = '{% union-tag-1 foo=withUnion() bar=withUnion() baz=withUnion() /%}';
                expect(validate(example2, schema)).toDeepEqualSubset([
                    {
                        error: {
                            id: 'attribute-type-invalid',
                            message: "Attribute 'baz' must be type of 'Boolean'",
                        },
                    },
                ]);
            });
            it('correctly handles return types for nested function calls', function () {
                const example = '{% foo bar=nested(baz(), number()) /%}';
                expect(validate(example, schema)).toEqual([]);
                const example2 = '{% foo bar=nested(number(), baz()) /%}';
                expect(validate(example2, schema)).toDeepEqualSubset([
                    {
                        error: {
                            id: 'parameter-type-invalid',
                            message: "Parameter '0' of 'nested' must be type of 'String'",
                        },
                    },
                    {
                        error: {
                            id: 'parameter-type-invalid',
                            message: "Parameter '1' of 'nested' must be type of 'Number'",
                        },
                    },
                ]);
            });
            it('accepts a correct return type', function () {
                expect(validate(example, schema)).toEqual([]);
            });
            it('correctly handles no return type', function () {
                const modifiedSchema = Object.assign(Object.assign({}, schema), { functions: { baz: {} } });
                expect(validate(example, modifiedSchema)).toEqual([]);
            });
            it('identifies an incorrect return type', function () {
                const modifiedSchema = Object.assign(Object.assign({}, schema), { functions: { baz: { returns: Number } } });
                expect(validate(example, modifiedSchema)).toDeepEqualSubset([
                    { error: { id: 'attribute-type-invalid' } },
                ]);
            });
        });
        describe('checks parameters', function () {
            const schema = {
                validation: { validateFunctions: true },
                functions: {
                    baz: {
                        returns: String,
                        parameters: {},
                    },
                    qux: {
                        returns: String,
                        parameters: {
                            test: { type: String },
                        },
                    },
                    noTyping: {},
                    requiredParam: {
                        returns: String,
                        parameters: {
                            test: { type: String },
                            req: { type: String, required: true },
                        },
                    },
                },
                tags: {
                    foo: {
                        attributes: {
                            bar: { type: String },
                        },
                    },
                },
            };
            it('with a missing optional parameter', function () {
                expect(validate('{% foo bar=qux() /%}', schema)).toEqual([]);
            });
            it('with a missing required parameter', function () {
                expect(validate('{% foo bar=requiredParam() /%}', schema)).toDeepEqualSubset([
                    {
                        error: {
                            id: 'parameter-missing-required',
                            message: "Missing required parameter: 'req'",
                        },
                    },
                ]);
            });
            describe('accepts defined parameters', function () {
                it('with keyed parameter', function () {
                    expect(validate('{% foo bar=qux(test="example") /%}', schema)).toEqual([]);
                });
            });
            it('ignores parameters when there is no typing', function () {
                expect(validate('{% foo bar=noTyping(foo=1) /%}', schema)).toEqual([]);
            });
            describe('rejects undeclared parameters', function () {
                it('with a keyed parameter', function () {
                    const output = validate('{% foo bar=baz(foo=1) /%}', schema);
                    expect(output).toDeepEqualSubset([
                        {
                            type: 'tag',
                            error: {
                                id: 'parameter-undefined',
                                message: "Invalid parameter: 'foo'",
                            },
                        },
                    ]);
                });
                it('with a positional parameter', function () {
                    expect(validate('{% foo bar=baz(1) /%}', schema)).toDeepEqualSubset([
                        {
                            type: 'tag',
                            error: {
                                id: 'parameter-undefined',
                                message: "Invalid parameter: '0'",
                            },
                        },
                    ]);
                    expect(validate('{% foo bar=baz(1, test=2) /%}', schema)).toDeepEqualSubset([
                        {
                            type: 'tag',
                            error: {
                                id: 'parameter-undefined',
                                message: "Invalid parameter: '0'",
                            },
                        },
                    ]);
                });
            });
        });
    });
    describe('inline rule', () => {
        const config = {
            tags: {
                foo: { inline: true },
                bar: { inline: false },
                baz: {},
            },
        };
        it('allows inline or block when undefined', () => {
            const inline = validate(`this is inline {% baz %}bar{% /baz %}`, config);
            expect(inline).toEqual([]);
            const block = validate(`
{% baz %}
bar
{% /baz %}
      `, config);
            expect(block).toEqual([]);
        });
        it('validates inline tag', () => {
            var _a, _b;
            const correct = validate(`this is inline {% foo %}bar{% /foo %}`, config);
            expect(correct).toEqual([]);
            const wrong = validate(`
{% foo %}
bar
{% /foo %}
      `, config);
            expect((_a = wrong[0]) === null || _a === void 0 ? void 0 : _a.error.id).toEqual('tag-placement-invalid');
            expect((_b = wrong[0]) === null || _b === void 0 ? void 0 : _b.error.message).toContain('should be inline');
        });
        it('validates block tag', () => {
            var _a, _b;
            const correct = validate(`
{% bar %}
bar
{% /bar %}
`, config);
            expect(correct).toEqual([]);
            const wrong = validate(`this is inline {% bar %}bar{% /bar %}`, config);
            expect((_a = wrong[0]) === null || _a === void 0 ? void 0 : _a.error.id).toEqual('tag-placement-invalid');
            expect((_b = wrong[0]) === null || _b === void 0 ? void 0 : _b.error.message).toContain('should be block');
        });
    });
    describe('attribute validation', () => {
        describe('with a validate function', () => {
            it('using simple conditional', () => {
                const schema = {
                    tags: {
                        foo: {
                            attributes: {
                                bar: {
                                    type: Number,
                                    validate(value, _config) {
                                        return value > 10
                                            ? []
                                            : [
                                                {
                                                    id: 'attribute-should-be-greater-than-ten',
                                                    message: 'Attribute "bar" must have value greater than 10.',
                                                },
                                            ];
                                    },
                                },
                            },
                        },
                    },
                };
                expect(validate(`{% foo bar=20 /%}`, schema)).toEqual([]);
                expect(validate(`{% foo bar=5 /%}`, schema)).toDeepEqualSubset([
                    {
                        type: 'tag',
                        error: {
                            id: 'attribute-should-be-greater-than-ten',
                            message: 'Attribute "bar" must have value greater than 10.',
                        },
                    },
                ]);
            });
        });
        it('should return error on failure to match array', () => {
            const example = '{% foo jawn="cat" /%}';
            const schema = {
                tags: {
                    foo: {
                        attributes: {
                            jawn: {
                                type: String,
                                matches: ['bar', 'baz', 'bat'],
                            },
                        },
                    },
                },
            };
            expect(validate(example, schema)).toDeepEqualSubset([
                {
                    type: 'tag',
                    error: {
                        id: 'attribute-value-invalid',
                        message: `Attribute 'jawn' must match one of ["bar","baz","bat"]. Got 'cat' instead.`,
                    },
                },
            ]);
        });
        it('Elides excess values in matches check', () => {
            const example = '{% foo jawn="cat" /%}';
            const schema = {
                tags: {
                    foo: {
                        attributes: {
                            jawn: {
                                type: String,
                                matches: Array.from('foobarbazqux'),
                            },
                        },
                    },
                },
            };
            const output = validate(example, schema);
            expect(output).toDeepEqualSubset([
                {
                    type: 'tag',
                    error: {
                        id: 'attribute-value-invalid',
                        message: `Attribute 'jawn' must match one of ["f","o","o","b","a","r","b","a", ... 4 more]. Got 'cat' instead.`,
                    },
                },
            ]);
        });
        // https://github.com/markdoc/markdoc/issues/122
        it('should validate partial file attributes', () => {
            const example = `{% partial file="non-existent.md" /%}`;
            const output = validate(example, {});
            expect(output).toDeepEqualSubset([
                {
                    type: 'tag',
                    error: {
                        id: 'attribute-value-invalid',
                        level: 'error',
                        message: "Partial `non-existent.md` not found. The 'file' attribute must be set in `config.partials`",
                    },
                },
            ]);
        });
        it('properly validates ids', () => {
            var _a, _b;
            const correct = validate(`# foo {% #bar %}`, {});
            expect(correct).toEqual([]);
            const number = validate(`# foo {% #1bar %}`, {});
            expect((_a = number[0]) === null || _a === void 0 ? void 0 : _a.error.id).toEqual('attribute-value-invalid');
            const hash = validate(`# foo {% id="#bar" %}`, {});
            expect((_b = hash[0]) === null || _b === void 0 ? void 0 : _b.error.id).toEqual('attribute-value-invalid');
        });
    });
    describe('custom type registration example', () => {
        class Link {
            validate(value) {
                if (value.startsWith('http')) {
                    return [];
                }
                const error = {
                    id: 'attribute-type-invalid',
                    level: 'error',
                    message: "Attribute 'href' must be type of 'Link'",
                };
                return [error];
            }
        }
        it('should return error on failure', () => {
            const example = '{% link href="/relative-link"  /%}';
            const output = validate(example, {
                tags: {
                    link: {
                        render: 'a',
                        attributes: {
                            href: {
                                type: Link,
                            },
                        },
                    },
                },
            });
            expect(output).toDeepEqualSubset([
                {
                    type: 'tag',
                    error: {
                        id: 'attribute-type-invalid',
                        level: 'error',
                        message: "Attribute 'href' must be type of 'Link'",
                    },
                },
            ]);
        });
        it('should return no errors when valid', () => {
            const example = '{% link href="http://google.com"  /%}';
            const output = validate(example, {
                tags: {
                    link: {
                        render: 'a',
                        selfClosing: true,
                        attributes: {
                            href: {
                                type: Link,
                            },
                        },
                    },
                },
            });
            expect(output).toEqual([]);
        });
    });
    describe('variable validation', () => {
        it('should only validate if the variables config is passed', () => {
            const example = `{% $valid.variable %}`;
            const output = validate(example, {});
            expect(output).toEqual([]);
        });
        it('should warn against missing variables', () => {
            const example = `{% $undefinedVariable %}`;
            const output = validate(example, { variables: {} });
            expect(output).toDeepEqualSubset([
                {
                    type: 'text',
                    error: {
                        id: 'variable-undefined',
                        level: 'error',
                        message: "Undefined variable: 'undefinedVariable'",
                    },
                },
            ]);
        });
        it('should not warn if variable exists', () => {
            const example = `{% $valid.variable %}`;
            const output = validate(example, {
                variables: { valid: { variable: false } },
            });
            expect(output).toEqual([]);
        });
    });
    it('should not error for missing support for code_block', () => {
        const example = `   # https://spec.commonmark.org/0.30/#indented-code-block
    4-space indented code`;
        const output = validate(example, {});
        expect(output).toEqual([]);
    });
    describe('async support', () => {
        it('should allow async validators', async () => {
            const doc = `![img](/src)`;
            const config = {
                nodes: {
                    image: Object.assign(Object.assign({}, index_1.nodes.image), { async validate() {
                            const message = await new Promise((res) => res('Error!'));
                            return [{ message }];
                        } }),
                },
            };
            const errors = await validate(doc, config);
            expect(errors).toDeepEqualSubset([
                {
                    type: 'image',
                    lines: [0, 1],
                    location: {},
                    error: { message: 'Error!' },
                },
            ]);
        });
    });
    describe('attribute validation key', () => {
        it('simple case', () => {
            const example = `{% foo bar={baz: 3} /%}`;
            function validator(value, config, name) {
                return value.baz < 5
                    ? [
                        {
                            id: 'invalid-foo-bar',
                            level: 'error',
                            message: `The value of '${name}.baz' must be less than five`,
                        },
                    ]
                    : [];
            }
            const config = {
                tags: {
                    foo: {
                        attributes: {
                            bar: {
                                type: Object,
                                validate: validator,
                            },
                            blah: {
                                type: Object,
                                validate: validator,
                            },
                        },
                    },
                },
            };
            const errs = validate(example, config);
            expect(errs[0].error.message).toEqual("The value of 'bar.baz' must be less than five");
        });
        it('custom attribute type', () => {
            const example = `{% foo bar={baz: 3} /%}`;
            class CustomType {
                validate(value, config, name) {
                    return value.baz < 5
                        ? [
                            {
                                id: 'invalid-foo-bar',
                                level: 'error',
                                message: `The value of '${name}.baz' must be less than five`,
                            },
                        ]
                        : [];
                }
            }
            const config = {
                tags: {
                    foo: {
                        attributes: {
                            bar: {
                                type: CustomType,
                            },
                            blah: {
                                type: CustomType,
                            },
                        },
                    },
                },
            };
            const errs = validate(example, config);
            expect(errs[0].error.message).toEqual("The value of 'bar.baz' must be less than five");
        });
    });
    describe('parent validation', () => {
        it('for deep nesting', () => {
            const doc = `
{% foo %}
{% bar %}
{% baz %}
# testing
{% /baz %}
{% /bar %}
{% /foo %}
`;
            const doc2 = `
{% foo %}
{% bar %}
{% /bar %}
{% /foo %}

{% bar %}
{% baz %}
# testing
{% /baz %}
{% /bar %}
`;
            const config = {
                tags: {
                    foo: {},
                    bar: {},
                    baz: {},
                },
                nodes: {
                    heading: Object.assign(Object.assign({}, index_1.default.nodes.heading), { validate(node, config) {
                            if (config.validation.parents.find((p) => p.tag === 'foo'))
                                return [
                                    {
                                        id: 'heading-in-foo',
                                        level: 'error',
                                        message: "Can't nest a heading in tag 'foo'",
                                    },
                                ];
                            return [];
                        } }),
                },
            };
            const errors = validate(doc, config);
            expect(errors.length).toEqual(1);
            expect(errors[0].error.id).toEqual('heading-in-foo');
            const errors2 = validate(doc2, config);
            expect(errors2.length).toEqual(0);
        });
        it('with function validation enabled', () => {
            const doc = `{% foo %}{% bar %}this is a test{% /bar %}{% /foo %}`;
            const config = {
                validation: {
                    validateFunctions: true,
                },
                tags: {
                    foo: {},
                    bar: {
                        validate(node, config) {
                            var _a, _b;
                            const parents = (_b = (_a = config === null || config === void 0 ? void 0 : config.validation) === null || _a === void 0 ? void 0 : _a.parents) === null || _b === void 0 ? void 0 : _b.map((p) => p.type);
                            expect(parents).toDeepEqual([
                                'document',
                                'paragraph',
                                'inline',
                                'tag',
                            ]);
                            return [];
                        },
                    },
                },
            };
            validate(doc, config);
        });
    });
});
