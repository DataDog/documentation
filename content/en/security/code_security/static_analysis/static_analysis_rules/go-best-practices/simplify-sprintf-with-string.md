---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/simplify-sprintf-with-string
- /static_analysis/rules/go-best-practices/simplify-sprintf-with-string
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/simplify-sprintf-with-string
  language: Go
  severity: Warning
  severity_rank: 2
title: fmt.Sprintf("%s", var) should not be used if var is a string
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/simplify-sprintf-with-string`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, it is recommended to avoid using `fmt.Sprintf()` unnecessarily when printing a string and instead use the string directly. This guideline promotes code simplicity, readability, and execution efficiency. Here are a few reasons why using the string directly is preferred over `fmt.Sprintf()` for simple string printing:

1.  Readability: Using the string directly is more concise and easier to read, especially when the format specifiers offered by `fmt.Sprintf()` are not needed. By avoiding the additional `fmt.Sprintf()` call, the code becomes cleaner and more straightforward, conveying its intention more effectively.
2.  Performance: Invoking `fmt.Sprintf()` requires additional CPU cycles and memory allocation. Although the overhead may seem insignificant in isolation, repeated usage or in performance-critical code paths can impact the overall runtime efficiency of your program. By directly printing the string, you eliminate the unnecessary overhead of formatting and allocation associated with `fmt.Sprintf()`.
3.  Type safety: When using `fmt.Sprintf()`, the compiler cannot check the correctness of the format specifiers and arguments. This can potentially lead to runtime errors or incorrect output if the format specifiers or arguments do not match. By directly using the string, you avoid the risk of format string-related errors and ensure type safety.

That said, `fmt.Sprintf()` can still be useful in scenarios where formatting is needed, such as when building complex strings or including variable values within the output. `fmt.Sprintf()` offers powerful formatting options and is essential for more advanced string formatting requirements.

In summary, when it comes to simple string printing without any formatting needs or complex variable substitutions, it is best to use the string directly instead of `fmt.Sprintf()`. This approach promotes code simplicity, better performance, and improved code readability. However, when formatting is necessary, `fmt.Sprintf()` remains a powerful tool to handle more intricate string construction.


## Non-Compliant Code Examples
```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println(fmt.Sprintf("this is a string"))
	fmt.Println(fmt.Sprintf("%s", "this is a string"))
	fmt.Println(fmt.Sprintf("FOO: %s", "bar"))
}

```

## Compliant Code Examples
```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println("this is a string")
	
	// These are considered compliant because the intent may be to highlight the string literal(s)
	message := "DEBUG"
	fmt.Println(fmt.Sprintf("%s: %s", message, "this is a string"))
	fmt.Println(fmt.Sprintf("%s - %s", "this is a string", "this is also a string"))
}

```
