---
description: RUM, Logs 및 트레이스 모바일 SDK의 주요 버전 간 업그레이드 시 호환성을 깨뜨리는 변경 사항과 새로운 기능에 대한
  마이그레이션 가이드입니다.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: 설명서
  text: Datadog 모바일 SDK에 대한 지원 중단 정책
title: RUM 모바일 SDK 업그레이드
---
## 개요 {#overview}

이 가이드에 따라 모바일 RUM, Logs 및 Trace SDK의 주요 버전 간 마이그레이션을 수행하세요. 각 SDK의 기능 및 역량에 대한 자세한 내용은 해당 SDK 문서를 참조하세요.


**가장 일반적인 마이그레이션**:
- [**v2에서 v3로**](#from-v2-to-v3): Open Tracing 제거 및 API 업데이트에 중점
- [**v1에서 v2로**](#from-v1-to-v2): 모듈식 설계를 위한 주요 아키텍처 변경

## v2에서 v3로 {#from-v2-to-v3}
{{< tabs >}}
{{% tab "Android" %}}

버전 2에서 버전 3으로의 전환은 레거시 Open Tracing 프로젝트에 대한 지원을 제거하고 SDK의 안정성과 일관성을 개선하는 데 중점을 둡니다.

{{% /tab %}}

{{% tab "iOS" %}}

v2에서 v3로의 마이그레이션은 모듈 간소화, 기본값 정교화, 제품 기능 전반의 신뢰성 향상에 중점을 둡니다.

모든 SDK 제품(RUM, Trace, Logs, Session Replay 등)은 모듈식으로 유지되며 별도의 라이브러리로 분리되어 있습니다. 주요 변경 사항은 `DatadogObjc` 모듈이 제거되고 해당 내용이 각 제품 모듈에 통합되었다는 점입니다.

{{% /tab %}}

{{% tab "React Native" %}}

v2에서 v3로의 마이그레이션은 구성을 v3 모듈식 SDK 동작에 맞추고 `CoreConfiguration`, `RumConfiguration`, `LogsConfiguration` 및 `TraceConfiguration` 전반에 걸쳐 구성 소유권을 통합하는 데 중점을 둡니다.

전체 변경 사항 목록은 공식 React Native 리포지토리의 [MIGRATION.md 가이드][1]를 참조하세요.

<div class="alert alert-warning">
<strong>중요:</strong> v2.x(SDK 초기화 시 항상 모든 기능 모듈을 활성화함)와 달리 v3는 명시적으로 구성을 전달하지 않는 한 기능 모듈을 <strong>초기화하거나 활성화하지</strong> 않습니다.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}
{{< /tabs >}}

### 모듈 {#modules}
{{< tabs >}}
{{% tab "Android" %}}

<div class="alert alert-danger">
Datadog은 Google의 <a href="https://developer.android.com/jetpack/androidx/versions#version-table">AndroidX 라이브러리 버전 정책</a>을 다음 <code>AndroidX</code> 라이브러리에 적용하므로, SDK v3에서 지원하는 최소 Android API 레벨은 <code>23</code>.
</div>

**요구 사항**:
- Kotlin 1.9가 필요합니다
- `Open Tracing` 종속성이 더 이상 사용되지 않아 제거되었습니다.


{{% /tab %}}

{{% tab "iOS" %}}

v3에서도 라이브러리는 계속 모듈화됩니다. 다음 라이브러리를 채택하세요.

- `DatadogCore`
- `DatadogCrashReporting`
- `DatadogLogs`
- `DatadogRUM`
- `DatadogSessionReplay`
- `DatadogTrace`
- `DatadogWebViewTracking`

<details>
  <summary>SPM(권장)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "3.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogCrashReporting'
  pod 'DatadogLogs'
  pod 'DatadogRUM'
  pod 'DatadogSessionReplay'
  pod 'DatadogTrace'
  pod 'DatadogWebViewTracking'
  ```
</details>

<details>
  <summary>Carthage</summary>

`Cartfile`은 동일하게 유지됩니다.
  ```
  github "DataDog/dd-sdk-ios"
  ```

Xcode에서 다음 프레임워크를 **반드시** 연결해야 합니다.
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

그런 다음 사용하려는 모듈을 선택할 수 있습니다.
  ```
  DatadogCrashReporting.xcframework
  DatadogLogs.xcframework
  DatadogRUM.xcframework
  DatadogSessionReplay.xcframework
  DatadogTrace.xcframework
  DatadogWebViewTracking.xcframework
  ```
</details>

{{% /tab %}}

{{% tab "React Native" %}}

권장 업그레이드 단계 및 필요한 종속성 업데이트는 공식 React Native 리포지토리의 [MIGRATION.md 가이드][1]를 참조하세요.

<div class="alert alert-warning">
<strong>중요:</strong> v3에서는 초기화 중에 구성(예: RUM/Logs/Trace)을 전달해야만 기능 모듈이 활성화됩니다. 기능 구성을 생략하면 해당 기능은 초기화되거나 활성화되지 않습니다.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

### 필수 변경 사항 및 API 업데이트 {#required-changes-and-api-updates}
{{< tabs >}}
{{% tab "Android" %}}

### 코어 {#core}

<div class="alert alert-info">
<strong>작업 필요:</strong> SDK v3에서는 사용자 정보 ID가 필수 항목이 되며, <code>null</code> 값을 더 이상 제공할 수 없습니다.
</div>

API 변경 사항:

| `2.x`                                                         | `3.0`                                                              |
|---------------------------------------------------------------|--------------------------------------------------------------------|
| `Datadog.setUserInfo(null, "Jane Smith", "jane@example.com")` | `Datadog.setUserInfo("user123", "Jane Smith", "jane@example.com")` |

### RUM {#rum}

RUM 모듈을 약간 개선했습니다. 코드에 큰 변경 사항은 필요하지 않지만, 중복된 파라미터를 리팩터링할 수 있는지 확인하는 것이 좋습니다.

`useCustomEndpoint` 메서드에 제공된 URL은 전체 엔드포인트 URL이어야 하며
(`https://example.com/rum/upload`) 호스트 이름만 제공해서는 안 됩니다.

```kotlin
Rum.enable(
  RumConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/rum/upload")
      .build()
)
```

API 변경 사항:

| `2.x`                                                                               | `3.0`                                                                                |
|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `DatadogRumMonitor.startResource(String, String, String,Map<String, Any?>)`         | | 대신 `RumHttpMethod`를 `method` 파라미터로 받는 `startResource` 메서드를 사용하세요.
| `com.datadog.android.rum.GlobalRum`                                                 | `GlobalRum` 객체의 이름이 `com.datadog.android.rum.GlobalRumMonitor`         |로 변경되었습니다.
| `com.datadog.android.rum.RumMonitor.addAction()`                                    | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.RumMonitor.startAction()`                                  | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.RumMonitor.stopResource()`                                 | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.RumMonitor.addError()`                                     | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.RumMonitor.addErrorWithStacktrace()`                       | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | 파라미터 `attributes: Map<String, Any?>`은 선택 사항입니다.                                |

### 로그 {#logs}

Logs 제품은 더 이상 치명적인 오류를 보고하지 않습니다. 충돌에 대한 Error Tracking을 활성화하려면 RUM과 함께 충돌 보고를 활성화해야 합니다.

`useCustomEndpoint` 메서드에 제공된 URL은 전체 엔드포인트 URL이어야 하며
(`https://example.com/logs/upload`) 호스트 이름만 제공해서는 안 됩니다.

```kotlin
Logs.enable(
  LogsConfiguration.Builder()
      .useCustomEndpoint("https://example.com/logs/upload")
      .build()
)
```

### 트레이스 {#trace}

`useCustomEndpoint` 메서드에 제공된 URL은 전체 엔드포인트 URL이어야 하며
(예: `https://example.com/trace/upload`) 호스트 이름만 제공해서는 안 됩니다.

```kotlin
Trace.enable(
  TraceConfiguration.Builder()
      .useCustomEndpoint(`https://example.com/trace/upload`)
      .build()
)
```

[`Open Tracing`](https://opentracing.io/) 프로젝트는 보관됨으로 표시되었으며 더 이상 지원되지 않습니다. `Open Tracing`에 대한 종속성이 SDK v3에서 제거되었습니다.

Datadog SDK는 이미 [`Open Telemetry`](https://opentelemetry.io/)를 지원하며, 이는 트레이싱 기능 API를 사용하는 권장 방법입니다.

**참고**: `Open Telemetry` 사양 라이브러리는 `minSdk` < 26인 프로젝트에서 desugaring을 [활성화해야](https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements) 합니다.

#### `Open Tracing`에서 `Open Telemetry`로 트레이싱 마이그레이션(권장) {#migrating-tracing-from-open-tracing-to-open-telemetry-recommended}

1. `build.gradle.kts`에 `Open Telemetry` 종속성 추가:

```kotlin
implementation(project("com.datadoghq:dd-sdk-android-trace-otel:x.x.x"))
```

2. `Open Tracing` 구성을 다음 구성으로 교체하세요.

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

`Open Telemetry` 구성:

```kotlin
GlobalOpenTelemetry.set(
  DatadogOpenTelemetry(BuildConfig.APPLICATION_ID)
)
```

수동(사용자 지정) 트레이싱을 위해 트레이서 객체에 액세스하려면 `io.opentracing.util.GlobalTracer.get()` 대신 `io.opentelemetry.api.GlobalOpenTelemetry.get()`을 사용하세요.
예:

```kotlin
val tracer: Tracer = GlobalOpenTelemetry
  .get()
  .getTracer("SampleApplicationTracer")

