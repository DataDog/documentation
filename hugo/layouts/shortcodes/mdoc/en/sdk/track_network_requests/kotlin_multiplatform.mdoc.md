### Automated resource collection

To automatically track network requests made with Ktor as RUM resources, add the provided Datadog Ktor plugin:

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

This records each request processed by the `HttpClient` as a resource, with the URL, method, status code, and error automatically filled in. Only network requests that start while a view is active are tracked.

To add custom attributes to each tracked request or response, provide a `RumResourceAttributesProvider` implementation:

```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onRequest(request: HttpRequestSnapshot) =
        request.headers.names().associateWith { request.headers[it] }.mapKeys { "header.$it" }

    override fun onResponse(response: HttpResponse) = emptyMap<String, Any?>()

    override fun onError(request: HttpRequestSnapshot, throwable: Throwable) = emptyMap<String, Any?>()
}
```

Pass the provider to `datadogKtorPlugin` with the `rumResourceAttributesProvider` argument.

### Manual resource collection

To track a custom resource such as a request made outside Ktor, start and stop it around the load:

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

`stopResource`/`stopResourceWithError` overloads that accept `NSURLConnection` and `NSError` are also available from the iOS source set.
