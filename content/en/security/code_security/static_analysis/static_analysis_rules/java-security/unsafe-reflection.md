---
aliases:
- /continuous_integration/static_analysis/rules/java-security/unsafe-reflection
- /static_analysis/rules/java-security/unsafe-reflection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/unsafe-reflection
  language: Java
  severity: Error
  severity_rank: 1
title: Avoid user-generated class names for reflection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/unsafe-reflection`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [470](https://cwe.mitre.org/data/definitions/470.html)

## Description
Using reflection with class names being manually generated is unsafe and can lead to code injection. The class name must be validated and the program should make sure no malicious class can be loaded at runtime.

## Non-Compliant Code Examples
```java
class Test {
    void test() {
        String which = "org.owasp.benchmark.helpers." + props.getProperty("thing");
        System.out.println("foo");
        Class<?> thing = Class.forName(which);
        Constructor<?> thingConstructor = thing.getConstructor();
    }
}
```

## Compliant Code Examples
```java
class Test {
    void test() {
        String which = "org.owasp.benchmark.helpers.MyClass";
        System.out.println("foo");
        Class<?> thing = Class.forName(which);
        Constructor<?> thingConstructor = thing.getConstructor();
    }
}
```
