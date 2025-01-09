---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/bytes-compare-equal
- /static_analysis/rules/go-best-practices/bytes-compare-equal
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/bytes-compare-equal
  language: Go
  severity: Warning
  severity_rank: 2
title: Use bytes.Equal instead of bytes.Compare
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/bytes-compare-equal`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, when comparing two byte slices for equality, it is recommended to use `bytes.Equal(x, y)` instead of `bytes.Compare(x, y) == 0`.

Here's why `bytes.Equal(x, y)` is preferred over `bytes.Compare(x, y) == 0`:

1.  **Simplicity and Readability**: Using `bytes.Equal(x, y)` provides a more straightforward and readable way to compare byte slices for equality. It clearly conveys the intention of the condition without needing an additional comparison check.
2.  **Performance**: `bytes.Equal(x, y)` is optimized for efficiency and performs a quick early exit if the lengths of the slices are not equal. On the other hand, `bytes.Compare(x, y) == 0` performs a full lexicographic comparison and is less performant for simple equality checks.
3.  **Idiomatic Expression**: In Go, `bytes.Equal(x, y)` is the idiomatic way to check if two byte slices are equal. It is widely recognized and understood by Go developers, making your code more maintainable and consistent with the Go ecosystem.

For example, consider the following code snippets:

```go
1
2
3
if bytes.Equal(x, y) {
    // Code block
}
```

```go
1
2
3
if bytes.Compare(x, y) == 0 {
    // Code block
}
```

Both snippets check if the byte slices `x` and `y` are equal. However, the first snippet using `bytes.Equal(x, y)` is preferred for its simplicity, readability, and potential performance benefits.

By using `bytes.Equal(x, y)` instead of `bytes.Compare(x, y) == 0`, you can write cleaner and more efficient code that adheres to Go's idiomatic style.

## Non-Compliant Code Examples
```go
func main() {
    if bytes.Compare(x, y) == 0 {
        
    }
}
```

## Compliant Code Examples
```go
func main() {
    if bytes.Equal(x, y) {
        
    }
}
```
