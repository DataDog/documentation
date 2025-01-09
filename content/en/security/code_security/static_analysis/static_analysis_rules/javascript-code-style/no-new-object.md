---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-new-object
- /static_analysis/rules/javascript-code-style/no-new-object
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-new-object
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid Object constructors
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-new-object`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
For consistency, always use the shorter object literal notation `{}`.

## Non-Compliant Code Examples
```javascript
var foo = new Object()
new Object();
const a = new Object()

```

## Compliant Code Examples
```javascript
// Scoped re declare not supported
var myObject = {};
var myObject = new CustomObject();
var foo = new foo.Object()
// var Object = function Object() {};
// new Object();
var x = something ? MyClass : Object;
var y = new x();

// class Object {
//     constructor(){

//     }
// }
// new Object();

// import { Object } from './'
// new Object();

const init = (canvas, context, t) =>
	drawDoughnutChart(
		canvas,
		t('Chats'),
		context,
		labels.map((l) => t(l)),
		Object.values(initialData),
	);
```
