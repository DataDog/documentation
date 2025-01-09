---
aliases:
- /continuous_integration/static_analysis/rules/go-security/range-memory-aliasing
- /static_analysis/rules/go-security/range-memory-aliasing
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/range-memory-aliasing
  language: Go
  severity: Warning
  severity_rank: 2
title: Prevent Memory Aliasing
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/range-memory-aliasing`

**Language:** Go

**Severity:** Warning

**Category:** Security

## Description
Implicit memory aliasing in for loops refers to a scenario in Go programming when two or more pointers reference the same location in memory, creating unexpected side effects. This often results in a common mistake amongst Go programmers due to the 'range' clause.

Consider this example, where a slice of pointers is created in a loop:

```go
data := []int{1, 2, 3}
pointers := make([]*int, 3)
for i, v := range data {
    pointers[i] = &v
}
```

You might expect the 'pointers' slice to hold addresses of elements in 'data' slice, but that's not the case. In each iteration of the loop, variable 'v' gets a new value but its memory address doesn't change because it's a loop variable. As a result, each element in 'pointers' slice points to the same memory location - the address of the loop variable 'v'. The final value of 'v' is '3', and since all pointers point to 'v', dereferencing the pointers would yield '3' regardless of the pointer's index in the slice.

To avoid implicit memory aliasing in for loops in Go, you should address the actual elements in the original data structure, like so:

```go
data := []int{1, 2, 3}
pointers := make([]*int, 3)
for i := range data {
    pointers[i] = &data[i]
}
```

In this example, each pointer in the 'pointers' slice correctly points to the respective element in the 'data' slice.



#### Learn More

 - [StackOverflow: Implicit memory aliasing in for loop](https://stackoverflow.com/questions/62446118/implicit-memory-aliasing-in-for-loop)

## Non-Compliant Code Examples
```go
import (
    "fmt"
)

func main() {
    data := []int{1, 2, 3}
    pointers := make([]*int, 3)
    for i, v := range data {
        pointers[i] = &v
    }
}
```

```go
import (
    "fmt"
)

func main() {
    for _, n := range []int{1, 2, 3, 4} {
        v = &n
        v := &n
    }
}
```

## Compliant Code Examples
```go
import (
    "fmt"
)

func main() {
    data := []int{1, 2, 3}
    pointers := make([]*int, 3)
    for i := range data {
        pointers[i] = &data[i]
    }
}
```

```go
import (
    "fmt"
)

func main() {
    for _, n := range []int{1, 2, 3, 4} {
        fmt.Printf("%p\n", n)
        v = ++n
        v = foo(--n)
        v := n
    }
}
```
