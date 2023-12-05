---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/for-direction
  language: JavaScript
  severity: Error
title: Check for loop is moving in the right direction
---
## Metadata
**ID:** `javascript-best-practices/for-direction`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
This rule prevents you from creating conditions in which a `for` loop might end up in an infinite loop. If you need an infinite loop, use `while` statements.

## Non-Compliant Code Examples
```javascript
// test if '++', '--'
for(var i = 0; i < 10; i--){}
for(var i = 0; i <= 10; i--){}
for(var i = 10; i > 10; i++){}
for(var i = 10; i >= 0; i++){}

// test if '+=', '-='
for(var i = 0; i < 10; i-=1){}
for(var i = 0; i <= 10; i-=1){}
for(var i = 10; i > 10; i+=1){}
for(var i = 10; i >= 0; i+=1){}
for(var i = 0; i < 10; i+=-1){}
for(var i = 0; i <= 10; i+=-1){}
for(var i = 10; i > 10; i-=-1){}
for(var i = 10; i >= 0; i-=-1){}
```

## Compliant Code Examples
```javascript
// test if '++', '--'
for(var i = 0; i < 10; i++){}
for(var i = 0; i <= 10; i++){}
for(var i = 10; i > 0; i--){}
for(var i = 10; i >= 0; i--){}

// test if '+=', '-=',
for(var i = 0; i < 10; i+=1){}
for(var i = 0; i <= 10; i+=1){}
for(var i = 0; i < 10; i-=-1){}
for(var i = 0; i <= 10; i-=-1){}
for(var i = 10; i > 0; i-=1){}
for(var i = 10; i >= 0; i-=1){}
for(var i = 10; i > 0; i+=-1){}
for(var i = 10; i >= 0; i+=-1){}

// test if no update.
for(var i = 10; i > 0;){}
for(var i = 10; i >= 0;){}
for(var i = 10; i < 0;){}
for(var i = 10; i <= 0;){}
for(var i = 10; i <= 0; j++){}
for(var i = 10; i <= 0; j--){}
for(var i = 10; i >= 0; j++){}
for(var i = 10; i >= 0; j--){}
for(var i = 10; i >= 0; j += 2){}
for(var i = 10; i >= 0; j -= 2){}
for(var i = 10; i >= 0; i |= 2){}
for(var i = 10; i >= 0; i %= 2){}
for(var i = 0; i < MAX; i += STEP_SIZE);
for(var i = 0; i < MAX; i -= STEP_SIZE);
for(var i = 10; i > 0; i += STEP_SIZE);

// other cond-expressions.
for(var i = 0; i !== 10; i+=1){}
for(var i = 0; i === 10; i+=1){}
for(var i = 0; i == 10; i+=1){}
for(var i = 0; i != 10; i+=1){}
```
