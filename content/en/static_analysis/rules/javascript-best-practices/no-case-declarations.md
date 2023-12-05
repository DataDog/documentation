---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-case-declarations
  language: JavaScript
  severity: Warning
title: Avoid lexical declarations in case clauses
---
## Metadata
**ID:** `javascript-best-practices/no-case-declarations`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Lexical declaration in switch cases are leaked throughout all other cases, which is undesired behavior. Scope your lexical declarations using `{}`.

## Non-Compliant Code Examples
```javascript
switch (a) { 
    case 1: 
        {}
        function f() {} 
        break;
}
switch (a) { 
    case 1: 
    case 2: 
        let x; 
}
switch (a) { case 1: let x = 1; break; }
switch (a) { default: let x = 2; break; }
switch (a) { case 1: const x = 1; break; }
switch (a) { default: const x = 2; break; }
switch (a) { case 1: function f() {} break; }
switch (a) { default: function f() {} break; }
switch (a) { case 1: class C {} break; }
switch (a) { default: class C {} break; }
```

## Compliant Code Examples
```javascript
switch (a) { case 1: { let x = 1; break; } default: { let x = 2; break; } }
switch (a) { case 1: { const x = 1; break; } default: { const x = 2; break; } }
switch (a) { case 1: { function f() {} break; } default: { function f() {} break; } }
switch (a) { case 1: { class C {} break; } default: { class C {} break; } }
switch (a) { 
    case 1: 
    case 2: {} 
}
switch (a) {
    case 1: var x; 
}
```
