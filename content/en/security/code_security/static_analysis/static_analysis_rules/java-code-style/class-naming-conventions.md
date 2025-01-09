---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/class-naming-conventions
- /static_analysis/rules/java-code-style/class-naming-conventions
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/class-naming-conventions
  language: Java
  severity: Notice
  severity_rank: 3
title: Enforce a naming convention for any type of class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/class-naming-conventions`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Enforce a specific naming convention for your classes using custom regexes that allow for customizing the regex per class type, such as, an `enum`, `interface` or even `abstract` classes.

By default, this rule enforces the Pascal case (`PascalCase`) naming convention.

This rule also verifies the names for test classes if the class includes a `@Test` annotation.

## Non-Compliant Code Examples
```java
public class Foo$ {} // dollar sign goes against the default regex

abstract class Foo$Bar {} // dollar sign goes against the default regex

interface Foo_Bar {} // underscore goes against the default regex

enum ooBar {} // first character isn't a capital goes against the default regex

@F_o // underscore goes against the default regex
public class Bar{}

public class FooBar { // missing Test goes against the default test regex
    @Test
    public void compare() {
        Assertions.assertEquals("foo", "foo");
    }
}
```

## Compliant Code Examples
```java
public class FooBar {}

abstract class FooBar {}

interface FooBar {}

enum FooBar {}

@Foo
public class Bar{}

public class TestFooBar { // missing Test goes against the default test regex
    @Test
    public void compare() {
        Assertions.assertEquals("foo", "foo");
    }
}
```
