---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/mod-one-always-zero
- /static_analysis/rules/go-best-practices/mod-one-always-zero
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/mod-one-always-zero
  language: Go
  severity: Info
  severity_rank: 4
title: Replace var % 1 by 0
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/mod-one-always-zero`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
A modulus operation `%` with a constant value (1) on the variable `foo` and then checks if the result is equal to 0. Writing `myVariable % 1` is equivalent to writing `0`.

## Non-Compliant Code Examples
```go
func main() {
    v := foo % 1
}
```

## Compliant Code Examples
```go
func main() {
    v := foo % 2
}
```
