---
aliases:
- /tracing/setup_overview/setup/android
- /tracing/setup/android
description: Collect traces from your Android applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android Source code
- link: tracing/visualization/
  tag: Documentation
  text: Explore your services, resources, and traces
kind: documentation
title: Android Trace Collection
---
Send [traces][1] to Datadog from your Android applications with [Datadog's `dd-sdk-android` client-side tracing library][2] and leverage the following features:

* Create custom [spans][3] for operations in your application.
* Add `context` and extra custom attributes to each span sent.
* Optimized network usage with automatic bulk posts.

## Setup

1. Add the Gradle dependency by declaring the library as a dependency in your `build.gradle` file:

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android:x.x.x"
}
```

2. Initialize the library with your application context, tracking consent, and the [Datadog client token][4] and Application ID generated when you create a new RUM application in the Datadog UI (see [Getting Started with Android RUM Collection][7] for more information). For security reasons, you must use a client token: you cannot use [Datadog API keys][5] to configure the `dd-sdk-android` library as they would be exposed client-side in the Android application APK byte code. For more information about setting up a client token, see the [client token documentation][4]:

**US** 

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
      super.onCreate()
      val configuration = Configuration.Builder(
              tracesEnabled = true
      )
              .build()
      val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
      Datadog.initialize(this, credentials, configuration, trackingConsent) 
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() {
        super.onCreate();
        Configuration configuration = new Configuration.Builder(true, true, true, true).build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME >, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent);
    }
}
```
{{% /tab %}} 
{{< /tabs >}}

**EU**

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() { 
    override fun onCreate() { 
        super.onCreate()
        val configuration = Configuration.Builder(tracesEnabled = true)
                 .useSite(DatadogSite.EU1)
                 .build() 
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent) 
    } 
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class SampleApplication extends Application {
    @Override 
    public void onCreate() {
        super.onCreate();
        Configuration configuration = new Configuration.Builder(true, true, true, true)
                               .useSite(DatadogSite.EU1)
                               .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME >, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}

   To be compliant with the GDPR regulation, the SDK requires the tracking consent value at initialization.
   The tracking consent can be one of the following values:
   * `TrackingConsent.PENDING`: The SDK starts collecting and batching the data but does not send it to the data
     collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
   * `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
   * `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You will not be able to manually send any logs, traces, or
     RUM events.

   To update the tracking consent after the SDK is initialized, call: `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:
   * `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
   * `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

**Note**: In the credentials required for initialization, your application variant name is also required, and should use your `BuildConfig.FLAVOR` value (or an empty string if you don't have variants). This is important because it enables the right ProGuard `mapping.txt` file to be automatically uploaded at build time to be able to view de-obfuscated RUM error stack traces. For more information see the [guide to uploading Android source mapping files][8].

   Use the utility method `isInitialized` to check if the SDK is properly initialized:

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```
   When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Android's Logcat:
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configure and register the Android Tracer. You only need to do it once, usually in your application's `onCreate()` method:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = AndroidTracer.Builder().build()
GlobalTracer.registerIfAbsent(tracer)
```
{{% /tab %}} 
{{% tab "Java" %}}
```java
final AndroidTracer tracer = new AndroidTracer.Builder().build();
GlobalTracer.registerIfAbsent(tracer);
```
{{% /tab %}}
{{< /tabs >}}

4. (Optional) - Set the partial flush threshold. You can optimize the workload of the SDK if you create a lot of spans in your application, or on the contrary very few of them. The library waits until the number of finished spans gets above the threshold to write them on disk. A value of `1` writes each span as soon as its finished.

{{< tabs >}} 
{{% tab "Kotlin" %}}

```kotlin
val tracer = AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build()
```

{{% /tab %}}
{{% tab "Java" %}}

```java
final AndroidTracer tracer = new AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

5. Start a custom span using the following method:

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
// Do something ...
// ...
// Then when the span should be closed
span.finish()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final GlobalTracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<SPAN_NAME>").start();
// Do something ...
// ...
// Then when the span should be closed
span.finish();
```
{{% /tab %}}
{{< /tabs >}}

6. To use scopes in synchronous calls:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.buildSpan("<SPAN_NAME1>").start()
try {
    val scope = tracer.activateSpan(span)
    scope.use {
        // Do something ...
        // ...
        // Start a new Scope
        val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
        try {
            tracer.activateSpan(childSpan).use {
                // Do something ...
            }
        } catch(e: Error) {
            childSpan.error(e)
        } finally {
            childSpan.finish()
        }
    }
} catch(e: Error) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    final Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        // ...
        // Start a new Scope
        final Span childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
        try {
            final Scope innerScope = tracer.activateSpan(childSpan);
            try {
                // Do something ...
            } finally {
                innerScope.close();
            }   
        } catch(Error e) {
            AndroidTracer.logThrowable(childSpan, e);
        } finally {
            childSpan.finish();
        }
    }
    finally {
        scope.close();
    }
} catch(Error e) {
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
{{< /tabs >}}

7. To use scopes in asynchronous calls:

    {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.buildSpan("<SPAN_NAME1>").start()
try{
    val scope = tracer.activateSpan(span)
    scope.use {
        // Do something ...
        doAsyncWork {
            // Step 2: reactivate the Span in the worker thread
            val scopeContinuation = tracer.scopeManager().activate(span)
            scopeContinuation.use {
                // Do something ...
            }
        }
    }
} catch(e: Error) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    final Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        new Thread(() -> {
            // Step 2: reactivate the Span in the worker thread
            final Scope scopeContinuation = tracer.scopeManager().activate(span);
            try {
                // Do something
            } finally {
                scope.close();
            }
        }).start();
    } finally {
        scope.close();
    }
} catch (Exception e){
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
    {{< /tabs >}}
   
8. (Optional) To manually distribute traces between your environments, for example frontend to backend:

   a. Inject tracer context in the client request.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
val tracedRequestBuilder = Request.Builder()
tracer.inject(span.context(), Format.Builtin.TEXT_MAP_INJECT,         
        TextMapInject { key, value -> 
            tracedRequestBuilder.addHeader(key, value) 
        }
)
val request = tracedRequestBuilder.build() 
// Dispatch the request and finish the span after.
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<SPAN_NAME>").start();
final Request.Builder tracedRequestBuilder = new Request.Builder();
tracer.inject(
        span.context(),
        Format.Builtin.TEXT_MAP_INJECT,
        new TextMapInject() {
            @Override 
            public void put(String key, String value) {
                tracedRequestBuilder.addHeader(key, value);
            }
        });
final Request request = tracedRequestBuilder.build();
// Dispatch the request and finish the span after
```
{{% /tab %}}
{{< /tabs >}}

   b. Extract the client tracer context from headers in server code.

   {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get() 
val extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT, 
        TextMapExtract { 
            request.headers().toMultimap()
            .map { it.key to it.value.joinToString(";") }
                    .toMap()
                    .entrySet()
                    .iterator()
            }
        ) 
val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start()      
```
   {{% /tab %}}
   {{% tab "Java" %}}
```java
final Tracer tracer = GlobalTracer.get();
final SpanContext extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT,
        new TextMapExtract() {
            @Override 
            public Iterator<Map.Entry<String, String>> iterator() {                 
                return request.headers().toMultimap()
                  .entrySet()
                  .stream()
                  .collect(
                          Collectors.toMap(
                                  Map.Entry::getKey,
                                  entry -> String.join(";", entry.getValue())
                          )
                  )
                  .entrySet()
                  .iterator();
            }
        });
