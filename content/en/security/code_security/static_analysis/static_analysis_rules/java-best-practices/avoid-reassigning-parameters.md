---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-reassigning-parameters
- /static_analysis/rules/java-best-practices/avoid-reassigning-parameters
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Code Style
  id: java-best-practices/avoid-reassigning-parameters
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid reassigning parameters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-reassigning-parameters`

**Language:** Java

**Severity:** Warning

**Category:** Code Style

## Description
Avoid reassigning values to method parameters as it can make the code harder to understand. Typically, parameter values are expected to remain unchanged throughout the method's execution, and any reassignment might be not be noticed by other developers.

We consider it acceptable to reassign parameters in small functions, smaller than 20 lines. Otherwise, consider using temporary local variables with clear naming to enhance code readability.

## Non-Compliant Code Examples
```java
public class Person {
  private void greet(String name) {
    System.println("this is a long method");
    System.println("this is a very long method");
    name = name.trim(); // reassigning parameter value
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
    System.println("this is a long method");
  }
}
```

## Compliant Code Examples
```java
public class Main {
    public static void subscribeResult(
        @Advice.Enter final int callDepth,
        @Advice.Origin final Method method,
        @Advice.FieldValue("bucket") final String bucket,
        @Advice.Return(readOnly = false) Observable result) {
      if (callDepth > 0) {
        return;
      }
      CallDepthThreadLocalMap.reset(CouchbaseCluster.class);

      result = Observable.create(new CouchbaseOnSubscribe(result, method, bucket));
    }
}
```

```java
public class Main {
    private static void addStrSegment(List<LogProbe.Segment> segments, String str) {
        str = Strings.replace(str, "{{", "{");
        str = Strings.replace(str, "}}", "}");
        segments.add(new LogProbe.Segment(str));
    }
}
```

```java
public class Person {
  private void greet(String name) {
    String trimmedName = name.trim();
  }
}
```
