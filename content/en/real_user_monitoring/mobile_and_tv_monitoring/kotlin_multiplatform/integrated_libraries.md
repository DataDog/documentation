---
title: Kotlin Multiplatform Libraries for RUM
aliases:
- /real_user_monitoring/kotlin-multiplatform/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: Source code for dd-sdk-kotlin-multiplatform
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for Kotlin Multiplatform applications.

## Ktor

If you use Ktor to make network requests in your application, you can integrate the Datadog Ktor plugin to collect RUM information about them:

1. [Install the Datadog Kotlin Multiplatform SDK and enable RUM][1].
2. Add a common dependency on `dd-sdk-kotlin-multiplatform-ktor`:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x")
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
            traceSamplingRate = 100f
        )
    )
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin-multiplatform/
