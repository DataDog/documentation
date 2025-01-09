---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/boolean-get-function-name
- /static_analysis/rules/go-best-practices/boolean-get-function-name
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/boolean-get-function-name
  language: Go
  severity: Info
  severity_rank: 4
title: Functions returning boolean should not use prefix get
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/boolean-get-function-name`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go programming, it is considered good coding practice to use the `is` or `has` prefix instead of `get` when naming functions that return a boolean value. This convention is suggested to improve code readability and maintainability.

The reason for this recommendation is that functions prefixed with `get` typically imply that they will return some value. Using `get` for a function that returns a boolean can be misleading and confusing for other developers who may expect it to return some non-boolean value.

By using the `is` or `has` prefix, it explicitly indicates that the function is intended to check the presence or state of a condition and will return a boolean value. This naming convention makes it easier for developers to understand the function's purpose and appropriately use it in their code.


## Non-Compliant Code Examples
```go
func getSomething() bool {
	
}
```

## Compliant Code Examples
```go
func hasSomething() bool {
	
}
```
