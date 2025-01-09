---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/omit-default-slice-index
- /static_analysis/rules/go-best-practices/omit-default-slice-index
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/omit-default-slice-index
  language: Go
  severity: Warning
  severity_rank: 2
title: Omit default slices
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/omit-default-slice-index`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the expression `s[n:len(s)]` is used to slice a string or slice `s` starting from index `n` up to the end of `s`. However, it is considered suboptimal and can be replaced with the simpler and more expressive `s[n:]` notation.

Using `s[n:len(s)]` is not optimal for a few reasons:

1.  Readability: The `s[n:]` notation provides a clearer and more concise representation of slicing from index `n` to the end of `s`. It eliminates the need to explicitly specify `len(s)`, making the code more readable.
2.  Simplicity: By using `s[n:]`, you remove unnecessary redundancy in the code. It improves the simplicity of your code and reduces the chances of introducing errors when manually specifying the length of `s`.
3.  Performance: Although the performance difference may be negligible, using `s[n:]` is more efficient than creating a `len(s)` expression. The `s[n:]` notation directly references the underlying slice without requiring an additional length calculation.

For example, let's consider the following code snippets:

```go
s := "Hello, World!"
fmt.Println(s[7:len(s)])
```

Output: "World!"

```go
s := "Hello, World!"
fmt.Println(s[7:])
```

Output: "World!"

Both snippets will produce the same output, but the second one using `s[7:]` is preferred for its simplicity and readability.

By replacing `s[n:len(s)]` with `s[n:]`, you can improve the clarity and maintainability of your code while still achieving the desired slicing functionality.

## Non-Compliant Code Examples
```go
func main() {
    d := s[n:len(s)]
}
```

## Compliant Code Examples
```go
func main() {
    d := s[n:]
}
```
