---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-nil-check-loop
- /static_analysis/rules/go-best-practices/avoid-nil-check-loop
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-nil-check-loop
  language: Go
  severity: Info
  severity_rank: 4
title: No need to check for nil before a loop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-nil-check-loop`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, if a slice is `nil`, it is considered empty (with a length of 0). When a `for range` loop is used on an empty slice, it simply executes zero times. Therefore, it is not necessary to check if the slice `s` is `nil` before using it in a `for range` loop.

Consider the following code snippets:Consider the following code snippets:

```go
func main () {
    if s != nil {
        for _, x := range s {
        
        }
    }
}
```

In the provided code, the `if` condition `s != nil` is checking if `s` is `nil` before executing the `for range` loop. However, this check is not necessary because even if `s` is `nil`, the loop will not execute. It is an unnecessary extra check that can be removed to make the code simpler and more readable.

Removing the `if` condition and directly using the `for range` loop will not impact the behavior of the code because the loop will simply not execute when `s` is `nil`.


## Non-Compliant Code Examples
```go
func main () {
    if s != nil {
        for _, x := range s {
        
        }
    }
}
```

## Compliant Code Examples
```go
func main () {
    for _, x := range s {
    
    }
}
```
