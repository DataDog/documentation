"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plugin;
const OPEN = '<!--';
const CLOSE = '-->';
function block(state, startLine, endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    if (!state.src.startsWith(OPEN, start))
        return false;
    const close = state.src.indexOf(CLOSE, start);
    if (!close)
        return false;
    if (silent)
        return true;
    const content = state.src.slice(start + OPEN.length, close);
    const lines = content.split('\n').length;
    const token = state.push('comment', '', 0);
    token.content = content.trim();
    token.map = [startLine, startLine + lines];
    state.line += lines;
    return true;
}
function inline(state, silent) {
    if (!state.src.startsWith(OPEN, state.pos))
        return false;
    const close = state.src.indexOf(CLOSE, state.pos);
    if (!close)
        return false;
    if (silent)
        return true;
    const content = state.src.slice(state.pos + OPEN.length, close);
    const token = state.push('comment', '', 0);
    token.content = content.trim();
    state.pos = close + CLOSE.length;
    return true;
}
function plugin(md) {
    md.block.ruler.before('table', 'comment', block, { alt: ['paragraph'] });
    md.inline.ruler.push('comment', inline);
}
