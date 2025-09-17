### Create the application in the UI
Navigate to [Digital Experience > Add an Application][1].
Select Android as the application type and enter an application name to generate a unique Datadog application ID and client token.

For more information about setting up a client token, see the [Client Token documentation][2].

### Declare the Android SDK as a dependency

Declare [dd-sdk-android-rum][3] and the [Gradle plugin][4] as dependencies in your **application module's** `build.gradle` file.

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### Initialize the Datadog SDK with application context

#### Update the initialization snippet

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `APP_VARIANT_NAME` specifies the variant of the application that generates data. For more information, see [Using Tags][7].

During initialization, you can also set the sample rate (RUM sessions) and set the tracking consent for GDPR compliance, as described below. See [other configuration options][8] to initialize the library.


{% tabs %}
{% tab label="Kotlin" %}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
            clientToken = <CLIENT_TOKEN>,
            env = <ENV_NAME>,
            variant = <APP_VARIANT_NAME>
        ).build()
        Datadog.initialize(this, configuration, trackingConsent)
    }
}
```
{% /tab %}
{% tab label="Java" %}
```java
public class SampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{% /tab %}
{% /tabs %}


The initialization credentials require your application's variant name and use the value of `BuildConfig.FLAVOR`. With the variant, the SDK can match the errors reported from your application to the mapping files uploaded by the Gradle plugin. If you do not have variants, the credentials use an empty string.

The Gradle plugin automatically uploads the appropriate ProGuard `mapping.txt` file at build time so you can view deobfuscated error stack traces. For more information, see the [Track Android Errors][13].

{% collapse-content title="Sample the sessions" level="h4" %}


To control the data your application sends to Datadog, you can specify a sample rate for sessions when [initializing RUM][12]. The sample rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```
{% /collapse-content %}

{% collapse-content title="Set tracking consent (GDPR compliance)" level="h4" %}

To be compliant with the GDPR regulation, the SDK requires the tracking consent value upon initialization.

Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or events.

To **update the tracking consent** after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

{% /collapse-content %}


### Enable the feature to start sending data

To enable the Android SDK to start sending data:

{% tabs %}
{% tab label="Kotlin" %}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{% /tab %}

{% tab label="Java" %}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```

{% /tab %}
{% /tabs %}

See [`ViewTrackingStrategy`][5] to enable automatic tracking of all your views (activities, fragments, and more).

### Initialize the interceptor to track network events

To initialize an interceptor for tracking network events:

1. For distributed tracing, [add and enable the Trace feature][6].
2. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. To track your OkHttp requests as resources, add the provided [interceptor][7]:

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

4. To automatically create RUM resources and spans for your OkHttp requests, use the `DatadogInterceptor` as an interceptor.
   - This records each request processed by the `OkHttpClient` as a resource, with all the relevant information (URL, method, status code, and error) automatically filled in. Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][9].
      
5. To monitor the network redirects or retries, you can use the `DatadogInterceptor` as a [network interceptor][10]:

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
- To use spans but not RUM resources, you can use the `TracingInterceptor` instead of `DatadogInterceptor` as described above.
- If you use multiple interceptors, add `DatadogInterceptor` first.

You can also add an `EventListener` for the `OkHttpClient` to [automatically track resource timing][8] for third-party providers and network requests.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /account_management/api-app-keys/#client-tokens
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /tracing/trace_collection/dd_libraries/android/?tab=kotlin
[7]: https://square.github.io/okhttp/features/interceptors/
[8]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-network-requests
[9]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#custom-views
[10]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[11]: /getting_started/tagging/using_tags/#rum--session-replay
[12]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#initialization-parameters
[13]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file