val span = tracer
  .spanBuilder("Executing operation")
  .startSpan()

// Code that should be instrumented

span.end()
```

자세한 내용은 공식 `Open Telemetry` [문서](https://opentelemetry.io/docs/)를 참조하세요.

#### `Open Tracing`에서 `DatadogTracing`으로 트레이싱 마이그레이션(전환 기간) {#migrating-tracing-from-open-tracing-to-datadogtracing-transition-period}

<div class="alert alert-danger">이 옵션은 호환성을 유지하고 Open Tracing에서 OpenTelemetry로의 전환을 간소화하기 위해 추가되었지만, 향후 메이저 릴리스에서는 제공되지 않을 수 있습니다. Datadog은 트레이싱 작업의 표준으로 OpenTelemetry를 사용할 것을 권장합니다. 하지만 어떤 이유로든 프로젝트에서 desugaring을 활성화할 수 없는 경우 이 방법을 사용할 수 있습니다.</div>
`Open Tracing` 구성을 다음 구성으로 교체하세요.

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

`DatadogTracing` 구성:

```kotlin
GlobalDatadogTracer.registerIfAbsent(
  DatadogTracing.newTracerBuilder()
    .build()
)
```

수동(사용자 지정) 트레이싱의 경우 `io.opentracing.util.GlobalTracer.get()` 대신 `com.datadog.android.trace.GlobalDatadogTracer.get()`을 사용하여 트레이서 객체에 액세스하세요.
예:

```kotlin
val tracer = GlobalDatadogTracer.get()

