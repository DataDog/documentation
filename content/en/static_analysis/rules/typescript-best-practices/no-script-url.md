---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-best-practices/no-script-url
  language: TypeScript
  severity: Notice
title: Avoid using Javascript in URLs
---
## Metadata
**ID:** `typescript-best-practices/no-script-url`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
JavaScript URLs are evaluated the same way `eval` is executed. This can lead to arbitrary code execution.

## Non-Compliant Code Examples
```typescript
var a = 'javascript:void(0);';
var a = 'javascript:';
var a = `javascript:`;
var a = `JavaScript:`;
```

## Compliant Code Examples
```typescript
var a = 'Hello World!';
var a = 10;
var url = 'xjavascript:'
var url = `xjavascript:`
var url = `${foo}javascript:`
var a = foo`javaScript:`;
```
