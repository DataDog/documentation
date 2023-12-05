---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-empty-pattern
  language: JavaScript
  severity: Error
title: Avoid empty destructuring patterns
---
## Metadata
**ID:** `javascript-best-practices/no-empty-pattern`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
An empty destructuring pattern doesn't provide any value and might be confusing, as it looks similar to the default assignment.

## Non-Compliant Code Examples
```javascript
var {} = foo
var [] = foo
var {a: {}} = foo
var {a, b: {}} = foo
var {a: []} = foo
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

## Compliant Code Examples
```javascript
var {a = {}} = foo;
var {a, b = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
var [a] = foo
```