val span = tracer
  .buildSpan("Executing operation")
  .start()

// Code that should be instrumented

span.finish()
```
자세한 내용은 Datadog [문서](https://docs.datadoghq.com/ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/android?tab=kotlin)를 참조하세요.

API 변경 사항:

| `2.x`                                     | `3.0` `Open Telemetry`                     | `3.0` `Datadog API`                                     |
|-------------------------------------------|--------------------------------------------|---------------------------------------------------------|
| `io.opentracing.util.GlobalTracer`        | `io.opentelemetry.api.GlobalOpenTelemetry` | `com.datadog.android.trace.GlobalDatadogTracer`         |
| `com.datadog.android.trace.AndroidTracer` | `io.opentelemetry.api.trace.Tracer`        | `com.datadog.android.trace.api.tracer.DatadogTracer`    |
| `io.opentracing.Span`                     | `io.opentelemetry.api.trace.Span`          | `com.datadog.android.trace.api.span.DatadogSpan`        |
| `io.opentracing.Scope`                    | `io.opentelemetry.context.Scope`           | `com.datadog.android.trace.api.scope.DatadogScope`      |
| `io.opentracing.SpanContext`              | `io.opentelemetry.api.trace.SpanContext`   | `com.datadog.android.trace.api.span.DatadogSpanContext` |

교체 힌트:

| `2.x`                                         | `3.0` `Open Telemetry`                                | `3.0` `Datadog API`                               |
|-----------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| `AndroidTracer.Builder().build()`             |                                                       | `DatadogTracing.newTracerBuilder().build()`       |
| `AndroidTracer.setPartialFlushThreshold(Int)` | `OtelTracerProvider.setPartialFlushThreshold()`       | `DatadogTracerBuilder.withPartialFlushMinSpans()` |
| `io.opentracing.SpanContext.toTraceId()`      | `io.opentelemetry.api.trace.SpanContext.getTraceId()` | `DatadogSpanContext.traceId.toString()`           |
| `io.opentracing.Span.setError()`              | `io.opentelemetry.api.trace.recordException()`        | `DatadogSpan.addThrowable()`                      |

### OkHttp 계측{#okhttp-instrumentation}

OkHttp 계측(`com.datadoghq:dd-sdk-android-okhttp:x.x.x`)은 desugaring 지원이 필요하지 않습니다. 하지만 몇 가지 마이그레이션 작업이 필요할 수 있습니다.

API 변경 사항:

| `2.x`                                                                                                                                  | `3.0`                                       |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `TracingInterceptor(String, List<String>, TracedRequestListener,Sampler<Span>)`                                                        | `TracingInterceptor.Builder()`를 대신 사용하세요. |
| `TracingInterceptor(String?,Map<String, Set<TracingHeaderType>>, TracedRequestListener, Sampler<Span>)`                                | `TracingInterceptor.Builder()`를 대신 사용하세요. |
| `TracingInterceptor(String?,TracedRequestListener,Sampler<Span>)`                                                                      | `TracingInterceptor.Builder()`를 대신 사용하세요. |
| `DatadogInterceptor(String?, Map<String, Set<TracingHeaderType>>,TracedRequestListener, RumResourceAttributesProvider, Sampler<Span>)` | `DatadogInterceptor.Builder()`를 대신 사용하세요. |
| `DatadogInterceptor(String?,List<String>,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>)`                           | `DatadogInterceptor.Builder()`를 대신 사용하세요. |
| `DatadogInterceptor(String?,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>) `                                       | `DatadogInterceptor.Builder()`를 대신 사용하세요. |


### Session Replay {#session-replay}

`useCustomEndpoint` 메서드에 제공된 URL은 전체 엔드포인트 URL이어야 하며
(예: `https://example.com/session_replay/upload`) 호스트 이름만 제공해서는 안 됩니다.

```kotlin
SessionReplay.enable(
  SessionReplayConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/session_replay/upload")
      .build()
)
```

{{% /tab %}}
{{% tab "iOS" %}}

SDK는 앱 수명 주기에서 가능한 한 빨리, 구체적으로 `AppDelegate`의 `application(_:didFinishLaunchingWithOptions:)` 콜백에서 초기화되어야 합니다. 이렇게 하면 애플리케이션 시작 시간을 포함한 모든 메트릭을 정확하게 측정할 수 있습니다. SwiftUI로 빌드된 앱의 경우, `@UIApplicationDelegateAdaptor`를 사용하여 `AppDelegate`에 액세스하세요.

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

**참고**: SDK를 다른 곳(예: 뷰 로딩 중 나중에)에서 초기화하면 특히 앱 시작 성능과 관련하여 텔레메트리가 부정확하거나 누락될 수 있습니다.

