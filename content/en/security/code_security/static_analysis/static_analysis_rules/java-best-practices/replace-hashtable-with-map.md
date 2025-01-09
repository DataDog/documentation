---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/replace-hashtable-with-map
- /static_analysis/rules/java-best-practices/replace-hashtable-with-map
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/replace-hashtable-with-map
  language: Java
  severity: Warning
  severity_rank: 2
title: Should use Map instead of Hashtable
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/replace-hashtable-with-map`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
If your application does not require thread safety, it is recommended to use the modern `java.util.Map` interface instead of `java.util.Hashtable`. 

`Map` offers efficient implementations like `HashMap`, which offer greater flexibility and faster execution. If thread safety is needed, you can opt for `ConcurrentHashMap`, which maintains thread safety while still adhering to modern coding practices associated with `Map`.

## Non-Compliant Code Examples
```java
public class Foo {
    void bar() {
        Hashtable hashtable1 = new Hashtable(); // consider using java.util.Map instead
        Hashtable<String, Integer> hashtable2 = new Hashtable<>();
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    void bar() {
        Map<String, Integer> h = new HashMap<>();
    }
}
```
