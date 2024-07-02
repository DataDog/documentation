"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transform;
const index_1 = __importDefault(require("../ast/index"));
function convertToRow(node, cellType = 'td') {
    node.type = 'tr';
    node.attributes = {};
    for (const cell of node.children)
        cell.type = cellType;
    return node;
}
function transform(document) {
    for (const node of document.walk()) {
        if (node.type !== 'tag' || node.tag !== 'table')
            continue;
        const [first, ...rest] = node.children;
        if (!first || first.type === 'table')
            continue;
        const table = new index_1.default.Node('table', node.attributes, [
            new index_1.default.Node('thead'),
            new index_1.default.Node('tbody'),
        ]);
        const [thead, tbody] = table.children;
        if (first.type === 'list')
            thead.push(convertToRow(first, 'th'));
        for (const row of rest) {
            // Convert lists to rows with special-case support for conditionals
            // When a conditional is encountered, convert all of its top-level lists to rows
            if (row.type === 'list')
                convertToRow(row);
            else if (row.type === 'tag' && row.tag === 'if') {
                const children = [];
                for (const child of row.children) {
                    // Replace children and skip HRs in order to support conditionals with multiple rows
                    if (child.type === 'hr')
                        continue;
                    if (child.type === 'list')
                        convertToRow(child);
                    children.push(child);
                }
                row.children = children;
            }
            else
                continue;
            tbody.push(row);
        }
        node.children = [table];
    }
}