<div class="alert alert-info">
<strong>작업 필요:</strong> 사용자 정보를 설정하는 API에는 <code>id</code> 2.x에서는 선택 사항이었던 파라미터가 이제 필수입니다.
</div>

| `2.x`                               | `3.0`                              |
|-------------------------------------|------------------------------------|
| `Datadog.setUserInfo(id: nil, name: "Jane Smith", email: "jane@example.com")` | `Datadog.setUserInfo(id: "user123", name: "Jane Smith", email: "jane@example.com")` |

### RUM {#rum-1}

RUM 뷰 수준 속성은 리소스, 사용자 액션, 오류 및 긴 태스크를 포함한 모든 관련 하위 이벤트에 자동으로 전파됩니다. 이를 통해 이벤트 전반에서 일관된 메타데이터가 보장되므로 Datadog 대시보드에서 데이터를 더 쉽게 필터링하고 상관관계를 분석할 수 있습니다.

뷰 수준 속성을 보다 효과적으로 관리할 수 있도록 새로운 API가 추가되었습니다.
- `Monitor.addViewAttribute(forKey:value:)`
- `Monitor.addViewAttributes(_:)`
- `Monitor.removeViewAttribute(forKey:)`
- `Monitor.removeViewAttributes(forKeys:)`

기타 주요 변경 사항:
- 모든 Objective-C RUM API가 `DatadogRUM`에 포함되어 있습니다. 별도의 `DatadogObjc` 모듈은 더 이상 사용할 수 없습니다.
- 앱 중단(App Hangs) 및 Watchdog 종료는 더 이상 앱 확장 프로그램이나 위젯에서 보고되지 않습니다.
- 메모리 경고를 RUM 오류로 보고하기 위해 `RUM.Configuration`에 새로운 속성 `trackMemoryWarnings`가 추가되었습니다.

API 변경 사항:

|`2.x`|`3.0`|
|---|---|
|-|`RUM.Configuration.trackMemoryWarnings`|
|`RUMView(path:attributes:)`|`RUMView(name:attributes:isUntrackedModal:)`|
|-|`Monitor.addViewAttribute(forKey:value:)`|
|-|`Monitor.addViewAttributes(:)`|
|-|`Monitor.removeViewAttribute(forKey:)`|
|-|`Monitor.removeViewAttributes(forKeys:)`|

### Logs {#logs-1}

Logs 제품은 더 이상 치명적인 오류를 보고하지 않습니다. 충돌에 대한 Error Tracking을 활성화하려면 RUM과 함께 충돌 보고를 활성화해야 합니다.

또한 모든 Objective-C Logs API가 `DatadogLogs`에 포함되어 있습니다. 별도의 `DatadogObjc` 모듈은 더 이상 사용할 수 없습니다.

### Trace {#trace-1}

이제 RUM과 함께 사용할 때 트레이스 샘플링이 결정론적으로 작동합니다. RUM `session.id`를 사용하여 일관된 샘플링을 보장합니다.

또한:
- `Trace.Configuration.URLSessionTracking.FirstPartyHostsTracing` 구성은 기본적으로 모든 요청에 대한 샘플링을 설정하며, 트레이스 컨텍스트는 샘플링된 요청에만 주입됩니다.
- 모든 Objective-C Trace API가 `DatadogTrace`에 포함되어 있습니다. 별도의 `DatadogObjc` 모듈은 더 이상 사용할 수 없습니다.

**참고**: `RUM.Configuration.URLSessionTracking.FirstPartyHostsTracing`에도 유사한 구성이 존재합니다.

### Session Replay {#session-replay-1}

개인정보 보호 설정이 더 세분화되었습니다. 이전 `defaultPrivacyLevel` 파라미터가 다음으로 대체되었습니다.
- `textAndInputPrivacyLevel`
- `imagePrivacyLevel`
- `touchPrivacyLevel`

[개인정보 보호 수준][1]에 대해 자세히 알아보세요.

API 변경 사항:

|`2.x`|`3.0`|
|---|---|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|

### URLSession 계측 {#urlsession-instrumentation}

URLSession 계측을 활성화하려면 각 제품에 데이터를 보고하도록 RUM 및/또는 트레이스도 활성화하세요.

레거시 델리게이트 유형이 통합 계측 API로 대체되었습니다.

