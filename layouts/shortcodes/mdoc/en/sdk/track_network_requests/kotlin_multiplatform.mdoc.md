### Enrich resources

When [tracking resources automatically][6], provide a custom `RumResourceAttributesProvider` instance to add custom attributes to each tracked network request/response. For example, if you want to track a network request's headers, create an implementation like the following, and pass it in the `datadogKtorPlugin` initialization call.

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

### Custom resources

In addition to [tracking resources automatically][6], you can also track specific custom resources (such as network requests and third-party provider APIs) with methods (such as `GET` and `POST`) while loading the resource with `RumMonitor#startResource`. Stop tracking with `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource.

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

**Note**: `stopResource` / `stopResourceWithError` methods accepting `NSURLConnection` and `NSError` are also available from iOS source set.

[1]: https://app.datadoghq.com/rum/application/create
[6]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#initialize-rum-ktor-plugin-to-track-network-events-made-with-ktor
