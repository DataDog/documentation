### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM Android Monitoring][1].
2. Set up [Android Trace Collection][2].
3. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configure the `OkHttpClient` interceptor with the list of internal, first-party origins called by your Android application.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

5. _(Optional)_ Configure the `traceSampleRate` parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from application requests are sent to Datadog. To keep 20% of backend traces:

    ```kotlin
    val tracedHosts = listOf("example.com")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
          DatadogInterceptor.Builder(tracedHosts)
              .setTraceSampleRate(20f)
              .build()
        )
        .build()
    ```

**Note**:
* `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.
* If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, use the same tracing header types for the SDK in use.

### Verifying setup

1. Run your application from Android Studio.
2. Go to a screen in your application.
3. Open Android Studio's [Network Inspector][3].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK](#how-rum-resources-are-linked-to-traces).

### OpenTelemetry support

1. Set up RUM to connect with APM as described above.

2. Configure the `OkHttpClient` interceptor with the list of internal, first-party origins and the tracing header type to use as follows:
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

[1]: /real_user_monitoring/android/
[2]: /tracing/trace_collection/dd_libraries/android/?tab=kotlin
[3]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
