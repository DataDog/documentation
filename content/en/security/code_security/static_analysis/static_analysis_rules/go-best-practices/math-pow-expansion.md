---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/math-pow-expansion
- /static_analysis/rules/go-best-practices/math-pow-expansion
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/math-pow-expansion
  language: Go
  severity: Info
  severity_rank: 4
title: Expand math.Pow calls
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/math-pow-expansion`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Simple operations such as `math.Pow` with a small number can be simplified. Simplification should be used when applicable.

## Non-Compliant Code Examples
```go
func main () {
    foo := math.Pow(x, 0)
    foo := math.Pow(x, 1)
    foo := math.Pow(x, 2)
    foo := math.Pow(x, 3)
    foo := math.Pow(x, 4)
    foo := math.Pow(x, 010)
}
```

## Compliant Code Examples
```go
func main () {
    foo := 1
    foo := x
    foo := x*x
    foo := x*x*x
    foo := math.Pow(x, 4)
    foo := math.Pow(x, 010)
}
```
