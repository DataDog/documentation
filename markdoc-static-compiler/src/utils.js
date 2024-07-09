"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDENTIFIER_REGEX = exports.CLOSE = exports.OPEN = void 0;
exports.isIdentifier = isIdentifier;
exports.isPromise = isPromise;
exports.findTagEnd = findTagEnd;
exports.parseTags = parseTags;
exports.buildTag = buildTag;
exports.isTag = isTag;
exports.isClientVariable = isClientVariable;
exports.isClientFunction = isClientFunction;
const tag_1 = require("./grammar/tag");
const variable_1 = __importDefault(require("./ast/variable"));
const function_1 = __importDefault(require("./ast/function"));
var STATES;
(function (STATES) {
    STATES[STATES["normal"] = 0] = "normal";
    STATES[STATES["string"] = 1] = "string";
    STATES[STATES["escape"] = 2] = "escape";
})(STATES || (STATES = {}));
exports.OPEN = '{%';
exports.CLOSE = '%}';
exports.IDENTIFIER_REGEX = /^[a-zA-Z0-9_-]+$/;
function isIdentifier(s) {
    return typeof s === 'string' && exports.IDENTIFIER_REGEX.test(s);
}
function isPromise(a) {
    return a && typeof a === 'object' && typeof a.then === 'function';
}
function findTagEnd(content, start = 0) {
    let state = STATES.normal;
    for (let pos = start; pos < content.length; pos++) {
        const char = content[pos];
        switch (state) {
            case STATES.string:
                switch (char) {
                    case '"':
                        state = STATES.normal;
                        break;
                    case '\\':
                        state = STATES.escape;
                        break;
                }
                break;
            case STATES.escape:
                state = STATES.string;
                break;
            case STATES.normal:
                if (char === '"')
                    state = STATES.string;
                else if (content.startsWith(exports.CLOSE, pos))
                    return pos;
        }
    }
    return null;
}
function parseTag(content, line, contentStart) {
    try {
        return (0, tag_1.parse)(content, { Variable: variable_1.default, Function: function_1.default });
    }
    catch (error) {
        if (!(error instanceof SyntaxError))
            throw error;
        const { message, location: { start, end }, } = error;
        const location = {
            start: { line, character: start.offset + contentStart },
            end: { line: line + 1, character: end.offset + contentStart },
        };
        return { type: 'error', meta: { error: { message, location } } };
    }
}
function parseTags(content, firstLine = 0) {
    let line = firstLine + 1;
    const output = [];
    let start = 0;
    for (let pos = 0; pos < content.length; pos++) {
        if (content[pos] === '\n') {
            line++;
            continue;
        }
        if (!content.startsWith(exports.OPEN, pos))
            continue;
        const end = findTagEnd(content, pos);
        if (end == null) {
            // If we cannot find the closing tag, we skip over it
            pos = pos + exports.OPEN.length;
            continue;
        }
        const text = content.slice(pos, end + exports.CLOSE.length);
        const inner = content.slice(pos + exports.OPEN.length, end);
        const lineStart = content.lastIndexOf('\n', pos);
        const lineEnd = content.indexOf('\n', end);
        const lineContent = content.slice(lineStart, lineEnd);
        const tag = parseTag(inner.trim(), line, pos - lineStart);
        // Throw away excess whitespace introduced by block-level tags
        const precedingTextEnd = lineContent.trim() === text ? lineStart : pos;
        const precedingText = content.slice(start, precedingTextEnd);
        output.push({
            type: 'text',
            start,
            end: pos - 1,
            content: precedingText,
        });
        output.push(Object.assign({ map: [line, line + 1], position: {
                start: pos - lineStart,
                end: pos - lineStart + text.length,
            }, start: pos, end: pos + text.length - 1, info: text }, tag));
        start = end + exports.CLOSE.length;
        pos = start - 1;
    }
    output.push({
        type: 'text',
        start,
        end: content.length - 1,
        content: content.slice(start),
    });
    return output;
}
function buildTag(name = 'div', attributes = {}, children = []) {
    return {
        $$mdtype: 'Tag',
        name,
        attributes,
        children,
    };
}
function isTag(tag) {
    return !!((tag === null || tag === void 0 ? void 0 : tag.$$mdtype) === 'Tag');
}
function isClientVariable(variable) {
    return !!((variable === null || variable === void 0 ? void 0 : variable.$$mdtype) === 'Variable');
}
function isClientFunction(func) {
    return !!((func === null || func === void 0 ? void 0 : func.$$mdtype) === 'Function');
}
