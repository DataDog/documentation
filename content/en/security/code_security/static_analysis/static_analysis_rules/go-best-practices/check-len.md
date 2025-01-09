---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/check-len
- /static_analysis/rules/go-best-practices/check-len
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/check-len
  language: Go
  severity: Warning
  severity_rank: 2
title: Check to prevent a length less than 0
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/check-len`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the built-in `len()` function returns the length of a slice, map, or string, and it never produces a negative value. The length of any data structure in Go is always a non-negative integer.

Hence, the condition `len(mySlice) < 0` will always evaluate to false, and the code block within the if statement will never execute.

To fix this issue, you should remove the unnecessary check for `len(mySlice) < 0`:

## Non-Compliant Code Examples
```go
func main() {
    if len(mySlice) < 0 {
        // never occurs
    }
}
```

## Compliant Code Examples
```go
func main() {
    if len(mySlice) == 0 {
        
    }
}
```
