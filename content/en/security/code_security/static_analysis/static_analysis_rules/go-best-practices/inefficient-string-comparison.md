---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/inefficient-string-comparison
- /static_analysis/rules/go-best-practices/inefficient-string-comparison
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/inefficient-string-comparison
  language: Go
  severity: Info
  severity_rank: 4
title: Inefficient string comparison
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/inefficient-string-comparison`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is recommended not to use `strings.ToLower(s1) == strings.ToLower(s2)` for case-insensitive string comparison. Instead, the `strings.EqualFold(s1, s2)` function should be used. Here's why:

1.  **Efficiency**: Using `strings.EqualFold(s1, s2)` is more efficient because it avoids unnecessary string allocations. When you use `strings.ToLower(s1)`, it creates a new lowercase string each time it is called. Comparing two lowercase strings using `==` (equality operator) then requires additional string comparison operations. In contrast, `strings.EqualFold(s1, s2)` performs a case-insensitive comparison directly without creating additional strings.
2.  **Accurate case-insensitive comparison**: `strings.EqualFold(s1, s2)` is specifically designed for case-insensitive string comparison. It takes into account different languages and ensures accurate results even with non-ASCII characters or special Unicode cases. In contrast, using `strings.ToLower` might not handle all edge cases correctly or consistently.
3.  **Clarity and readability**: By using `strings.EqualFold(s1, s2)`, you convey your intention clearly and improve the readability of your code. The function's name indicates that it performs a case-insensitive comparison, making the code easier to understand for future developers or maintainers.

Therefore, it is recommended to use `strings.EqualFold(s1, s2)` for case-insensitive string comparison in Go. This approach provides better performance, accuracy, and code clarity.

## Non-Compliant Code Examples
```go
func main() {
    if strings.ToLower(s1) != strings.ToLower(s2) {
        //
    }
    if !strings.EqualFold(s1, s2) {
        //
    }
}
```

```go
func main() {
    if strings.ToLower(s1) == strings.ToLower(s2) {
        //
    }
}
```

## Compliant Code Examples
```go
func main() {
    if strings.EqualFold(s1, s2) {
        //
    }
}
```
