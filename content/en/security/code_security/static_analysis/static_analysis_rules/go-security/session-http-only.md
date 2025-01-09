---
aliases:
- /continuous_integration/static_analysis/rules/go-security/session-http-only
- /static_analysis/rules/go-security/session-http-only
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/session-http-only
  language: Go
  severity: Info
  severity_rank: 4
title: Prevent XSS injection by setting HttpOnly to false
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/session-http-only`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [1004](https://cwe.mitre.org/data/definitions/1004.html)

## Description
By setting the "HTTP-only" flag in session cookies, web developers effectively restrict the client-side access to the session cookie. This means that the cookie can only be accessed and transmitted over a secure HTTP connection, preventing it from being accessed by JavaScript code or through client-side scripting attacks such as cross-site scripting (XSS).

Here are some good coding practices to avoid session cookie vulnerabilities:

1.  Set the "HTTP-only" flag: When creating session cookies, ensure that the "HTTP-only" flag is set, preventing client-side scripts from accessing the cookie information.
2.  Secure cookie transmission: Use secure HTTPS connections to transmit session cookies between clients and servers. This protects the session cookies from being intercepted or tampered with by malicious actors.
3.  Implement strong session management practices: Follow secure session management practices, such as generating random and unique session IDs, setting appropriate expiration times for sessions, and invalidating sessions after logout or timeout.
4.  Protect against session fixation attacks: Implement mechanisms that protect against session fixation attacks, such as generating a new session ID for each authenticated user and regenerating session IDs after user authentication.
5.  Regularly review and update session-related code: Continuously review and update session-related code to ensure it aligns with the latest security best practices and guidelines.

By implementing these good coding practices, developers can mitigate session cookie vulnerabilities and enhance the security of web applications.


## Non-Compliant Code Examples
```go
import (
	"github.com/gorilla/sessions"
)

func main () {
    session = sessions.Options {
        Path:   "/",
        MaxAge: 3600,
        HttpOnly: false,
    }
}
```

## Compliant Code Examples
```go
import (
	"github.com/gorilla/sessions"
)

func main () {
    session = sessions.Options {
        Path:   "/",
        MaxAge: 3600,
        HttpOnly: true,
    }
}
```
