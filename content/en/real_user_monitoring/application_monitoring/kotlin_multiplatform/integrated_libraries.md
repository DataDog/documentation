---
title: Kotlin Multiplatform Libraries for RUM
description: "Integrate Kotlin Multiplatform libraries with RUM SDK for automatic monitoring of network requests and cross-platform functionality."
aliases:
- /real_user_monitoring/kotlin-multiplatform/integrated_libraries/
- /real_user_monitoring/kotlin_multiplatform/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/integrated_libraries
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: Source code for dd-sdk-kotlin-multiplatform
---

This page lists integrated libraries you can use for Kotlin Multiplatform applications.

## Ktor

If you use Ktor to make network requests in your application, you can integrate the Datadog Ktor plugin to collect RUM information about them:

1. [Install the Datadog Kotlin Multiplatform SDK and enable RUM][1].
2. Add a common dependency to `dd-sdk-kotlin-multiplatform-ktor` if you're using Ktor 2.x, or `dd-sdk-kotlin-multiplatform-ktor3` for Ktor 3.x:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            // Use this line if you are using Ktor 2.x
            implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x")
            // Use this line if you are using Ktor 3.x
            // implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor3:x.x.x")
        }
    }
}
```
3. Add the provided `Datadog Ktor Plugin` to your Ktor `HttpClient`:

```kotlin
val ktorClient = HttpClient {
    install(
        datadogKtorPlugin(
            tracedHosts = mapOf(
                "example.com" to setOf(TracingHeaderType.DATADOG),
                "example.eu" to setOf(TracingHeaderType.DATADOG)
            ),
            traceSampleRate = 100f
        )
    )
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/
