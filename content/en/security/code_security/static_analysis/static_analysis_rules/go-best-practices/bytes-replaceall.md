---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/bytes-replaceall
- /static_analysis/rules/go-best-practices/bytes-replaceall
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/bytes-replaceall
  language: Go
  severity: Warning
  severity_rank: 2
title: Use bytes.ReplaceAll instead of bytes.Replace
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/bytes-replaceall`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the `bytes.Replace()` function is used to replace a certain byte sequence within a byte slice with another byte sequence. The function takes in four parameters: the original byte slice, the old byte sequence to be replaced, the new byte sequence that will replace the old one, and an integer limit dictating how many replacements to be made.

When invoking `bytes.Replace()` with a negative limit, it can lead to unexpected behavior and potential errors in your code. If the limit is negative, there is no limit on the number of replacements. This means that it will replace all instances of the old byte sequence in the original byte slice with the new byte sequence.

For example:

```go
input := []byte("oink oink oink")
fmt.Println(bytes.Replace(input, []byte("k"), []byte("ky"), -2))
```

In this example, `bytes.Replace()` returns a new byte slice where all occurrences of the byte sequence "k" in the original byte slice `"oink oink oink"` are replaced by "ky". This is because the limit is set to -2, indicating that there is no limit on the number of replacements.

While it is not necessarily "incorrect" to use a negative limit, it can create confusion and potentially unintended consequences in your code. It is recommended to use a non-negative limit to have more control over the replacements.

If you want to replace all instances of the old byte sequence in the original byte slice, it is best to use a limit of -1 or use the `bytes.ReplaceAll()` function.

Using a limit of -1 is a well-known convention in Go, indicating that all substitutions should be made. 
	
For example:

```go
input := []byte("oink oink oink")
fmt.Println(bytes.Replace(input, []byte("k"), []byte("ky"), -1))
```

This will replace all occurrences of the byte sequence "k" with "ky" in the original byte slice.

Alternatively, you can use the `bytes.ReplaceAll()` function, which is equivalent to `bytes.Replace()` with a limit of -1. It provides a more readable and self-explanatory way to indicate that all replacements should be made. 
	
For example:

```go
input := []byte("oink oink oink")
fmt.Println(bytes.ReplaceAll(input, []byte("k"), []byte("ky")))
```

This also replaces all occurrences of the byte sequence "k" with "ky" in the original byte slice.

By avoiding the use of negative limits with `bytes.Replace()`, you can ensure clarity and maintainability in your code.

## Non-Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    bytes.Replace("foobarbaz", "foo", "bar", -1)
}
```

## Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    bytes.Replace("", "", "", n)
    bytes.Replace("", "", "", 10)
    bytes.ReplaceAll("foobarbaz", "foo", "bar")
}
```
