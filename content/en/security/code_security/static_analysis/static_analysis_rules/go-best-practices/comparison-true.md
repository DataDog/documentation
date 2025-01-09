---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/comparison-true
- /static_analysis/rules/go-best-practices/comparison-true
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/comparison-true
  language: Go
  severity: Notice
  severity_rank: 3
title: Do not compare to true
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/comparison-true`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, it is recommended to use the `if foo` syntax, where `foo` is a boolean expression, rather than comparing it explicitly to `true` using `if foo == true`.

Here are the reasons why `if foo` is preferred:

1.  **Simplicity and Readability**: Using `if foo` reduces unnecessary verbosity and improves code readability. It directly expresses the condition based on the truthiness of `foo`, making it easier to understand the intent of the condition without the need for an explicit comparison.
2.  **Idiomatic Expression**: In Go, boolean expressions like `foo` already evaluate to `true` or `false`, so comparing them explicitly to `true` is redundant and unnecessary.
3.  **Avoiding Errors**: Using `if foo` helps prevent common mistakes, such as accidentally using `=` (assignment operator) instead of `==` (equality operator) in the comparison, which would lead to a logical error.

For example, consider the following code snippets:

```go
1
2
3
if foo {
    // Code block
}
```

```go
1
2
3
if foo == true {
    // Code block
}
```

Both snippets achieve the same result if `foo` evaluates to `true`. However, the first snippet using `if foo` is preferred for its simplicity, clarity, and adherence to Go's idiomatic style.

By using `if foo` instead of `if foo == true`, you can write cleaner and more readable code that takes advantage of the natural boolean evaluation in Go.

## Non-Compliant Code Examples
```go
func main() {
    if foo == true {
        
    }
}
```

## Compliant Code Examples
```go
func main() {
    if foo {
        
    }
}
```
