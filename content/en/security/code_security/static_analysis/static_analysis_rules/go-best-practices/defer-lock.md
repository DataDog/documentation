---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/defer-lock
- /static_analysis/rules/go-best-practices/defer-lock
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/defer-lock
  language: Go
  severity: Info
  severity_rank: 4
title: Do not defer Lock
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/defer-lock`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Empty critical sections are often a mistake. Instead of unlocking, developers often miss using `defer` to `defer` unlocking the mutex.

## Non-Compliant Code Examples
```go
func test() {
    mutex.Lock()
    defer mutex.Lock()
}
```

## Compliant Code Examples
```go
func test() {
    mutex.Lock()
    defer mutex.Unlock()
}
```
