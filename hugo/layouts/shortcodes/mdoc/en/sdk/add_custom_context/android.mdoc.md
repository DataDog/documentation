Android RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][1] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom views

For setup steps covering both automatic and manual view tracking, see [Track navigation][2].

In addition to [tracking views automatically][3], you can also track specific distinct views (such as activities and fragments) when they become visible and interactive in the `onResume()` lifecycle. Stop tracking when the view is no longer visible. Most often, this method should be called in the frontmost `Activity` or `Fragment`:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
fun onResume() {
    GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
}

fun onPause() {
    GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
}
```

{% /tab %}
{% tab label="Java" %}

```java
public void onResume() {
    GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
}

public void onPause() {
    GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
}
```

{% /tab %}
{% /tabs %}

### Custom actions

For setup steps covering both automatic and manual action tracking, see [Track user interactions][4].

In addition to [tracking actions automatically][5], you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

The action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
fun onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
}
```

{% /tab %}
{% tab label="Java" %}

```java
public void onUserInteraction() {
    GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
}
```

{% /tab %}
{% /tabs %}

### Capture resource headers

When [tracking resources automatically][6], you can capture HTTP request and response headers on RUM Resources by calling `trackResourceHeaders` on the `DatadogInterceptor.Builder`.

Captured headers appear on the RUM Resource event under `resource.request.headers` and `resource.response.headers`. You can query them in the RUM Explorer.

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val interceptor = DatadogInterceptor.Builder(tracedHosts)
    .trackResourceHeaders()
    .build()
```

{% /tab %}
{% tab label="Java" %}

```java
DatadogInterceptor interceptor = new DatadogInterceptor.Builder(tracedHosts)
    .trackResourceHeaders()
    .build();
```

{% /tab %}
{% /tabs %}

With no arguments, `trackResourceHeaders` captures a predefined set of common headers:

| Direction | Headers |
|-----------|---------|
| Request | `cache-control`, `content-type` |
| Response | `age`, `cache-control`, `content-encoding`, `content-length`, `content-type`, `etag`, `expires`, `server-timing`, `vary`, `x-cache` |

To capture additional headers on top of the defaults, configure a `ResourceHeadersExtractor` and pass it to `trackResourceHeaders`. To skip the defaults, set `includeDefaults = false`.

{% alert level="info" %}
Sensitive headers, such as tokens and API keys, are filtered out automatically, even if you list them explicitly.
{% /alert %}

### Custom resource attributes

When [tracking resources automatically][6], provide a custom `RumResourceAttributesProvider` to the `DatadogInterceptor.Builder` to add custom attributes to each tracked network request.

For example, if you want to surface an OkHttp request tag as a custom attribute on the resource, create an implementation as follows:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        return mapOf("request.kind" to request.tag(String::class.java).orEmpty())
    }
}
```

{% /tab %}
{% tab label="Java" %}

```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        String kind = request.tag(String.class);
        result.put("request.kind", kind != null ? kind : "");
        return result;
    }
}
```

{% /tab %}
{% /tabs %}

### Custom resources

For setup steps covering both automatic and manual resource tracking, see [Track network requests][7].

In addition to [tracking resources automatically][6], you can also track specific custom resources (such as network requests and third-party provider APIs) with methods (such as `GET` and `POST`) while loading the resource with `RumMonitor#startResource`. Stop tracking with `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource.

{% tabs %}
{% tab label="Kotlin" %}

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

{% /tab %}
{% tab label="Java" %}

```java
public void loadResource() {
    GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
    try {
        // do load the resource
        GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
    } catch (Exception e) {
        GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
    }
}
```

{% /tab %}
{% /tabs %}

### Custom errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. See the [Error Attributes documentation][8].

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

### Add user properties

You can use the `addUserProperties` API to append extra user properties to previously set properties.

```kotlin
fun addUserProperties(extraInfo: Map<String, Any?>, sdkCore: SdkCore = getInstance()) {
    sdkCore.addUserProperties(extraInfo)
}
```

[1]: /real_user_monitoring/setup/data_collected/?platform=android
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=android
[3]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[4]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=android
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=android
[8]: /real_user_monitoring/setup/data_collected/?platform=android#event-specific-attributes
