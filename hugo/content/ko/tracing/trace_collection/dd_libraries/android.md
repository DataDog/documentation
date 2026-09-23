---
aliases:
- /ko/tracing/setup_overview/setup/android
- /ko/tracing/setup/android
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/android
code_lang: android
code_lang_weight: 80
description: Android 애플리케이션에서 트레이스 수집
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: 소스 코드
  text: dd-sdk-android Source code
- link: tracing/visualization/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
title: Android 애플리케이션 추적
type: multi-code-lang
---
[Datadog의 `dd-sdk-android-trace` 클라이언트 측 SDK][2]를 사용해 Android 애플리케이션에서 Datadog으로 [트레이스][1]를 보내고 다음 기능을 활용해 보세요.

* 애플리케이션 내 작업을 위한 사용자 지정 [스팬][3]을 생성합니다.
* 전송한 각 스팬에 `context` 및 추가 사용자 지정 속성을 추가합니다.
* 자동 일괄 포스트를 사용해 네트워크 사용량을 최적화합니다.

{{% android-trace-datadog-api-waning %}}
{{% android-otel-note %}}

## 설정 {#setup}

1. `build.gradle` 파일에서 라이브러리를 종속성으로 선언하여 Gradle 종속성을 추가합니다.
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
   }
   ```
2. 애플리케이션 컨텍스트, 추적 동의 및 [Datadog 클라이언트 토큰][4]을 통해 Datadog SDK를 초기화합니다. 보안을 위해 클라이언트 토큰을 사용해야 합니다. [Datadog API 키][5]를 사용해 Datadog SDK를 구성하면 Android 애플리케이션 APK 바이트 코드의 클라이언트 측에 노출되기 때문입니다. 클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][4]를 참조하세요.
   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US1_FED)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

{{< site-region region="gov2" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US2_FED)
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US2_FED)
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.AP1)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap2" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.AP2)
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.AP2)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="uk1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.UK1)
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.UK1)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   GDPR 규정을 준수하려면 SDK 초기화 시 추적 동의 값이
   필요합니다.
   추적 동의는 다음 값 중 하나를 선택할 수 있습니다.

   * `TrackingConsent.PENDING`: SDK는 데이터 수집 및 일괄 처리를 시작하지만
     해당 데이터를
     수집 엔드포인트로 전송하지 않습니다. SDK는 새로운 추적 동의 값을 기다리며, 일괄 처리된 데이터를 어떻게 처리할지
     결정합니다.
   * `TrackingConsent.GRANTED`: SDK는 데이터 수집을 시작하고 해당 데이터를
     데이터 수집 엔드포인트로 전송합니다.
   * `TrackingConsent.NOT_GRANTED`: SDK는 데이터를 수집하지 않습니다. 로그, 트레이스 또는
     RUM 이벤트를
     수동으로 전송할 수 없습니다.

   SDK 초기화 후 추적 동의를 업데이트하려면
   `Datadog.setTrackingConsent(<NEW CONSENT>)`를 호출합니다.
   SDK는 새로운 동의 값에 따라 동작을 변경합니다. 예를 들어, 현재 추적
   `TrackingConsent.PENDING`이고 이를 다음과 같이 업데이트하는 경우:

   * `TrackingConsent.GRANTED`: SDK는 현재 일괄 처리된 모든 데이터와 향후 데이터를
     데이터 수집 엔드포인트로 직접 전송합니다.
   * `TrackingConsent.NOT_GRANTED`: SDK는 일괄 처리된 모든 데이터를 삭제하고 향후 데이터를
     수집하지 않습니다.

   **참고**: 초기화에 필요한 자격 증명에는 애플리케이션 변형 이름이
   필수이며, `BuildConfig.FLAVOR` 값을 사용해야 합니다(변형 이름이 없는 경우 빈 문자열 사용)
   . 이는 빌드 시 올바른 ProGuard `mapping.txt` 파일이
   자동으로 업로드되어 난독화가 해제된 RUM 오류 스택 트레이스를 조회할 수 있게 해주므로 중요합니다. 자세한 정보는
   [Android 소스 매핑 파일 업로드 가이드][7]를 참조하세요.

   유틸리티 메서드 `isInitialized`를 사용하여 SDK가 제대로 초기화되었는지 확인합니다.

   ```kotlin
   if (Datadog.isInitialized()) {
     // your code here
   }
   ```

   애플리케이션을 작성할 때 `setVerbosity` 메서드를 호출하여 개발 로그를 활성화할 수 있습니다.
   그러면 라이브러리의 모든 내부 메시지 가운데, 우선순위가 제공된 수준과 같거나 높은 메시지가
   Android의 Logcat에 기록됩니다.

   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```
