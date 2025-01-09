---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/get-return
- /static_analysis/rules/go-best-practices/get-return
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/get-return
  language: Go
  severity: Notice
  severity_rank: 3
title: Functions prefixed by get should return something
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/get-return`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In programming, it is a common convention to prefix functions with "get" when they are intended to retrieve or fetch some data or state from an object or system. When following this convention, it is generally expected that functions prefixed with "get" should return a value rather than modifying the state directly. This practice offers a number of benefits:

1.  Intuitive and predictable: Using the "get" prefix indicates to other developers that the function is meant to retrieve data rather than make changes or perform actions. Developers can expect the function to return a value, making the code more intuitive and easy to understand.
2.  Encapsulation and data hiding: By having "get" functions return a value, it encourages encapsulation and proper abstraction of the underlying internal state. The function acts as an interface to access the data, shielding its internals and allowing the object or system to manage access to its state effectively.
3.  Immutability and consistency: Returning a value from a "get" function helps maintain the principle of immutability, ensuring that the data accessed through the function cannot be modified by external code. This promotes consistency and helps prevent unintended modifications that could lead to bugs or unexpected behavior.
4.  Adaptability and flexibility: Returning a value from "get" functions allows for potential changes or enhancements in the future. By returning a value, additional logic or transformations can be applied before returning the data, providing flexibility to modify the behavior of the "get" function without impacting the code that accesses it.

By adhering to the practice of having "get" functions return a value, you improve code clarity, maintain good encapsulation, promote immutability, and allow for future adaptability and extensibility. Following this convention makes the codebase more intuitive, predictable, and maintainable.


## Non-Compliant Code Examples
```go

func GetSomething() {

}

func getSomethingElse() {

}

```

## Compliant Code Examples
```go

func GetSomething() int {

}

func getSomethingElse() (type1, type2){

}

```