|`2.x`|`3.0`|
|---|---|
|`DatadogURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDNSURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|

[1]: /ko/session_replay/privacy_options?platform=ios

{{% /tab %}}

{{% tab "React Native" %}}

공식 React Native 리포지토리의 [MIGRATION.md 가이드][1]를 참조하세요.

<div class="alert alert-warning">
<strong>중요:</strong> v2.x(SDK 초기화 시 항상 모든 기능 모듈을 활성화함)와 달리 v3는 명시적으로 구성을 전달하지 않는 한 기능 모듈을 <strong>초기화하거나 활성화하지</strong> 않습니다.
</div>

### 구성 변경 사항 {#configuration-changes}

일부 구성 속성이 이동, 이름 변경, 제거 또는 분할되었습니다.

| 속성 | 새 위치 | 변경 사항 |
| :--- | :--- | :--- |
| `sampleRate` | *제거됨* | 지원이 중단된 속성이 제거되었습니다. |
| `sessionSamplingRate` | `RumConfiguration` | 이동되고 이름이 `sessionSampleRate`로 변경됨. |
| `resourceTracingSamplingRate` | `RumConfiguration` | 이동되고 이름이 `resourceTraceSampleRate`로 변경됨. |
| `proxyConfig` | `CoreConfiguration` | 이름이 `proxyConfiguration`으로 변경됨. |
| `serviceName` | `CoreConfiguration` | 이름이 `service`로 변경됨. |
| `customEndpoints` | *분할됨* | `RumConfiguration`, `LogsConfiguration` 및 `TraceConfiguration` 내의 `customEndpoint`로 분할됨. |
| *(새 속성)* | `CoreConfiguration` | `attributeEncoders` 추가됨. |
| *(새 속성)* | `RumConfiguration` | `trackMemoryWarnings` 추가됨. |
| `nativeCrashReportEnabled` | `RumConfiguration` | 이동됨. |
| `nativeViewTracking` | `RumConfiguration` | 이동됨. |
| `nativeInteractionTracking` | `RumConfiguration` | 이동됨. |
| `firstPartyHosts` | `RumConfiguration` | `FirstPartyHost[]` 유형 사용이 의무화되고 이동됨. |
| `telemetrySampleRate` | `RumConfiguration` | 이동됨. |
| `nativeLongTaskThresholdMs` | `RumConfiguration` | 이동됨. |
| `longTaskThresholdMs` | `RumConfiguration` | 이동됨. |
| `vitalsUpdateFrequency` | `RumConfiguration` | 이동됨. |
| `trackFrustrations` | `RumConfiguration` | 이동됨. |
| `trackBackgroundEvents` | `RumConfiguration` | 이동됨. |
| `bundleLogsWithRum` | `LogsConfiguration` | 이동됨. |
| `bundleLogsWithTraces` | `LogsConfiguration` | 이동됨. |
| `trackNonFatalAnrs` | `RumConfiguration` | 이동됨. |
| `appHangThreshold` | `RumConfiguration` | 이동됨. |
| `initialResourceThreshold` | `RumConfiguration` | 이동됨. |
| `trackWatchdogTerminations` | `RumConfiguration` | 이동됨. |
| `actionNameAttribute` | `RumConfiguration` | 이동됨. |
| `logEventMapper` | `LogsConfiguration` | 이동됨. |
| `errorEventMapper` | `RumConfiguration` | 이동됨. |
| `resourceEventMapper` | `RumConfiguration` | 이동됨. |
| `actionEventMapper` | `RumConfiguration` | 이동됨. |
| `useAccessibilityLabel` | `RumConfiguration` | 이동됨. |
| `trackInteractions` | `RumConfiguration` | 이동됨. |
| `trackResources` | `RumConfiguration` | 이동됨. |
| `trackErrors` | `RumConfiguration` | 이동됨. |

### 이름이 변경된 구조체 {#renamed-structures}

| `2.x` | `3.x` |
|---|---|
| `DdSdkConfiguration` | `CoreConfiguration` |

### API 업데이트 {#api-updates}

구성 소유권 변경(코어 구성과 기능 구성) 외에도 v3 모듈식 설계에 맞추기 위해 여러 공개 유형 및 API의 이름이 변경되거나 위치가 변경되었습니다. 공식 목록 및 코드 예시는 [MIGRATION.md 가이드][1]를 참조하세요.

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

## v1에서 v2로 {#from-v1-to-v2}
{{< tabs >}}
{{% tab "Android" %}}

v1에서 v2로의 마이그레이션은 모놀리스 SDK에서 모듈식 아키텍처로의 전환을 의미합니다. RUM, Trace, Logs, Session Replay 등은 각각 개별 모듈을 가지고 있어 필요한 것만 애플리케이션에 통합할 수 있습니다.

SDK v2는 iOS SDK, Android SDK 및 기타 Datadog 제품 간의 통합된 API 레이아웃과 명명 규칙을 제공합니다.

SDK v2는 Android 및 iOS 애플리케이션에서 [Mobile Session Replay][2] 사용을 지원합니다.

[2]: /ko/session_replay/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

v1에서 v2로의 마이그레이션은 모놀리스 SDK에서 모듈식 아키텍처로의 전환을 의미합니다. RUM, Trace, Logs, Session Replay 등은 각각 개별 모듈을 가지고 있어 필요한 것만 애플리케이션에 통합할 수 있습니다.

SDK v2는 iOS SDK, Android SDK 및 기타 Datadog 제품 간의 통합된 API 레이아웃과 명명 규칙을 제공합니다.

SDK v2는 Android 및 iOS 애플리케이션에서 [Mobile Session Replay][3] 사용을 지원합니다.

[3]: /ko/session_replay/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

v1에서 v2로 마이그레이션하면 성능이 향상됩니다.

{{% /tab %}}
{{% tab "Flutter" %}}

v1에서 v2로 마이그레이션하면 성능이 향상되고 v2 Native SDK에서 제공하는 추가 기능을 사용할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### 모듈 {#modules-1}
{{< tabs >}}
{{% tab "Android" %}}

v2에서는 아티팩트가 모듈화되었습니다. 다음 아티팩트를 채택하세요.

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView 추적: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp 계측: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**참고**: NDK 크래시 리포팅 및 WebView 추적을 사용하는 경우, RUM 및 Logs 아티팩트를 추가하여 각각 RUM 및 Logs에 이벤트를 보고해야 합니다.

`com.datadoghq:dd-sdk-android` 아티팩트는 더 이상 존재하지 않으므로 이에 대한 참조를 Gradle 빌드 스크립트에서 제거해야 합니다.

**참고**: 다른 모든 아티팩트의 Maven 좌표는 동일하게 유지됩니다.

<div class="alert alert-danger">v2는 Android API 19(KitKat)를 지원하지 않습니다. 지원되는 최소 SDK는 이제 API 21(Lollipop)입니다. Kotlin 1.7이 필요합니다. SDK 자체는 Kotlin 1.8로 컴파일되므로 Kotlin 1.6 이하의 컴파일러는 SDK 클래스 메타데이터를 읽을 수 없습니다.</div>

다음과 같은 오류가 발생하는 경우:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

빌드 스크립트에 다음 규칙을 추가하세요(자세한 내용은 관련 [Stack Overflow 이슈][4] 참조).

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

SDK 설정 방법에 대한 예시는 [Android 샘플 애플리케이션][5]을 참조하세요.

[4]: https://stackoverflow.com/a/75298544
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

라이브러리는 v2에서 모듈화되었습니다. 다음 라이브러리를 채택하세요.

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

기존 `DatadogCrashReporting` 및 `DatadogObjc`에 추가로 제공됩니다.

<details>
  <summary>SPM(권장)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

`Cartfile`은 동일하게 유지됩니다.
  ```
  github "DataDog/dd-sdk-ios"
  ```

Xcode에서 다음 프레임워크를 **반드시** 연결해야 합니다.
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

그런 다음 사용하려는 모듈을 선택할 수 있습니다.
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**참고**: Crash Reporting 및 WebView Tracking을 사용하는 경우, RUM 및 Logs 모듈을 추가하여 각각 RUM 및 Logs에 이벤트를 보고해야 합니다.

{{% /tab %}}

{{% tab "React Native" %}}

package.json에서 `@datadog/mobile-react-native`를 업데이트하세요.

```json
"@datadog/mobile-react-native": "2.0.0"
```

iOS 포드를 업데이트하세요.

```bash
(cd ios && bundle exec pod update)
```

React Native 버전이 `0.67`을 초과하는 경우 Java 17 버전을 사용하세요. React Native 버전이 `0.67` 이하인 경우 Java 11 버전을 사용하세요. Java 버전을 확인하려면 터미널에서 다음을 실행하세요.

```bash
java --version
```

### React Native < 0.73의 경우{#for-react-native-073}

`android/build.gradle` 파일에서 `kotlinVersion`을 지정하여 Kotlin 종속성 간의 충돌을 방지하세요.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### React Native < 0.68의 경우{#for-react-native-068}

`android/build.gradle` 파일에서 `kotlinVersion`을 지정하여 Kotlin 종속성 간의 충돌을 방지하세요.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

`android/build.gradle`에서 `com.android.tools.build:gradle` 버전이 `5.0` 미만인 경우 `android/gradle.properties` 파일에 다음을 추가하세요.

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### 문제 해결 {#troubleshooting}

#### `Unable to make field private final java.lang.String java.io.File.path accessible` {#android-build-fails-with-unable-to-make-field-private-final-javalangstring-javaiofilepath-accessible}로 인한 Android 빌드 실패

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

사용 중인 Java 17은 React Native 버전과 호환되지 않습니다. 이 문제를 해결하려면 Java 11로 전환하세요.

#### `Unsupported class file major version 61` {#android-build-fails-with-unsupported-class-file-major-version-61}로 인한 Android 빌드 실패

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Android Gradle Plugin 버전이 `5.0` 미만입니다. 문제를 해결하려면 `android/gradle.properties` 파일에 다음을 추가하세요.

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### `Duplicate class kotlin.collections.jdk8.*` {#android-build-fails-with-duplicate-class-kotlincollectionsjdk8}로 인한 Android 빌드 실패

다음과 같은 오류가 발생하여 Android 빌드가 실패하는 경우

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Kotlin 종속성 간의 충돌을 방지하려면 프로젝트의 Kotlin 버전을 설정해야 합니다. `android/build.gradle` 파일에서 `kotlinVersion`을 지정하세요.

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

또는 `android/app/build.gradle` 파일의 빌드 스크립트에 다음 규칙을 추가할 수 있습니다.

```groovy
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