final Span serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start();
```
   {{% /tab %}}
   {{< /tabs >}}

**Note**: For code bases using the OkHttp client, Datadog provides the [implementation below](#okhttp).

9. (Optional) To provide additional tags alongside your span:

```kotlin
span.setTag("http.url", url)
```

10. (Optional) To mark a span as having an error, log it using OpenTracing tags:

```kotlin
span.log(mapOf(Fields.ERROR_OBJECT to throwable))
```
```kotlin
span.log(mapOf(Fields.MESSAGE to errorMessage))
```
You can also use one of the following helper method in AndroidTracer:

```kotlin
AndroidTracer.logThrowable(span, throwable)
```
```kotlin
AndroidTracer.logErrorMessage(span, message)
```

11. If you need to modify some attributes in your Span events before batching you can do so by providing an implementation of `SpanEventMapper` when initializing the SDK:

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val config = Configuration.Builder(tracesEnabled = true, ...) 
        // ...  
        .setSpanEventMapper(spanEventMapper)
        .build()    
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Configuration config = new Configuration.Builder(true, true, true, true)
        // ...
        .setSpanEventMapper(spanEventMapper)
        .build();    
```
{{% /tab %}}
{{< /tabs >}}

## Integrations

In addition to manual tracing, the `dd-sdk-android` library provides the following integration.

### OkHttp

If you want to trace your OkHttp requests, you can add the provided [Interceptor][6] as follows:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder() 
        .addInterceptor(
            DatadogInterceptor(listOf("example.com", "example.eu"), traceSamplingRate = 20f)
        )
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
float traceSamplingRate = 20f;
final OkHttpClient okHttpClient =  new OkHttpClient.Builder() 
        .addInterceptor(
                new DatadogInterceptor(Arrays.asList("example.com", "example.eu"), traceSamplingRate)
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

This creates a span around each request processed by the OkHttpClient (matching the provided hosts), with all the relevant information automatically filled (URL, method, status code, error), and propagates the tracing information to your backend to get a unified trace within Datadog.

Network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

The interceptor tracks requests at the application level. You can also add a `TracingInterceptor` at the network level to get more details, for example when following redirections.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHosts = listOf("example.com", "example.eu") 
val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts, traceSamplingRate = 20f))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts, traceSamplingRate = 20f))
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
float traceSamplingRate = 20f;
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu"); 
final OkHttpClient okHttpClient =  new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor(tracedHosts, traceSamplingRate))
        .addNetworkInterceptor(new TracingInterceptor(tracedHosts, traceSamplingRate))
        .build();
