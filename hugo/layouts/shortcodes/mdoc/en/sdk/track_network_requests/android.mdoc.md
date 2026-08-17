### Automated resource collection

To automatically track network requests as RUM resources, add the [EventListener][1] factory to your `OkHttpClient`:

```kotlin
val tracedHosts = listOf("example.com")
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

If you use Cronet instead of OkHttp, instrument your `CronetEngine` for automatic tracking:

```kotlin
val cronetEngine = CronetEngine.Builder(context)
    .configureDatadogInstrumentation(
        rumInstrumentationConfiguration = RumNetworkInstrumentationConfiguration(),
        apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
            tracedHosts = listOf("example.com", "example.eu")
        )
    )
    .build()
```

### Manual resource collection

To track a custom resource such as a third-party provider API, start and stop it around the load:

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

For header capture, custom resource attributes, and Apollo/GraphQL instrumentation, see [Android Advanced Configuration][2].

[1]: https://square.github.io/okhttp/features/events/
[2]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
