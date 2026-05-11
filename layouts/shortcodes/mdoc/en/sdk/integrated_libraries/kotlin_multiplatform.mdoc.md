<!--
This partial contains integrated libraries content for the Kotlin Multiplatform SDK.
It can be included in the Kotlin Multiplatform SDK integrated libraries page or in the unified client_sdks view.
-->

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

[1]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/
