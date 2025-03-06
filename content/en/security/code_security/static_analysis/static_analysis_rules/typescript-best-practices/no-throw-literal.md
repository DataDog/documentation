---
aliases:
- /code_analysis/static_analysis_rules/typescript-best-practices/no-throw-literal
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-throw-literal
- /static_analysis/rules/typescript-best-practices/no-throw-literal
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-throw-literal
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid throwing literals instead of an object or error type
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-throw-literal`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
This JavaScript rule advises against throwing literals such as strings, numbers, or null, and instead recommends throwing an instance of `Error` or a subclass of `Error`. Throwing an `Error` object helps to provide a stack trace, which can be extremely beneficial for debugging purposes. Stack traces provide a detailed report of the sequence of nested function calls that led to the error being thrown, along with contextual information for each frame.

The importance of this rule lies in its capacity to improve debugging and error handling. When a literal is thrown, the only information available is the literal itself. On the other hand, when an `Error` object is thrown, you get a lot more context about where and why the error occurred. This can save a significant amount of time during the debugging process.

## Non-Compliant Code Examples
```typescript
throw "err";

throw 1;

throw undefined;

throw null;

throw "err: " + new Error();

throw `${new Error()}`
```

## Compliant Code Examples
```typescript
throw new Error();

throw new Error("err");

const err = new Error("err");
throw err;

try {
    throw new Error("err");
} catch (e) {
    throw e;
}
```
