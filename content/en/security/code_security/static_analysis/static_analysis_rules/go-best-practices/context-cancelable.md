---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/context-cancelable
- /static_analysis/rules/go-best-practices/context-cancelable
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/context-cancelable
  language: Go
  severity: Warning
  severity_rank: 2
title: Call the context cancellation function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/context-cancelable`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, it is important to call the cancellation function returned by the `context.WithTimeout` and `context.WithDeadline` functions. These functions are designed to create a new context that can be cancelled, thus the cancellation function needs to be called for proper cleanup.

This rule is crucial because not calling the cancellation function can lead to resource leaks. A context that is not cancelled will remain in memory until the parent context's cancellation function is called or the parent context's deadline expires. This could potentially lead to high memory usage, especially in long-running programs or services that create many contexts.

To adhere to this rule, always call the cancellation function when the work associated with the context is done. This can be achieved by using `defer` immediately after the context is created, or by explicitly calling the cancellation function when the work is done. Alternatively, in testing scenarios, you can use `t.Cleanup` to call the cancellation function after the test is completed.

## Non-Compliant Code Examples
```go
func main() {
    ctx, cancel := context.WithTimeout()
}
```

## Compliant Code Examples
```go
func main() {
    ctx, cancel := context.WithTimeout();
    t.Cleanup(cancel);
}
```

```go
func main() {
    ctx, cancel := context.WithTimeout();
    cancel();
}
```

```go
func main() {
    ctx, cancel := context.WithTimeout();
    defer cancel();
}
```
