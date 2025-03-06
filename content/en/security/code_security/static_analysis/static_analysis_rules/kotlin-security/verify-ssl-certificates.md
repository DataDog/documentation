---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/verify-ssl-certificates
- /continuous_integration/static_analysis/rules/kotlin-security/verify-ssl-certificates
- /static_analysis/rules/kotlin-security/verify-ssl-certificates
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/verify-ssl-certificates
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Always validate SSL/TLS certificates
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/verify-ssl-certificates`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
This rule mandates that SSL/TLS certificates always be validated. Certificate validation is an essential part of the SSL/TLS protocol that ensures the server you are communicating with is indeed who it claims to be. This prevents man-in-the-middle attacks, where an attacker intercepts and possibly alters the communication between two parties without their knowledge.

Ignoring or bypassing certificate validation severely undermines the security of your application and should be avoided.

To adhere to this rule, always use the system's default `SSLSocketFactory` and `TrustManager` for SSL/TLS connections. These default settings perform certificate validation automatically. Never attempt to bypass or disable certificate validation. If you need to trust a self-signed certificate for testing purposes, add it to a custom trust store and use that instead of bypassing all certificate validation.

## Non-Compliant Code Examples
```kotlin
import javax.net.ssl.*
import okhttp3.OkHttpClient
import java.security.cert.X509Certificate
import java.security.KeyStore

class InsecureTlsConfigurations {
    // Pattern 1: Bypass certificate validation in OkHttpClient
    fun createInsecureOkHttpClient(): OkHttpClient {
        val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
            override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) {}
            override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) {}
            override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
        })

        val sslContext = SSLContext.getInstance("TLS").apply {
            init(null, trustAllCerts, java.security.SecureRandom())
        }

        return OkHttpClient.Builder()
            .sslSocketFactory(sslContext.socketFactory, trustAllCerts[0] as X509TrustManager)
            .build()
    }

    // Pattern 2: Bypass in HttpsURLConnection
    fun disableUrlConnectionValidation() {
        val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
            override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) {}
            override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) {}
            override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
        })

        val sslContext = SSLContext.getInstance("TLS").apply {
            init(null, trustAllCerts, java.security.SecureRandom())
        }

        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.socketFactory)
    }
}
```

## Compliant Code Examples
```kotlin
import javax.net.ssl.*
import okhttp3.OkHttpClient
import java.security.cert.X509Certificate
import java.security.KeyStore

class SecureTlsConfigurations {
    // Pattern 1: OkHttpClient with proper validation
    fun createSecureOkHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            // Uses system default SSLSocketFactory and TrustManager
            .build()
    }

    // Pattern 2: HttpsURLConnection with proper validation
    fun createSecureUrlConnection(urlString: String): HttpsURLConnection {
        val url = URL(urlString)
        val connection = url.openConnection() as HttpsURLConnection
        // Uses system default SSLSocketFactory and trust manager
        // No need to override any SSL settings
        return connection
    }
}
```
