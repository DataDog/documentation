---
aliases:
- /continuous_integration/static_analysis/rules/go-security/cookie-secure
- /static_analysis/rules/go-security/cookie-secure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/cookie-secure
  language: Go
  severity: Info
  severity_rank: 4
title: Session must be secure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/cookie-secure`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
The `Secure` attribute of an `http.Cookie` is a security measure that indicates the cookie should only be sent over secure connections, such as HTTPS. Failing to set the `Secure` attribute can expose sensitive information to potential attacks, like man-in-the-middle attacks, where an attacker can intercept the communication between the client and the server.

To avoid this vulnerability, always ensure that the `Secure` attribute is set for cookies containing sensitive information. Also, make sure that your application enforces the use of HTTPS to encrypt the communication between the client and the server. By following these best practices, you can enhance the security of your application and protect user data from potential threats.


## Non-Compliant Code Examples
```go
func main () {
    cookie = http.Cookie {
        Path:   "/",
        HttpOnly: true,
    }
}
```

```go
func main () {
    cookie = http.Cookie {
        Path:   "/",
        HttpOnly: true,
        Secure: false,
    }
}
```

## Compliant Code Examples
```go
func main () {
    cookie = http.Cookie {
        Path:   "/",
        Secure: true, // <-- true
        HttpOnly: true,
    }
}
```
