"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __importDefault(require("markdown-it/lib"));
const annotations_1 = __importDefault(require("./plugins/annotations"));
const frontmatter_1 = __importDefault(require("./plugins/frontmatter"));
const comments_1 = __importDefault(require("./plugins/comments"));
class Tokenizer {
    constructor(config = {}) {
        this.parser = new lib_1.default(config);
        this.parser.use(annotations_1.default, 'annotations', {});
        this.parser.use(frontmatter_1.default, 'frontmatter', {});
        this.parser.disable([
            'lheading',
            // Disable indented `code_block` support https://spec.commonmark.org/0.30/#indented-code-block
            'code',
        ]);
        this.parser.use(comments_1.default, 'comments', {});
    }
    tokenize(content) {
        return this.parser.parse(content.toString(), {});
    }
}
exports.default = Tokenizer;
