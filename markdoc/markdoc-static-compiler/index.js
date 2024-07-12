'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      }
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __exportStar =
    (this && this.__exportStar) ||
    function (m, exports) {
        for (var p in m)
            if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.format =
    exports.truthy =
    exports.validator =
    exports.transformer =
    exports.parseTags =
    exports.Tokenizer =
    exports.Ast =
    exports.renderers =
    exports.transforms =
    exports.globalAttributes =
    exports.functions =
    exports.tags =
    exports.nodes =
        void 0;
exports.parse = parse;
exports.resolve = resolve;
exports.transform = transform;
exports.validate = validate;
exports.createElement = createElement;
const ast_1 = __importDefault(require('./src/ast'));
exports.Ast = ast_1.default;
const formatter_1 = __importDefault(require('./src/formatter'));
exports.format = formatter_1.default;
const functions_1 = __importDefault(require('./src/functions'));
exports.functions = functions_1.default;
const parser_1 = __importDefault(require('./src/parser'));
const nodes = __importStar(require('./src/schema'));
exports.nodes = nodes;
const renderers_1 = __importDefault(require('./src/renderers'));
exports.renderers = renderers_1.default;
const tags_1 = __importDefault(require('./src/tags'));
exports.tags = tags_1.default;
const conditional_1 = require('./src/tags/conditional');
Object.defineProperty(exports, 'truthy', {
    enumerable: true,
    get: function () {
        return conditional_1.truthy;
    }
});
const tokenizer_1 = __importDefault(require('./src/tokenizer'));
exports.Tokenizer = tokenizer_1.default;
const transformer_1 = __importStar(require('./src/transformer'));
exports.transformer = transformer_1.default;
Object.defineProperty(exports, 'globalAttributes', {
    enumerable: true,
    get: function () {
        return transformer_1.globalAttributes;
    }
});
const transforms_1 = __importDefault(require('./src/transforms'));
exports.transforms = transforms_1.default;
const utils_1 = require('./src/utils');
Object.defineProperty(exports, 'parseTags', {
    enumerable: true,
    get: function () {
        return utils_1.parseTags;
    }
});
const validator_1 = __importStar(require('./src/validator'));
exports.validator = validator_1.default;
__exportStar(require('./src/types'), exports);
const tokenizer = new tokenizer_1.default();
function mergeConfig(config = {}) {
    return Object.assign(Object.assign({}, config), {
        tags: Object.assign(Object.assign({}, tags_1.default), config.tags),
        nodes: Object.assign(Object.assign({}, nodes), config.nodes),
        functions: Object.assign(Object.assign({}, functions_1.default), config.functions)
    });
}
function parse(content, args) {
    if (typeof content === 'string') content = tokenizer.tokenize(content);
    return (0, parser_1.default)(content, args);
}
function resolve(content, config) {
    if (Array.isArray(content)) return content.flatMap((child) => child.resolve(config));
    return content.resolve(config);
}
function transform(nodes, options) {
    const config = mergeConfig(options);
    const content = resolve(nodes, config);
    if (Array.isArray(content)) return content.flatMap((child) => child.transform(config));
    return content.transform(config);
}
function validate(content, options) {
    const config = mergeConfig(options);
    return (0, validator_1.validateTree)(content, config);
}
function createElement(name, attributes = {}, ...children) {
    return { name, attributes, children };
}
class MarkdocStaticCompiler {
    constructor(config) {
        this.parse = parse;
        this.resolve = (content) => resolve(content, this.config);
        this.transform = (content) => transform(content, this.config);
        this.validate = (content) => validate(content, this.config);
        this.config = config;
    }
}
MarkdocStaticCompiler.nodes = nodes;
MarkdocStaticCompiler.tags = tags_1.default;
MarkdocStaticCompiler.functions = functions_1.default;
MarkdocStaticCompiler.globalAttributes = transformer_1.globalAttributes;
MarkdocStaticCompiler.renderers = renderers_1.default;
MarkdocStaticCompiler.transforms = transforms_1.default;
MarkdocStaticCompiler.Ast = ast_1.default;
MarkdocStaticCompiler.Tokenizer = tokenizer_1.default;
MarkdocStaticCompiler.parseTags = utils_1.parseTags;
MarkdocStaticCompiler.transformer = transformer_1.default;
MarkdocStaticCompiler.validator = validator_1.default;
MarkdocStaticCompiler.parse = parse;
MarkdocStaticCompiler.transform = transform;
MarkdocStaticCompiler.validate = validate;
MarkdocStaticCompiler.createElement = createElement;
MarkdocStaticCompiler.truthy = conditional_1.truthy;
MarkdocStaticCompiler.format = formatter_1.default;
exports.default = MarkdocStaticCompiler;
