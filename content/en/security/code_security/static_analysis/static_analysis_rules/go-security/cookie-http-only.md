---
aliases:
- /continuous_integration/static_analysis/rules/go-security/cookie-http-only
- /static_analysis/rules/go-security/cookie-http-only
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/cookie-http-only
  language: Go
  severity: Info
  severity_rank: 4
title: Prevent XSS injection by setting HttpOnly to true
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/cookie-http-only`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [1004](https://cwe.mitre.org/data/definitions/1004.html)

## Description
The `HttpOnly` attribute of an `http.Cookie` is a security measure that helps protect cookies from certain types of attacks, such as cross-site scripting (XSS) attacks. When the `HttpOnly` attribute is set, it instructs the browser that the cookie should not be accessible via client-side scripts, such as JavaScript. This means that even if a malicious script manages to execute on the client-side, it cannot access or manipulate the protected cookie, thus reducing the risk of sensitive information leakage.

Failing to set the `HttpOnly` attribute leaves the cookie vulnerable to XSS attacks, where an attacker could potentially steal sensitive information stored in the cookie, such as authentication tokens or session identifiers.

To prevent such security risks, always ensure that the `HttpOnly` attribute is set for cookies that contain sensitive information. This simple step can significantly enhance the security of your application. Additionally, following secure coding practices, such as validating and sanitizing user input, can help mitigate other security threats.


## Non-Compliant Code Examples
```go
import (
	"github.com/gorilla/sessions"
)

func main () {
    session = http.Cookie {
        Path:   "/",
        MaxAge: 3600,
        HttpOnly: false,
    }
}
```

## Compliant Code Examples
```go
func main () {
    session = http.Cookie {
        Path:   "/",
        MaxAge: 3600,
        HttpOnly: true,
    }
}
```
