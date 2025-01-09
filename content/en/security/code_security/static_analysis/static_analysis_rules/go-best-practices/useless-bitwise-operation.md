---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/useless-bitwise-operation
- /static_analysis/rules/go-best-practices/useless-bitwise-operation
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/useless-bitwise-operation
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid useless bit operations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/useless-bitwise-operation`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
The expressions `x|0`, `x^0`, and `x&0` are bitwise operations that involve the number `0`. In these specific cases, the operation with `0` doesn't have any effect on the value `x`.

1.  `x|0`: The bitwise OR (`|`) operation between `x` and `0` will result in `x` itself. This is because any bit OR'ed with `0` will retain its original value. Therefore, `x|0` can be simplified and replaced with just `x`.
2.  `x^0`: The bitwise XOR (`^`) operation between `x` and `0` is similar to the OR operation. XOR'ing any bit with `0` will preserve its original value. As a result, `x^0` is equivalent to `x`. Thus, the expression `x^0` can be simplified and replaced by just `x`.
3.  `x&0`: The bitwise AND (`&`) operation between `x` and `0` will always yield `0`. This is because any bit AND'ed with `0` will always result in `0`. Therefore, `x&0` can be simplified and replaced by just `0`.

Simplifying these expressions by replacing them with their respective values (`x` or `0`) can enhance code readability and reduce unnecessary operations. However, it's important to note that these simplifications only hold true when being operated on with the constant `0`. If the constant value changes or the expressions involve variables, the behavior and result may vary.

By avoiding unnecessary operations and writing code that clearly exprresses your intent, you can make your code more maintainable and readable.


## Non-Compliant Code Examples
```go
func main () {
    println(x | 0)
    println(x & 0)
    println(x ^ 0)
}
```

## Compliant Code Examples
```go
func main () {
    println(x)
    println(0)
    println(x)
}
```
