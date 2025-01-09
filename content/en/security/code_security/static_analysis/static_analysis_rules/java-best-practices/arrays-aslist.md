---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/arrays-aslist
- /static_analysis/rules/java-best-practices/arrays-aslist
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Performance
  id: java-best-practices/arrays-aslist
  language: Java
  severity: Warning
  severity_rank: 2
title: Use asList to create a list from array
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/arrays-aslist`

**Language:** Java

**Severity:** Warning

**Category:** Performance

## Description
Using `Arrays.asList` is much faster and cleaner than creating an array by iterating over the values.

## Non-Compliant Code Examples
```java
class Main {
    public List<Integer> getListOfSomething() {
        List<Integer> myList = new ArrayList<>();
        Integer[] myArray = getArrayFromCall();
        
        foo();
        for (int i = 0; i < myArray.length; i++) {
            myList.add(myArray[i]);
        }
        return myList;
    }
}

```

```java
class Main {
    public List<Integer> getListOfSomething() {
        Integer[] myArray = getArrayFromCall();
        List<Integer> myList = new ArrayList<>();
        foo();
        for (int i = 0; i < myArray.length; i++) {
            myList.add(myArray[i]);
        }
        return myList;
    }
}

```

## Compliant Code Examples
```java
class Main {
    public List<Integer> getListOfSomething() {
        Integer[] myArray = getArrayFromCall();
        return Arrays.asList(myArray);
    }
}

```
