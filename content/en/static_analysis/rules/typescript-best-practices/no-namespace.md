---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-best-practices/no-namespace
  language: TypeScript
  severity: Notice
title: Avoid TypeScript namespaces
---
## Metadata
**ID:** `typescript-best-practices/no-namespace`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Namespaces should be avoided as an outdated feature of TypeScript. Use module syntax instead.

## Non-Compliant Code Examples
```typescript
module foo {}
namespace foo {}
module foo {}
namespace foo {}
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
declare module foo {}
declare namespace foo {}
namespace foo {}
module foo {}
declare module foo {}
declare namespace foo {}
namespace Foo.Bar {}
namespace Foo.Bar { namespace Baz.Bas { interface X {} } }
namespace A { namespace B { declare namespace C {} }
namespace A { namespace B { export declare namespace C {} } }
namespace A { declare namespace B { namespace C {} } }
namespace A { export declare namespace B { namespace C {} } }
namespace A { export declare namespace B { declare namespace C {} } }
namespace A { export declare namespace B { export declare namespace C {} } }
namespace A { declare namespace B { export declare namespace C {} } }
namespace A { export namespace B { export declare namespace C {} } }
export namespace A { namespace B { declare namespace C {} } }
export namespace A { namespace B { export declare namespace C {} } }
export namespace A { declare namespace B { namespace C {} } }
export namespace A { export declare namespace B { namespace C {} } }
export namespace A { export declare namespace B { declare namespace C {} } }
export namespace A { export declare namespace B { export declare namespace C {} } }
export namespace A { declare namespace B { export declare namespace C {} } }
export namespace A { export namespace B { export declare namespace C {} } }
```

## Compliant Code Examples
```typescript
declare global {}
declare module 'foo' {}
declare module foo {}
declare namespace foo {}
declare global { namespace foo {} }
declare module foo { namespace bar {} }
declare global { namespace foo { namespace bar {} } }
declare namespace foo { namespace bar { namespace baz {} } }
export declare namespace foo { export namespace bar { namespace baz {} } }
namespace foo {}
module foo {}
```
