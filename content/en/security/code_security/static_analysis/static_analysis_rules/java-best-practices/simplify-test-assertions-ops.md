---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/simplify-test-assertions-ops
- /static_analysis/rules/java-best-practices/simplify-test-assertions-ops
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/simplify-test-assertions-ops
  language: Java
  severity: Notice
  severity_rank: 3
title: Test assertions using operator comparison can be simplified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/simplify-test-assertions-ops`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Test assertions can be made more concise through the utilization of a more specialized assertion method. 

In this rule, we check for the use of operators, such as, `==` and `!=` in `assertTrue` or `assertFalse` methods and suggest replacing with either a `assertSame` or `assertNotSame` method.

This enhances the error message clarity and improves the overall readability of the assertion for other developers.

## Non-Compliant Code Examples
```java
import org.junit.Test;
import static org.junit.Assert.*;

class Foo {
    Object a,b;
    @Test
    void testFoo() {
        assertTrue(a == b); // could be assertSame(a, b);
        assertTrue(a != b); // could be assertNotSame(a, b);

        assertFalse(a == b); // could be assertNotSame(a, b);
        assertFalse(a != b); // could be assertSame(a, b);
    }
}
```

## Compliant Code Examples
```java
import org.junit.Test;
import static org.junit.Assert.*;

class Foo {
    Object a,b;
    @Test
    void testFoo() {
        assertSame(a, b);
        assertNotSame(a, b);

        assertNotSame(a, b);
        assertSame(a, b);
    }
}
```
