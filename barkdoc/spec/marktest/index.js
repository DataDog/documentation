"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const diff_1 = require("diff");
const yaml_js_1 = __importDefault(require("yaml-js"));
const index_1 = __importDefault(require("../../index"));
const react_shim_1 = __importDefault(require("./react-shim"));
class Loader extends yaml_js_1.default.loader.Loader {
    construct_mapping(node) {
        return Object.assign(Object.assign({}, super.construct_mapping(node)), { $$lines: {
                start: node.start_mark.line,
                end: node.end_mark.line
            } });
    }
}
const tokenizer = new index_1.default.Tokenizer({
    allowIndentation: true,
    allowComments: true
});
function parse(content, slots, file) {
    const tokens = tokenizer.tokenize(content);
    return index_1.default.parse(tokens, { file, slots });
}
function stripLines(object) {
    const removeLines = (key, value) => (key === '$$lines' ? undefined : value);
    return JSON.parse(JSON.stringify(object, removeLines));
}
function render(code, config, dynamic) {
    var _a;
    const partials = {};
    for (const [file, content] of Object.entries((_a = config.partials) !== null && _a !== void 0 ? _a : {}))
        partials[file] = parse(content, false, file);
    const { react, reactStatic } = index_1.default.renderers;
    const transformed = index_1.default.transform(code, Object.assign(Object.assign({}, config), { partials }));
    return dynamic ? react(transformed, react_shim_1.default) : eval(reactStatic(transformed));
}
function checkMatch(diffs) {
    return diffs.find((diff) => diff.added || diff.removed);
}
function run({ code = null, renderer = 'react', config = {}, expected = undefined } = {}, dynamic) {
    if (renderer === 'html') {
        const transformed = index_1.default.transform(code, config);
        const output = index_1.default.renderers.html(transformed);
        const diff = (0, diff_1.diffChars)((expected || '').trim(), (output || '').trim());
        return checkMatch(diff) ? diff : false;
    }
    const output = render(code, config, dynamic) || {};
    const diff = (0, diff_1.diffJson)(expected || {}, output.children || []);
    return checkMatch(diff) ? diff : false;
}
function formatter(filename, { $$lines: lines, name, code }, diff) {
    const prettyDiff = diff
        .flatMap((part) => [
        part.added ? '\x1b[32m' : part.removed ? '\x1b[31m' : '\x1b[0m',
        part.added || part.removed ? part.value.replace(/ /g, '⎵') : part.value
    ])
        .join('');
    return [`\x1b[31mFAILED:\x1b[0m ${filename}:${lines.start}`, name, code, prettyDiff].join('\n\n');
}
function formatValidation(filename, test, validation) {
    const { $$lines: lines, name, code } = test;
    let output = '';
    for (const { lines, error: { message } } of validation)
        output += `${lines ? lines[0] : '?'}:${message}\n`;
    return [`\x1b[31mINVALID:\x1b[0m ${filename}:${lines.start}`, name, code, output].join('\n\n');
}
(async () => {
    const [filename, line] = process.argv.slice(2).join('').split(':');
    const path = (0, path_1.resolve)(filename);
    const file = await fs_1.promises.readFile(path);
    const tests = yaml_js_1.default.load(file, Loader);
    let exitCode = 0;
    for (const test of tests) {
        const code = parse(test.code || '', test.slots);
        const { start, end } = test.$$lines;
        if (line && (Number(line) - 1 < start || Number(line) - 1 > end))
            continue;
        const validation = index_1.default.validate(code, test.config);
        let result;
        if (test.expectedError) {
            const output = validation.map((v) => v.error.message).join('\n');
            const diff = (0, diff_1.diffChars)((test.expectedError || '').trim(), (output || '').trim());
            result = checkMatch(diff) ? diff : false;
        }
        else {
            if (validation.length && test.validation != false)
                console.log(formatValidation(path, test, validation));
            result = run(Object.assign(Object.assign({}, stripLines(test)), { code }), true);
        }
        if (!result)
            continue;
        console.log(formatter(path, test, result));
        exitCode = 1;
    }
    process.exit(exitCode);
})();
