---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/prefer-object-spread
- /static_analysis/rules/javascript-best-practices/prefer-object-spread
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Performance
  id: javascript-best-practices/prefer-object-spread
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Prefer using an object spread over `Object.assign`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/prefer-object-spread`

**Language:** JavaScript

**Severity:** Warning

**Category:** Performance

## Description
This rule encourages the use of the object spread syntax over the `Object.assign` method when creating a new object from an existing one where the first argument is an empty object. This is because the object spread syntax is more concise, easier to read, and can eliminate the need for null checks that are often necessary with `Object.assign`.

If you need to use `Object.assign`, make sure that the first argument is not an object literal, as this can easily be replaced with the spread syntax.

## Non-Compliant Code Examples
```javascript
Object.assign({}, foo);

Object.assign({}, {foo: 'bar'});

Object.assign({ foo: 'bar'}, baz);

Object.assign({}, baz, { foo: 'bar' });

Object.assign({}, { ...baz });

Object.assign({});

Object.assign({ foo: bar });
```

## Compliant Code Examples
```javascript
({ ...foo });

({ ...baz, foo: 'bar' });

Object.assign(foo, { bar: baz });

Object.assign(foo, bar);

Object.assign(foo, { bar, baz });

Object.assign(foo, { ...baz });
```
