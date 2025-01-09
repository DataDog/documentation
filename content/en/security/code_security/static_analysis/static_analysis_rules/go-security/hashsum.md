---
aliases:
- /continuous_integration/static_analysis/rules/go-security/hashsum
- /static_analysis/rules/go-security/hashsum
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Error Prone
  id: go-security/hashsum
  language: Go
  severity: Error
  severity_rank: 1
title: Odd hash.Sum call flow
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/hashsum`

**Language:** Go

**Severity:** Error

**Category:** Error Prone

## Description
No description found

## Non-Compliant Code Examples
```go
import "crypto/sha256"

func main() {
    out := make([]byte, 64)
    h := sha256.New()
    hashed := h.Sum(out)

    hashed := sha256.New().Sum(out)
}
```

## Compliant Code Examples
```go
import "crypto/sha256"

func main() {
    arr := []int{1, 2, 3}
    out := make([]byte, 64)
    h := sha256.New()
    h.Write(arr)
    hashed := h.Sum(out)

    h2 := sha256.New()
    hashArr(h2, arr)
    hashed2 := h2.Sum(out)
}

func hashArr(h hash.Hash, b []byte) {
    h.Write(b)
}
```
