Kotlin Multiplatform RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][1] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom views

For setup steps covering both automatic and manual view tracking, see [Track navigation][2].

In addition to [tracking views automatically][3], you can also track specific distinct views (such as activities and fragments) manually. Stop tracking when the view is no longer visible.

```kotlin
// to start view
GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)

// to stop view
GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
```

### Add your own performance timing

For setup steps, see [Track UI latency][4].

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming` API. The timing measure is relative to the start of the current RUM view. For example, you can time how long it takes for your hero image to appear:

```kotlin
fun onHeroImageLoaded() {
    GlobalRumMonitor.get().addTiming("hero_image")
}
```

After the timing is sent, the timing is accessible as `@view.custom_timings.<timing_name>`. For example: `@view.custom_timings.hero_image`. You must [create a measure][5] before graphing it in RUM analytics or in dashboards.

### Custom actions

For setup steps covering action tracking, see [Track user interactions][6].

In addition to [tracking actions automatically][7], you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

The action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

```kotlin
fun onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
}
```

### Enrich resources

When [tracking resources automatically][8], provide a custom `RumResourceAttributesProvider` instance to add custom attributes to each tracked network request/response. For example, if you want to track a network request's headers, create an implementation like the following, and pass it in the `datadogKtorPlugin` initialization call.

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

For setup steps covering both automatic and manual resource tracking, see [Track network requests][9].

In addition to [tracking resources automatically][8], you can also track specific custom resources (such as network requests and third-party provider APIs) with methods (such as `GET` and `POST`) while loading the resource with `RumMonitor#startResource`. Stop tracking with `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource.

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

### Custom errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. See the [Attributes collected documentation][1].

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

**Note**: `addError` method accepting `NSError` is also available from iOS source set.

### Add user properties

You can use the `addUserExtraInfo` API to append extra user properties to previously set properties.

```kotlin
Datadog.addUserExtraInfo(extraInfo)
```

[1]: /real_user_monitoring/setup/data_collected/?platform=kotlin_multiplatform
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=kotlin_multiplatform
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#automatically-track-views
[4]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=kotlin_multiplatform
[5]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[6]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=kotlin_multiplatform
[7]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#initialization-parameters
[8]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#initialize-rum-ktor-plugin-to-track-network-events-made-with-ktor
[9]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=kotlin_multiplatform
