## Automatically track network requests

To track network requests made with Ktor as RUM resources, use the Datadog Ktor plugin:

1. In your `build.gradle.kts` file, add the Gradle dependency to `dd-sdk-kotlin-multiplatform-ktor` for Ktor 2.x, or `dd-sdk-kotlin-multiplatform-ktor3` for Ktor 3.x:

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

2. Install the provided [Datadog Ktor plugin][1] in your `HttpClient`:

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

This records each request processed by the `HttpClient` as a resource, with the URL, method, status code, and error automatically filled in. Only network requests that start while a view is active are tracked. To track requests when your application is in the background, [create a view manually][2] or [track background events][3].

### Add custom resource attributes

To add custom attributes to each tracked request or response, provide a `RumResourceAttributesProvider` implementation and pass it to `datadogKtorPlugin` with the `rumResourceAttributesProvider` argument. For example, to track a network request's headers:

```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onRequest(request: HttpRequestSnapshot) =
        request.headers.names().associateWith { request.headers[it] }.mapKeys { "header.$it" }

    override fun onResponse(response: HttpResponse) = emptyMap<String, Any?>()

    override fun onError(request: HttpRequestSnapshot, throwable: Throwable) = emptyMap<String, Any?>()
}

val ktorClient = HttpClient {
    install(
        datadogKtorPlugin(
            tracedHosts = mapOf(
                "example.com" to setOf(TracingHeaderType.DATADOG),
                "example.eu" to setOf(TracingHeaderType.DATADOG)
            ),
            rumResourceAttributesProvider = CustomRumResourceAttributesProvider()
        )
    )
}
```

## Manually track network requests

To track a custom resource (for example, a request made outside Ktor), start and stop it around the load. Stop tracking with `stopResource` when the resource is fully loaded, or `stopResourceWithError` if an error occurs while loading it:

```kotlin
fun loadResource() {
    GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
    try {
        // do load the resource
        GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
    } catch (e: Exception) {
        GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
    }
}
```

`stopResource` and `stopResourceWithError` overloads that accept `NSURLConnection` and `NSError` are also available from the iOS source set.

For the attributes collected, see [Data Collected][4].

[1]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/integrations/ktor
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=kotlin_multiplatform#manually-track-views
[3]: /real_user_monitoring/setup/enable_rum/track_background_events/?platform=kotlin_multiplatform
[4]: /real_user_monitoring/setup/data_collected/?platform=kotlin_multiplatform
