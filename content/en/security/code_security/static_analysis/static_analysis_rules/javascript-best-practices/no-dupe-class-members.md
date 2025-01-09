---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-dupe-class-members
- /static_analysis/rules/javascript-best-practices/no-dupe-class-members
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-dupe-class-members
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid duplicate class members
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-dupe-class-members`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
JavaScript allows multiple class members with the same identifier, and the last duplicate class member takes precedence over previous declarations, which is undesired behavior. Disallow duplicate class members.

## Non-Compliant Code Examples
```javascript
class A { foo() {} foo() {} }
!class A { foo() {} foo() {} };
class A { 'foo'() {} 'foo'() {} }
class A { 10() {} 1e1() {} }
class A { ['foo']() {} ['foo']() {} }
class A { static ['foo']() {} static foo() {} }
class A { set 'foo'(value) {} set ['foo'](val) {} }
class A { ''() {} ['']() {} }
class A { [`foo`]() {} [`foo`]() {} }
class A { static get [`foo`]() {} static get ['foo']() {} }
class A { foo() {} [`foo`]() {} }
class A { get [`foo`]() {} 'foo'() {} }
class A { static 'foo'() {} static [`foo`]() {} }
class A { ['constructor']() {} ['constructor']() {} }
class A { static [`constructor`]() {} static constructor() {} }
class A { static constructor() {} static 'constructor'() {} }
class A { [123]() {} [123]() {} }
class A { [0x10]() {} 16() {} }
class A { [100]() {} [1e2]() {} }
class A { [123.00]() {} [`123`]() {} }
class A { static '65'() {} static [0o101]() {} }
class A { [123n]() {} 123() {} }
class A { [null]() {} 'null'() {} }
class A { foo() {} foo() {} foo() {} }
class A { static foo() {} static foo() {} }
class A { foo() {} get foo() {} }
class A { set foo(value) {} foo() {} }
class A { foo; foo; }
```

## Compliant Code Examples
```javascript
class A { foo() {} bar() {} }
class A { static foo() {} foo() {} }
class A { get foo() {} set foo(value) {} }
class A { static foo() {} get foo() {} set foo(value) {} }
class A { foo() { } } class B { foo() { } }
class A { [foo]() {} foo() {} }
class A { 'foo'() {} 'bar'() {} baz() {} }
class A { *'foo'() {} *'bar'() {} *baz() {} }
class A { get 'foo'() {} get 'bar'() {} get baz() {} }
class A { 1() {} 2() {} }
class A { ['foo']() {} ['bar']() {} }
class A { [`foo`]() {} [`bar`]() {} }
class A { [12]() {} [123]() {} }
class A { [1.0]() {} ['1.0']() {} }
class A { [0x1]() {} [`0x1`]() {} }
class A { [null]() {} ['']() {} }
class A { get ['foo']() {} set ['foo'](value) {} }
class A { ['foo']() {} static ['foo']() {} }

// computed "constructor" key doesn't create constructor
class A { ['constructor']() {} constructor() {} }
class A { 'constructor'() {} [`constructor`]() {} }
class A { constructor() {} get [`constructor`]() {} }
class A { 'constructor'() {} set ['constructor'](value) {} }

// not assumed to be statically-known values
class A { ['foo' + '']() {} ['foo']() {} }
class A { [`foo${''}`]() {} [`foo`]() {} }
class A { [-1]() {} ['-1']() {} }

// private and public
class A { foo; static foo; }
class A { foo; #foo; }
class A { '#foo'; #foo; }
```