3. 트레이스 기능 구성 및 활성화
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder().build()
   Trace.enable(traceConfig)
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration traceConfig = new TraceConfiguration.Builder().build();
   Trace.enable(traceConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}
4. `DatadogTracer`를 구성하고 등록합니다. 이 작업은 보통 애플리케이션의 `onCreate()` 메서드에서 한 번만 수행하면 됩니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   import com.datadog.android.trace.GlobalDatadogTracer
   import com.datadog.android.trace.DatadogTracing

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder()
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   import com.datadog.android.trace.GlobalDatadogTracer;
   import com.datadog.android.trace.DatadogTracing;

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder(Datadog.getInstance())
           .build()
   );
   ```
   {{% /tab %}}
   {{< /tabs >}}
5. (선택 사항) 애플리케이션이 생성하는 스팬 수를 기준으로, SDK의 워크로드를 최적화하도록 부분 플러시 임계값을 설정합니다. 라이브러리는 완료된 스팬 수가 임계값을 초과할 때까지 대기하다가 이를 디스크에 기록합니다. 이 값을 `1`로 설정하면 각 스팬이 완료되는 즉시 기록됩니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   val tracer = DatadogTracing.newTracerBuilder()
       .withPartialFlushMinSpans(10)
       .build()
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   DatadogTracer tracer = DatadogTracing.newTracerBuilder(Datadog.getInstance())
       .withPartialFlushMinSpans(10)
       .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}
6. 다음 메서드를 사용하여 사용자 지정 스팬을 시작합니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish();
   ```
   {{% /tab %}}
   {{< /tabs >}}
