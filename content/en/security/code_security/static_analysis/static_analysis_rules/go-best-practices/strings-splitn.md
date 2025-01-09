---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/strings-splitn
- /static_analysis/rules/go-best-practices/strings-splitn
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/strings-splitn
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not use strings.Split[After]N with negative limit
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/strings-splitn`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the `strings.SplitN()` function is used to split a string into substrings based on a delimiter. The function takes in two parameters: the original string to be split and the delimiter string. Additionally, it can take an optional integer limit parameter, which determines the number of substrings to be returned.

Calling `strings.SplitN()` with a negative limit can lead to unexpected behavior and potential errors in your code. According to the Go documentation, if the limit is negative, there is no limit on the number of substrings returned. This means that it will split the original string into as many substrings as possible, resulting in an unpredictable number of substrings.

For example:

```go
fmt.Println(strings.SplitN("Hello,World,Welcome", ",", -1))
```

In this example, SplitN will split the string "Hello,World,Welcome" at every occurrence of the delimiter "," and return all substrings. The resulting substrings will be ["Hello", "World", "Welcome"].

To avoid using a negative limit with `strings.SplitN()`, it is recommended to use a positive limit or to use the `strings.Split()` function.

Using a positive limit allows you to control the maximum number of substrings returned. 
	
For example:

```go
fmt.Println(strings.SplitN("Hello,World,Welcome", ",", 2))
```

In this case, `strings.SplitN()` will split the string "Hello,World,Welcome" at the first occurrence of the delimiter "," and return two substrings: ["Hello", "World,Welcome"].

Alternatively, you can use the `strings.Split()` function without specifying a limit. This will split the string into all substrings based on the delimiter. 
	
For example:

```go
fmt.Println(strings.Split("Hello,World,Welcome", ","))
```

This will split the string "Hello,World,Welcome" at every occurrence of the delimiter "," and return all substrings: ["Hello", "World", "Welcome"].

By avoiding the use of negative limits with `strings.SplitN()`, you can write clearer and more predictable code.

## Non-Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    strings.SplitN("foo", "o", -1)
    strings.SplitAfterN("foo", "o", -1)
}
```

## Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    strings.SplitN("foo", "o", 10)
    strings.Split("foo", "o")
}
```
