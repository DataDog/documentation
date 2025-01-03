"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        coverage: {
            exclude: [
                ...config_1.configDefaults.exclude,
                '**/markdoc-client-renderer.js',
                '**/debugBookmarklet.js',
                '**/compiledScripts/**',
                '**/test/**'
            ]
        }
    }
});
