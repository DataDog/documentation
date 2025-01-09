---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/simplify-test-assertions-null
- /static_analysis/rules/java-best-practices/simplify-test-assertions-null
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/simplify-test-assertions-null
  language: Java
  severity: Notice
  severity_rank: 3
title: Test assertions using null comparison can be simplified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/simplify-test-assertions-null`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Test assertions can be made more concise through the use of a more specialized assertion method.

In this rule, we check for `null` comparisons in `assertTrue` or `assertFalse` methods and suggest replacing with either an `assertNull` or `assertNonNull` method.

This enhances the error message clarity and improves the overall readability of the assertion for other developers.

## Non-Compliant Code Examples
```java
import org.junit.Test;
import static org.junit.Assert.*;

class Foo {
    Object a,b;
    @Test
    void testFoo() {
        assertTrue(a == null); // could be assertNull(a);
        assertTrue(a != null); // could be assertNotNull(a);

        assertFalse(a == null); // could be assertNotNull(a);
        assertFalse(a != null); // could be assertNull(a);
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
        assertNull(a);
        assertNotNull(a);

        assertNotNull(a);
        assertNull(a);
    }
}

```
