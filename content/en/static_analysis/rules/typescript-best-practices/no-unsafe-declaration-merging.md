---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-best-practices/no-unsafe-declaration-merging
  language: TypeScript
  severity: Error
title: Avoid unsafe declaration merging
---
## Metadata
**ID:** `typescript-best-practices/no-unsafe-declaration-merging`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
Do not merge class and interface declarations. The compiler won't check property initialization, which might lead to runtime errors.

## Non-Compliant Code Examples
```typescript
interface Foo {}
class Foo {}
```

## Compliant Code Examples
```typescript
interface Foo {}
class Bar implements Foo {}

namespace Baz {}
namespace Baz {}
enum Baz {}

namespace Qux {}
function Qux() {}
```