{{% /tab %}}
{{% tab "Flutter" %}}

pubspec.yaml에서 `datadog_flutter_plugin`을 업데이트하세요.

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## 문제 해결 {#troubleshooting-1}

### 중복 인터페이스(iOS) {#duplicate-interface-ios}

`datadog_flutter_plugin` v2.0으로 업그레이드한 후 iOS를 빌드할 때 이 오류가 발생하면 다음을 수행하세요.

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

`flutter clean && flutter pub get`을 수행하고 다시 빌드해 보세요. 일반적으로 이 방법으로 문제가 해결됩니다.

### 중복 클래스(Android) {#duplicate-classes-android}

`datadog_flutter_plugin` v2.0으로 업그레이드한 후 Android를 빌드할 때 이 오류가 발생하면 다음을 수행하세요.

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

`build.gradle` 파일에서 Kotlin 버전을 최소 1.8로 업데이트했는지 확인하세요.

{{% /tab %}}

{{< /tabs >}}

### SDK 초기화 {#sdk-initialization}
{{< tabs >}}
{{% tab "Android" %}}
다양한 제품이 독립적인 모듈로 분리됨에 따라 SDK 구성이 모듈별로 정리되었습니다.

`com.datadog.android.core.configuration.Configuration.Builder` 클래스에는 다음과 같은 변경 사항이 있습니다.

