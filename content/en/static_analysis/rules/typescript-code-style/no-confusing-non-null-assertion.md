---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-code-style/no-confusing-non-null-assertion
  language: TypeScript
  severity: Warning
title: Avoid non-null assertion in confusing locations
---
## Metadata
**ID:** `typescript-code-style/no-confusing-non-null-assertion`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
Using a non-null assertion (`!`) next to an assign or equals check (`=` or `==` or `===`) could be confusing.

## Non-Compliant Code Examples
```typescript
a! == b;
a! === b;
a + b! == c;
(obj = new new OuterObj().InnerObj).Name! == c;
(a==b)! ==c;
a! = b;
(obj = new new OuterObj().InnerObj).Name! = c;
(a=b)! =c;
```

## Compliant Code Examples
```typescript
a == b!;
a = b!;
a !== b;
a != b;
(a + b!) == c;
(a + b!) = c;
```
