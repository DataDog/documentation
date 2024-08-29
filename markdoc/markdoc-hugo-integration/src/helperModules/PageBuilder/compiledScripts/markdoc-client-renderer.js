"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // dist/helperModules/PageBuilder/components/ContentFilter.js
  var require_ContentFilter = __commonJS({
    "dist/helperModules/PageBuilder/components/ContentFilter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.buildFilterSelectorUi = void 0;
      var buildFilterSelectorUi = (resolvedPagePrefs) => {
        let selectorHtml = "<div>";
        Object.keys(resolvedPagePrefs).forEach((prefId) => {
          const resolvedPref = resolvedPagePrefs[prefId];
          const currentValue = resolvedPref.currentValue || resolvedPref.defaultValue;
          selectorHtml += '<div class="mdoc-pref__container">';
          selectorHtml += `<div class="mdoc-pref__label">${resolvedPref.displayName}</div>`;
          resolvedPref.options.forEach((option) => {
            const selected = option.id === currentValue ? "selected" : "";
            selectorHtml += `<div class="mdoc-pref__pill ${selected}" data-pref-id="${resolvedPref.id}" data-option-id="${option.id}">${option.displayName}</div>`;
          });
          selectorHtml += "</div>";
        });
        selectorHtml += "<hr />";
        selectorHtml += "</div>";
        return selectorHtml;
      };
      exports.buildFilterSelectorUi = buildFilterSelectorUi;
    }
  });

  // dist/schemas/regexes.js
  var require_regexes = __commonJS({
    "dist/schemas/regexes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PREF_OPTIONS_ID_REGEX = exports.GLOBAL_PLACEHOLDER_REGEX = exports.PLACEHOLDER_REGEX = exports.SNAKE_CASE_REGEX = void 0;
      exports.SNAKE_CASE_REGEX = /^[a-z0-9]+(_[a-z0-9]+)*$/;
      exports.PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/;
      exports.GLOBAL_PLACEHOLDER_REGEX = /<([A-Z0-9_]+)>/g;
      exports.PREF_OPTIONS_ID_REGEX = /^([a-z0-9]+|<([A-Z0-9_]+)>)(_([a-z0-9]+)|_<([A-Z0-9_]+)>)*_options$/;
    }
  });

  // dist/helperModules/prefsResolution.js
  var require_prefsResolution = __commonJS({
    "dist/helperModules/prefsResolution.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolvePagePrefs = resolvePagePrefs;
      exports.resolveMinifiedPagePrefs = resolveMinifiedPagePrefs;
      exports.resolveMinifiedPrefOptionsSource = resolveMinifiedPrefOptionsSource;
      exports.resolvePrefOptionsSource = resolvePrefOptionsSource;
      var regexes_1 = require_regexes();
      function resolvePagePrefs(p) {
        const resolvedPagePrefs = {};
        const valsByPrefIdDup = Object.assign({}, p.valsByPrefId);
        p.pagePrefsConfig.forEach((prefConfig) => {
          const prefConfigDup = resolvePrefOptionsSource({
            pagePrefConfig: prefConfig,
            valsByPrefId: valsByPrefIdDup
          });
          const defaultValue = prefConfigDup.default_value || p.prefOptionsConfig[prefConfigDup.options_source].find((option) => option.default).id;
          const possibleValues = p.prefOptionsConfig[prefConfigDup.options_source].map((option) => option.id);
          let currentValue = p.valsByPrefId[prefConfigDup.id];
          if (currentValue && !possibleValues.includes(currentValue)) {
            currentValue = defaultValue;
            valsByPrefIdDup[prefConfigDup.id] = defaultValue;
          }
          const resolvedPref = {
            id: prefConfigDup.id,
            displayName: prefConfigDup.display_name,
            defaultValue,
            currentValue,
            options: p.prefOptionsConfig[prefConfigDup.options_source].map((option) => ({
              id: option.id,
              displayName: option.display_name
            }))
          };
          resolvedPagePrefs[prefConfigDup.id] = resolvedPref;
        });
        return resolvedPagePrefs;
      }
      function resolveMinifiedPagePrefs(p) {
        const resolvedPagePrefs = {};
        const valsByPrefIdDup = Object.assign({}, p.valsByPrefId);
        p.pagePrefsConfig.forEach((prefConfig) => {
          const prefConfigDup = resolveMinifiedPrefOptionsSource({
            pagePrefConfig: prefConfig,
            valsByPrefId: valsByPrefIdDup
          });
          const defaultValue = prefConfigDup.d || p.prefOptionsConfig[prefConfigDup.o].find((option) => option.d).i;
          const possibleValues = p.prefOptionsConfig[prefConfigDup.o].map((option) => option.i);
          let currentValue = p.valsByPrefId[prefConfigDup.i];
          if (currentValue && !possibleValues.includes(currentValue)) {
            currentValue = defaultValue;
            valsByPrefIdDup[prefConfigDup.i] = defaultValue;
          }
          const resolvedPref = {
            id: prefConfigDup.i,
            displayName: prefConfigDup.n,
            defaultValue,
            currentValue,
            options: p.prefOptionsConfig[prefConfigDup.o].map((option) => ({
              id: option.i,
              displayName: option.n
            }))
          };
          resolvedPagePrefs[prefConfigDup.i] = resolvedPref;
        });
        return resolvedPagePrefs;
      }
      function resolveMinifiedPrefOptionsSource(p) {
        const prefConfigDup = Object.assign({}, p.pagePrefConfig);
        if (regexes_1.GLOBAL_PLACEHOLDER_REGEX.test(prefConfigDup.o)) {
          prefConfigDup.o = prefConfigDup.o.replace(regexes_1.GLOBAL_PLACEHOLDER_REGEX, (_match, placeholder) => {
            return p.valsByPrefId[placeholder.toLowerCase()];
          });
        }
        return prefConfigDup;
      }
      function resolvePrefOptionsSource(p) {
        const prefConfigDup = Object.assign({}, p.pagePrefConfig);
        if (regexes_1.GLOBAL_PLACEHOLDER_REGEX.test(prefConfigDup.options_source)) {
          prefConfigDup.options_source = prefConfigDup.options_source.replace(regexes_1.GLOBAL_PLACEHOLDER_REGEX, (_match, placeholder) => {
            return p.valsByPrefId[placeholder.toLowerCase()];
          });
        }
        return prefConfigDup;
      }
    }
  });

  // ../markdoc-static-compiler/src/grammar/tag.js
  var require_tag = __commonJS({
    "../markdoc-static-compiler/src/grammar/tag.js"(exports, module) {
      "use strict";
      function peg$subclass(child, parent) {
        function C() {
          this.constructor = child;
        }
        C.prototype = parent.prototype;
        child.prototype = new C();
      }
      function peg$SyntaxError(message, expected, found, location) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, peg$SyntaxError);
        }
      }
      peg$subclass(peg$SyntaxError, Error);
      peg$SyntaxError.buildMessage = function(expected, found, location) {
        var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return '"' + literalEscape(expectation.text) + '"';
          },
          class: function(expectation) {
            var escapedParts = expectation.parts.map(function(part) {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          },
          any: function() {
            return "any character";
          },
          end: function() {
            return "end of input";
          },
          other: function(expectation) {
            return expectation.description;
          },
          not: function(expectation) {
            return "not " + describeExpectation(expectation.expected);
          }
        };
        function hex(ch) {
          return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        function classEscape(s) {
          return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
            return "\\x" + hex(ch);
          });
        }
        function describeExpectation(expectation) {
          return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        function describeExpected(expected2) {
          var descriptions = expected2.map(describeExpectation);
          var i, j;
          descriptions.sort();
          if (descriptions.length > 0) {
            for (i = 1, j = 1; i < descriptions.length; i++) {
              if (descriptions[i - 1] !== descriptions[i]) {
                descriptions[j] = descriptions[i];
                j++;
              }
            }
            descriptions.length = j;
          }
          switch (descriptions.length) {
            case 1:
              return descriptions[0];
            case 2:
              return descriptions[0] + " or " + descriptions[1];
            default:
              return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
          }
        }
        function describeFound(found2) {
          return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
      };
      function peg$parse(input, options) {
        options = options !== void 0 ? options : {};
        var peg$FAILED = {};
        var peg$startRuleFunctions = { Top: peg$parseTop };
        var peg$startRuleFunction = peg$parseTop;
        var peg$c0 = "/";
        var peg$c1 = ".";
        var peg$c2 = "#";
        var peg$c3 = "=";
        var peg$c4 = "(";
        var peg$c5 = ")";
        var peg$c6 = ",";
        var peg$c7 = "[";
        var peg$c8 = "]";
        var peg$c9 = "null";
        var peg$c10 = "true";
        var peg$c11 = "false";
        var peg$c12 = "{";
        var peg$c13 = "}";
        var peg$c14 = ":";
        var peg$c15 = "-";
        var peg$c16 = '"';
        var peg$c17 = "\\";
        var peg$c18 = "n";
        var peg$c19 = "r";
        var peg$c20 = "t";
        var peg$r0 = /^[$@]/;
        var peg$r1 = /^[0-9]/;
        var peg$r2 = /^[^\0-\x1F"\\]/;
        var peg$r3 = /^[a-zA-Z0-9_\-]/;
        var peg$r4 = /^[ \n\t]/;
        var peg$e0 = peg$literalExpectation("/", false);
        var peg$e1 = peg$otherExpectation("tag name");
        var peg$e2 = peg$otherExpectation("class");
        var peg$e3 = peg$otherExpectation("id");
        var peg$e4 = peg$literalExpectation("=", false);
        var peg$e5 = peg$literalExpectation("(", false);
        var peg$e6 = peg$literalExpectation(")", false);
        var peg$e7 = peg$literalExpectation(",", false);
        var peg$e8 = peg$otherExpectation("variable");
        var peg$e9 = peg$otherExpectation("null");
        var peg$e10 = peg$otherExpectation("boolean");
        var peg$e11 = peg$literalExpectation("[", false);
        var peg$e12 = peg$literalExpectation("]", false);
        var peg$e13 = peg$literalExpectation("{", false);
        var peg$e14 = peg$literalExpectation("}", false);
        var peg$e15 = peg$literalExpectation(":", false);
        var peg$e16 = peg$otherExpectation("number");
        var peg$e17 = peg$otherExpectation("string");
        var peg$e18 = peg$otherExpectation("identifier");
        var peg$e19 = peg$otherExpectation("whitespace");
        var peg$f0 = function(variable) {
          return { type: "variable", meta: { variable } };
        };
        var peg$f1 = function(attributes) {
          return { type: "annotation", meta: { attributes } };
        };
        var peg$f2 = function(tag, value) {
          return value;
        };
        var peg$f3 = function(tag, primary, attributes, close) {
          if (primary) {
            attributes = attributes || [];
            attributes.unshift({
              type: "attribute",
              name: "primary",
              value: primary
            });
          }
          const [type, nesting] = close ? ["tag", 0] : ["tag_open", 1];
          return { type, nesting, meta: { tag, attributes } };
        };
        var peg$f4 = function(tag) {
          return { type: "tag_close", nesting: -1, meta: { tag } };
        };
        var peg$f5 = function(head, tail) {
          return !head ? [] : [head, ...tail];
        };
        var peg$f6 = function(item) {
          return item;
        };
        var peg$f7 = function(ids) {
          return ids;
        };
        var peg$f8 = function(classes) {
          return classes;
        };
        var peg$f9 = function(attribute) {
          return attribute;
        };
        var peg$f10 = function(name) {
          return { type: "class", name, value: true };
        };
        var peg$f11 = function(value) {
          return { type: "attribute", name: "id", value };
        };
        var peg$f12 = function(name, value) {
          return { type: "attribute", name, value };
        };
        var peg$f13 = function(name, head, tail) {
          return head ? [head, ...tail] : [];
        };
        var peg$f14 = function(name, params) {
          let parameters = {};
          for (let [index, { name: name2, value }] of params.entries())
            parameters[name2 || index] = value;
          return new Function3(name, parameters);
        };
        var peg$f15 = function(name) {
          return name;
        };
        var peg$f16 = function(name, value) {
          return { name, value };
        };
        var peg$f17 = function(value) {
          return value;
        };
        var peg$f18 = function(prefix, head, tail) {
          if (prefix === "@")
            return [head, ...tail];
          return new Variable2([head, ...tail]);
        };
        var peg$f19 = function() {
          return null;
        };
        var peg$f20 = function() {
          return true;
        };
        var peg$f21 = function() {
          return false;
        };
        var peg$f22 = function(head, tail) {
          return [head, ...tail];
        };
        var peg$f23 = function(value) {
          return value || [];
        };
        var peg$f24 = function(head, tail) {
          return Object.assign(head, ...tail);
        };
        var peg$f25 = function(value) {
          return value || {};
        };
        var peg$f26 = function(key, value) {
          return key === "$$mdtype" ? {} : { [key]: value };
        };
        var peg$f27 = function() {
          return parseFloat(text());
        };
        var peg$f28 = function(value) {
          return value.join("");
        };
        var peg$f29 = function() {
          return "\n";
        };
        var peg$f30 = function() {
          return "\r";
        };
        var peg$f31 = function() {
          return "	";
        };
        var peg$f32 = function(sequence) {
          return sequence;
        };
        var peg$currPos = 0;
        var peg$savedPos = 0;
        var peg$posDetailsCache = [{ line: 1, column: 1 }];
        var peg$expected = [];
        var peg$silentFails = 0;
        var peg$result;
        if ("startRule" in options) {
          if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error(
              `Can't start parsing from rule "` + options.startRule + '".'
            );
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function text() {
          return input.substring(peg$savedPos, peg$currPos);
        }
        function offset() {
          return peg$savedPos;
        }
        function range() {
          return [peg$savedPos, peg$currPos];
        }
        function location() {
          return peg$computeLocation(peg$savedPos, peg$currPos);
        }
        function expected(description, location2) {
          location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
          throw peg$buildStructuredError(
            [peg$otherExpectation(description)],
            input.substring(peg$savedPos, peg$currPos),
            location2
          );
        }
        function error(message, location2) {
          location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
          throw peg$buildSimpleError(message, location2);
        }
        function peg$literalExpectation(text2, ignoreCase) {
          return { type: "literal", text: text2, ignoreCase };
        }
        function peg$classExpectation(parts, inverted, ignoreCase) {
          return {
            type: "class",
            parts,
            inverted,
            ignoreCase
          };
        }
        function peg$anyExpectation() {
          return { type: "any" };
        }
        function peg$endExpectation() {
          return { type: "end" };
        }
        function peg$otherExpectation(description) {
          return { type: "other", description };
        }
        function peg$computePosDetails(pos) {
          var details = peg$posDetailsCache[pos];
          var p;
          if (details) {
            return details;
          } else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
              p--;
            }
            details = peg$posDetailsCache[p];
            details = {
              line: details.line,
              column: details.column
            };
            while (p < pos) {
              if (input.charCodeAt(p) === 10) {
                details.line++;
                details.column = 1;
              } else {
                details.column++;
              }
              p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
          }
        }
        var peg$VALIDFILENAME = typeof options.filename === "string" && options.filename.length > 0;
        function peg$computeLocation(startPos, endPos) {
          var loc = {};
          if (peg$VALIDFILENAME)
            loc.filename = options.filename;
          var startPosDetails = peg$computePosDetails(startPos);
          loc.start = {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          };
          var endPosDetails = peg$computePosDetails(endPos);
          loc.end = {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          };
          return loc;
        }
        function peg$begin() {
          peg$expected.push({ pos: peg$currPos, variants: [] });
        }
        function peg$expect(expected2) {
          var top = peg$expected[peg$expected.length - 1];
          if (peg$currPos < top.pos) {
            return;
          }
          if (peg$currPos > top.pos) {
            top.pos = peg$currPos;
            top.variants = [];
          }
          top.variants.push(expected2);
        }
        function peg$end(invert) {
          var expected2 = peg$expected.pop();
          var top = peg$expected[peg$expected.length - 1];
          var variants = expected2.variants;
          if (top.pos !== expected2.pos) {
            return;
          }
          if (invert) {
            variants = variants.map(function(e) {
              return e.type === "not" ? e.expected : { type: "not", expected: e };
            });
          }
          Array.prototype.push.apply(top.variants, variants);
        }
        function peg$buildSimpleError(message, location2) {
          return new peg$SyntaxError(message, null, null, location2);
        }
        function peg$buildStructuredError(expected2, found, location2) {
          return new peg$SyntaxError(
            peg$SyntaxError.buildMessage(expected2, found, location2),
            expected2,
            found,
            location2
          );
        }
        function peg$buildError() {
          var expected2 = peg$expected[0];
          var failPos = expected2.pos;
          return peg$buildStructuredError(
            expected2.variants,
            failPos < input.length ? input.charAt(failPos) : null,
            failPos < input.length ? peg$computeLocation(failPos, failPos + 1) : peg$computeLocation(failPos, failPos)
          );
        }
        function peg$parseTop() {
          var s0;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$parseTopLevelValue();
          if (s0 === peg$FAILED) {
            s0 = peg$parseAnnotation();
            if (s0 === peg$FAILED) {
              s0 = peg$parseTagOpen();
              if (s0 === peg$FAILED) {
                s0 = peg$parseTagClose();
              }
            }
          }
          return s0;
        }
        function peg$parseTopLevelValue() {
          var s0, s1;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseVariable();
          if (s1 === peg$FAILED) {
            s1 = peg$parseFunction();
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f0(s1);
          }
          s0 = s1;
          return s0;
        }
        function peg$parseAnnotation() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseTagAttributes();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parse_();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parse_();
            }
            peg$savedPos = s0;
            s0 = peg$f1(s1);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTagOpen() {
          var s0, s1, s2, s3, s4, s5, s6;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseTagName();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parse_();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parse_();
            }
            s3 = peg$currPos;
            s4 = peg$parseValue();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              peg$savedPos = s3;
              s3 = peg$f2(s1, s4);
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            s4 = peg$parseTagAttributes();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            s5 = [];
            s6 = peg$parse_();
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$parse_();
            }
            rule$expects(peg$e0);
            if (input.charCodeAt(peg$currPos) === 47) {
              s6 = peg$c0;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
            }
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            peg$savedPos = s0;
            s0 = peg$f3(s1, s3, s4, s6);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTagClose() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          rule$expects(peg$e0);
          if (input.charCodeAt(peg$currPos) === 47) {
            s1 = peg$c0;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseTagName();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f4(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTagName() {
          var s0;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e1);
          peg$silentFails++;
          s0 = peg$parseIdentifier();
          peg$silentFails--;
          return s0;
        }
        function peg$parseTagAttributes() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseTagAttributesItem();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseTagAttributesTail();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseTagAttributesTail();
            }
            peg$savedPos = s0;
            s0 = peg$f5(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTagAttributesTail() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parse_();
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseTagAttributesItem();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f6(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTagAttributesItem() {
          var s0, s1;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseTagShortcutId();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f7(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseTagShortcutClass();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$f8(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseTagAttribute();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$f9(s1);
              }
              s0 = s1;
            }
          }
          return s0;
        }
        function peg$parseTagShortcutClass() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e2);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c1;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseIdentifier();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f10(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseTagShortcutId() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e3);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c2;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseIdentifier();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f11(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseTagAttribute() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseIdentifier();
          if (s1 !== peg$FAILED) {
            rule$expects(peg$e4);
            if (input.charCodeAt(peg$currPos) === 61) {
              s2 = peg$c3;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseValue();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f12(s1, s3);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseFunction() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseIdentifier();
          if (s1 !== peg$FAILED) {
            rule$expects(peg$e5);
            if (input.charCodeAt(peg$currPos) === 40) {
              s2 = peg$c4;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parse_();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parse_();
              }
              s4 = peg$currPos;
              s5 = peg$parseFunctionParameter();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              s6 = [];
              s7 = peg$parseFunctionParameterTail();
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$parseFunctionParameterTail();
              }
              peg$savedPos = s4;
              s4 = peg$f13(s1, s5, s6);
              rule$expects(peg$e6);
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c5;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f14(s1, s4);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseFunctionParameter() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseIdentifier();
          if (s2 !== peg$FAILED) {
            rule$expects(peg$e4);
            if (input.charCodeAt(peg$currPos) === 61) {
              s3 = peg$c3;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s1;
              s1 = peg$f15(s2);
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 === peg$FAILED) {
            s1 = null;
          }
          s2 = peg$parseValue();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f16(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseFunctionParameterTail() {
          var s0, s1, s2, s3, s4;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parse_();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parse_();
          }
          rule$expects(peg$e7);
          if (input.charCodeAt(peg$currPos) === 44) {
            s2 = peg$c6;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parse_();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parse_();
            }
            s4 = peg$parseFunctionParameter();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f17(s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseTrailingComma() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parse_();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parse_();
          }
          rule$expects(peg$e7);
          if (input.charCodeAt(peg$currPos) === 44) {
            s2 = peg$c6;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = null;
          }
          return s0;
        }
        function peg$parseVariable() {
          var s0, s1, s2, s3, s4;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e8);
          peg$silentFails++;
          s0 = peg$currPos;
          if (peg$r0.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseIdentifier();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseVariableTail();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseVariableTail();
              }
              peg$savedPos = s0;
              s0 = peg$f18(s1, s2, s3);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseVariableTail() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c1;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseIdentifier();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f15(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
              s1 = peg$c7;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseValueNumber();
              if (s2 === peg$FAILED) {
                s2 = peg$parseValueString();
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s3 = peg$c8;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f17(s2);
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
          return s0;
        }
        function peg$parseValue() {
          var s0;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$parseValueNull();
          if (s0 === peg$FAILED) {
            s0 = peg$parseValueBoolean();
            if (s0 === peg$FAILED) {
              s0 = peg$parseValueString();
              if (s0 === peg$FAILED) {
                s0 = peg$parseValueNumber();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseValueArray();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseValueHash();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseFunction();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseVariable();
                      }
                    }
                  }
                }
              }
            }
          }
          return s0;
        }
        function peg$parseValueNull() {
          var s0, s1;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e9);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c9) {
            s1 = peg$c9;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f19();
          }
          s0 = s1;
          peg$silentFails--;
          return s0;
        }
        function peg$parseValueBoolean() {
          var s0, s1;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e10);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c10) {
            s1 = peg$c10;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$f20();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5) === peg$c11) {
              s1 = peg$c11;
              peg$currPos += 5;
            } else {
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$f21();
            }
            s0 = s1;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseValueArray() {
          var s0, s1, s2, s3, s4, s5, s6;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          rule$expects(peg$e11);
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parse_();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parse_();
            }
            s3 = peg$currPos;
            s4 = peg$parseValue();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseValueArrayTail();
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parseValueArrayTail();
              }
              s6 = peg$parseTrailingComma();
              peg$savedPos = s3;
              s3 = peg$f22(s4, s5);
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            s4 = [];
            s5 = peg$parse_();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parse_();
            }
            rule$expects(peg$e12);
            if (input.charCodeAt(peg$currPos) === 93) {
              s5 = peg$c8;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f23(s3);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseValueArrayTail() {
          var s0, s1, s2, s3, s4;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parse_();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parse_();
          }
          rule$expects(peg$e7);
          if (input.charCodeAt(peg$currPos) === 44) {
            s2 = peg$c6;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parse_();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parse_();
            }
            s4 = peg$parseValue();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f17(s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseValueHash() {
          var s0, s1, s2, s3, s4, s5, s6;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          rule$expects(peg$e13);
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c12;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parse_();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parse_();
            }
            s3 = peg$currPos;
            s4 = peg$parseValueHashItem();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseValueHashTail();
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parseValueHashTail();
              }
              s6 = peg$parseTrailingComma();
              peg$savedPos = s3;
              s3 = peg$f24(s4, s5);
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            s4 = [];
            s5 = peg$parse_();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parse_();
            }
            rule$expects(peg$e14);
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c13;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f25(s3);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseValueHashTail() {
          var s0, s1, s2, s3, s4;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parse_();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parse_();
          }
          rule$expects(peg$e7);
          if (input.charCodeAt(peg$currPos) === 44) {
            s2 = peg$c6;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parse_();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parse_();
            }
            s4 = peg$parseValueHashItem();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f6(s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseValueHashItem() {
          var s0, s1, s2, s3, s4;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          s1 = peg$parseIdentifier();
          if (s1 === peg$FAILED) {
            s1 = peg$parseValueString();
          }
          if (s1 !== peg$FAILED) {
            rule$expects(peg$e15);
            if (input.charCodeAt(peg$currPos) === 58) {
              s2 = peg$c14;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parse_();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parse_();
              }
              s4 = peg$parseValue();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s0 = peg$f26(s1, s4);
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseValueNumber() {
          var s0, s1, s2, s3, s4, s5, s6;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e16);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c15;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 === peg$FAILED) {
            s1 = null;
          }
          s2 = [];
          if (peg$r1.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$r1.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 46) {
              s4 = peg$c1;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              if (peg$r1.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
              }
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  if (peg$r1.test(input.charAt(peg$currPos))) {
                    s6 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                  }
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            peg$savedPos = s0;
            s0 = peg$f27();
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseValueString() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e17);
          peg$silentFails++;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c16;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseValueStringChars();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseValueStringChars();
            }
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c16;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f28(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parseValueStringChars() {
          var s0;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          if (peg$r2.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseValueStringEscapes();
          }
          return s0;
        }
        function peg$parseValueStringEscapes() {
          var s0, s1, s2, s3;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c17;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s2 = peg$c16;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 92) {
                s2 = peg$c17;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
              }
              if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 110) {
                  s3 = peg$c18;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s2;
                  s3 = peg$f29();
                }
                s2 = s3;
                if (s2 === peg$FAILED) {
                  s2 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 114) {
                    s3 = peg$c19;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f30();
                  }
                  s2 = s3;
                  if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 116) {
                      s3 = peg$c20;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s2;
                      s3 = peg$f31();
                    }
                    s2 = s3;
                  }
                }
              }
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f32(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseIdentifier() {
          var s0, s1, s2;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e18);
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          if (peg$r3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$r3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
          peg$silentFails--;
          return s0;
        }
        function peg$parse_() {
          var s0;
          var rule$expects = function(expected2) {
            if (peg$silentFails === 0)
              peg$expect(expected2);
          };
          rule$expects(peg$e19);
          peg$silentFails++;
          if (peg$r4.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          return s0;
        }
        const { Variable: Variable2, Function: Function3 } = options;
        peg$begin();
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$expect(peg$endExpectation());
          }
          throw peg$buildError();
        }
      }
      module.exports = {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
      };
    }
  });

  // ../markdoc-static-compiler/src/ast/variable.ts
  var Variable;
  var init_variable = __esm({
    "../markdoc-static-compiler/src/ast/variable.ts"() {
      "use strict";
      Variable = class {
        constructor(path = []) {
          this.$$mdtype = "Variable";
          this.path = path;
        }
        /* NEW */
        resolve({ variables } = {}) {
          if (variables instanceof Function) {
            return variables(this.path);
          }
          const value = this.path.reduce((obj = {}, key) => obj[key], variables);
          return {
            $$mdtype: "Variable",
            path: this.path,
            value
          };
        }
        /* OLD
        resolve({ variables }: Config = {}) {
          return variables instanceof Function
            ? variables(this.path)
            : this.path.reduce((obj = {}, key) => obj[key], variables);
        }
        */
      };
    }
  });

  // ../markdoc-static-compiler/src/ast/base.ts
  function isAst(value) {
    return !!value?.$$mdtype;
  }
  function resolve(value, config = {}) {
    if (value == null || typeof value !== "object")
      return value;
    if (Array.isArray(value))
      return value.map((item) => resolve(item, config));
    if (isAst(value) && value?.resolve instanceof Function) {
      return value.resolve(config);
    }
    if (Object.getPrototypeOf(value) !== Object.prototype)
      return value;
    const output = {};
    for (const [k, v] of Object.entries(value))
      output[k] = resolve(v, config);
    return output;
  }
  var init_base = __esm({
    "../markdoc-static-compiler/src/ast/base.ts"() {
      "use strict";
    }
  });

  // ../markdoc-static-compiler/src/ast/function.ts
  var Function2;
  var init_function = __esm({
    "../markdoc-static-compiler/src/ast/function.ts"() {
      "use strict";
      init_base();
      Function2 = class {
        constructor(name, parameters) {
          this.$$mdtype = "Function";
          this.name = name;
          this.parameters = parameters;
        }
        resolve(config = {}) {
          const fn = config?.functions?.[this.name];
          if (!fn)
            return null;
          const parameters = resolve(this.parameters, config);
          return fn.transform?.(parameters, config);
        }
      };
    }
  });

  // ../markdoc-static-compiler/src/utils.ts
  var utils_exports = {};
  __export(utils_exports, {
    CLOSE: () => CLOSE,
    IDENTIFIER_REGEX: () => IDENTIFIER_REGEX,
    OPEN: () => OPEN,
    buildTag: () => buildTag,
    findTagEnd: () => findTagEnd,
    isClientFunction: () => isClientFunction,
    isClientVariable: () => isClientVariable,
    isIdentifier: () => isIdentifier,
    isPromise: () => isPromise,
    isTag: () => isTag,
    parseTags: () => parseTags
  });
  function isIdentifier(s) {
    return typeof s === "string" && IDENTIFIER_REGEX.test(s);
  }
  function isPromise(a) {
    return a && typeof a === "object" && typeof a.then === "function";
  }
  function findTagEnd(content, start = 0) {
    let state = 0 /* normal */;
    for (let pos = start; pos < content.length; pos++) {
      const char = content[pos];
      switch (state) {
        case 1 /* string */:
          switch (char) {
            case '"':
              state = 0 /* normal */;
              break;
            case "\\":
              state = 2 /* escape */;
              break;
          }
          break;
        case 2 /* escape */:
          state = 1 /* string */;
          break;
        case 0 /* normal */:
          if (char === '"')
            state = 1 /* string */;
          else if (content.startsWith(CLOSE, pos))
            return pos;
      }
    }
    return null;
  }
  function parseTag(content, line, contentStart) {
    try {
      return (0, import_tag.parse)(content, { Variable, Function: Function2 });
    } catch (error) {
      if (!(error instanceof import_tag.SyntaxError))
        throw error;
      const {
        message,
        location: { start, end }
      } = error;
      const location = {
        start: { line, character: start.offset + contentStart },
        end: { line: line + 1, character: end.offset + contentStart }
      };
      return { type: "error", meta: { error: { message, location } } };
    }
  }
  function parseTags(content, firstLine = 0) {
    let line = firstLine + 1;
    const output = [];
    let start = 0;
    for (let pos = 0; pos < content.length; pos++) {
      if (content[pos] === "\n") {
        line++;
        continue;
      }
      if (!content.startsWith(OPEN, pos))
        continue;
      const end = findTagEnd(content, pos);
      if (end == null) {
        pos = pos + OPEN.length;
        continue;
      }
      const text = content.slice(pos, end + CLOSE.length);
      const inner = content.slice(pos + OPEN.length, end);
      const lineStart = content.lastIndexOf("\n", pos);
      const lineEnd = content.indexOf("\n", end);
      const lineContent = content.slice(lineStart, lineEnd);
      const tag = parseTag(inner.trim(), line, pos - lineStart);
      const precedingTextEnd = lineContent.trim() === text ? lineStart : pos;
      const precedingText = content.slice(start, precedingTextEnd);
      output.push({
        type: "text",
        start,
        end: pos - 1,
        content: precedingText
      });
      output.push({
        map: [line, line + 1],
        position: {
          start: pos - lineStart,
          end: pos - lineStart + text.length
        },
        start: pos,
        end: pos + text.length - 1,
        info: text,
        ...tag
      });
      start = end + CLOSE.length;
      pos = start - 1;
    }
    output.push({
      type: "text",
      start,
      end: content.length - 1,
      content: content.slice(start)
    });
    return output;
  }
  function buildTag(name = "div", attributes = {}, children = []) {
    return {
      $$mdtype: "Tag",
      name,
      attributes,
      children
    };
  }
  function isTag(tag) {
    return !!(tag?.$$mdtype === "Tag");
  }
  function isClientVariable(variable) {
    return !!(variable?.$$mdtype === "Variable");
  }
  function isClientFunction(func) {
    return !!(func?.$$mdtype === "Function");
  }
  var import_tag, OPEN, CLOSE, IDENTIFIER_REGEX;
  var init_utils = __esm({
    "../markdoc-static-compiler/src/utils.ts"() {
      "use strict";
      import_tag = __toESM(require_tag());
      init_variable();
      init_function();
      OPEN = "{%";
      CLOSE = "%}";
      IDENTIFIER_REGEX = /^[a-zA-Z0-9_-]+$/;
    }
  });

  // ../markdoc-static-compiler/src/tags/conditional.ts
  var conditional_exports = {};
  __export(conditional_exports, {
    tagElse: () => tagElse,
    tagIf: () => tagIf,
    truthy: () => truthy
  });
  function truthy(param) {
    if (typeof param === "object" && "value" in param) {
      return param.value !== false && param.value !== void 0 && param.value !== null;
    }
    return param !== false && param !== void 0 && param !== null;
  }
  var tagIf, tagElse;
  var init_conditional = __esm({
    "../markdoc-static-compiler/src/tags/conditional.ts"() {
      "use strict";
      init_utils();
      tagIf = {
        attributes: {
          primary: { type: Object, render: true }
        },
        transform(node, config) {
          const buildEnclosingTag = (children) => {
            const enclosingTag = {
              $$mdtype: "Tag",
              name: node.attributes.inline ? "span" : "div",
              if: node.attributes.primary,
              attributes: {
                display: truthy(node.attributes.primary) ? "true" : "false"
                // uuid: createUuid(),
              },
              children
            };
            return enclosingTag;
          };
          const nodes = node.children.flatMap(
            (child) => child.transform(config)
          );
          if (nodes.some(isPromise)) {
            return Promise.all(nodes).then((nodes2) => {
              const tag = buildEnclosingTag(nodes2.flat());
              return [tag];
            });
          }
          return [buildEnclosingTag(nodes)];
        }
      };
      tagElse = {
        selfClosing: true,
        attributes: {
          primary: { type: Object, render: false }
        }
      };
    }
  });

  // ../markdoc-static-compiler/src/functions/index.ts
  var functions_exports = {};
  __export(functions_exports, {
    default: () => functions_default
  });
  var RefGenerator, and, or, not, equals, debug, defaultFn, functions_default;
  var init_functions = __esm({
    "../markdoc-static-compiler/src/functions/index.ts"() {
      "use strict";
      init_conditional();
      RefGenerator = class _RefGenerator {
        static {
          this.ref = 0;
        }
        static generateRef() {
          return `${_RefGenerator.ref++}`;
        }
      };
      and = {
        transform(parameters) {
          const value = Object.values(parameters).every((p) => {
            if (typeof p === "object") {
              return truthy(p.value);
            } else {
              return truthy(p);
            }
          });
          return {
            $$mdtype: "Function",
            name: "and",
            value,
            parameters,
            ref: RefGenerator.generateRef()
          };
        }
      };
      or = {
        transform(parameters) {
          const value = Object.values(parameters).find((p) => truthy(p.value)) !== void 0;
          return {
            $$mdtype: "Function",
            name: "or",
            value,
            parameters,
            ref: RefGenerator.generateRef()
          };
        }
      };
      not = {
        parameters: {
          0: { required: true }
        },
        transform(parameters) {
          const value = !truthy(parameters[0].value);
          return {
            $$mdtype: "Function",
            name: "not",
            value,
            parameters,
            ref: RefGenerator.generateRef()
          };
        }
      };
      equals = {
        transform(parameters) {
          const values = Object.values(parameters).map((p) => {
            if (typeof p === "object") {
              return p.value;
            } else {
              return p;
            }
          });
          const value = values.every((v) => v === values[0]);
          return {
            $$mdtype: "Function",
            name: "equals",
            value,
            parameters,
            ref: RefGenerator.generateRef()
          };
        }
      };
      debug = {
        transform(parameters) {
          if (typeof parameters[0] === "object") {
            return JSON.stringify(parameters[0].value, null, 2);
          } else {
            return JSON.stringify(parameters[0], null, 2);
          }
        }
      };
      defaultFn = {
        transform(parameters) {
          let value;
          Object.values(parameters).forEach((p) => {
            if (value !== void 0)
              return;
            if (typeof p === "object") {
              value = p.value;
            } else {
              value = p;
            }
          });
          return {
            $$mdtype: "Function",
            name: "default",
            value,
            parameters
          };
        }
      };
      functions_default = { and, or, not, equals, default: defaultFn, debug };
    }
  });

  // ../markdoc-static-compiler/src/reresolver/index.js
  var require_reresolver = __commonJS({
    "../markdoc-static-compiler/src/reresolver/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reresolve = reresolve;
      exports.reresolveIfNode = reresolveIfNode;
      exports.reresolveFunctionNode = reresolveFunctionNode;
      exports.reresolveVariableNode = reresolveVariableNode;
      var functions_1 = __importDefault((init_functions(), __toCommonJS(functions_exports)));
      var conditional_1 = (init_conditional(), __toCommonJS(conditional_exports));
      var utils_1 = (init_utils(), __toCommonJS(utils_exports));
      function reresolve(node, config) {
        if (!config) {
          throw new Error("Config is required to refresh client renderable tree nodes.");
        }
        if (node === null || typeof node !== "object") {
          return node;
        }
        if (Array.isArray(node)) {
          for (const n of node) {
            if ("$$mdtype" in n) {
              reresolve(n, config);
            }
          }
          return node;
        }
        if ((0, utils_1.isClientVariable)(node)) {
          node = reresolveVariableNode(node, config);
          return node;
        }
        if ((0, utils_1.isClientFunction)(node)) {
          node = reresolveFunctionNode(node, config);
          return node;
        }
        if (!(0, utils_1.isTag)(node)) {
          return node;
        }
        node.children = node.children.map((child) => {
          if ((0, utils_1.isTag)(child) || (0, utils_1.isClientVariable)(child) || (0, utils_1.isClientFunction)(child)) {
            return reresolve(child, config);
          }
          return child;
        });
        if ("if" in node) {
          node = reresolveIfNode(node, config);
          return node;
        }
        return node;
      }
      function reresolveIfNode(ifNode, config) {
        let condition = ifNode.if;
        if ((0, utils_1.isClientVariable)(condition)) {
          condition = reresolveVariableNode(condition, config);
        } else if ((0, utils_1.isClientFunction)(condition)) {
          condition = reresolveFunctionNode(condition, config);
        }
        if ((0, conditional_1.truthy)(condition)) {
          ifNode.attributes.display = "true";
        } else {
          ifNode.attributes.display = "false";
        }
        return ifNode;
      }
      function reresolveFunctionNode(functionNode, config) {
        for (const [key, value2] of Object.entries(functionNode.parameters)) {
          if (value2.$$mdtype === "Variable") {
            functionNode.parameters[key] = reresolveVariableNode(value2, config);
          } else if (value2.$$mdtype === "Function") {
            functionNode.parameters[key] = reresolveFunctionNode(value2, config);
          }
        }
        const evaluationFunction = functions_1.default[functionNode.name];
        if (!evaluationFunction)
          throw new Error(`Unknown function: ${functionNode.name}`);
        if (!evaluationFunction.transform)
          throw new Error(`Function ${functionNode.name} has no transform method`);
        const value = evaluationFunction.transform(functionNode.parameters, config).value;
        functionNode.value = value;
        return functionNode;
      }
      function reresolveVariableNode(variableNode, config) {
        if (config.variables === void 0)
          return {
            $$mdtype: "Variable",
            path: variableNode.path,
            value: void 0
          };
        if (config.variables instanceof Function) {
          return {
            $$mdtype: "Variable",
            path: variableNode.path,
            value: config.variables(variableNode.path)
          };
        }
        let value;
        for (const key of variableNode.path) {
          value = value ? value[key] : config.variables[key];
        }
        variableNode.value = value;
        return variableNode;
      }
    }
  });

  // dist/helperModules/PageBuilder/pageConfigMinification.js
  var require_pageConfigMinification = __commonJS({
    "dist/helperModules/PageBuilder/pageConfigMinification.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.expandClientFunction = exports.minifyClientFunction = exports.minifyClientVariable = exports.expandClientVariable = exports.CLIENT_FUNCTION_MINIFY_MAP = exports.CLIENT_FUNCTION_EXPAND_MAP = void 0;
      exports.CLIENT_FUNCTION_EXPAND_MAP = {
        F: "Function",
        a: "and",
        o: "or",
        e: "equals",
        n: "not",
        def: "default",
        deb: "debug"
      };
      exports.CLIENT_FUNCTION_MINIFY_MAP = {
        Function: "F",
        and: "a",
        or: "o",
        equals: "e",
        not: "n",
        default: "def",
        debug: "deb"
      };
      var expandClientVariable = (v) => {
        const vDup = JSON.parse(JSON.stringify(v));
        return {
          $$mdtype: "Variable",
          path: vDup.p,
          value: vDup.v
        };
      };
      exports.expandClientVariable = expandClientVariable;
      var minifyClientVariable = (v) => {
        const vDup = JSON.parse(JSON.stringify(v));
        return {
          m: "V",
          p: vDup.path,
          v: vDup.value
        };
      };
      exports.minifyClientVariable = minifyClientVariable;
      var minifyClientFunction = (f) => {
        const fDup = JSON.parse(JSON.stringify(f));
        Object.keys(fDup.parameters).forEach((pKey) => {
          const parameter = fDup.parameters[pKey];
          if (typeof parameter === "object" && "$$mdtype" in parameter && parameter.$$mdtype === "Function") {
            fDup.parameters[pKey] = (0, exports.minifyClientFunction)(parameter);
          } else if (typeof parameter === "object" && "$$mdtype" in parameter && parameter.$$mdtype === "Variable") {
            fDup.parameters[pKey] = (0, exports.minifyClientVariable)(parameter);
          }
        });
        return {
          m: exports.CLIENT_FUNCTION_MINIFY_MAP[fDup.$$mdtype],
          n: exports.CLIENT_FUNCTION_MINIFY_MAP[fDup.name],
          p: fDup.parameters,
          v: fDup.value,
          r: fDup.ref
        };
      };
      exports.minifyClientFunction = minifyClientFunction;
      var expandClientFunction = (f) => {
        const fDup = JSON.parse(JSON.stringify(f));
        Object.keys(fDup.p).forEach((pKey) => {
          const parameter = fDup.p[pKey];
          if (typeof parameter === "object" && "m" in parameter && parameter.m === "F") {
            fDup.p[pKey] = (0, exports.expandClientFunction)(parameter);
          } else if (typeof parameter === "object" && "m" in parameter && parameter.m === "V") {
            fDup.p[pKey] = (0, exports.expandClientVariable)(parameter);
          }
        });
        return {
          $$mdtype: exports.CLIENT_FUNCTION_EXPAND_MAP[fDup.m],
          name: exports.CLIENT_FUNCTION_EXPAND_MAP[fDup.n],
          parameters: fDup.p,
          value: fDup.v,
          ref: fDup.r
        };
      };
      exports.expandClientFunction = expandClientFunction;
    }
  });

  // dist/helperModules/ClientRenderer.js
  var require_ClientRenderer = __commonJS({
    "dist/helperModules/ClientRenderer.js"(exports) {
      "use strict";
      var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      var _a;
      var _ClientRenderer_instance;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ClientRenderer = void 0;
      var ContentFilter_1 = require_ContentFilter();
      var prefsResolution_1 = require_prefsResolution();
      var reresolver_1 = require_reresolver();
      var pageConfigMinification_1 = require_pageConfigMinification();
      var ClientRenderer2 = class {
        constructor() {
          this.selectedValsByPrefId = {};
          this.ifFunctionsByRef = {};
          this.storedPreferences = {};
        }
        /**
         * Return the existing instance,
         * or create a new one if none exists.
         */
        static get instance() {
          if (!__classPrivateFieldGet(_a, _a, "f", _ClientRenderer_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(), "f", _ClientRenderer_instance);
            __classPrivateFieldGet(_a, _a, "f", _ClientRenderer_instance).retrieveStoredPreferences();
            window.markdocBeforeRevealHooks = window.markdocBeforeRevealHooks || [];
            window.markdocAfterRerenderHooks = window.markdocAfterRerenderHooks || [];
          }
          return __classPrivateFieldGet(_a, _a, "f", _ClientRenderer_instance);
        }
        retrieveStoredPreferences() {
          const storedPreferences = JSON.parse(localStorage.getItem("content-prefs") || "{}");
          this.storedPreferences = storedPreferences;
        }
        updateStoredPreferences() {
          const storedPreferences = JSON.parse(localStorage.getItem("content-prefs") || "{}");
          const newStoredPreferences = Object.assign(Object.assign({}, storedPreferences), this.selectedValsByPrefId);
          this.storedPreferences = newStoredPreferences;
          localStorage.setItem("content-prefs", JSON.stringify(newStoredPreferences));
        }
        getSelectedValsFromUrl() {
          const url = new URL(window.location.href);
          const searchParams = url.searchParams;
          const selectedValsByPrefId = {};
          searchParams.forEach((val, key) => {
            if (key in Object.keys(this.selectedValsByPrefId)) {
              selectedValsByPrefId[key] = val;
            }
          });
          return selectedValsByPrefId;
        }
        syncUrlWithSelectedVals() {
          const url = new URL(window.location.href);
          const searchParams = url.searchParams;
          const sortedPrefIds = Object.keys(this.selectedValsByPrefId).sort();
          sortedPrefIds.forEach((prefId) => {
            searchParams.set(prefId, this.selectedValsByPrefId[prefId]);
          });
          window.history.replaceState({}, "", url.toString());
        }
        /**
         * When the user changes a preference value,
         * update the selected values data,
         * and rerender the chooser and page content.
         */
        handlePrefSelectionChange(e) {
          const node = e.target;
          if (!(node instanceof Element)) {
            return;
          }
          const prefId = node.getAttribute("data-pref-id");
          if (!prefId) {
            return;
          }
          const optionId = node.getAttribute("data-option-id");
          if (!optionId) {
            return;
          }
          this.selectedValsByPrefId[prefId] = optionId;
          this.rerender();
          this.syncUrlWithSelectedVals();
          this.updateStoredPreferences();
        }
        /**
         * Check whether the element or any of its ancestors
         * have the class 'mdoc__hidden'.
         */
        elementIsHidden(element) {
          let currentElement = element;
          while (currentElement) {
            if (currentElement.classList.contains("mdoc__hidden")) {
              return true;
            }
            currentElement = currentElement.parentElement;
          }
        }
        /**
         * Should run after the page has been rendered.
         */
        populateRightNav() {
          let html = "<ul>";
          const headers = Array.from(document.querySelectorAll("#mainContent h2, #mainContent h3"));
          let lastSeenLevel = 2;
          headers.forEach((header) => {
            if (this.elementIsHidden(header)) {
              return;
            }
            const level = parseInt(header.tagName[1]);
            if (level === lastSeenLevel) {
              html += "</li>";
            } else if (level > lastSeenLevel) {
              html += "<ul>";
            } else if (level < lastSeenLevel) {
              html += "</ul></li>";
            }
            lastSeenLevel = level;
            html += `<li><a href="#${header.id}">${header.textContent}</a>`;
          });
          html += "</li></ul>";
          const rightNav = document.getElementById("TableOfContents");
          if (!rightNav) {
            return;
          }
          rightNav.innerHTML = html;
        }
        rerender() {
          this.rerenderFilterSelector();
          this.rerenderPageContent();
          this.populateRightNav();
          markdocAfterRerenderHooks.forEach((hook) => hook());
        }
        /**
         * Rerender the section of the page that was derived
         * from the author's .mdoc file.
         */
        rerenderPageContent() {
          const newDisplayStatusByRef = {};
          Object.keys(this.ifFunctionsByRef).forEach((ref) => {
            const clientFunction = this.ifFunctionsByRef[ref];
            const oldValue = clientFunction.value;
            const resolvedFunction = (0, reresolver_1.reresolveFunctionNode)(clientFunction, {
              variables: this.selectedValsByPrefId
            });
            this.ifFunctionsByRef[ref] = resolvedFunction;
            if (oldValue !== resolvedFunction.value) {
              newDisplayStatusByRef[ref] = resolvedFunction.value;
            }
          });
          const toggleables = document.getElementsByClassName("mdoc__toggleable");
          for (let i = 0; i < toggleables.length; i++) {
            const toggleable = toggleables[i];
            const ref = toggleable.getAttribute("data-if");
            if (!ref) {
              throw new Error("No ref found on toggleable element");
            }
            if (newDisplayStatusByRef[ref] === void 0) {
              continue;
            }
            if (newDisplayStatusByRef[ref]) {
              toggleable.classList.remove("mdoc__hidden");
            } else {
              toggleable.classList.add("mdoc__hidden");
            }
          }
        }
        /**
         * Listen for changes in the filter selector.
         */
        addFilterSelectorEventListeners() {
          const prefPills = document.getElementsByClassName("mdoc-pref__pill");
          for (let i = 0; i < prefPills.length; i++) {
            prefPills[i].addEventListener("click", (e) => this.handlePrefSelectionChange(e));
          }
        }
        locateFilterSelectorEl() {
          const filterSelectorEl = document.getElementById("mdoc-selector");
          if (!filterSelectorEl) {
            return false;
          } else {
            this.filterSelectorEl = filterSelectorEl;
            return true;
          }
        }
        applyPrefOverrides() {
          const relevantPrefIds = Object.keys(this.selectedValsByPrefId);
          let prefOverrideFound = false;
          Object.keys(this.storedPreferences).forEach((prefId) => {
            if (relevantPrefIds.includes(prefId) && this.selectedValsByPrefId[prefId] !== this.storedPreferences[prefId]) {
              this.selectedValsByPrefId[prefId] = this.storedPreferences[prefId];
              prefOverrideFound = true;
            }
          });
          const urlPrefs = this.getSelectedValsFromUrl();
          Object.keys(urlPrefs).forEach((prefId) => {
            if (relevantPrefIds.includes(prefId) && this.selectedValsByPrefId[prefId] !== urlPrefs[prefId]) {
              this.selectedValsByPrefId[prefId] = urlPrefs[prefId];
              prefOverrideFound = true;
            }
          });
          return prefOverrideFound;
        }
        updateEditButton() {
          const editButton = document.getElementsByClassName("toc-edit-btn")[0];
          if (!editButton) {
            return;
          }
          const editButtonLink = editButton.getElementsByTagName("a")[0];
          if (!editButtonLink) {
            return;
          }
          editButtonLink.href = editButtonLink.href.replace(/\.md\/$/, ".mdoc/");
        }
        initialize(p) {
          this.prefOptionsConfig = p.prefOptionsConfig;
          this.pagePrefsConfig = p.pagePrefsConfig;
          this.selectedValsByPrefId = p.selectedValsByPrefId || {};
          this.ifFunctionsByRef = {};
          const contentIsCustomizable = this.locateFilterSelectorEl();
          if (contentIsCustomizable) {
            Object.keys(p.ifFunctionsByRef).forEach((ref) => {
              this.ifFunctionsByRef[ref] = (0, pageConfigMinification_1.expandClientFunction)(p.ifFunctionsByRef[ref]);
            });
            const overrideApplied = this.applyPrefOverrides();
            if (overrideApplied) {
              this.rerender();
            } else {
              this.addFilterSelectorEventListeners();
            }
            this.populateRightNav();
            this.revealPage();
          }
          this.updateEditButton();
          if (contentIsCustomizable) {
            this.syncUrlWithSelectedVals();
            this.updateStoredPreferences();
          }
        }
        revealPage() {
          markdocBeforeRevealHooks.forEach((hook) => hook());
          if (this.filterSelectorEl) {
            this.filterSelectorEl.style.position = "sticky";
            this.filterSelectorEl.style.top = "95px";
            this.filterSelectorEl.style.backgroundColor = "white";
            this.filterSelectorEl.style.paddingTop = "10px";
            this.filterSelectorEl.style.visibility = "visible";
            this.filterSelectorEl.style.zIndex = "1000";
          }
          const content = document.getElementById("mdoc-content");
          if (content) {
            content.style.visibility = "visible";
          }
        }
        rerenderFilterSelector() {
          if (!this.pagePrefsConfig || !this.prefOptionsConfig || !this.filterSelectorEl) {
            throw new Error("Cannot rerender filter selector without pagePrefsConfig, prefOptionsConfig, and filterSelectorEl");
          }
          const resolvedPagePrefs = (0, prefsResolution_1.resolveMinifiedPagePrefs)({
            pagePrefsConfig: this.pagePrefsConfig,
            prefOptionsConfig: this.prefOptionsConfig,
            valsByPrefId: this.selectedValsByPrefId
          });
          Object.keys(resolvedPagePrefs).forEach((resolvedPrefId) => {
            const resolvedPref = resolvedPagePrefs[resolvedPrefId];
            this.selectedValsByPrefId[resolvedPref.id] = resolvedPref.currentValue;
          });
          const newFilterSelectorHtml = (0, ContentFilter_1.buildFilterSelectorUi)(resolvedPagePrefs);
          this.filterSelectorEl.innerHTML = newFilterSelectorHtml;
          this.addFilterSelectorEventListeners();
        }
      };
      exports.ClientRenderer = ClientRenderer2;
      _a = ClientRenderer2;
      _ClientRenderer_instance = { value: void 0 };
    }
  });

  // src/markdoc-client-renderer.js
  var ClientRenderer = require_ClientRenderer().ClientRenderer;
  window.clientRenderer = ClientRenderer.instance;
})();
