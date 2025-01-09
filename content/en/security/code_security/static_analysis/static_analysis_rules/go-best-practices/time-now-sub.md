---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/time-now-sub
- /static_analysis/rules/go-best-practices/time-now-sub
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/time-now-sub
  language: Go
  severity: Info
  severity_rank: 4
title: Use Since() instead of Now().Sub()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/time-now-sub`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Go's `time` package provides functions and methods for working with dates and times. When calculating the duration between a specific time and the current time, it is recommended to use the `time.Since(x)` function instead of `time.Now().Sub(x)`.

Here are a few reasons why:

1.  Readability: The `time.Since(x)` function conveys the intention of calculating the duration since a specific time `x` in a straightforward manner. It's more readable and easier to understand than chaining `time.Now().Sub(x)`, which requires reading the code from right to left.
2.  Performance: Using `time.Since(x)` avoids the unnecessary creation of an intermediate `time.Time` value with `time.Now()`. By directly calculating the time duration since `x`, you eliminate the overhead of the additional function call and improve performance.
3.  Consistency: The `time.Since(x)` function provides a consistent and idiomatic way of calculating the duration since a specific time. It follows the design principles of the standard library and promotes best practices for Go code.

For example, consider the following code snippets:

```go
1
2
3
x := time.Date(2022, time.March, 20, 0, 0, 0, 0, time.UTC)
duration := time.Now().Sub(x)
fmt.Println(duration)
```

Output: The duration between the current time and March 20, 2022.

```go
1
2
3
x := time.Date(2022, time.March, 20, 0, 0, 0, 0, time.UTC)
duration := time.Since(x)
fmt.Println(duration)
```

Output: The duration between the current time and March 20, 2022.

Both snippets achieve the same result, but the second one using `time.Since(x)` is preferred for its simplicity, readability, and performance.

By using `time.Since(x)` instead of `time.Now().Sub(x)`, you can write more concise and idiomatic Go code, improving readability and maintaining consistency with the standard library.


## Non-Compliant Code Examples
```go
func main() {
    x := time.Now().Sub(x)
}
```

## Compliant Code Examples
```go
func main() {
    x := time.Since(x)
}
```
