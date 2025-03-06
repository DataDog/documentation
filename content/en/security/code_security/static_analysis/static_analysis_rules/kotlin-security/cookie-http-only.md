---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/cookie-http-only
- /continuous_integration/static_analysis/rules/kotlin-security/cookie-http-only
- /static_analysis/rules/kotlin-security/cookie-http-only
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/cookie-http-only
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Ensure cookies have the secure flag
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/cookie-http-only`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

## Description
This rule safeguards sensitive user data stored in cookies from unauthorized access. When a cookie is marked as secure, it informs the browser that the cookie should only be sent over an encrypted HTTPS connection. If this flag is not set, the cookie can be transmitted over insecure connections, exposing the data to potential eavesdropping by attackers.

This rule is vital to maintain the confidentiality and integrity of user data, particularly in cases where cookies store sensitive information like session identifiers or authentication tokens. Non-compliance with this rule can lead to serious security vulnerabilities, including session hijacking and data theft.

To adhere to this rule, always set the `secure` flag to `true` when creating a cookie. It is also recommended to set the `httpOnly` flag to `true` to prevent the cookie from being accessed by client-side scripts, providing an additional layer of protection against cross-site scripting (XSS) attacks. For example, `val cookie = Cookie(name, value).apply { httpOnly = true; secure = true }`. This way, you ensure that your cookies are sent only over secure connections and are not accessible via client-side scripting.

## Non-Compliant Code Examples
```kotlin
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

class CookieManager {
    fun createCookie(response: HttpServletResponse) {
        // Dangerous: Cookie without HttpOnly flag
        val cookie = Cookie("sessionId", generateSessionId())
        response.addCookie(cookie)
    }

	fun createCookie2(response: HttpServletResponse) {
		// Dangerous: Explicitly disabled HttpOnly
        val insecureCookie = Cookie("userData", userJson)
        insecureCookie.setHttpOnly(false)
        response.addCookie(insecureCookie)
	}
    
    fun createSecureCookieButNotHttpOnly(response: HttpServletResponse) {
        val cookie = Cookie("authToken", token)
        cookie.secure = true  // SSL/TLS only, but missing HttpOnly
        response.addCookie(cookie)
    }
}
```

## Compliant Code Examples
```kotlin
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

class CookieManager {
    fun createSecureCookie(response: HttpServletResponse) {
        val cookie = Cookie("sessionId", generateSessionId())
        cookie.httpOnly = true  // Prevent JavaScript access
        cookie.secure = true    // Require SSL/TLS
        response.addCookie(cookie)
    }
    
    fun createHttpOnlyCookieWithOptions(
        response: HttpServletResponse,
        name: String,
        value: String
    ) {
        val cookie = Cookie(name, value).apply {
            httpOnly = true
            secure = true
            path = "/"
            maxAge = 3600  // 1 hour
        }
        response.addCookie(cookie)
    }
}
```
