---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/parameter-name
- /static_analysis/rules/javascript-code-style/parameter-name
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Code Style
  id: javascript-code-style/parameter-name
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Parameter name should use camelCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/parameter-name`

**Language:** JavaScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that parameter names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```javascript
const a = { setValue(NewValue, event_info) {} }
class A { setValue(NewValue, event_info__) {} }
function setValue(NewValue, $_event_info_) {}
const a = function(NewValue, event_info) {}
```

## Compliant Code Examples
```javascript
const a = { getValue() {} }
class A { setValue(newValue_) {} }
class B { setValue(md5, valid5String) {} }
class B { setValue(_, valid5String) {} }

async.doSomething(nothing, (n, _cb) => {

}
```
