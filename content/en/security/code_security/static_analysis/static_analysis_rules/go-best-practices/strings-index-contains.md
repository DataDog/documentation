---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/strings-index-contains
- /static_analysis/rules/go-best-practices/strings-index-contains
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/strings-index-contains
  language: Go
  severity: Notice
  severity_rank: 3
title: Use strings.Contains instead of strings.Index with -1
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/strings-index-contains`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, when checking if one string contains another string, it is recommended to use `strings.Contains(x, y)` instead of `strings.Index(x, y) != -1`.

Here are the reasons why `strings.Contains(x, y)` is preferred:

1.  **Simplicity and Readability**: Using `strings.Contains(x, y)` provides a more readable and expressive way to check if a string `x` contains another string `y`. It clearly conveys the intention of the condition without needing an additional comparison operator.
2.  **Performance**: `strings.Contains(x, y)` is optimized for efficiency and performance. It uses an optimized implementation to check for substring presence, avoiding the need to search for the index and perform an additional comparison.
3.  **Avoiding Errors**: When using `strings.Index(x, y)`, you need to compare against `-1` to check for absence, which can be error-prone. Mistakenly using `0` instead of `-1` would lead to incorrect results. Using `strings.Contains(x, y)` eliminates the possibility of such mistakes.

For example, consider the following code snippets:

```go
1
2
3
if strings.Contains(x, y) {
    // Code block
}
```

```go
1
2
3
if strings.Index(x, y) != -1 {
    // Code block
}
```

Both snippets check if the string `x` contains the substring `y`. However, the first snippet using `strings.Contains(x, y)` is preferred for its simplicity, readability, and performance benefits.

By using `strings.Contains(x, y)` instead of `strings.Index(x, y) != -1`, you can write cleaner and more efficient code that adheres to Go's idiomatic style.


## Non-Compliant Code Examples
```go
import (
	"fmt"
	str2 "strings"
)

func main () {
    if str2.Index(x, y) != -1 {
        //
    }
}
```

```go
import (
	"fmt"
	"strings"
)

func main () {
    if strings.Index(x, y) != -1 {
        //
    }
}
```

## Compliant Code Examples
```go
import (
	"fmt"
	"strings"
)

func main () {
    if strings.Contains(x, y) {
        //
    }
}
```
