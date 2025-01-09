---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-bare-return
- /static_analysis/rules/go-best-practices/avoid-bare-return
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-bare-return
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid bare returns
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-bare-return`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
The "Avoid bare returns" rule in Go static analysis is designed to increase clarity and readability in your code. A bare return is when a function that has named return values returns those values implicitly, without explicitly stating what is being returned. 

While Go's allowance for bare returns can make code more concise, it can also make it more difficult to understand and debug, especially in larger functions. Implicitly relying on the state of named return values can lead to unexpected behavior if those values are modified elsewhere in the function.

To adhere to this rule and promote better coding practices, always explicitly return values in your functions. This makes it clear what values are being returned and in what state, reducing the chance of bugs and making your code easier to understand. For example, instead of writing `return` in a function that returns an `int` and a `bool`, write `return 0, false`.

### Learn More

 - [Named return values](https://go.dev/tour/basics/7)
 - [Proposal to remove bare returns](https://github.com/golang/go/issues/21291)
 

## Non-Compliant Code Examples
```go
func func1(arg int) (a int) {
    return
}

func func2(arg int) (b int) {
    return
}

func func3(arg int) (a int, b bool) {
    return
}


func func4(a string, b int) (a int, b string) {
	return 
}
```

## Compliant Code Examples
```go
func func1(arg int) {
    return
}

func func2(arg int) int {
    return 4
}

func func3(arg int) (int, bool) {
    return 3, false
}


func func3(arg int) (int, bool) {
    return 3, true
}

func func2(arg int) int {
    return
}

func func3(arg int) (int, bool) {
    return
}


func func3(arg int) (int, bool) {
    return 3, true
}
```
