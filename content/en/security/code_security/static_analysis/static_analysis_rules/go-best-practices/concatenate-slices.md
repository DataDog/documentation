---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/concatenate-slices
- /static_analysis/rules/go-best-practices/concatenate-slices
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/concatenate-slices
  language: Go
  severity: Info
  severity_rank: 4
title: Use append to concatenate slices
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/concatenate-slices`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Programmers should avoid writing `for i := range y { x = append(x, y[i]) }` and use `x = append(x, y...)` instead. 
	
Here are a few reasons why:

1.  **Simplicity and readability**: The `x = append(x, y...)` expression is more concise and clearer in its intent. It directly appends all elements of `y` to `x` without the need for an explicit loop with index access. It is easier to read and understand for other developers.
2.  **Performance**: Using the `x = append(x, y...)` syntax is generally faster and more efficient than iterating over each element of `y` using a `for` loop. The implicit use of variadic arguments in `append` reduces memory allocations and improves performance.
3.  **Avoiding index access**: By using `x = append(x, y...)`, you eliminate the need for manual index access `y[i]` and let the built-in `append` function handle the internal implementation efficiently.
4.  **Consistency**: Using `x = append(x, y...)` for concatenation is consistent with other idiomatic Go code. It is a widely accepted practice and is commonly used in the Go community.

By adopting the `x = append(x, y...)` approach, programmers can simplify their code, improve performance, and adhere to Go's idiomatic style. It enhances code readability, reduces the chance of typographical errors, and promotes efficient slicing and concatenation.


## Non-Compliant Code Examples
```go
func main() {
    for i := range y {
        x = append(x, y[i])
    }
}
```

## Compliant Code Examples
```go
func main() {
    x = append(x, y...)

    for _, e := range y {
        x = append(x, e)
    }
}
```
