---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/loose-coupling
- /static_analysis/rules/java-best-practices/loose-coupling
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/loose-coupling
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid using specific implementation types
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/loose-coupling`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
Relying on particular implementation types, such as, `HashSet` or `LinkedList` can limit your adaptability to embrace alternative implementations in the future, particularly as your requirements change and your code needs to undergo changes. 

It is recommended to opt for general types such as `Set` or `List` when declaring variables and parameters.

## Non-Compliant Code Examples
```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

public class Foo {
    private ArrayList<SomeType> list = new ArrayList<>();

    public HashSet<SomeType> set = new HashSet<SomeType>();

    public HashMap<SomeType> getMap() {
        return new HashMap<SomeType>();
    }    
    public String foo(HashMap<String, String> map) {
        return map.get("foo");
    }
}
```

## Compliant Code Examples
```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

public class Foo {
    private List<SomeType> list = new ArrayList<>();

    public Set<SomeType> set = new HashSet<SomeType>();

    public Map<SomeType> getMap() {
        return new HashMap<SomeType>();
    }
    public String foo(Map<String, String> map) {
        return map.get("foo");
    }
}

```
