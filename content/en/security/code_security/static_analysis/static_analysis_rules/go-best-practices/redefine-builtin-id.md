---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/redefine-builtin-id
- /static_analysis/rules/go-best-practices/redefine-builtin-id
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/redefine-builtin-id
  language: Go
  severity: Info
  severity_rank: 4
title: Do not redefine built-in ID
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/redefine-builtin-id`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In programming, it is generally recommended to avoid using built-in names for function or variable names. Here are some reasons why this should be avoided:

1.  **Avoiding confusion**: Built-in names in programming languages have specific meanings and functionalities. Using these names for your own functions or variables can cause confusion both for yourself and other developers working on the codebase. It becomes unclear whether the code is referring to the built-in functionality or to your custom implementation.
2.  **Maintainability and future compatibility**: Programming languages evolve over time, and new features and functionalities may be introduced. If you've used a built-in name for your custom function or variable, it may conflict with future updates to the language. This can cause issues during code maintenance or when trying to migrate to a newer version of the language.
3.  **Readability and code comprehension**: Using built-in names for your own functions or variables can make the code less readable. Other developers may expect a built-in behavior associated with that name, leading to confusion and misunderstandings about the purpose and functionality of your code.
4.  **Tooling and IDE support**: Many programming tools and IDEs provide features like auto-completion, syntax highlighting, and code analysis based on the built-in names and features of the language. Using these names for your own code can interfere with these features, potentially hindering your productivity.

To avoid these issues, it is best to choose descriptive and meaningful names for your functions and variables that clearly convey their purpose and behavior. By doing so, you enhance code readability, prevent confusion, ensure future compatibility, and make use of the full range of features and tooling provided by your programming language.


## Non-Compliant Code Examples
```go
func true() {
    false := true
    
    false = false

    append = 1
}
```

## Compliant Code Examples
```go
func myFunction() {
    myVariable := true
    
    myVariable = false

    myList = make(int[])
}
```
