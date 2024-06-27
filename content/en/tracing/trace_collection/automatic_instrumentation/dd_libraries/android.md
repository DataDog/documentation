---
aliases:
- /tracing/setup_overview/setup/android
- /tracing/setup/android
- /tracing/trace_collection/dd_libraries/android
description: Collect traces from your Android applications.
code_lang: android
type: multi-code-lang
code_lang_weight: 80
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: tracing/visualization/
  tag: Documentation
  text: Explore your services, resources, and traces
title: Tracing Android Applications
---
Send [traces][1] to Datadog from your Android applications with [Datadog's `dd-sdk-android-trace` client-side tracing library][2] and leverage the following features:

* Create custom [spans][3] for operations in your application.
* Add `context` and extra custom attributes to each span sent.
* Optimized network usage with automatic bulk posts.

<div class="alert alert-info"><strong>Note</strong>: Datadog charges for <strong>ingested and indexed</strong> spans sent from your Android applications, but does not charge for the underlying devices. Read more in the <a href="/account_management/billing/apm_tracing_profiler/">APM billing documentation</a>.</div>

Datadog tracer implements both [Open Tracing][11] and [Open Telemetry][10] standards. 

## Setup

1. Add the Gradle dependency by declaring the library as a dependency in your `build.gradle` file:

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
}
```

2. Initialize Datadog SDK with your application context, tracking consent, and the [Datadog client token][4]. For security reasons, you must use a client token: you cannot use [Datadog API keys][5] to configure Datadog SDK as they would be exposed client-side in the Android application APK byte code. For more information about setting up a client token, see the [client token documentation][4]:

   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
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
   {{% /tab %}}
   {{% tab "Java" %}}
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
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.EU1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.EU1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US3)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US3)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US5)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US5)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="gov" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US1_FED)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US1_FED)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.AP1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.AP1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

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

3. Configure and enable Trace feature:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val traceConfig = TraceConfiguration.Builder().build()
    Trace.enable(traceConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    TraceConfiguration traceConfig = TraceConfiguration.Builder().build();
    Trace.enable(traceConfig);
```
{{% /tab %}}
{{< /tabs >}}

4. Configure and register the Android Tracer. You only need to do it once, usually in your application's `onCreate()` method:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = AndroidTracer.Builder().build()
GlobalTracer.registerIfAbsent(tracer)
```
{{% /tab %}} 
{{% tab "Java" %}}
```java
AndroidTracer tracer = new AndroidTracer.Builder().build();
GlobalTracer.registerIfAbsent(tracer);
```
{{% /tab %}}
{{< /tabs >}}

5. (Optional) - Set the partial flush threshold to optimize the SDK's workload based on the number of spans your application generates. The library waits until the number of finished spans exceeds the threshold before writing them to disk. Setting this value to `1` writes each span as soon as it finishes.

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
AndroidTracer tracer = new AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

6. Start a custom span using the following method:

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
GlobalTracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
// Do something ...
// ...
// Then when the span should be closed
span.finish();
```
{{% /tab %}}
{{< /tabs >}}

