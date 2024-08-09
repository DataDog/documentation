"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plugin;
const utils_1 = require("../../utils");
const tag_1 = require("../../grammar/tag");
const variable_1 = __importDefault(require("../../ast/variable"));
const function_1 = __importDefault(require("../../ast/function"));
const utils_2 = require("../../utils");
function createToken(state, content, contentStart) {
    try {
        const { type, meta, nesting = 0 } = (0, tag_1.parse)(content, { Variable: variable_1.default, Function: function_1.default });
        const token = state.push(type, '', nesting);
        token.info = content;
        token.meta = meta;
        if (!state.delimiters) {
            state.delimiters = [];
        }
        return token;
    }
    catch (error) {
        if (!(error instanceof SyntaxError))
            throw error;
        const { message, location: { start, end }, } = error;
        const location = contentStart
            ? {
                start: { offset: start.offset + contentStart },
                end: { offset: end.offset + contentStart },
            }
            : null;
        const token = state.push('error', '', 0);
        token.meta = { error: { message, location } };
        return token;
    }
}
function block(state, startLine, endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const finish = state.eMarks[startLine];
    if (!state.src.startsWith(utils_2.OPEN, start))
        return false;
    const tagEnd = (0, utils_1.findTagEnd)(state.src, start);
    const lastPossible = state.src.slice(0, finish).trim().length;
    if (!tagEnd || tagEnd < lastPossible - utils_2.CLOSE.length)
        return false;
    const contentStart = start + utils_2.OPEN.length;
    const content = state.src.slice(contentStart, tagEnd).trim();
    const lines = state.src
        .slice(start, tagEnd + utils_2.CLOSE.length)
        .split('\n').length;
    if (content[0] === '$')
        return false;
    if (silent)
        return true;
    const token = createToken(state, content, contentStart);
    token.map = [startLine, startLine + lines];
    state.line += lines;
    return true;
}
function inline(state, silent) {
    if (!state.src.startsWith(utils_2.OPEN, state.pos))
        return false;
    const tagEnd = (0, utils_1.findTagEnd)(state.src, state.pos);
    if (!tagEnd)
        return false;
    const content = state.src.slice(state.pos + utils_2.OPEN.length, tagEnd);
    if (!silent)
        createToken(state, content.trim());
    state.pos = tagEnd + utils_2.CLOSE.length;
    return true;
}
function core(state) {
    var _a, _b;
    let token;
    for (token of state.tokens) {
        if (token.type !== 'fence')
            continue;
        if (token.info.includes(utils_2.OPEN)) {
            const start = token.info.indexOf(utils_2.OPEN);
            const end = (0, utils_1.findTagEnd)(token.info, start);
            const content = token.info.slice(start + utils_2.OPEN.length, end);
            try {
                const { meta } = (0, tag_1.parse)(content.trim(), { Variable: variable_1.default, Function: function_1.default });
                token.meta = meta;
            }
            catch (error) {
                if (!(error instanceof SyntaxError))
                    throw error;
                if (!token.errors)
                    token.errors = [];
                token.errors.push({
                    id: 'fence-tag-error',
                    level: 'error',
                    message: `Syntax error in fence tag: ${error.message}`,
                });
            }
        }
        if ((_b = (_a = token === null || token === void 0 ? void 0 : token.meta) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.find((attr) => attr.name === 'process' && !attr.value))
            continue;
        token.children = (0, utils_1.parseTags)(token.content, token.map[0]);
    }
}
function plugin(md /* options */) {
    md.block.ruler.before('paragraph', 'annotations', block, {
        alt: ['paragraph', 'blockquote'],
    });
    md.inline.ruler.push('containers', inline);
    md.core.ruler.push('annotations', core);
}
