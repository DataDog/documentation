---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/simplify-test-assertions-boolean
- /static_analysis/rules/java-best-practices/simplify-test-assertions-boolean
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/simplify-test-assertions-boolean
  language: Java
  severity: Notice
  severity_rank: 3
title: Test assertions for booleans can be simplified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/simplify-test-assertions-boolean`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Test assertions can be made more concise through the utilization of a more specialized assertion method. 

This rule checks for a not operator (`!`) in `assertTrue` or `assertFalse` methods and suggests replacing the operator with the `assertTrue` or `assertFalse` method.

This enhances the error message clarity and improves the overall readability of the assertion for other developers.

## Non-Compliant Code Examples
```java
import org.junit.Test;
import static org.junit.Assert.*;

class Foo {
    Object a,b;
    @Test
    void testFoo() {
        assertTrue(!something); // could be assertFalse(something);
        assertFalse(!something); // could be assertTrue(something);
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
        assertFalse(something);
        assertTrue(something);
    }
}

```
