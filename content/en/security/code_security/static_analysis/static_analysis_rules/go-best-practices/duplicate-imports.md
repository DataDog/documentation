---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/duplicate-imports
- /static_analysis/rules/go-best-practices/duplicate-imports
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/duplicate-imports
  language: Go
  severity: Notice
  severity_rank: 3
title: Verify that duplicate imports are necessary
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/duplicate-imports`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
In Go, duplicate imports refer to importing the same package multiple times in a single file. It is considered a best practice to avoid duplicate imports in Go for the following reasons:

1.  Code readability and maintainability: Duplicate imports can make code harder to read and understand. When the same package is imported multiple times, it can lead to confusion and make it more difficult to determine the source of a particular symbol or function. Keeping imports concise and free of duplicates helps improve code readability and maintainability.
2.  Name conflicts: Duplicate imports introduce the risk of name conflicts. If the same package is imported multiple times, Go does not distinguish between them, which can result in name clashes between symbols from different imports. This can cause compilation errors or unexpected behavior, making the code prone to bugs and difficult to troubleshoot.
3.  Package initialization: Each package in Go can have an initialization function, `init()`, which is executed during package initialization. When the same package is imported multiple times, the `init()` function is run multiple times as well. This can lead to unexpected side effects and violate assumptions made by the package initialization code.
4.  Compilation efficiency: Duplicate imports can impact compilation time and increase the size of the resulting binary. The Go compiler needs to process each imported package, and duplicating imports can cause unnecessary overhead during the build process.

To avoid these issues, it is recommended to keep imports concise and remove any duplicates. Go provides a handy feature where you can group multiple imports from the same package on a single line, reducing duplication. Additionally, using aliases when necessary can help resolve naming conflicts between symbols from different packages.


## Non-Compliant Code Examples
```go
import (
    "fmt"
    fmt2 "fmt"
    fmt3 "fmt"
    _ "fmt"
    "io"
    io2 "io"
    "log"
)
```

## Compliant Code Examples
```go
import (
    "fmt"
    log1 "log"
)
```
