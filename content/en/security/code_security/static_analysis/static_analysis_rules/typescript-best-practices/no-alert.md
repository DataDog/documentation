---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-alert
- /static_analysis/rules/typescript-best-practices/no-alert
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-alert
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid the use of alert, confirm, and prompt
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-alert`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
JavaScript’s `alert`, `confirm`, and `prompt` functions present obtrusive UI elements that prevent further user actions by taking control of the focus. These UI elements cannot be styled.

## Non-Compliant Code Examples
```typescript
alert(foo)
window.alert(foo)
window['alert'](foo)
confirm(foo)
window.confirm(foo)
window['confirm'](foo)
prompt(foo)
window.prompt(foo)
window['prompt'](foo)
function alert() {} window.alert(foo)
var alert = function() {};
window.alert(foo)
function foo(alert) { window.alert(); }
function foo() { alert(); }
function foo() { var alert = function() {}; }
alert();
this.alert(foo)
this['alert'](foo)
function foo() { var window = bar; window.alert(); }
window.alert();
globalThis['alert'](foo)
globalThis.alert();
function foo() { var globalThis = bar; globalThis.alert(); }
globalThis.alert();

// Optional chaining
window?.alert(foo);
(window?.alert)(foo);
```

## Compliant Code Examples
```typescript
a[o.k](1)
foo.alert(foo)
foo.confirm(foo)
foo.prompt(foo)
// global overrides are not recommened 
// and wont be supported by this rule
// function alert() {} alert();
// var alert = function() {}; alert();
// function foo() { var alert = bar; alert(); }
// function foo(alert) { alert(); }
// var alert = function() {}; function test() { alert(); }
// function foo() { var alert = function() {}; function test() { alert(); } }
// function confirm() {} confirm();
// function prompt() {} prompt();
window[alert]();
// function foo() { this.alert(); }
// function foo() { var window = bar; window.alert(); }
// globalThis.alert();
// globalThis['alert']();
// globalThis.alert();
// var globalThis = foo; globalThis.alert();
// function foo() { var globalThis = foo; globalThis.alert(); }
```
