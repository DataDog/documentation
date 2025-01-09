---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/comparing-address-nil
- /static_analysis/rules/go-best-practices/comparing-address-nil
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/comparing-address-nil
  language: Go
  severity: Info
  severity_rank: 4
title: Do not check address to nil
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/comparing-address-nil`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
The code `if &x == nil` is not recommended in Go and should be avoided.

Here are a few reasons why:

1.  **Incorrect Comparison**: In Go, comparing the address of a variable `&x` directly to `nil` using `==` is not a valid or meaningful comparison. The address of a variable is a memory location and cannot be directly compared to `nil` to check for its value.
2.  **Pointer Check**: Comparing the address of a variable to `nil` using `==` does not accurately check if the variable itself is nil. It only checks if the address is null, not the value stored at that address.
3.  **Incorrect Usage of** `nil`: In Go, `nil` is typically used to check if a pointer or reference type is uninitialized or doesn't point to a valid object. It is not meant to be used to compare the address of a variable.

To check if a variable is nil, you should directly compare its value to `nil` without taking its address:

```go
if x == nil {
    // Code block
}
```

This is the correct and idiomatic way to check if a variable is nil in Go.

By avoiding the usage of `&x == nil` and using `x == nil` instead, you can write cleaner and more accurate code that adheres to Go's best practices.


## Non-Compliant Code Examples
```go
func main() {
    if &myVar == nil {

    }
}
```

## Compliant Code Examples
```go
func main() {
    var ptr *int = &myVar
    if ptr == nil {

    }
}
```
