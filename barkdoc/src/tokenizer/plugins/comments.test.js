"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
describe('MarkdownIt Comments plugin', function () {
    const tokenizer = new __1.default({ allowComments: true });
    function parse(example) {
        const content = example.replace(/\n\s+/gm, '\n').trim();
        return tokenizer.tokenize(content);
    }
    describe('inline comments', function () {
        const output = [
            { type: 'paragraph_open' },
            {
                type: 'inline',
                children: [
                    { type: 'text', content: 'this is a test ' },
                    { type: 'comment', content: 'example comment' },
                    { type: 'text', content: ' foo' },
                ],
            },
            { type: 'paragraph_close' },
        ];
        it('simple inline comment', function () {
            const example = parse(`
      this is a test <!-- example comment --> foo
      `);
            expect(example).toDeepEqualSubset(output);
        });
        it('inline comment with a newline', function () {
            const example = parse(`
      this is a test <!-- 
        example comment
        --> foo
      `);
            expect(example).toDeepEqualSubset(output);
        });
    });
    describe('block comments', function () {
        const output = [
            { type: 'paragraph_open' },
            { type: 'inline' },
            { type: 'paragraph_close' },
            { type: 'comment', content: 'example comment' },
            { type: 'paragraph_open' },
            { type: 'inline', content: 'foo' },
            { type: 'paragraph_close' },
        ];
        it('simple block comment after a paragraph', function () {
            const example = parse(`
      this is a test

      <!--
      example comment
      -->
      
      foo
      `);
            expect(example).toDeepEqualSubset(output);
        });
        it('block comment with ending on same line as content', function () {
            const example = parse(`
      this is a test

      <!--
      example comment -->

      foo
      `);
            expect(example).toDeepEqualSubset(output);
        });
        it('block comment one one line', function () {
            const example = parse(`
      this is a test

      <!-- example comment -->

      foo
      `);
            expect(example).toDeepEqualSubset(output);
        });
    });
});
