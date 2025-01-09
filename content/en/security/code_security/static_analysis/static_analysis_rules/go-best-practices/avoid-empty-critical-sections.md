---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-empty-critical-sections
- /static_analysis/rules/go-best-practices/avoid-empty-critical-sections
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-empty-critical-sections
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid empty critical sections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-empty-critical-sections`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Empty critical sections are often a mistake. Instead of unlocking, developers often miss using `defer` to `defer` unlocking the mutex.

## Non-Compliant Code Examples
```go
func test() {
    mutex.Lock()
    mutex.Unlock()
}
```

## Compliant Code Examples
```go
func test() {
    mutex.Lock()
    doSomething()
    mutex.Unlock()
}
```