```
{{% /tab %}}
{{< /tabs >}}

In this case trace sampling decision made by the upstream interceptor for a particular request will be respected by the downstream interceptor.

Because the way the OkHttp Request is executed (using a Thread pool), the request span won't be automatically linked with the span that triggered the request. You can manually provide a parent span in the `OkHttp Request.Builder` as follows:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val request = Request.Builder()
        .url(requestUrl)
        .tag(Span::class.java, parentSpan)
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Request request = new Request.Builder()
        .url(requestUrl)
        .tag(Span.class, parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

or if you are using the extensions provided in the `dd-sdk-android-ktx` library:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val request = Request.Builder()
        .url(requestUrl)
        .parentSpan(parentSpan)
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Request request = new Request.Builder()
        .url(requestUrl)
        .parentSpan(parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

**Note**: If you use multiple Interceptors, this one must be called first.

### RxJava

To provide a continuous trace inside a RxJava stream you need to follow the steps below:
1. Add the [OpenTracing for RxJava][8] dependency into your project and follow the **Readme** file 
   for instructions. For example for a continuous trace you just have to add:
   ```kotlin
   TracingRxJava3Utils.enableTracing(GlobalTracer.get())
   ```
2. Then in your project open a scope when the Observable is subscribed and close it when it completes. Any span
   created inside the stream operators will be displayed inside this scope (parent Span):

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
Single.fromSupplier{} 
        .subscribeOn(Schedulers.io())
        .map {  
            val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
            // ...
            span.finish()
        }
        .doOnSubscribe {
            val span = GlobalTracer.get()
                    .buildSpan("<YOUR_OP_NAME>")
                    .start()
            spanScope = GlobalTracer.get().scopeManager().activate(span)
        }
        .doFinally {
            GlobalTracer.get().scopeManager().activeSpan()?.let {
                it.finish()
            }
            spanScope?.close()
        }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
Single.fromSupplier({})
        .subscribeOn(Schedulers.io())
        .map(data -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            // ...
            span.finish();
            // ...
         })
        .doOnSubscribe(disposable -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
            scopeStorage.set(spanScope);
        })
        .doFinally(() -> {
            final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
            if (activeSpan != null) {
                activeSpan.finish();
            }
            Scope spanScope = scopeStorage.get();
            if (spanScope != null) {
                spanScope.close();
                scopeStorage.remove();
            }
        })
    };
```
{{% /tab %}}
{{< /tabs >}}
  
### RxJava + Retrofit
For a continuous trace inside a RxJava stream that uses Retrofit for the network requests:
1. Configure the [Datadog Interceptor](#okhttp)
2. Use the [Retrofit RxJava][9] adapters to use synchronous Observables for the network requests:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
new Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build();
 ```
{{% /tab %}}
{{< /tabs >}}

3. Open a scope around your Rx stream as follows:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map { // ... } 
    .doOnSuccess {
        localDataSource.persistData(it)
    }
    .doOnSubscribe {
        val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
        spanScope = GlobalTracer.get().scopeManager().activate(span)
    }
    .doFinally {
        GlobalTracer.get().scopeManager().activeSpan()?.let {
            it.finish()
        }
        spanScope?.close()
    }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map(data -> { // ... })
    .doOnSuccess(data -> {
        localDataSource.persistData(data);
    })
    .doOnSubscribe(disposable -> {
        final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
        Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
        scopeStorage.set(spanScope);
    })
    .doFinally(() -> { 
        final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
        if (activeSpan != null) {
            activeSpan.finish();
        }
        Scope spanScope = scopeStorage.get();
        if (spanScope != null) {
            spanScope.close();
            scopeStorage.remove();
        }
    });
 ```
{{% /tab %}}
{{< /tabs >}}

## Batch collection

All the spans are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while being offline, no data will be lost.

The data on disk will automatically be discarded if it gets too old to ensure the SDK doesn't use too much disk space.

## Initialization
The following methods in `AndroidTracer.Builder` can be used when initializing the `Tracer`:


| Method                           | Description                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setServiceName(<SERVICE_NAME>)	`    | Set the value for the `service`. |
| `setPartialFlushThreshold(<INT>)` |  When this threshold is reached (you have a specific `<INT>` amount of spans closed waiting), the flush mechanism is triggered and all pending closed spans are processed and sent to intake.|
| `addGlobalTag(<KEY>, <VALUE>)`     | Set a `<KEY>:<VALUE>` pair of tags to be added to spans created by the Tracer. |
| `setBundleWithRumEnabled(true)`    | Set to `true` to enable spans to be enriched with the current RUM View information. This enables you to see all of the spans produced during a specific View lifespan in the RUM Explorer. |
| `setSamplingRate(<FLOAT>)`   | Set a value `0-100` to define the percentage of Traces to collect. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android
[3]: /tracing/visualization/#spans
[4]: /account_management/api-app-keys/#client-tokens
[5]: /account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: /real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3
