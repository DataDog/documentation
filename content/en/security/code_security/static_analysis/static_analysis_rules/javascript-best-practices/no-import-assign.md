---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-import-assign
- /static_analysis/rules/javascript-best-practices/no-import-assign
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Error Prone
  id: javascript-best-practices/no-import-assign
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Prevent assigning to imported bindings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-import-assign`

**Language:** JavaScript

**Severity:** Error

**Category:** Error Prone

## Description
Imported modules must be immutable. Assignments to the imported bindings are forbidden.

## Non-Compliant Code Examples
```javascript
import mod1 from 'mod'; mod1 = 0
import mod2 from 'mod'; mod2 += 0
import mod3 from 'mod'; mod3++
import mod4 from 'mod'; for (mod4 in foo);
import mod5 from 'mod'; for (mod5 of foo);
import mod6 from 'mod'; [mod6] = foo
import mod7 from 'mod'; [mod7 = 0] = foo
import mod8 from 'mod'; [...mod8] = foo
import mod9 from 'mod'; ({ bar: mod9 } = foo)
import mod10 from 'mod'; ({ bar: mod10 = 0 } = foo)
import mod11 from 'mod'; ({ ...mod11 } = foo)
import {named1} from 'mod'; named1 = 0
import {named2} from 'mod'; named2 += 0
import {named3} from 'mod'; named3++
import {named4} from 'mod'; for (named4 in foo);
import {named5} from 'mod'; for (named5 of foo);
import {named6} from 'mod'; [named6] = foo
import {named7} from 'mod'; [named7 = 0] = foo
import {named8} from 'mod'; [...named8] = foo
import {named9} from 'mod'; ({ bar: named9 } = foo)
import {named10} from 'mod'; ({ bar: named10 = 0 } = foo)
import {named11} from 'mod'; ({ ...named11 } = foo)
import {named12 as foo} from 'mod'; foo = 0; named12 = 0
import * as mod1 from 'mod'; mod1 = 0
import * as mod2 from 'mod'; mod2 += 0
import * as mod3 from 'mod'; mod3++
import * as mod4 from 'mod'; for (mod4 in foo);
import * as mod5 from 'mod'; for (mod5 of foo);
import * as mod6 from 'mod'; [mod6] = foo
import * as mod7 from 'mod'; [mod7 = 0] = foo
import * as mod8 from 'mod'; [...mod8] = foo
import * as mod9 from 'mod'; ({ bar: mod9 } = foo)
import * as mod10 from 'mod'; ({ bar: mod10 = 0 } = foo)
import * as mod11 from 'mod'; ({ ...mod11 } = foo)
import * as mod1 from 'mod'; mod1.named = 0
import * as mod2 from 'mod'; mod2.named += 0
import * as mod3 from 'mod'; mod3.named++
import * as mod4 from 'mod'; for (mod4.named in foo);
import * as mod5 from 'mod'; for (mod5.named of foo);
import * as mod6 from 'mod'; [mod6.named] = foo
import * as mod7 from 'mod'; [mod7.named = 0] = foo
import * as mod8 from 'mod'; [...mod8.named] = foo
import * as mod9 from 'mod'; ({ bar: mod9.named } = foo)
import * as mod10 from 'mod'; ({ bar: mod10.named = 0 } = foo)
import * as mod11 from 'mod'; ({ ...mod11.named } = foo)
import * as mod12 from 'mod'; delete mod12.named
import * as mod from 'mod'; Object.assign(mod, obj)
import * as mod from 'mod'; Object.defineProperty(mod, key, d)
import * as mod from 'mod'; Object.defineProperties(mod, d)
import * as mod from 'mod'; Object.setPrototypeOf(mod, proto)
import * as mod from 'mod'; Object.freeze(mod)
import * as mod from 'mod'; Reflect.defineProperty(mod, key, d)
import * as mod from 'mod'; Reflect.deleteProperty(mod, key)
import * as mod from 'mod'; Reflect.set(mod, key, value)
import * as mod from 'mod'; Reflect.setPrototypeOf(mod, proto)
import mod, * as mod_ns from 'mod'; mod.prop = 0; mod_ns.prop = 0
// Optional chaining
import * as mod from 'mod'; Object?.defineProperty(mod, key, d)
import * as mod from 'mod'; (Object?.defineProperty)(mod, key, d)
import * as mod from 'mod'; delete mod?.prop
```

## Compliant Code Examples
```javascript
import mod from 'mod'; mod.prop = 0
import mod from 'mod'; mod.prop += 0
import mod from 'mod'; mod.prop++
import mod from 'mod'; delete mod.prop
import mod from 'mod'; for (mod.prop in foo);
import mod from 'mod'; for (mod.prop of foo);
import mod from 'mod'; [mod.prop] = foo;
import mod from 'mod'; [...mod.prop] = foo;
import mod from 'mod'; ({ bar: mod.prop } = foo);
import mod from 'mod'; ({ ...mod.prop } = foo);
import {named} from 'mod'; named.prop = 0
import {named} from 'mod'; named.prop += 0
import {named} from 'mod'; named.prop++
import {named} from 'mod'; delete named.prop
import {named} from 'mod'; for (named.prop in foo);
import {named} from 'mod'; for (named.prop of foo);
import {named} from 'mod'; [named.prop] = foo;
import {named} from 'mod'; [...named.prop] = foo;
import {named} from 'mod'; ({ bar: named.prop } = foo);
import {named} from 'mod'; ({ ...named.prop } = foo);
import * as mod from 'mod'; mod.named.prop = 0
import * as mod from 'mod'; mod.named.prop += 0
import * as mod from 'mod'; mod.named.prop++
import * as mod from 'mod'; delete mod.named.prop
import * as mod from 'mod'; for (mod.named.prop in foo);
import * as mod from 'mod'; for (mod.named.prop of foo);
import * as mod from 'mod'; [mod.named.prop] = foo;
import * as mod from 'mod'; [...mod.named.prop] = foo;
import * as mod from 'mod'; ({ bar: mod.named.prop } = foo);
import * as mod from 'mod'; ({ ...mod.named.prop } = foo);
import * as mod from 'mod'; obj[mod] = 0
import * as mod from 'mod'; obj[mod.named] = 0
import * as mod from 'mod'; for (var foo in mod.named);
import * as mod from 'mod'; for (var foo of mod.named);
import * as mod from 'mod'; [bar = mod.named] = foo;
import * as mod from 'mod'; ({ bar = mod.named } = foo);
import * as mod from 'mod'; ({ bar: baz = mod.named } = foo);
import * as mod from 'mod'; ({ [mod.named]: bar } = foo);
import * as mod from 'mod'; var obj = { ...mod.named };
import * as mod from 'mod'; var obj = { foo: mod.named };
// scoped import name re-use not covered 
// import mod from 'mod'; { let mod = 0; mod = 1 }
// import * as mod from 'mod'; { let mod = 0; mod = 1 }
// import * as mod from 'mod'; { let mod = 0; mod.named = 1 }
import {} from 'mod'
import 'mod'
import mod from 'mod'; Object.assign(mod, obj);
import {named} from 'mod'; Object.assign(named, obj);
import * as mod from 'mod'; Object.assign(mod.prop, obj);
import * as mod from 'mod'; Object.assign(obj, mod, other);
import * as mod from 'mod'; Object[assign](mod, obj);
import * as mod from 'mod'; Object.getPrototypeOf(mod);
import * as mod from 'mod'; Reflect.set(obj, key, mod);
// Object redeclare not analyzed
// import * as mod from 'mod'; { var Object; Object.assign(mod, obj); }
// import * as mod from 'mod'; var Object; Object.assign(mod, obj);
import * as mod from 'mod'; Object.seal(mod, obj)
import * as mod from 'mod'; Object.preventExtensions(mod)
import * as mod from 'mod'; Reflect.preventExtensions(mod)
```
