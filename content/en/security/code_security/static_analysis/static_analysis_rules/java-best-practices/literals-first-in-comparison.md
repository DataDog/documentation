---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/literals-first-in-comparison
- /static_analysis/rules/java-best-practices/literals-first-in-comparison
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/literals-first-in-comparison
  language: Java
  severity: Warning
  severity_rank: 2
title: The literals should be first in String comparisons
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/literals-first-in-comparison`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
One should always prioritize using a string literal as the first arguments in any string comparison. This approach serves as a preventive measure against `NullPointerExceptions` because when the second argument is null, instead of encountering an exception, the comparisons will simply yield false results. 

## Non-Compliant Code Examples
```java
class Foo {
    boolean bar(String x) {
        return x.equals("42"); // should be "42".equals(x)
    }
    boolean bar(String x) {
        return x.equalsIgnoreCase("42"); // should be "42".equalsIgnoreCase(x)
    }
    boolean bar(String x) {
        return (x.compareTo("bar") > 0); // should be: "bar".compareTo(x) < 0
    }
    boolean bar(String x) {
        return (x.compareToIgnoreCase("bar") > 0); // should be: "bar".compareToIgnoreCase(x) < 0
    }
    boolean baz(String x) {
        return x.contentEquals("baz"); // should be "baz".contentEquals(x)
    }
}
```

## Compliant Code Examples
```java
class Foo {
    boolean bar(String x) {
        return "42".equals(x);
    }
    boolean bar(String x) {
        return "42".equalsIgnoreCase(x);
    }
    boolean bar(String x) {
        return "bar".compareTo(x) < 0;
    }
    boolean bar(String x) {
        return "bar".compareToIgnoreCase(x) < 0;
    }
    boolean baz(String x) {
        return "baz".contentEquals(x);
    }
}
```
