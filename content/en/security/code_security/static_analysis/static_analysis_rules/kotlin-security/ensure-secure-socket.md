---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/ensure-secure-socket
- /continuous_integration/static_analysis/rules/kotlin-security/ensure-secure-socket
- /static_analysis/rules/kotlin-security/ensure-secure-socket
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/ensure-secure-socket
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Ensure network sockets use SSL/TLS encryption
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/ensure-secure-socket`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
This rule ensures that all network sockets used in your Kotlin application are secured using SSL/TLS encryption. Unencrypted network communication is a significant security risk because it allows attackers to intercept and manipulate the data being transmitted. This can lead to data breaches, unauthorized access, and other security issues.

In Kotlin, you can ensure your sockets are encrypted by using the `SSLSocketFactory` or `SSLServerSocketFactory` classes to create your sockets. If you need to use a socket with custom configuration, you can still ensure it is encrypted by using the `SSLContext` class to create a configured SSL socket. Avoid using the `Socket` or `ServerSocket` classes directly, because these classes create unencrypted sockets by default.

## Non-Compliant Code Examples
```kotlin
// Example 1: Basic Socket usage
fun createConnection() {
    // UNSAFE: Unencrypted socket
    val socket = Socket("api.example.com", 80)
    socket.getOutputStream().write(data)
}

// Example 2: ServerSocket usage
fun startServer() {
    // UNSAFE: Unencrypted server socket
    val serverSocket = ServerSocket(8080)
    val client = serverSocket.accept()
}

// Example 3: Socket with custom configuration
fun configuredSocket() {
    // UNSAFE: Still unencrypted despite configuration
    val socket = Socket("api.example.com", 8080, true)
    socket.soTimeout = 5000
}
```

## Compliant Code Examples
```kotlin
// Example 1: SSLSocket usage
fun createSecureConnection() {
    // SAFE: Using SSL socket factory
    val socket = SSLSocketFactory.getDefault()
        .createSocket("api.example.com", 443)
    socket.getOutputStream().write(data)
}

// Example 2: SSL ServerSocket usage
fun startSecureServer() {
    // SAFE: Using SSL server socket factory
    val serverSocket = SSLServerSocketFactory.getDefault()
        .createServerSocket(8443)
    val client = serverSocket.accept()
}

// Example 3: Configured SSLSocket
fun configuredSecureSocket() {
    val context = SSLContext.getInstance("TLS")
    context.init(null, null, null)
    // SAFE: Using configured SSL socket
    val socket = context.socketFactory
        .createSocket("api.example.com", 443)
}
```
