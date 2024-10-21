"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plugin;
const fence = '---';
function getLine(state, n) {
    return state.src.slice(state.bMarks[n], state.eMarks[n]).trim();
}
function findClose(state, endLine) {
    for (let line = 1; line < endLine; line++)
        if (getLine(state, line) === fence)
            return line;
}
function block(state, startLine, endLine, silent) {
    if (startLine != 0 || getLine(state, 0) != fence)
        return false;
    const close = findClose(state, endLine);
    if (!close)
        return false;
    if (silent)
        return true;
    const token = state.push('frontmatter', '', 0);
    token.content = state.src.slice(state.eMarks[0], state.bMarks[close]).trim();
    token.map = [0, close];
    token.hidden = true;
    state.line = close + 1;
    return true;
}
function plugin(md /* options */) {
    md.block.ruler.before('hr', 'frontmatter', block);
}
