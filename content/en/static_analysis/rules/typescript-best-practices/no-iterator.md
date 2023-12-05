---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-best-practices/no-iterator
  language: TypeScript
  severity: Warning
title: Avoid the use of the __iterator__ property
---
## Metadata
**ID:** `typescript-best-practices/no-iterator`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
The `__iterator__` property was exclusive to the SpiderMonkey engine. Avoid using it as other JavaScript engines do not implement it.

## Non-Compliant Code Examples
```typescript
var a = test.__iterator__;
Foo.prototype.__iterator__ = function() {};
var a = test['__iterator__'];
var a = test[`__iterator__`];
test[`__iterator__`] = function () {};
```

## Compliant Code Examples
```typescript
var a = test[__iterator__];
var __iterator__ = null;
foo[`__iterator`] = null;
foo[`__iterator__
`] = null;
```
