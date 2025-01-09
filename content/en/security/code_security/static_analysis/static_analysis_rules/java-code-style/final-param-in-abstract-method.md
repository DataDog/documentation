---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/final-param-in-abstract-method
- /static_analysis/rules/java-code-style/final-param-in-abstract-method
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/final-param-in-abstract-method
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid useless final type in interface method
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/final-param-in-abstract-method`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
The rule "Avoid useless final type in interface method" advises against the unnecessary use of the `final` keyword in the method parameters of an interface. In Java, the `final` keyword is used to denote that a variable cannot be changed once assigned. However, in the context of an interface method, this is redundant as the value of the parameter cannot be changed within the method anyway. 

The importance of this rule lies in the clarity and simplicity of code. Unnecessary use of `final` in this context can lead to confusion for those reading the code, as it suggests that there may be a specific reason for its use when there is not. It can also clutter the code, making it less readable.

Good coding practices to avoid this rule violation include simply not using the `final` keyword in the method parameters of an interface. This does not affect the functionality of the code, but it makes it cleaner and easier to understand. For example, instead of writing `void process(final Object arg);`, you can write `void process(Object arg);`. This maintains the same functionality but improves the readability of the code.

## Non-Compliant Code Examples
```java
public interface FooInterface {
  void process(final Object arg); // Avoid using final here
}
```

## Compliant Code Examples
```java
public interface FooInterface {
  void process(Object arg);
}
```
