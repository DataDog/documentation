---
aliases:
- /continuous_integration/static_analysis/rules/go-security/jwt-algorithm
- /static_analysis/rules/go-security/jwt-algorithm
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/jwt-algorithm
  language: Go
  severity: Info
  severity_rank: 4
title: Ensure JWT use a secure algorithm
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/jwt-algorithm`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
Using `jwt.SigningMethodNone` or `jwt.UnsafeAllowNoneSignatureType` in Go for JWT (JSON Web Token) authentication is not safe and should be avoided due to security vulnerabilities.

When using JWT, the token is typically signed using a secret key or a private key to ensure its integrity and authenticity. However, `jwt.SigningMethodNone` indicates that the token is not signed at all, while `jwt.UnsafeAllowNoneSignatureType` allows the token to be validated even if it is not signed.

Using these options poses a significant security risk as it allows malicious users to tamper with the token and potentially gain unauthorized access. An attacker can modify the token's claims or impersonate another user by forging a token. Since the token is not signed, there is no way to verify its integrity, making it susceptible to tampering.

To avoid these security vulnerabilities, it is crucial to follow good coding practices when working with JWT authentication:

1.  Always sign the JWT token: Use a secure signing algorithm, such as HMAC or RSA, to sign the token with a secret or private key. This ensures the integrity and authenticity of the token.
2.  Verify the token signature: When receiving a token, validate its signature using the appropriate algorithm and the corresponding public key or shared secret. This ensures that the token has not been tampered with.
3.  Use strong keys and secrets: Generate strong cryptographic keys or secrets that are not easily guessable. Avoid using default or weak keys, as they can be easily exploited by attackers.
4.  Protect secret keys: Keep the secret keys used for signing and verifying the tokens secure. Store them in a secure location, such as environment variables or a separate configuration file, and limit access to them.
5.  Implement token expiration: Set an expiration time (i.e., time to live) for the tokens and automatically invalidate them after they expire. This helps prevent the misuse of long-lived tokens.
6.  Employ token revocation: Handle token revocation properly by maintaining a blacklist of revoked tokens or using a token revocation mechanism, such as JSON Web Token Blacklist (JWTB).

By following these best practices, you can ensure the security and integrity of your JWT-based authentication system and avoid the inherent risks associated with using `jwt.SigningMethodNone` or `jwt.UnsafeAllowNoneSignatureType`.


## Non-Compliant Code Examples
```go
import (
    "fmt"
    "github.com/dgrijalva/jwt-go"
)

func main () {
    jwtClaims := jwt.StandardClaims{
        ExpiresAt: 3600,
        Issuer:    "issuer",
    }

    jwtToken := jwt.NewWithClaims(jwt.SigningMethodNone, jwtClaims)
    _, err := jwtToken.SignedString(jwt.UnsafeAllowNoneSignatureType)
}
```
