"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deep_assert_1 = require("deep-assert");
function deepEqualsWrapper(actual, expected, options = {}) {
    try {
        (0, deep_assert_1.deepEquals)(actual, expected, options);
        return { pass: true, message: 'Unexpected match' };
    }
    catch (err) {
        return { pass: false, message: err.message };
    }
}
const matchers = {
    toDeepEqualSubset() {
        return {
            compare(actual, expected) {
                return deepEqualsWrapper(actual, expected, {
                    allowAdditionalProps: true,
                });
            },
        };
    },
    toDeepEqual() {
        return {
            compare(actual, expected) {
                return deepEqualsWrapper(actual, expected);
            },
        };
    },
};
beforeEach(() => {
    jasmine.addMatchers(matchers);
});
