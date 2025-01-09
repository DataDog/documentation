---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/default-label-not-last-in-switch
- /static_analysis/rules/java-best-practices/default-label-not-last-in-switch
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/default-label-not-last-in-switch
  language: Java
  severity: Notice
  severity_rank: 3
title: Default label should be last in a switch
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/default-label-not-last-in-switch`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
The widely adopted convention is putting the `default` statement at the end of a `switch` statement. By adhering to this practice, your code becomes more comprehensible and predictable for developers who engage with it in the future.

## Non-Compliant Code Examples
```java
public class Foo {
   void bar(int a) {
      switch (a) {
         case 1:
            break;
         default:  // this should be the last statement
            break;
         case 2:
            break;
         case 3:
            break;
      }
   }
}
```

## Compliant Code Examples
```java
public class Foo {
   void bar(int a) {
      switch (a) {
         case 1:
            break;
         case 2:
            break;
      }
   }
}
```

```java
public class Foo {
   void bar(int a) {
      switch (a) {
         case 1:  // do something
            break;
         case 2:
            break;
         default:  // the default case should be last, by convention
            break;
      }
   }
}
```
