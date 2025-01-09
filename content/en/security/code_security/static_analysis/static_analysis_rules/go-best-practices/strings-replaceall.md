---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/strings-replaceall
- /static_analysis/rules/go-best-practices/strings-replaceall
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/strings-replaceall
  language: Go
  severity: Warning
  severity_rank: 2
title: Use strings.ReplaceAll instead of strings.Replace
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/strings-replaceall`

**Language:** Go

**Severity:** Warning

**Category:** Best Practices

## Description
In Go, the `strings.Replace()` function is used to replace a certain substring within a string with another substring. The function takes in four parameters: the original string, the old substring to be replaced, the new substring that will replace the old one, and an integer limit dictating how many replacements to be made.

Calling `strings.Replace()` with a negative limit doesn't really make sense. According to the Go documentation, if limit is negative, there is no limit on the number of replacements. Which means it will replace all instances of old substring in the original string with a new substring.

For example:

```go
fmt.Println(strings.Replace("oink oink oink", "k", "ky", -2))
```

In this example, Replace returns a copy of the string "oink oink oink" where "k" is replaced by "ky" everywhere it appears, because limit is -2.

So it's not necessarily "incorrect" to use a negative limit, but it can create misunderstandings in your code. It's best to use a limit of `-1` when you want to replace all instances, as this convention is more commonly understood to mean "no limit".

But if you specifically want to avoid using negative limit for Replace or looking for replace method with better efficiency, using `strings.NewReplacer()` could be a better option when there are multiple string pairs need to be replaced, where you can specify a list of old-new string pairs.

Or you can use `strings.ReplaceAll()`. It is equivalent to Replace with a limit of `-1`. It's arguably clearer and more self-explanatory than using a negative limit with `strings.Replace()`. 
	
For example:

```go
fmt.Println(strings.ReplaceAll("oink oink oink", "o", "ky"))
```

It replaces all instances of "o" in the string "oink oink oink" by "ky".


## Non-Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    strings.Replace("foobarbaz", "foo", "bar", -1)
    
}
```

## Compliant Code Examples
```go
package check

import (
    "strings"
)

func main() {
    strings.Replace("", "", "", n)
    strings.Replace("", "", "", 10)
    strings.ReplaceAll("foobarbaz", "foo", "bar")
}
```
