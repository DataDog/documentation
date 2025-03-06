---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/no-unsafe-cors
- /continuous_integration/static_analysis/rules/kotlin-security/no-unsafe-cors
- /static_analysis/rules/kotlin-security/no-unsafe-cors
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/no-unsafe-cors
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid unsafe CORS headers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/no-unsafe-cors`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
This rule helps prevent Cross-Origin Resource Sharing (CORS) vulnerabilities. CORS is a mechanism that allows many resources on a web page (such as fonts, JavaScript, and so on) to be requested from another domain outside the domain from which the resource originated. It's a useful technique for many web apps. However, if not properly implemented, it can pose a significant security risk.

An unsafe CORS policy, such as allowing any host or using wildcards in `allowHost`, can expose your application to attacks. This could enable an attacker to read sensitive data from your site or perform actions on behalf of your users.

To ensure safe usage of CORS, explicitly specify the trusted domains that are allowed to interact with your application. You can use methods like `host("https://trusted-domain.com")` in Ktor, or check the request origin against an allowlist of allowed origins in a Java Servlet. Furthermore, avoid using wildcards (*) in your CORS configurations, and instead specify the exact protocols, domains, and ports that your application needs to communicate with.

## Non-Compliant Code Examples
```kotlin
// Non-compliant: Ktor CORS configuration with unsafe settings
fun Application.configureUnsafeCORS() {
    install(CORS) {
        anyHost()  // WARNING: Allows any host

        // WARNING: Using wildcards in allowHost
        allowHost("*")
        
        // WARNING: Overly permissive origin checking
        allowOrigins { true }  // Accepts any origin
    }
}

// Non-compliant: Java Servlet
@WebServlet("/api")
class UnsafeServlet : HttpServlet() {
    override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        // WARNING: Unsafe CORS in Servlets
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.addHeader("Access-Control-Allow-Origin", "*")
    }
}

```

## Compliant Code Examples
```kotlin
// Compliant: Ktor examples
fun Application.configureSafeKtorCORS() {
    install(CORS) {
        // Safe: Specific allowed hosts
        host("https://trusted-domain.com")
        host("https://api.trusted-domain.com")
        allowCredentials = true
        
        // Optional: Configure other CORS settings
        allowNonSimpleContentTypes = true
        allowHeaders { headerName ->
            headerName in listOf("Authorization", "Content-Type")
        }
    }
}

// Compliant: Java Servlet examples
@WebServlet("/api")
class SafeServlet : HttpServlet() {
    private val allowedOrigins = setOf(
        "https://trusted-domain.com",
        "https://api.trusted-domain.com"
    )

    override fun doGet(req: HttpServletRequest, res: HttpServletResponse) {
        val origin = req.getHeader("Origin")
        
        // Safe: Validate origin against whitelist
        if (origin in allowedOrigins) {
            res.setHeader("Access-Control-Allow-Origin", origin)
            res.setHeader("Access-Control-Allow-Credentials", "true")
        } else {
            // Optional: Default to most restrictive origin or no CORS
            res.setHeader("Access-Control-Allow-Origin", "https://trusted-domain.com")
        }
    }
}
```
