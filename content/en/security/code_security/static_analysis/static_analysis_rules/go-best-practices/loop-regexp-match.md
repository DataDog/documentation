---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/loop-regexp-match
- /static_analysis/rules/go-best-practices/loop-regexp-match
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/loop-regexp-match
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid regexp.Match in a loop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/loop-regexp-match`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is advisable to compile the regular expression outside of the loop instead of using `regexp.Match` within the loop. Executing `regexp.Match` repeatedly in a loop can lead to unnecessary repeated compilation of the regular expression, impacting performance. 
	
Here's why you should avoid using `regexp.Match` in a loop:

1.  **Compilation overhead**: When using `regexp.Match` within a loop, the regular expression is compiled for every iteration. Compiling a regular expression takes time and incurs overhead, especially for more complex patterns. By moving the compilation outside the loop, you can precompile the regular expression once and reuse it across multiple iterations, improving performance.
2.  **Code readability**: Compiling the regular expression outside the loop enhances code readability. It eliminates the need to compile the same regular expression repeatedly within the loop body, making the loop logic clearer and easier to understand.

Here's an example to demonstrate the issue:

```go
func processStrings(strings []string) {
    pattern := `^\w+@example\.com$`

    for _, str := range strings {
        matched, _ := regexp.Match(pattern, []byte(str))
        if matched {
            // Do something
        }
    }
}
```

In the above code, `regexp.Match` is called for each string in the loop, causing the pattern to be compiled repeatedly. This can be inefficient, especially when processing a large number of strings.

To resolve this, you can compile the regular expression once before the loop:

```go
func processStrings(strings []string) {
    pattern := `^\w+@example\.com$`
    re := regexp.MustCompile(pattern)

    for _, str := range strings {
        matched := re.MatchString(str)
        if matched {
            // Do something
        }
    }
}
```

By compiling the regular expression using `regexp.MustCompile` outside the loop, we create a compiled regular expression object (`re`) that can be reused across multiple iterations, avoiding redundant compilation.

By compiling the regular expression once, you minimize unnecessary overhead and improve the performance of your code. Additionally, the code becomes cleaner and more readable, making it easier to maintain and understand.


## Non-Compliant Code Examples
```go
for {
    regexp.Match(something, somethingElse)

    if regexp.Match(something, somethingElse) {
        regexp.Match(something, somethingElse)
        v = regexp.Match(something, somethingElse)
        v := regexp.Match(something, somethingElse)
    }
}
```
