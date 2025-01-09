---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/avoid-dot-imports
- /static_analysis/rules/go-best-practices/avoid-dot-imports
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/avoid-dot-imports
  language: Go
  severity: Notice
  severity_rank: 3
title: Dot imports should be avoided
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/avoid-dot-imports`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Go, dot imports refer to importing packages using the dot notation, where the package name is omitted and the imported symbols (functions, types, etc.) can be used directly without qualifying them with the package name.

Dot imports are generally discouraged in Go due to the following reasons:

1.  Code readability and maintainability: Dot imports can make code harder to understand and follow. It can be difficult to determine which package a symbol belongs to when it is used without qualification. This can hinder code readability and make it more challenging for other developers to understand and maintain the codebase.
2.  Name conflicts: Dot imports can introduce naming conflicts. If multiple packages have symbols with the same name, it can lead to ambiguities and unpredictable behavior. This can make debugging and troubleshooting more difficult, as it may not be clear which symbol is being used.
3.  Implicit dependencies: Dot imports obscure the explicit dependencies of a package. When using dot imports, it becomes less clear which symbols are being used from which package. This can lead to a lack of clarity regarding the actual dependencies of the code, making it harder to reason about the code's behavior and introduce potential issues when refactoring or updating dependencies.
4.  Code editor assistance: Dot imports can interfere with code editor features like autocompletion and static analysis. When symbols are imported with dot notation, code editors may not be able to provide accurate suggestions or identify errors as effectively as when imports are explicit and qualified.

To avoid these issues, it is generally recommended to explicitly import packages and qualify the symbols used from them. This promotes code clarity, makes dependencies explicit, reduces the likelihood of naming conflicts, and improves tooling support from code editors and static analysis tools.

## Non-Compliant Code Examples
```go
package main

import (
	"foo/utils"
	. "bar"
)
```

## Compliant Code Examples
```go
package main

import (
	. "github.com/onsi/ginkgo/v2"
    . "github.com/onsi/gomega"
    . "github.com/smartystreets/goconvey/convey"
)
```
