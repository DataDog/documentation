---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-call-to-gc
- /static_analysis/rules/go-best-practices/avoid-call-to-gc
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-call-to-gc
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid calling the GC directly
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-call-to-gc`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is generally recommended to avoid using `runtime.GC()` and prevent direct calls to the garbage collector (GC). Here are a few reasons why:

1.  Efficiency: Go's garbage collector is designed to automatically manage memory and determine when to run the garbage collection process based on the needs of the program. The Go runtime is optimized to efficiently handle garbage collection without manual intervention. Directly calling `runtime.GC()` can disrupt the optimized garbage collection process and potentially lead to performance issues.
2.  Unpredictable Behavior: Calling the GC directly can introduce unpredictable behavior and potentially cause unintended consequences. The Go runtime employs a sophisticated garbage collector that operates based on heuristics and runtime conditions. Manually triggering the GC may interfere with the GC's ability to perform effective memory management and may not yield the expected results.
3.  Code Readability and Simplicity: Directly calling the GC makes the code more complex and harder to understand. It can obscure the underlying memory management and make the code less maintainable. The Go language promotes writing clean, readable code, and relying on the automatic garbage collector helps maintain this simplicity and readability.
4.  Focus on Algorithmic Optimization: Instead of manually calling the GC, it is generally better to focus on algorithmic optimization and writing efficient code. Optimizing data structures, reducing unnecessary allocations, and managing resources effectively can have a more significant impact on the performance of a Go program compared to manual GC calls.

In most cases, it is best to rely on Go's automatic garbage collector and let it handle memory management. Trusting the runtime's automatic GC ensures efficient memory usage and allows developers to focus on writing clear, maintainable code.


## Non-Compliant Code Examples
```go
func main() {
    runtime.GC()
}
```
