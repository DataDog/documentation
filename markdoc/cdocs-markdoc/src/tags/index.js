"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conditional_1 = require("./conditional");
const partial_1 = require("./partial");
const table_1 = require("./table");
const slot_1 = require("./slot");
exports.default = {
    else: conditional_1.tagElse,
    if: conditional_1.tagIf,
    partial: partial_1.partial,
    slot: slot_1.slot,
    table: table_1.table,
};