* 클라이언트 토큰, 환경 이름, 변형 이름(기본값은 빈 문자열) 및 서비스 이름(기본값은 매니페스트에서 가져온 애플리케이션 ID)을 생성자에 제공해야 합니다.
* `com.datadog.android.core.configuration.Credentials` 클래스가 제거되었습니다.
* `logsEnabled`, `tracesEnabled` 및 `rumEnabled`는 개별 제품 구성(아래 참조)을 위해 생성자에서 제거되었습니다.
* `crashReportsEnabled` 생성자 인수가 제거되었습니다. `Configuration.Builder.setCrashReportsEnabled` 메서드를 사용하여 JVM 충돌 보고를 활성화하거나 비활성화할 수 있습니다. 기본적으로 JVM 충돌 보고 기능이 활성화되어 있습니다.
* RUM, Logs 및 Trace 제품 구성 메서드는 개별 제품 구성(아래 참조)을 위해 `Configuration.Builder`에서 제거되었습니다.

`Datadog.initialize` 메서드에서 `Credentials` 클래스가 인수 목록에서 제거되었습니다.

`com.datadog.android.plugin` 패키지와 관련된 모든 클래스/메서드가 제거되었습니다.

### Logs {#logs-2}

Logs 제품과 관련된 모든 클래스는 `com.datadog.android.log` 패키지에만 포함되어 있습니다.

Logs 제품을 사용하려면 다음 아티팩트를 가져오세요.

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

