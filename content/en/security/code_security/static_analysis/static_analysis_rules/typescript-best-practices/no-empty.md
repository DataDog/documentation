---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-empty
- /static_analysis/rules/typescript-best-practices/no-empty
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-empty
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid empty block statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-empty`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
Empty or non-functional blocks in the code can be misleading and lead to maintenance difficulties. They can also lead to a false sense of security or functionality. While they may not directly introduce security issues, their presence can suggest that some logic or error handling is implemented when it is not.

## Non-Compliant Code Examples
```typescript
try {} catch (ex) {throw ex}
try { foo() } catch (ex) {}
try { foo() } catch (ex) {throw ex} finally {}
if (foo) {}
while (foo) {}
for (;foo;) {}
switch(foo) {}
switch (foo) { /* empty */ }
try {} catch (ex) {}
try { foo(); } catch (ex) {} finally {}
try {} catch (ex) {} finally {}
try { foo(); } catch (ex) {} finally {}
(function() { }())
var foo = () => {}
function foo() { }
function bla() {

}
```

## Compliant Code Examples
```typescript
export async function foo() {
    const test = {};
}
if (foo) { bar() }
while (foo) { bar() }
for (;foo;) { bar() }
try { foo() } catch (ex) { foo() }
switch(foo) {case 'foo': break;}
if (foo) {/* empty */}
while (foo) {/* empty */}
for (;foo;) {/* empty */}
try { foo() } catch (ex) {/* empty */}
try { foo() } catch (ex) {// empty
}
try { foo() } finally {// empty
}
try { foo() } finally {// test
}
try { foo() } finally {
    
    // hi i am off no use
}
try { foo() } catch (ex) {/* test111 */}
if (foo) { bar() } else { // nothing in me 
}
if (foo) { bar() } else { /**/
}
if (foo) { bar() } else { //
}
```
