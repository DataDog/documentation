---
aliases:
- /continuous_integration/static_analysis/rules/go-security/session-secure
- /static_analysis/rules/go-security/session-secure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/session-secure
  language: Go
  severity: Info
  severity_rank: 4
title: Session must be secure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/session-secure`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
Setting `Secure` to true in the `sessions.Options` structure is important for maintaining the security of web sessions. This flag indicates that the session cookie should only be sent over encrypted connections (HTTPS). By setting `Secure` to true, you ensure that the session cookie is not transmitted over unencrypted HTTP connections, which can help prevent eavesdropping and various types of attacks like session hijacking and man-in-the-middle attacks.

To avoid potential security risks and best protect sensitive data, it is advisable to always set `Secure` to true when working with session management. Additionally, using HTTPS throughout your application ensures end-to-end encryption of all data transmitted between the client and the server.

In conclusion, always setting `Secure` to true in the `sessions.Options` structure is a good coding practice to enhance the security of your web application and protect your users' data from potential threats.


## Non-Compliant Code Examples
```go
import (
	"github.com/gorilla/sessions"
)

func main () {
    session = sessions.Options {
        Path:   "/",
        MaxAge: 3600,
        HttpOnly: true,
        Secure: false,
    }

}
```

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
        Secure: true,
    }
    
    foo.bar = sub.String("w", "something-something", &argparse.Options{Required: true})
}
```
