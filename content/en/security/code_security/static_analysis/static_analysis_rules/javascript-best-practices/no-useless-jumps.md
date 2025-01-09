---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-useless-jumps
- /static_analysis/rules/javascript-best-practices/no-useless-jumps
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-useless-jumps
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid unnecessary jump statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-useless-jumps`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
Jump statements like `return`, `break`, and `continue` are used to control the flow of the program, and while they can be extremely useful, unnecessary use of these statements can lead to code that is harder to read and understand.

This rule is important because unnecessary jump statements can clutter your code, make it less readable, and potentially introduce bugs. To adhere to this rule, you should only use jump statements where they are absolutely necessary. For instance, a `return` statement should only be used when you want to exit a function and return a value, a `break` statement should only be used to exit a loop or a switch statement, and a `continue` statement should only be used to skip the current iteration of a loop.

## Non-Compliant Code Examples
```javascript
function badReturn() {
    doComputation();
    // Unnecessary
    return;
}

function badLoops() {
    const arr = [1, 2, 3];
    for (const elem of arr) {
        console.log(elem);
        // Unnecessary
        continue;
    }

    while (true) {
        console.log(`1: ${arr[0]}`)
        console.log(`2: ${arr[1]}`)
        console.log(`3: ${arr[2]}`)
        break;
    }
}
```

## Compliant Code Examples
```javascript
function goodReturn() {
    doComputation();
    return 2;
}

function inSwitch() {
    const val = goodReturn();
    switch (val) {
        case 1:
            return;
        case 2:
            return;
        default:
            break;
    }
    doComputation();
}

function goodLoops() {
    const arr = [1, 2, 3, 4, 5];
    for (int = 0; i < arr.length, i++) {
        console.log(arr[i]);
        if (i === 2) {
            break;
        }
    }

    int i = 0;
    while (true) {
        console.log(`${i+1}: ${arr[i]}`);
        i++;
        if (i === 3) {
            break;
        }
    }
}
```
