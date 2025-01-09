---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/replace-loop-copy
- /static_analysis/rules/go-best-practices/replace-loop-copy
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/replace-loop-copy
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not copy a slice in a for loop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/replace-loop-copy`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, when you need to copy the elements from one slice to another, it is recommended to use the `copy()` function instead of manually iterating over the elements using a `for` loop with the index.

Here are the reasons why `copy(dst, src)` is preferred over the `for` loop approach:

1.  **Simplicity and Readability**: The `copy(dst, src)` function provides a clear and concise way to perform slice copying operations. It clearly conveys the intention of copying the elements from `src` to `dst` without needing any explicit iteration or indexing.
2.  **Performance**: The `copy()` function is implemented with optimized internal instructions and optimizations. It leverages lower-level memory operations and avoids unnecessary checks, making it more efficient and performant than manually iterating over the slice elements.
3.  **Correctness and Safety**: The `copy()` function guarantees the correct and safe handling of overlapping slices by performing each element-by-element copy in a well-defined manner. This ensures that the operation is carried out correctly, even if the source and destination slices overlap.

For example, consider the following code snippets:

```go
for i, x := range src {
    dst[i] = x
}
```

```go
copy(dst, src)
```

Both snippets copy the elements from `src` to `dst`, assuming they have the same lengths. However, the second snippet using `copy(dst, src)` is preferred for its simplicity, readability, performance, and safety.

By using `copy(dst, src)` instead of the `for` loop, you can write more efficient and reliable code that adheres to Go's idiomatic style.


## Non-Compliant Code Examples
```go
func main() {
    dst := make([]int, 51)
    println("something")
    for i, x := range src {
        dst[i] = x
    }
}
```

## Compliant Code Examples
```go
func main() {
    for k, v := range newTags {
        tags[k] = v
    }
}
```

```go
func main() {
    copy(dst, x)
}
```
