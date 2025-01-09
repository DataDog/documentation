---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/simplify-test-assertions-equals
- /static_analysis/rules/java-best-practices/simplify-test-assertions-equals
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/simplify-test-assertions-equals
  language: Java
  severity: Notice
  severity_rank: 3
title: Test assertions using equals comparison can be simplified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/simplify-test-assertions-equals`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Test assertions can be made more concise through the utilization of a more specialized assertion method. 

This rule checks for the use of `equals` in `assertTrue` or `assertFalse` methods and suggests replacing with either an `assertEquals` or `assertNotEquals` method.

This enhances the error message clarity and improves the overall readability of the assertion for other developers.

## Non-Compliant Code Examples
```java
import org.junit.Test;
import static org.junit.Assert.*;

class Foo {
    Object a,b;
    @Test
    void testFoo() {
        assertTrue(a.equals(b)); // could be assertEquals(a, b);
        assertTrue(!a.equals(b)); // could be assertNotEquals(a, b);

        assertFalse(a.equals(b)); // could be assertNotEquals(a, b);
        assertFalse(!a.equals(b)); // could be assertEquals(a, b);
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
        assertEquals(a, b);
        assertNotEquals(a, b);

        assertNotEquals(a, b);
        assertEquals(a, b);
    }
}
```
