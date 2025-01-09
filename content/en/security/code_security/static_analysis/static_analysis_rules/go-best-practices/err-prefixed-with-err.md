---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/err-prefixed-with-err
- /static_analysis/rules/go-best-practices/err-prefixed-with-err
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/err-prefixed-with-err
  language: Go
  severity: Notice
  severity_rank: 3
title: Errors should be named errFoo or ErrFoo
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/err-prefixed-with-err`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, it is a recommended convention to prefix error variables with `err`. This convention helps improve code readability and maintainability by providing a consistent and recognizable pattern for error handling. Here are the reasons why error variables should be prefixed with `err`:

1.  Clear identification: By prefixing error variables with `err`, it becomes immediately clear that the variable represents an error value. This makes it easier for developers to identify error-related variables at a glance and understand their purpose within the code.
2.  Readability: The `err` prefix enhances code readability by establishing a consistent naming convention for error variables across the codebase. When reading the code, it becomes apparent that a variable is an error by simply looking at its name. This promotes clarity and reduces the cognitive load when reviewing or maintaining the code.
3.  Code searchability: Using a consistent prefix like `err` makes it easier to search for error-related variables in a codebase. Developers can quickly search for variables starting with `err` to locate and review error handling logic. This simplifies debugging and troubleshooting efforts when dealing with errors in complex codebases.
4.  Error handling patterns: The convention of prefixing error variables with `err` aligns with common error handling patterns in Go. For example, it is customary to check for error values using `if err != nil` or `if foo, err := bar(); err != nil` constructions. By following this convention, developers can easily identify and apply these error handling patterns consistently throughout the codebase.

It's important to note that this convention is not enforced by the Go language itself and is not a strict requirement. However, it is widely adopted and considered good practice within the Go community. Adhering to this convention provides numerous benefits for code readability, maintainability, and consistency in error handling code.


## Non-Compliant Code Examples
```go
package main

import ("errors")

func main(){
    myErr := errors.New("myErr")
    myErr2 := fmt.Errorf("myError2")
    myErr3 := fmt.New("myErr3") // Technically a false positive, but this is not a real method.
    myErr4 := errors.Errorf("myErr4") // Ditto
 
    fmt.Println(myErr, myError2, myErr3, myErr4)
}
```

## Compliant Code Examples
```go
package main

import ("errors")

func main(){
    err := errors.New("myErr")
    Err2 := fmt.Errorf("myError2")
 
    fmt.Println(err, Err2)
}
```
