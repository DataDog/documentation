---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/verify-short-sleep
- /static_analysis/rules/go-best-practices/verify-short-sleep
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/verify-short-sleep
  language: Go
  severity: Notice
  severity_rank: 3
title: Sleep is in nanoseconds by default; verify short sleep
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/verify-short-sleep`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, the function `time.Sleep` is used to pause the execution of a program for a specified duration. The duration is typically specified using a `time.Duration` value, which represents a length of time.

Calling `time.Sleep` with a small number as the argument can lead to inefficient or unpredictable behavior in a program. This is because the argument is interpreted as a duration in nanoseconds, and using a small number can cause the program to consume excessive CPU resources or introduce unnecessary delays.

Here are some good coding practices to avoid calling `time.Sleep` with a small number:

1.  Avoid using a plain number as the argument: Instead of passing a small number directly to `time.Sleep`, use the `time.Duration` type to specify the desired duration explicitly. This will make the code more readable and maintainable.
2.  Prefer using predefined durations: Go provides predefined durations like `time.Second`, `time.Millisecond`, and `time.Microsecond`. These constants define durations in a more human-readable and understandable way. Use these constants to specify the desired delay rather than using arbitrary small values.
3.  Calculate durations dynamically: If you need to specify a small delay that is less than a predefined duration, you can calculate it dynamically using multiplication or division. For example, instead of using `time.Sleep(100)`, you can use `time.Sleep(100 * time.Millisecond)` to achieve the same effect in a more accurate and maintainable way.
4.  Consider alternative approaches: In some cases, using `time.Sleep` may not be the most appropriate solution. If you need to introduce delays between operations, consider using channels, timers, or other concurrency primitives provided by the Go language. These constructs can offer more granular control over scheduling and coordination.

By following these good coding practices, you can ensure that the use of `time.Sleep` in Go is efficient and predictable, avoiding any unintended side effects caused by calling it with a small number as an argument.


## Non-Compliant Code Examples
```go
package main

import ("time")

func main(){
    time.Sleep(1)
    time.Sleep(9000)
    time.Sleep(100 * time.Millisecond)
    time.Sleep(5 * time.Nanosecond)

    fmt.Println("done sleeping")
}
```
