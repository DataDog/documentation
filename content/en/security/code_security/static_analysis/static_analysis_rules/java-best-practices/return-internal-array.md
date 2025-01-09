---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/return-internal-array
- /static_analysis/rules/java-best-practices/return-internal-array
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/return-internal-array
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not return internal array
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/return-internal-array`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Avoid returning an array that was defined as a class member. If you want to return an array or the values of the array that is a class member, consider returning a copy of the array.

## Non-Compliant Code Examples
```java
public class SecureSystem {
    String foo;
    UserData [] ud;
    Object bar;
    public void something() {

    }
    public UserData [] getUserData() {
        return ud;
    }
    public void somethingElse() {
        
    }
}
```

## Compliant Code Examples
```java
public class SecureSystem {
    String foo;
    
    Object bar;
    public void something() {

    }
    public UserData [] getUserData() {
        UserData [] ud;
        return ud;
    }
    public void somethingElse() {
        
    }
}
```