7. 동기 호출에서 스코프 사용:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope?.use {
           // Do something ...
           // ...
           // Start a new Scope
           val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
           try {
               val innerScope = tracer.activateSpan(childSpan).use { innerScope ->

               }
           } catch (e: Throwable) {
               childSpan.logThrowable(e)
           } finally {
               childSpan.finish()
           }
       }
   } catch (e: Throwable) {
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           // ...
           // Start a new Scope
           DatadogSpan childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
           try {
               DatadogScope innerScope = tracer.activateSpan(childSpan);
               try {
                   // Do something ...
               } finally {
                   innerScope.close();
               }
           } catch (Throwable e) {
               childSpan.logThrowable(e);
           } finally {
               childSpan.finish();
           }
       } finally {
           scope.close();
       }
   } catch (Throwable e) {
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}
8. 비동기 호출에서 스코프 사용:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope.use {
           // Do something ...
           Thread {
               // Step 2: reactivate the Span in the worker thread
               tracer.activateSpan(span).use {
                   // Do something ...
               }
           }.start()
       }
   } catch (e: Throwable) {
       span.logThrowable(e)
   } finally {
       span.finish()
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           new Thread(() -> {
               // Step 2: reactivate the Span in the worker thread
               DatadogScope scopeContinuation = tracer.activateSpan(span);
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
       span.logThrowable(e);
   } finally {
       span.finish();
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}

9. (선택 사항) 환경 간(예: 프론트엔드에서 백엔드)에 트레이스를 수동으로 분산:
   1. 클라이언트 요청에 트레이서 컨텍스트를 주입합니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   val tracedRequestBuilder = Request.Builder()
   tracer.propagate().inject<Request.Builder?>(
       span.context(),
       tracedRequestBuilder
   ) { builder, key, value ->
       builder?.addHeader(key, value)
   }
   val request = tracedRequestBuilder.build()
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   Request.Builder tracedRequestBuilder = new Request.Builder();
   tracer.propagate().inject(
       span.context(),
       tracedRequestBuilder,
       new Function3<Request.Builder,String,String,Unit>(){
           @Override
           public Unit invoke(Request.Builder builder, String key, String value) {
             builder.addHeader(key, value);
             return Unit.INSTANCE;
           }
       }
   );
   Request request = tracedRequestBuilder.build();
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{< /tabs >}}
   1. 서버 코드의 헤더에서 클라이언트 트레이서 컨텍스트를 추출합니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val extractedContext = tracer.propagate()
       .extract(request) { carrier, classifier ->
           val headers = carrier.headers.toMultimap()
               .map { it.key to it.value.joinToString(";") }
               .toMap()

           for ((key, value) in headers) classifier(key, value)
       }

   val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpanContext extractedContext = tracer.propagate()
     .extract(request,
       new Function2<Request, Function2<? super String, ? super String, Boolean>, Unit>() {
         @Override
         public Unit invoke(
           Request carrier,
           Function2<? super String, ? super String, Boolean> classifier
         ) {
           request.headers().forEach(pair -> {
             String key = pair.component1();
             String value = pair.component2();

             classifier.invoke(key, value);
           });

           return Unit.INSTANCE;
         }
       });
   DatadogSpan serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **참고**: OkHttp 클라이언트를 사용하는 코드 베이스의 경우, Datadog은 아래의 [구현](#okhttp)을 제공합니다.

10. (선택 사항) 스팬과 함께 추가 태그 제공:
    ```kotlin
    span.setTag("http.url", url)
    ```
11. (선택 사항) 스팬에 오류가 있는 것으로 표시하려면 해당 메서드를 사용하여 기록합니다.
    ```kotlin
    span.logThrowable(throwable)
    ```
    ```kotlin
    span.logErrorMessage(message)
    ```
12. 일괄 처리 전에 스팬 이벤트의 일부 속성을 수정하려면 트레이스 기능을 활성화할 때 `SpanEventMapper`를 구현하면 됩니다.
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

## 코틀린 확장 {#kotlin-extensions}

### 스팬 내 람다 실행 {#running-a-lambda-within-a-span}

특정 람다의 성능을 모니터링하려면 `withinSpan()` 메서드를 사용할 수 있습니다. 기본적으로 스팬에 대한 범위가 생성되지만, `activate` 파라미터를 'false'로 설정하여 이 동작을 비활성화할 수 있습니다.

```kotlin
import com.datadog.android.trace.withinSpan
import com.datadog.android.trace.api.span.DatadogSpan

withinSpan("<SPAN_NAME>", parentSpan, activate) {
   // Your code here
}
```

### SQLite 트랜잭션 추적 {#tracing-sqlite-transaction}

`SQLiteDatabase`를 사용하여 데이터를 로컬로 유지하는 경우 다음 메서드를 사용하여 데이터베이스 트랜잭션을 추적할 수 있습니다.

```kotlin
import com.datadog.android.trace.sqlite.transactionTraced
import android.database.sqlite.SQLiteDatabase

sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
  // Your queries here
  database.insert("<TABLE_NAME>", null, contentValues)

  // Decorate the Span
  setTag("<TAG_KEY>", "<TAG_VALUE>")
}
```
`SQLiteDatabase.transaction`AndroidX 패키지에서 제공하는 메서드와 `core-ktx`유사하게 작동하며 스팬 작업 이름만 지정하면 됩니다.

## 통합 {#integrations}

수동 추적 외에도 Datadog SDK는 다음 통합을 제공합니다.

### OkHttp {#okhttp}

OkHttp 요청을 추적하려면 제공된 [Interceptor][6](`dd-sdk-android-okhttp` 라이브러리에서 찾을 수 있음)를 다음과 같이 추가할 수 있습니다.

1.  모듈 수준 `build.gradle`파일의 `dd-sdk-android-okhttp` 라이브러리에 Gradle 종속성을 추가합니다.
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```
2. `DatadogInterceptor`를 `OkHttpClient`에 추가합니다. 각 호스트 항목은 일반 호스트 이름(예: `"example.com"`) 또는 단일 `*`가 포함된 와일드카드 패턴(예: `"*.example.com"`)을 허용합니다. 와일드카드는 등록 가능한 도메인의 하위 도메인에 한해서 일치할 수 있으므로 `"*.com"`와 같은 패턴은 허용되지 않습니다.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
   val okHttpClient = OkHttpClient.Builder()
     .addInterceptor(
       DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
   OkHttpClient okHttpClient = new OkHttpClient.Builder()
     .addInterceptor(
       new DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

이는 OkHttpClient에서 처리하는 각 요청과 관련하여 스팬을 생성하며, 모든 관련 정보(URL, 메서드, 상태 코드, 오류)가 자동으로 채워지고 추적 정보가 백엔드로 전파되어 Datadog 내에서 통합된 트레이스를 확인할 수 있습니다.

네트워크 트레이스는 조정 가능한 샘플링 비율로 수집됩니다. 기본적으로 100% 샘플링이 적용됩니다.

인터셉터는 애플리케이션 수준에서 요청을 추적합니다. 또한 네트워크 수준에서 `TracingInterceptor`를 추가하여 자세한 정보를 얻을 수 있습니다(예: 리디렉션을 따를 때).

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
val okHttpClient =  OkHttpClient.Builder()
  .addInterceptor(
    DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(100f)
      .build()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
  .addInterceptor(
    new DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    new TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

이 경우 특정 요청에 대해 업스트림 인터셉터에서 내린 트레이스 샘플링 결정은 다운스트림 인터셉터에 동일하게 적용됩니다.

OkHttp 요청이 실행되는 방식(스레드 풀 사용)으로 인해 요청 스팬은 요청을 트리거한 스팬과 자동으로 연결되지 않습니다. 다음과 같이 `Request.Builder.parentSpan` 확장 메서드를 사용하여 `OkHttp Request.Builder`에 상위 스팬을 수동으로 지정할 수 있습니다.

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
  .url(requestUrl);

Request request = OkHttpRequestExtKt
  .parentSpan(requestBuilder, parentSpan)
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**참고**:
* 여러 인터셉터를 사용하는 경우 이 인터셉터를 가장 먼저 호출해야 합니다.
* Datadog 구성에서 사용자 지정 트레이싱 헤더 유형을 정의하고 `GlobalDatadogTracer`에 등록된 SDK를 사용 중인 경우, 사용 중인 SDK에도 동일한 트레이싱 헤더 유형을 설정해야 합니다.

### Cronet {#cronet}

OkHttp 대신 Cronet을 사용하는 경우, 분산 트레이스를 위해 `CronetEngine`을 계측할 수 있습니다.

1. 모듈 수준 `build.gradle` 파일에 Gradle 종속성을 추가합니다.
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
   }
   ```
2. `CronetEngine.Builder` 계측:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val cronetEngine = CronetEngine.Builder(context)
     .configureDatadogInstrumentation(
       apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
         tracedHosts = listOf("example.com", "example.eu")
       )
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   CronetEngine.Builder builder = new CronetEngine.Builder(context);
   CronetEngine cronetEngine = CronetIntegrationPluginKt
     .configureDatadogInstrumentation(
       builder,
       null,
       new ApmNetworkInstrumentationConfiguration(
         Arrays.asList("example.com", "example.eu")
       )
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

이는 제공된 호스트와 일치하는 `CronetEngine`에서 처리하는 각 요청과 관련하여 스팬을 생성합니다. 모든 관련 정보가 자동으로 채워지고(URL, 메서드, 상태 코드, 오류), 트레이스 정보가 백엔드로 전파됩니다.

#### 리디렉션 추적 {#tracing-redirects}

기본적으로 추적은 애플리케이션 수준에서 적용됩니다. 리디렉션된 요청을 추가로 추적하려면 트레이스 범위를 `ALL`로 설정합니다.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### 헤더 전파 전용 {#header-propagation-only}

로컬 스팬을 생성하지 않고 트레이스 헤더를 전파하려면 헤더 전파 전용 모드를 사용하세요.

**참고**: 이 모드를 사용하려면 RUM을 활성화해야 합니다. 리소스 추적은 RUM 계측을 통해 처리되기 때문입니다. `RumNetworkInstrumentationConfiguration`은 `configureDatadogInstrumentation` 호출 시 제공해야 합니다.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    rumInstrumentationConfiguration = RumNetworkInstrumentationConfiguration(),
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    new RumNetworkInstrumentationConfiguration(),
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### 샘플링 속도 {#sampling-rate}

트레이스 샘플링 속도 구성:

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**알려진 제한 사항**:
* Cronet API 제한으로 인해 리디렉션된 요청에 대해서는 트레이스 헤더가 전파되지 않습니다.
* 재시도는 계측이 불가합니다.

## 일괄 처리 수집 {#batch-collection}

모든 스팬은 먼저 로컬 장치에 일괄 저장됩니다. 각 배치는 intake 사양을 따릅니다. 배치는 네트워크가 사용 가능하고, 배터리 잔량이 충분하여 Datadog SDK가 최종 사용자 경험에 영향을 미치지 않을 수 있을 때 즉시 전송됩니다. 애플리케이션이 포그라운드에 있는 동안 네트워크가 사용 불가능하거나 데이터 업로드가 실패하면, 배치를 성공적으로 전송할 때까지 보관합니다.

따라서 사용자가 오프라인 중에 애플리케이션을 열어도 데이터 손실이 없습니다.

SDK가 디스크 공간을 많이 차지하지 않도록 오래된 디스크 데이터는 자동으로 삭제됩니다.

## 초기화 {#initialization}
`DatadogTracerBuilder`의 다음 메서드는 `DatadogTracer` 초기화 과정에서 사용할 수 있습니다.

| 메서드                                            | 설명                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withServiceName(<SERVICE_NAME>)	`                | 값을 `service`설정합니다.                                                                                                                                                             |
| `withPartialFlushMinSpans(<INT>)`                 | 이 임계값에 도달하면(특정 개수의 스팬이 `<INT>` 닫힌 상태로 대기 중인 경우), 플러시 메커니즘이 트리거되고 보류 상태의 모든 닫힌 스팬이 처리되어 수집 포인트로 전송됩니다. |
| `withTag(<KEY>, <VALUE>)`                         | Tracer를 통해 생성된 스팬에 추가할 `<KEY>:<VALUE>` 태그 쌍을 설정합니다.                                                                                                               |
| `setBundleWithRumEnabled(true)`                   | 를 `true`로 설정하면 현재 RUM View 정보로 스팬을 보강할 수 있습니다. 이를 통해 RUM 탐색기에서 특정 View 수명 주기에 생성된 모든 스팬을 확인할 수 있습니다.   |
| `withSampleRate(<FLOAT>)`                         | 수집할 트레이스의 백분율을 정의하려면 `0-100` 값을 설정합니다.                                                                                                                           |
| `withTracingHeadersTypes(Set<TracingHeaderType>)` | Tracer를 통해 주입될 수 있는 트레이스 헤더 스타일을 설정합니다.                                                                                                                           |
| `setTraceRateLimit(<INT>)`                        | 트레이스 속도 제한을 설정합니다. 이는 허용되는 초당 최대 트레이스 수입니다.                                                                                            |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/glossary/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /ko/glossary/#span
[4]: /ko/account_management/api-app-keys/#client-tokens
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/

[7]: /ko/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file