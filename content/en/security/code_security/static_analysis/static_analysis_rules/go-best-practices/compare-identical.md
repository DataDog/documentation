---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/compare-identical
- /static_analysis/rules/go-best-practices/compare-identical
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/compare-identical
  language: Go
  severity: Info
  severity_rank: 4
title: Prevent identical comparison
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/compare-identical`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Avoid comparing the same expression, it always results to `true`.

## Non-Compliant Code Examples
```go
func main() {
    if a == a {

    }

    if a == b {

    }

    if (1 + 2) == (1 + 2) {

    }
}
```

## Compliant Code Examples
```go
func main() {
    if a == b {

    }
}
```
