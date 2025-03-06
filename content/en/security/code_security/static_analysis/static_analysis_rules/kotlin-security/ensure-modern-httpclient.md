---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/ensure-modern-httpclient
- /continuous_integration/static_analysis/rules/kotlin-security/ensure-modern-httpclient
- /static_analysis/rules/kotlin-security/ensure-modern-httpclient
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/ensure-modern-httpclient
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid using deprecated HTTP clients
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/ensure-modern-httpclient`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
This rule advises against the use of deprecated HTTP clients in Kotlin. The use of deprecated HTTP clients, such as `DefaultHttpClient`, can lead to security vulnerabilities in your application because they lack support for modern Transport Layer Security (TLS) versions such as TLS 1.2. This lack of support can expose your application to potential data breaches and other security risks.

This rule enforces the use of secure communication protocols. By ensuring your HTTP client supports modern TLS, you can protect sensitive data transmitted between your application and servers from being intercepted or manipulated.

To adhere to this rule, use HTTP clients that support modern TLS versions, such as `SystemDefaultHttpClient`. When configuring the client, make sure to use `BasicHttpParams` to set parameters such as connection timeout. If you're using the client in a service class, ensure that the client is stored as a class member. By following these practices, you can maintain the security and integrity of your application's data transmissions.

## Non-Compliant Code Examples
```kotlin
// Example 1: Basic DefaultHttpClient usage
fun makeRequest() {
    // UNSAFE: DefaultHttpClient lacks TLS 1.2 support
    val client = DefaultHttpClient()
    val request = HttpGet("https://api.example.com/data")
    val response = client.execute(request)
}

// Example 2: DefaultHttpClient with custom parameters
fun configuredRequest() {
    // UNSAFE: Even with configuration, still lacks proper TLS support
    val params = BasicHttpParams().apply {
        setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 3000)
    }
    val client = DefaultHttpClient(params)
    val response = client.execute(HttpPost("https://api.example.com/submit"))
}

// Example 3: DefaultHttpClient in a service class
class LegacyApiService {
    // UNSAFE: Storing deprecated client as class member
    private val httpClient = DefaultHttpClient()
    
    fun fetchData(): String {
        val response = httpClient.execute(HttpGet("https://api.example.com"))
        return EntityUtils.toString(response.entity)
    }
}
```

## Compliant Code Examples
```kotlin
// Example 1: Using SystemDefaultHttpClient
fun makeSecureRequest() {
    // SAFE: SystemDefaultHttpClient supports modern TLS
    val client = SystemDefaultHttpClient()
    val request = HttpGet("https://api.example.com/data")
    val response = client.execute(request)
}

// Example 2: Configured SystemDefaultHttpClient
fun configuredSecureRequest() {
    val params = BasicHttpParams().apply {
        setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 3000)
    }
    // SAFE: Properly configured with modern TLS support
    val client = SystemDefaultHttpClient(params)
    val response = client.execute(HttpPost("https://api.example.com/submit"))
}

// Example 3: Service class with secure client
class ModernApiService {
    // SAFE: Using TLS 1.2 capable client
    private val httpClient = SystemDefaultHttpClient()
    
    fun fetchData(): String {
        val response = httpClient.execute(HttpGet("https://api.example.com"))
        return EntityUtils.toString(response.entity)
    }
}
```
