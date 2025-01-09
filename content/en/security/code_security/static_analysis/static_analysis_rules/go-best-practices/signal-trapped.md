---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/signal-trapped
- /static_analysis/rules/go-best-practices/signal-trapped
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/signal-trapped
  language: Go
  severity: Info
  severity_rank: 4
title: Invalid signal being trapped
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/signal-trapped`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Using `signal.Ignore(syscall.SIGKILL)` or `signal.Reset(os.Kill)` to handle the `SIGKILL` signal is not considered good practice because the `SIGKILL` signal is designed to be uncatchable and unignorable.

In most operating systems, including Unix-based systems, the `SIGKILL` signal is a special signal that cannot be caught, ignored, or handled by any process. It is intended as a forceful termination signal that immediately terminates a process without allowing it to perform any cleanup or additional operations.

Therefore, attempting to ignore or reset the `SIGKILL` signal using `signal.Ignore(syscall.SIGKILL)` or `signal.Reset(os.Kill)` will have no effect. The process will still be forcefully terminated when a `SIGKILL` signal is sent to it.

It is generally not recommended to handle the `SIGKILL` signal programmatically because it defeats the purpose of the signal itself, which is to guarantee the immediate termination of a process if needed.

Handling other signals, such as `SIGINT` or `SIGTERM`, can be useful to gracefully shut down a process and perform necessary cleanup operations before termination. However, `SIGKILL` signals should not be caught or ignored as they are meant to forcefully terminate processes without any chance of intervention.

In conclusion, it is not good coding practice to use `signal.Ignore(syscall.SIGKILL)` or `signal.Reset(os.Kill)` to handle the `SIGKILL` signal, as it is not catchable or ignorable by design.


## Non-Compliant Code Examples
```go
func main () {
    signal.Ignore(os.Signal(signal.SIGKILL))
    signal.Ignore(os.Kill)
    signal.Reset(os.Kill)
    signal.Ignore(syscall.SIGKILL)
    signal.Notify(p, syscall.SIGKILL)
    signal.Notify(p, os.SIGKILL)
}
```

## Compliant Code Examples
```go
func main () {
    signal.Notify(p, os.SIGUSR1)
}
```
