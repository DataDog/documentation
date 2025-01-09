---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-lonely-if
- /static_analysis/rules/javascript-code-style/no-lonely-if
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-lonely-if
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid if statements as the only statement in else blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-lonely-if`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
Prefers `else if` statement instead of an lonely `if` statement. Using `else if` statements` is a cleaner code practice.

## Non-Compliant Code Examples
```javascript
if (a) {;} else { if (b) {;} }

if (a) {
  foo();
} else {
  if (b) {
    bar();
  }
}

if (a) {
  foo();
} else /* comment */ {
  if (b) {
    bar();
  }
}
    
    
if (a) {
  foo();
} else {
  /* otherwise, do the other thing */ if (b) {
    bar();
  }
}
    
if (a) {
  foo();
} else {
  if /* this comment is ok */ (b) {
    bar();
  }
}

if (a) {
  foo();
} else {
  if (b) {
    bar();
  } /* this comment will prevent this test case from being autofixed. */
}
if (foo) {} else { if (bar) baz(); }

// Not fixed; removing the braces would cause a SyntaxError.
if (foo) {} else { if (bar) baz() } qux();

// This is fixed because there is a semicolon after baz().
if (foo) {} else { if (bar) baz(); } qux();

// Not fixed; removing the braces would change the semantics due to ASI.
if (foo) {
} else {
  if (bar) baz()
}
[1, 2, 3].forEach(foo);
    
// Not fixed; removing the braces would change the semantics due to ASI.
if (foo) {
} else {
    if (bar) baz++
}
foo;

// This is fixed because there is a semicolon after baz++
if (foo) {
} else {
  if (bar) baz++;
}
foo;

// Not fixed; bar() would be interpreted as a template literal tag
if (a) {
  foo();
} else {
  if (b) bar()
}
`template literal`;

if (a) {
  foo();
} else {
  if (b) {
    bar();
  } else if (c) {
    baz();
  } else {
    qux();
  }
}
```

## Compliant Code Examples
```javascript
if (a) {;} else if (b) {;}
if (a) {;} else { if (b) {;} ; }
```