다음 스니펫을 사용하여 Logs 제품을 활성화할 수 있습니다.

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|이 메서드는 제거되었습니다. Datadog으로 로그 전송을 비활성화하려면 대신 `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)`를 사용하세요.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace {#trace-2}

Trace 제품과 관련된 모든 클래스는 `com.datadog.android.trace` 패키지에만 포함되어 있습니다(즉, 이전에 `com.datadog.android.tracing`에 있던 모든 클래스가 이동했습니다).

Trace 제품을 사용하려면 다음 아티팩트를 가져오세요.

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

다음 스니펫을 사용하여 Trace 제품을 활성화할 수 있습니다.

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM {#rum-2}

RUM 제품과 관련된 모든 클래스는 `com.datadog.android.rum` 패키지에만 포함되어 있습니다.

RUM 제품을 사용하려면 다음 아티팩트를 가져오세요.

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

다음 스니펫을 사용하여 RUM 제품을 활성화할 수 있습니다.

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|이 클래스는 제거되었습니다. RUM 모니터는 `Rum.enable` 호출 중에 생성되고 등록됩니다.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|이 메서드는 제거되었습니다. RUM 모니터는 `Rum.enable` 호출 중에 생성되고 등록됩니다.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK 충돌 보고 {#ndk-crash-reporting}

아티팩트 이름은 이전과 동일하게 유지됩니다. `com.datadoghq:dd-sdk-android-ndk:x.x.x`

다음 스니펫을 사용하여 NDK 충돌 보고를 활성화할 수 있습니다.

```kotlin
NdkCrashReports.enable()
```

이 구성은 `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` 호출을 대체합니다.

**참고**: RUM 및 Logs에서 NDK 충돌 보고서를 수신하려면 각각 RUM 및 Logs 제품이 활성화되어 있어야 합니다.

### WebView Tracking {#webview-tracking}

아티팩트 이름은 이전과 동일하게 유지됩니다. `com.datadoghq:dd-sdk-android-webview:x.x.x`

다음 스니펫을 사용하여 WebView Tracking을 활성화할 수 있습니다.

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**참고**: RUM 및 Logs에서 WebView로부터 오는 이벤트를 수신하려면 각각 RUM 및 Logs 제품이 활성화되어 있어야 합니다.

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|이 메서드는 `internal` 클래스가 되었습니다. 대신 `WebViewTracking`을 사용하세요.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|이 클래스는 제거되었습니다. 대신 `WebViewTracking`을 사용하세요.|
|`com.datadog.android.rum.webview.RumWebViewClient`|이 클래스는 제거되었습니다. 대신 `WebViewTracking`을 사용하세요.|

### OkHttp Tracking {#okhttp-tracking}

OkHttp Tracking을 사용하려면 다음 아티팩트를 가져오세요.

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp 계측은 OkHttp 클라이언트 이후의 Datadog SDK 초기화를 지원하므로 Datadog SDK 이전에 `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor`, `com.datadog.android.okhttp.trace.TracingInterceptor`를 생성할 수 있습니다. OkHttp 계측은 Datadog SDK가 초기화되면 Datadog으로 이벤트 보고를 시작합니다.

`com.datadog.android.okhttp.DatadogInterceptor`와 `com.datadog.android.okhttp.trace.TracingInterceptor` 모두 원격 구성 시스템과의 통합을 통해 샘플링을 동적으로 제어할 수 있게 합니다.

샘플링을 동적으로 조정하려면 `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` 생성자에서 `com.datadog.android.core.sampling.Sampler` 인터페이스의 자체 구현을 제공하세요. 각 요청마다 이를 쿼리하여 샘플링 여부를 결정합니다.

### `dd-sdk-android-ktx` 모듈 제거 {#dd-sdk-android-ktx-module-removal}

사용된 Datadog SDK의 세분성을 개선하기 위해 `dd-sdk-android-ktx` 모듈이 제거되었습니다. 코드는 RUM 및 Trace 기능 모두에 확장 메서드를 제공하기 위해 다른 모듈에 분산되어 있습니다.

| `1.x`                                                                                     | '2.0'                                                                                       | 모듈 이름                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### Session Replay {#session-replay-2}

Mobile Session Replay 설정에 대한 지침은 [Mobile Session Replay 설정 및 구성][6]을 참조하세요.

[6]: /ko/session_replay/setup_and_configuration/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

다양한 제품이 독립적인 모듈로 분리됨에 따라 SDK 구성이 모듈별로 정리되었습니다.

> SDK는 제품을 활성화하기 전에 초기화되어야 합니다.

SDK 초기화의 빌더 패턴은 제거되고 구조체 정의로 대체되었습니다. 다음 예시는 `1.x` 초기화가 `2.0`에서 어떻게 바뀌는지 보여줍니다.

**V1 초기화**

```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**V2 초기화**

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### Logs {#logs-3}

Logs와 관련된 모든 클래스는 `DatadogLogs` 모듈에만 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

그런 다음 로거 인스턴스를 생성할 수 있습니다.

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### Trace {#trace-3}

Trace와 관련된 모든 클래스는 `DatadogTrace` 모듈에만 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

그런 다음 공유 Tracer 인스턴스에 액세스할 수 있습니다.

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM {#rum-3}

RUM과 관련된 모든 클래스는 `DatadogRUM` 모듈에만 포함되어 있습니다. 먼저 제품을 활성화해야 합니다.

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

그런 다음 공유 RUM 모니터 인스턴스에 액세스할 수 있습니다.

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

API 변경 사항:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### Crash Reporting {#crash-reporting}

Crash Reporting을 활성화하려면 각 제품에 데이터를 보고하도록 RUM 및 Logs도 활성화하세요.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking {#webview-tracking-1}

WebView Tracking을 활성화하려면 각 제품에 데이터를 보고하도록 RUM 및 Logs도 활성화하세요.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay {#session-replay-3}

Mobile Session Replay 설정에 대한 지침은 [Mobile Session Replay 설정 및 구성][7]을 참조하세요.

[7]: /ko/session_replay/setup_and_configuration/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

SDK 초기화에는 변경이 필요하지 않습니다.

{{% /tab %}}

{{% tab "Flutter" %}}

## SDK 구성 변경 사항 {#sdk-configuration-changes}

Datadog의 네이티브 SDK에서 모듈성을 지원하기 위해 일부 구성 속성이 이동되거나 이름이 변경되었습니다.

다음 구조체의 이름이 변경되었습니다.

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

다음 속성이 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| 제거됨 | `Datadog.initialize` | |의 일부
| `DdSdkConfiguration.customEndpoint` | 제거됨 | 이제 기능별로 구성됨 | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

또한 다음 API가 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `Verbosity` | 제거됨 | `CoreLoggerLevel` 또는 `LogLevel` | 참조
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | 유형 변경됨 |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | 유형 변경됨
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | `trackingConsent` 파라미터 추가됨 |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | `trackingConsent` 파라미터 추가됨 |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | 이동됨 |

## Flutter Web 변경 사항 {#flutter-web-changes}

Flutter Web을 사용하는 클라이언트는 Datadog Browser SDK v5로 업데이트해야 합니다. `index.html`에서 다음 import를 변경하세요.

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**참고**: Datadog은 사이트당 하나의 CDN 번들을 제공합니다. 모든 사이트 URL 목록은 [Browser SDK README](https://github.com/DataDog/browser-sdk/#cdn-bundles)를 참조하세요.

## Logs 제품 변경 사항 {#logs-product-changes}

v1과 마찬가지로, `DatadogConfiguration.loggingConfiguration` 멤버를 설정하여 Datadog Logging을 활성화할 수 있습니다. 하지만 v1과 달리 Datadog은 기본 로거를 생성하지 않습니다. `DatadogSdk.logs`는 이제 로그를 생성하는 데 사용할 수 있는 `DatadogLogging`의 인스턴스입니다. 개발자가 개별 로거를 더 세밀하게 제어할 수 있도록 많은 옵션이 `DatadogLoggerConfiguration`으로 이동되었습니다.

다음 API가 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | 이름 변경됨. 대부분의 멤버는 이제 `DatadogLoggerConfiguration` |에 있음.
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | 제거됨. 대신 `remoteLogThreshold`를 사용하세요. | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## RUM 제품 변경 사항 {#rum-product-changes}

다음 API가 변경되었습니다.

| 1.x | 2.x | 참고 |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | 유형 이름 변경됨 |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | vitals 업데이트를 비활성화하려면 `null`로 설정하세요. |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | 유형 이름 변경됨 |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

또한, 이벤트 매퍼는 더 이상 뷰 이름을 수정할 수 없습니다. 뷰 이름을 변경하려면 대신 사용자 지정 [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html)를 사용하세요.


{{% /tab %}}

{{< /tabs >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}