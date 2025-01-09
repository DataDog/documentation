---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/use-stringbuffer
- /static_analysis/rules/java-best-practices/use-stringbuffer
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Performance
  id: java-best-practices/use-stringbuffer
  language: Java
  severity: Warning
  severity_rank: 2
title: Use StringBuffer to concatenate strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/use-stringbuffer`

**Language:** Java

**Severity:** Warning

**Category:** Performance

## Description
Use `StringBuffer` to create and concatenate long strings. Concatenating strings multiple times slows your program execution.

## Non-Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        String result = "";
        for (Person p: persons) {
            foo();
            result += p.getName() + ",";
            bar();
        }
        for(int i = 0 ; i < persons.size() ; i++) {
            foo();
            result += persons.get(i).getName() + ",";
            bar();
        }
        return result;
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        StringBuilder result = new StringBuilder();
        for (Person p: persons) {
            result.append(p.getName() + ",");
        }
        return result.toString();
    }
}
```
