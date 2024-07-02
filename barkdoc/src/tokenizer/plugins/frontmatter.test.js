"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
describe('MarkdownIt frontmatter plugin', function () {
    const tokenizer = new __1.default();
    function parse(example) {
        const content = example.replace(/\n\s+/gm, '\n').trim();
        return tokenizer.tokenize(content);
    }
    it('parsing frontmatter', function () {
        const example = parse(`
    ---
    test: true
    ---

    # Test
    `);
        expect(example.length).toEqual(4);
        expect(example[0]).toDeepEqualSubset({
            type: 'frontmatter',
            content: 'test: true',
            level: 0,
            map: [0, 2],
        });
    });
    it('parsing frontmatter only', function () {
        const example = parse(`
    ---
    test: true
    foo: bar
    ---
    `);
        expect(example.length).toEqual(1);
        expect(example[0]).toDeepEqualSubset({
            type: 'frontmatter',
            level: 0,
            map: [0, 3],
        });
    });
    it('spaces at end', function () {
        const example = parse(`
    ---   
    test: true
    ---   

    # Test
    `);
        expect(example.length).toEqual(4);
        expect(example[0]).toDeepEqualSubset({
            type: 'frontmatter',
            content: 'test: true',
            level: 0,
            map: [0, 2],
        });
    });
    it('missing closing', function () {
        const example = parse(`
    ---
    test: true

    # Test
    `);
        expect(example.length).toEqual(7);
        expect(example[0].type).toEqual('hr');
    });
    it('missing opening', function () {
        const example = parse(`
    test: true
    ---

    # Test
    `);
        expect(example.length).toEqual(7);
        expect(example[0].type).toEqual('paragraph_open');
    });
});
