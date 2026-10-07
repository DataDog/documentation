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

### Automatically track network requests

#### Basic network instrumentation

To get timing information in resources (such as third-party providers, network requests) such as time to first byte or DNS resolution, customize the `OkHttpClient` to add the [EventListener][12] factory:

1. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
}
```

2. Add the [EventListener][12] factory:
{% tabs %}
{% tab label="Kotlin" %}
```kotlin
val tracedHosts = listOf("example.com")
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```
{% /tab %}
{% tab label="Java" %}
```java
List<String> tracedHosts = Arrays.asList("example.com");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(new DatadogEventListener.Factory())
    .build();
```
{% /tab %}
{% /tabs %}

#### Cronet network instrumentation

If you use Cronet instead of OkHttp, you can instrument your `CronetEngine` for automatic RUM resource tracking.

1. Add the Gradle dependencies in the module-level `build.gradle` file:

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
}
```

2. Instrument the `CronetEngine.Builder`:
{% tabs %}
{% tab label="Kotlin" %}

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

{% /tab %}
{% tab label="Java" %}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
    .configureDatadogInstrumentation(
        builder,
        new RumNetworkInstrumentationConfiguration(),
        new ApmNetworkInstrumentationConfiguration(
            Arrays.asList("example.com", "example.eu")
        )
    )
    .build();
```

{% /tab %}
{% /tabs %}

#### Apollo instrumentation

1. [Set up][14] RUM monitoring with Datadog Android RUM.

2. [Set up](#basic-network-instrumentation) OkHttp instrumentation with the Datadog RUM SDK.

3. Add the following to your application's build.gradle file.
```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-apollo:x.x.x"
}
```

4. Add the Datadog interceptor to your Apollo Client setup:

```kotlin
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.network.okHttpClient
import com.datadog.android.apollo.DatadogApolloInterceptor

val apolloClient = ApolloClient.Builder()
    .serverUrl("GraphQL endpoint")
    .addInterceptor(DatadogApolloInterceptor())
    .okHttpClient(okHttpClient)
    .build()
```

This automatically adds Datadog headers to your GraphQL requests, allowing them to be tracked by Datadog.

{% alert level="danger" %}
- The integration only supports Apollo version `4`.
- The `query` and `mutation` type operations are tracked; `subscription` operations are not.
- GraphQL payload sending is disabled by default. To enable it, set the `sendGraphQLPayloads` flag in the `DatadogApolloInterceptor` constructor as follows:

```kotlin
DatadogApolloInterceptor(sendGraphQLPayloads = true)
```
{% /alert %}

[1]: https://app.datadoghq.com/rum/application/create
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://square.github.io/okhttp/features/events/
[14]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#setup
