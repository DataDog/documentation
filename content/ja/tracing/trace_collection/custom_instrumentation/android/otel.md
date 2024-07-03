---
description: Instrument your Android and Android TV application with OpenTelemetry
  API, to send traces to Datadog.
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
kind: documentation
title: Android and Android TV Custom Instrumentation using OpenTelemetry API
---

{{% otel-custom-instrumentation-lang %}}

## 要件と制限

- You need to download the [dd-sdk-android-trace][1] and [dd-sdk-android-trace-otel][2] dependencies starting 
with 2.11.0+

## セットアップ

1. Add [Android Trace][1] and [Android Trace OpenTelemetry][2] dependencies to your **application module's** `build.gradle` file:


```groovy
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
    implementation "com.datadoghq:dd-sdk-android-trace-otel:x.x.x" 
    //(...)
}

```

**Note**:  If you are targeting Android API level lower than 24, enable desugaring by adding the following lines to your `build.gradle` file:

```groovy
android {

    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        // ...
    }

    dependencies {
        coreLibraryDesugaring "com.android.tools:desugar_jdk_libs:[latest_version]"
        // ...
    }
}
```

2. Initialize Datadog SDK with your application context, tracking consent, and [Datadog client token][4]. For security reasons, you must use a client token, not [Datadog API keys][5], to configure Datadog SDK.


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

   To be GDPR compliant, the SDK requires the tracking consent value at initialization.
   The tracking consent can be one of the following values [see Tracking Consent][6]:
   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データ
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

   SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出してください。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
   * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

   ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```
   アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. トレース機能を構成し、有効にします。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val traceConfig = TraceConfiguration.Builder().build()
Trace.enable(traceConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
final TraceConfiguration traceConfig = TraceConfiguration.Builder().build();
Trace.enable(traceConfig);
```
{{% /tab %}}
{{< /tabs >}}    

4. Datadog tracer implements the [OpenTelemetry standard][18]. Create `OtelTracerProvider` and register `OpenTelemetrySdk` in `GlobalOpenTelemetry` in your `onCreate()` method:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
GlobalOpenTelemetry.set(object : OpenTelemetry {
    private val tracerProvider = OtelTracerProvider.Builder()
        .setService([BuildConfig.APPLICATION_ID])
        .build()

    override fun getTracerProvider(): TracerProvider {
        return tracerProvider
    }

    override fun getPropagators(): ContextPropagators {
        return ContextPropagators.noop()
    }
})
// and later on if you want to access the tracer provider
val tracerProvider = GlobalOpenTelemetry.get().getTracer(instrumentationName = "<instrumentation_name>")
```
{{% /tab %}}
{{% tab "Java" %}}
```java
GlobalOpenTelemetry.set(new OpenTelemetry() {
    private final TracerProvider tracerProvider = new OtelTracerProvider.Builder()
            .setService(BuildConfig.APPLICATION_ID)
            .build();

    @Override
    public TracerProvider getTracerProvider() {
        return tracerProvider;
    }

    @Override
    public ContextPropagators getPropagators() {
        return ContextPropagators.noop();
    }
};
// and later on if you want to access the tracer provider
final TracerProvider tracerProvider = GlobalOpenTelemetry.get().getTracer("<instrumentation_name>");       
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Ensure `GlobalOpenTelemetry.set` API is only called once per process. Otherwise, you can create a `TracerProvider` and use it as a singleton in your project.

**Note**: The `setService` method is used to set the service name for the tracer provider. The service name is used to identify the application in the Datadog UI. You can either use the `GlobalOpenTelemetry` to hold a single instance of the `TracerProvider` or create your own instance and use it in your application code as needed.

5. Instrument your code with the OpenTelemetry API:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.spanBuilder(spanName = "<span_name>").startSpan()
// do something you want to measure ...
// ... then, when the operation is finished:
span.end()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span span = tracer.spanBuilder("<span_name>").startSpan();
// do something you want to measure ...
// ... then, when the operation is finished:
span.end();
```
{{% /tab %}}
{{< /tabs >}}

6. (Optional) Set child-parent relationship between your spans:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
let childSpan = tracer.spanBuilder(spanName = "response decoding")
    .setParent(Context.current().with(parentSpan)) // make it child of parent span
    .startSpan()

// ... do your logic here ...
childSpan.end()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span childSpan = tracer.spanBuilder("<span_name>")
    .setParent(Context.current().with(parentSpan)) // make it child of parent span
    .startSpan();

// ... do your logic here ...
childSpan.end();
```
{{% /tab %}}
{{< /tabs >}}

7. (Optional) Provide additional attributes alongside your span:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
tracer.spanBuilder(spanName = "<span_name>").setAttribute(key = "<key_name>", value = <key_value>).startSpan()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
tracer.spanBuilder("<span_name>").setAttribute("<key_name>", <key_value>).startSpan();
```
{{% /tab %}}
{{< /tabs >}}

8. (Optional) Attach an error to a span:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
span.setStatus(StatusCode.ERROR, description = "<error_description>")

// or if you want to set an exception

span.recordException(exception)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
span.setStatus(StatusCode.ERROR, "<error_description>")

// or if you want to set an exception

span.recordException(exception)
```
{{% /tab %}}
{{< /tabs >}}

9. (Optional) Add span links to your span:

{{< tabs >}}
{{% tab "Kotlin" %}}
```swift
val linkedSpan = tracer.spanBuilder(spanName = "linked span").startSpan()
linkedSpan.end()

val spanWithLinks = tracer.spanBuilder(spanName = "span with links")
    .addLink(spanContext = linkedSpan.spanContext)
    .startSpan()
spanWithLinks.end()
```
{{% /tab %}}
{{% tab "Java" %}}
```Java
final Span linkedSpan = tracer.spanBuilder("linked span").startSpan();
linkedSpan.end();

final Span spanWithLinks = tracer.spanBuilder("span with links")
        .addLink(linkedSpan.getSpanContext())
        .startSpan();
spanWithLinks.end();
```
{{% /tab %}}
{{< /tabs >}}

10. (Optional) Add local parent span to the span generated around the OkHttp request in RUM:

First, you need to add the OpenTelemetry OkHttp extension module to your project dependencies:

```groovy
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    implementation "com.datadoghq:dd-sdk-android-okhttp-otel:x.x.x"
    //(...)
}
```

After you create an `OkHttp` `Request`, you can attach a parent span to the request:

{{< tabs >}}
{{% tab "Kotlin" %}}
```swift
val parentSpan = tracer.spanBuilder(spanName = "parent span").startSpan()
parentSpan.end()
val request = Request.Builder()
    .url("<URL>")
    .addParentSpan(parentSpan)
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```Java
final Span parentSpan = tracer.spanBuilder("parent span").startSpan();
parentSpan.end()
final Request:request = new Request.Builder()
    .url("<URL>")
    .addParentSpan(parentSpan)
    .build();
```
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace-otel
[3]: https://app.datadoghq.com/rum/application/create
[4]: /ja/account_management/api-app-keys/#client-tokens
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[8]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#attributes
[10]: https://opentelemetry.io/docs/concepts/signals/traces/#span-events
[11]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[12]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[13]: /ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[14]: /ja/account_management/api-app-keys/#client-tokens
[15]: /ja/account_management/api-app-keys/#api-keys
[16]: /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/#set-tracking-consent-gdpr-compliance
[17]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[18]: https://opentelemetry.io/docs/concepts/signals/traces/