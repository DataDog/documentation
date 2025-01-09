---
aliases:
- /continuous_integration/static_analysis/rules/go-security/telnet-request
- /static_analysis/rules/go-security/telnet-request
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/telnet-request
  language: Go
  severity: Info
  severity_rank: 4
title: Do not use telnet without encryption
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/telnet-request`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
When sending telnet requests, it is important to use Secure Sockets Layer (SSL) or its successor, Transport Layer Security (TLS), to ensure secure communication. Telnet protocol transmits data in plaintext, which means that any information exchanged, including sensitive data like passwords or commands, can be intercepted and read by malicious actors if the connection is not encrypted.

By utilizing SSL/TLS with telnet requests, the data transmitted is encrypted, making it significantly more difficult for unauthorized parties to intercept and read the information being exchanged.

## Non-Compliant Code Examples
```go
func main () {
    telnet.DialToAndCall("my.telnet.server:23", caller)
}
```

## Compliant Code Examples
```go
func main () {
    telnet.DialToAndCallTLS("my.telnet.server:992", caller)
}
```
