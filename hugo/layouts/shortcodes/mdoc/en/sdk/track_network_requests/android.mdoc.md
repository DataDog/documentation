## Automatically track network requests

### OkHttp

To track your OkHttp requests as RUM resources:

1. For distributed tracing, [add and enable the Trace feature][1].
2. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```

3. Add the provided [interceptor][2] to your `OkHttpClient`:

   {% tabs %}
   {% tab label="Kotlin" %}

   ```kotlin
   val tracedHostsWithHeaderType = mapOf(
       "example.com" to setOf(
           TracingHeaderType.DATADOG,
           TracingHeaderType.TRACECONTEXT),
       "example.eu" to setOf(
           TracingHeaderType.DATADOG,
           TracingHeaderType.TRACECONTEXT))
   val okHttpClient = OkHttpClient.Builder()
       .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
       .build()
   ```

   {% /tab %}
   {% tab label="Java" %}

   ```java
   Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
   Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
   tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
   tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
   OkHttpClient okHttpClient = new OkHttpClient.Builder()
       .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
       .build();
   ```

   {% /tab %}
   {% /tabs %}

The `DatadogInterceptor` records each request processed by the `OkHttpClient` as a resource, with the URL, method, status code, and error automatically filled in. Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][3] or [track background events][4].

To monitor network redirects or retries, use the `DatadogInterceptor` as a [network interceptor][5]:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```

{% /tab %}
{% tab label="Java" %}

```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addNetworkInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```

{% /tab %}
{% /tabs %}

**Notes**:

- To use spans but not RUM resources, use the `TracingInterceptor` instead of `DatadogInterceptor`.
- If you use multiple interceptors, add `DatadogInterceptor` first.

To get timing information in resources (such as time to first byte or DNS resolution), also add the [EventListener][6] factory:

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

To filter out specific errors reported by `DatadogInterceptor`, configure a custom `EventMapper` in your `RumConfiguration`:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .setErrorEventMapper { errorEvent ->
        if (errorEvent.shouldBeDiscarded()) {
            null
        } else {
            errorEvent
        }
    }
    .build()
```

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder("applicationId")
             .setErrorEventMapper(errorEvent -> {
                 if (errorEvent.shouldBeDiscarded()) {
                     return null;
                 } else {
                     return errorEvent;
                 }
             })
             .build();
```

{% /tab %}
{% /tabs %}

### Cronet

If you use Cronet instead of OkHttp, you can instrument your `CronetEngine` for RUM resource tracking and distributed tracing.

1. Add the Gradle dependency in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
    }
    ```

2. Instrument the `CronetEngine.Builder`:

   {% tabs %}
   {% tab label="Kotlin" %}

   ```kotlin
   val tracedHostsWithHeaderType = mapOf(
       "example.com" to setOf(
           TracingHeaderType.DATADOG,
           TracingHeaderType.TRACECONTEXT),
       "example.eu" to setOf(
           TracingHeaderType.DATADOG,
           TracingHeaderType.TRACECONTEXT))
   val cronetEngine = CronetEngine.Builder(context)
       .configureDatadogInstrumentation(
           rumInstrumentationConfiguration = RumNetworkInstrumentationConfiguration(),
           apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
               tracedHostsWithHeaderType
           )
       )
       .build()
   ```

   {% /tab %}
   {% tab label="Java" %}

   ```java
   Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
   Set<TracingHeaderType> headerTypes = new HashSet<>(Arrays.asList(
       TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
   tracedHostsWithHeaderType.put("example.com", headerTypes);
   tracedHostsWithHeaderType.put("example.eu", headerTypes);
   CronetEngine.Builder builder = new CronetEngine.Builder(context);
   CronetEngine cronetEngine = CronetIntegrationPluginKt
       .configureDatadogInstrumentation(
           builder,
           new RumNetworkInstrumentationConfiguration(),
           new ApmNetworkInstrumentationConfiguration(tracedHostsWithHeaderType)
       )
       .build();
   ```

   {% /tab %}
   {% /tabs %}

**Known limitations**:

- Tracing headers are not propagated for redirected requests due to Cronet API limitations.
- Retries cannot be instrumented.

### Apollo (GraphQL)

1. Set up OkHttp instrumentation as described in [OkHttp](#okhttp).
2. Add the following to your application's `build.gradle` file:

   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-apollo:x.x.x"
   }
   ```

3. Add the Datadog interceptor to your Apollo Client setup:

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

### Capture resource headers

When tracking resources automatically, you can capture HTTP request and response headers on RUM resources by calling `trackResourceHeaders` on the `DatadogInterceptor.Builder`.

Captured headers appear on the RUM resource event under `resource.request.headers` and `resource.response.headers`. You can query them in the RUM Explorer.

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

### Add custom resource attributes

When tracking resources automatically, provide a custom `RumResourceAttributesProvider` to the `DatadogInterceptor.Builder` to add custom attributes to each tracked network request.

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

## Manually track network requests

To track specific custom resources (such as network requests and third-party provider APIs), call `RumMonitor#startResource` with the method (such as `GET` and `POST`) when the resource starts loading. Stop tracking with `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource.

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

### Track local assets as resources

You can track access to the assets by using the `getAssetAsRumResource` extension method:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

To track the usage of local resources, use the `getRawResAsRumResource` extension method:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

For the attributes collected, see [Data Collected][7].

[1]: /tracing/trace_collection/dd_libraries/android/
[2]: https://square.github.io/okhttp/features/interceptors/
[3]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=android#manually-track-views
[4]: /real_user_monitoring/setup/enable_rum/track_background_events/?platform=android
[5]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[6]: https://square.github.io/okhttp/features/events/
[7]: /real_user_monitoring/setup/data_collected/?platform=android#resource-attributes
