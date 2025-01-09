---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/bad-nil-guard
- /static_analysis/rules/go-best-practices/bad-nil-guard
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/bad-nil-guard
  language: Go
  severity: Error
  severity_rank: 1
title: Bad nil guard
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/bad-nil-guard`

**Language:** Go

**Severity:** Error

**Category:** Best Practices

## Description
This rule pertains to the improper use of nil checks in Go code. Nil checks are important in Go to prevent runtime panics that occur when you try to access fields or methods on nil values. The rule violations occur when the nil checks are incorrectly combined with other conditions, especially when using logical operators such as `&&` or `||`.

The improper use of nil checks can lead to confusing code and potential runtime errors. For instance, checking if a variable is nil and trying to access its field in the same condition `(X == nil && X.F)` is contradictory and will cause a runtime panic if X is indeed nil. Similarly, using the OR operator `(X != nil || X.F)` might lead to a runtime panic if X is nil, because the second condition will still be evaluated.

To avoid these issues, ensure that nil checks are done correctly **before** accessing any fields or methods. For example, when combining a nil check with other conditions, be sure to use the `&&` operator to ensure that the other conditions are only evaluated if the variable is not nil. Additionally, ensure the nil check occurs before a condition that accesses the field of a potentially nil variable. Following these practices will help to maintain the clarity of your code and avoid potential runtime panics.

## Non-Compliant Code Examples
```go
func main(req, http) {
    if (req == nil && req.Method == http.MethodGet) {
        // ...
    } else if (req != nil || req.Method == http.MethodPost){ 
        // ...
    } else if (req == nil && len(req.URL.Path) > 0){
        // ...
    } else if (req.Method == http.MethodDelete || req == nil) {
        // ...
    }
}

```

## Compliant Code Examples
```go
func main(req, http) {
    if (req == nil) {
        // ...
    } else if (req != nil && len(req.URL.Path) > 0) {
        // ...
    } else if (req != nil && req.Method == http.MethodDelete) {
        // ...
    }
}

```
