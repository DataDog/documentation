---
aliases:
- /continuous_integration/static_analysis/rules/go-security/hmac-needs-new
- /static_analysis/rules/go-security/hmac-needs-new
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/hmac-needs-new
  language: Go
  severity: Error
  severity_rank: 1
title: Calling hmac.New with unchanging hash.New
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/hmac-needs-new`

**Language:** Go

**Severity:** Error

**Category:** Security

## Description
No description found

## Non-Compliant Code Examples
```go
func main() {
    hmacKey := []byte("secret")

    h := sha256.New()
    hmacInstance := hmac.New(func() hash.Hash { return h }, hmacKey)

    var h2 hash.Hash
    hmacInstance2 := hmac.New(func() hash.Hash { return h2 }, hmacKey)

    h3 := sha512.New()
    f := func() hash.Hash { return h3 }
    hmacInstance3 := hmac.New(f, hmacKey)
}
```

## Compliant Code Examples
```go
func main() {
    hmacKey := []byte("secret")
    h := hmac.New(func() hash.Hash { return sha256.New() }, hmacKey)
}
```
