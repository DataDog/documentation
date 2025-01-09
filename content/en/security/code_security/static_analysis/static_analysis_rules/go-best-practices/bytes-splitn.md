---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/bytes-splitn
- /static_analysis/rules/go-best-practices/bytes-splitn
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/bytes-splitn
  language: Go
  severity: Warning
  severity_rank: 2
title: Do not use bytes.SplitN or bytes.SplitAfterN with limit < 0
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/bytes-splitn`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the `bytes.SplitN()` and `bytes.SplitAfterN()` functions are used to split a byte slice into multiple byte slices based on a delimiter. The functions take in two parameters: the original byte slice to be split and the delimiter byte slice. Additionally, they can take an optional integer limit parameter, which determines the number of byte slices to be returned.

It is recommended to avoid invoking `bytes.SplitN()` or `bytes.SplitAfterN()` with a negative limit, as it can lead to unexpected behavior and potential errors in your code. If the limit is negative, there is no limit on the number of byte slices returned. This means that the original byte slice will be split into as many slices as possible, resulting in an unpredictable number of slices.

For example:

```go
input := []byte("Hello,World,Welcome")
fmt.Println(bytes.SplitN(input, []byte(","), -1))
```

In this example, `bytes.SplitN()` will split the byte slice `"Hello,World,Welcome"` at every occurrence of the delimiter `","` and return all byte slices. The resulting slices will be `[Hello World Welcome]`.

To avoid using a negative limit with `bytes.SplitN()` or `bytes.SplitAfterN()`, it is recommended to use a positive limit or to use the `bytes.Split()` or `bytes.SplitAfter()` functions.

Using a positive limit allows you to control the maximum number of byte slices returned. 
	
For example:

```go
input := []byte("Hello,World,Welcome")
fmt.Println(bytes.SplitN(input, []byte(","), 2))
```

In this case, `bytes.SplitN()` will split the byte slice `"Hello,World,Welcome"` at the first occurrence of the delimiter `","` and return two slices: `[Hello World,Welcome]`.

Alternatively, you can use the `bytes.Split()` or `bytes.SplitAfter()` functions without specifying a limit. These functions split the byte slice into all possible slices based on the delimiter. 
	
For example:

```go
input := []byte("Hello,World,Welcome")
fmt.Println(bytes.Split(input, []byte(",")))
```

This will split the byte slice `"Hello,World,Welcome"` at every occurrence of the delimiter `","` and return all slices: `[Hello World Welcome]`.

By avoiding the use of negative limits with `bytes.SplitN()` or `bytes.SplitAfterN()`, you can write clearer and more predictable code.


## Non-Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    bytes.SplitN("foo", "o", -1)
    bytes.SplitAfterN("foo", "o", -1)
}
```

## Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    bytes.SplitN("foo", "o", 10)
    bytes.Split("foo", "o")
}
```
