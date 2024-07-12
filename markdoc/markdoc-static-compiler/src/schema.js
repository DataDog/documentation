"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = exports.error = exports.comment = exports.softbreak = exports.hardbreak = exports.text = exports.code = exports.link = exports.inline = exports.s = exports.em = exports.strong = exports.thead = exports.tbody = exports.tr = exports.th = exports.td = exports.table = exports.hr = exports.list = exports.item = exports.blockquote = exports.fence = exports.image = exports.paragraph = exports.heading = exports.document = void 0;
const utils_1 = require("./utils");
exports.document = {
    render: 'article',
    children: [
        'heading',
        'paragraph',
        'image',
        'table',
        'tag',
        'fence',
        'blockquote',
        'comment',
        'list',
        'hr',
    ],
    attributes: {
        frontmatter: { render: false },
    },
};
exports.heading = {
    children: ['inline'],
    attributes: {
        level: { type: Number, render: false, required: true },
    },
    transform(node, config) {
        return (0, utils_1.buildTag)(`h${node.attributes['level']}`, node.transformAttributes(config), node.transformChildren(config));
    },
};
exports.paragraph = {
    render: 'p',
    children: ['inline'],
};
exports.image = {
    render: 'img',
    attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String },
        // width/height attributes will need to be to be implemented as an extension to markdown-it
    },
};
exports.fence = {
    render: 'pre',
    attributes: {
        content: { type: String, render: false, required: true },
        language: { type: String, render: 'data-language' },
        process: { type: Boolean, render: false, default: true },
    },
    transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.children.length
            ? node.transformChildren(config)
            : [node.attributes.content];
        return (0, utils_1.buildTag)('pre', attributes, children);
    },
};
exports.blockquote = {
    render: 'blockquote',
    children: [
        'heading',
        'paragraph',
        'image',
        'table',
        'tag',
        'fence',
        'blockquote',
        'list',
        'hr',
    ],
};
exports.item = {
    render: 'li',
    children: [
        'inline',
        'heading',
        'paragraph',
        'image',
        'table',
        'tag',
        'fence',
        'blockquote',
        'list',
        'hr',
    ],
};
exports.list = {
    children: ['item'],
    attributes: {
        ordered: { type: Boolean, render: false, required: true },
        start: { type: Number },
        marker: { type: String, render: false },
    },
    transform(node, config) {
        return (0, utils_1.buildTag)(node.attributes.ordered ? 'ol' : 'ul', node.transformAttributes(config), node.transformChildren(config));
    },
};
exports.hr = {
    render: 'hr',
};
exports.table = {
    render: 'table',
};
exports.td = {
    render: 'td',
    children: [
        'inline',
        'heading',
        'paragraph',
        'image',
        'table',
        'tag',
        'fence',
        'blockquote',
        'list',
        'hr',
    ],
    attributes: {
        align: { type: String },
        colspan: { type: Number, render: 'colSpan' },
        rowspan: { type: Number, render: 'rowSpan' },
    },
};
exports.th = {
    render: 'th',
    attributes: {
        width: { type: String },
        align: { type: String },
        colspan: { type: Number, render: 'colSpan' },
        rowspan: { type: Number, render: 'rowSpan' },
    },
};
exports.tr = {
    render: 'tr',
    children: ['th', 'td'],
};
exports.tbody = {
    render: 'tbody',
    children: ['tr', 'tag'],
};
exports.thead = {
    render: 'thead',
    children: ['tr'],
};
exports.strong = {
    render: 'strong',
    children: ['em', 's', 'link', 'code', 'text', 'tag'],
    attributes: {
        marker: { type: String, render: false },
    },
};
exports.em = {
    render: 'em',
    children: ['strong', 's', 'link', 'code', 'text', 'tag'],
    attributes: {
        marker: { type: String, render: false },
    },
};
exports.s = {
    render: 's',
    children: ['strong', 'em', 'link', 'code', 'text', 'tag'],
};
exports.inline = {
    children: [
        'strong',
        'em',
        's',
        'code',
        'text',
        'tag',
        'link',
        'image',
        'hardbreak',
        'softbreak',
        'comment',
    ],
};
exports.link = {
    render: 'a',
    children: ['strong', 'em', 's', 'code', 'text', 'tag'],
    attributes: {
        href: { type: String, required: true },
        title: { type: String },
    },
};
exports.code = {
    render: 'code',
    attributes: {
        content: { type: String, render: false, required: true },
    },
    transform(node, config) {
        const attributes = node.transformAttributes(config);
        return (0, utils_1.buildTag)('code', attributes, [node.attributes.content]);
    },
};
exports.text = {
    attributes: {
        content: { type: String, required: true },
    },
    transform(node) {
        return node.attributes.content;
    },
};
exports.hardbreak = {
    render: 'br',
};
exports.softbreak = {
    transform() {
        return ' ';
    },
};
exports.comment = {
    attributes: {
        content: { type: String, required: true },
    },
};
exports.error = {};
exports.node = {};