7. To use scopes in synchronous calls:

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
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        // ...
        // Start a new Scope
        Span childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
        try {
            Scope innerScope = tracer.activateSpan(childSpan);
            try {
                // Do something ...
            } finally {
                innerScope.close();
            }   
        } catch(Throwable e) {
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

8. To use scopes in asynchronous calls:

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
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        new Thread(() -> {
            // Step 2: reactivate the Span in the worker thread
            Scope scopeContinuation = tracer.scopeManager().activate(span);
            try {
                // Do something
            } finally {
                scope.close();
            }
        }).start();
    } finally {
        scope.close();
    }
} catch (Throwable e){
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
    {{< /tabs >}}
   
9. (Optional) To manually distribute traces between your environments, for example frontend to backend:

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
Tracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
Request.Builder tracedRequestBuilder = new Request.Builder();
tracer.inject(
        span.context(),
        Format.Builtin.TEXT_MAP_INJECT,
        new TextMapInject() {
            @Override 
            public void put(String key, String value) {
                tracedRequestBuilder.addHeader(key, value);
            }
        });
Request request = tracedRequestBuilder.build();
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
Tracer tracer = GlobalTracer.get();
SpanContext extractedContext = tracer.extract(
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
Span serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start();
```
   {{% /tab %}}
   {{< /tabs >}}

**Note**: For code bases using the OkHttp client, Datadog provides the [implementation below](#okhttp).

10. (Optional) To provide additional tags alongside your span:

```kotlin
span.setTag("http.url", url)
```

11. (Optional) To mark a span as having an error, log it using OpenTracing tags:

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

12. If you need to modify some attributes in your Span events before batching you can do so by providing an implementation of `SpanEventMapper` when enabling Trace feature:

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val traceConfig = TraceConfiguration.Builder() 
        // ...  
        .setEventMapper(spanEventMapper)
        .build()    
```
{{% /tab %}}
{{% tab "Java" %}}
```java
TraceConfiguration config = new TraceConfiguration.Builder()
        // ...
        .setEventMapper(spanEventMapper)
        .build();    
```
{{% /tab %}}
{{< /tabs >}}

## Kotlin Extensions

### Running a lambda within a Span

To monitor the performance of a given lambda, you can use the `withinSpan()` method. By default, a scope will be created for the span, but you can disable this behavior by setting the `activate` parameter to false.

```kotlin
    withinSpan("<SPAN_NAME>", parentSpan, activate) {
        // Your code here
    }
```

### Span extension methods

You can mark a span as having an error using one of the following `error()` methods.

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    try {
        // …
    } catch (e: IOException) {
        span.setError(e)
    }
    span.finish()
```

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    if (invalidState) {
        span.setError("Something unexpected happened")
    }
    span.finish()
```

### Tracing SQLite transaction

If you are using `SQLiteDatabase` to persist data locally, you can trace the database transaction using the following method:

```kotlin
   sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
        // Your queries here
        database.insert("<TABLE_NAME>", null, contentValues)

        // Decorate the Span
        setTag("<TAG_KEY>", "<TAG_VALUE>")
   }
```
It behaves like the `SQLiteDatabase.transaction` method provided in the `core-ktx` AndroidX package and only requires a span operation name.

## Integrations

In addition to manual tracing, the Datadog SDK provides the following integrations.

### OkHttp

If you want to trace your OkHttp requests, you can add the provided [Interceptor][6] (which can be found in the `dd-sdk-android-okhttp` library) as follows:

1. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Add `DatadogInterceptor` to your `OkHttpClient`:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder() 
        .addInterceptor(
            DatadogInterceptor(listOf("example.com", "example.eu"), traceSampler = RateBasedSampler(20f))
        )
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
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
        .addInterceptor(DatadogInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
        )
        .addNetworkInterceptor(
                new TracingInterceptor(/** SDK instance name or null **/, tracedHosts, null, new RateBasedSampler(20f))
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

In this case trace sampling decision made by the upstream interceptor for a particular request will be respected by the downstream interceptor.

Because the way the OkHttp Request is executed (using a Thread pool), the request span won't be automatically linked with the span that triggered the request. You can manually provide a parent span in the `OkHttp Request.Builder` as follows by using `Request.Builder.parentSpan` extension method:

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
Request.Builder requestBuilder = new Request.Builder()
        .url(requestUrl)
Request request = OkHttpRequestExtKt
        .parentSpan(requestBuilder, parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

**Note**:
* If you use multiple Interceptors, this one must be called first.
* If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

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
Single.fromSupplier { } 
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
| `setService(<SERVICE_NAME>)	`    | Set the value for the `service`. |
| `setPartialFlushThreshold(<INT>)` |  When this threshold is reached (you have a specific `<INT>` amount of spans closed waiting), the flush mechanism is triggered and all pending closed spans are processed and sent to intake.|
| `addTag(<KEY>, <VALUE>)`     | Set a `<KEY>:<VALUE>` pair of tags to be added to spans created by the Tracer. |
| `setBundleWithRumEnabled(true)`    | Set to `true` to enable spans to be enriched with the current RUM View information. This enables you to see all of the spans produced during a specific View lifespan in the RUM Explorer. |
| `setSampleRate(<FLOAT>)`   | Set a value `0-100` to define the percentage of Traces to collect. |
| `setTracingHeaderTypes(Set<TracingHeaderType>)`   | Sets the tracing header styles that may be injected by the Tracer. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /tracing/visualization/#spans
[4]: /account_management/api-app-keys/#client-tokens
[5]: /account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: /real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3
[10]: /tracing/trace_collection/custom_instrumentation/android/otel
[11]: https://opentracing.io
