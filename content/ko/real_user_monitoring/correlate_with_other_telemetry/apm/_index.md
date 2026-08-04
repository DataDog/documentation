---
algolia:
  tags:
  - rum traces
aliases:
- /ko/real_user_monitoring/connect_rum_and_traces
- /ko/real_user_monitoring/platform/connect_rum_and_traces/
description: 프런트 엔드 RUM 데이터를 백엔드 APM 트레이스와 연결하여 애플리케이션 스택 및 사용자 여정 전체에 대한 종합적인 가시성을
  얻으세요.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: 블로그
  text: 단일 페이지 애플리케이션 모니터링 시작
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 제품 간 상호 연계를 사용한 간편한 문제 해결
- link: /tracing/
  tag: 설명서
  text: APM 및 분산 트레이싱
- link: /real_user_monitoring
  tag: 설명서
  text: RUM 및 세션 리플레이
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: 블로그
  text: 세션 리플레이 브라우저 개발 도구를 사용한 문제 해결
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: 블로그
  text: OpenTelemetry 계측 애플리케이션에서 트레이스와 Datadog RUM 이벤트 상호 연계
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: 블로그
  text: 명령 한 개로 Java 앱에 대한 종합적인 가시성 얻기
title: RUM과 트레이스 연결
---
{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM과 트레이스" style="width:100%;">}}

## 개요 {#overview}

APM을 Real User Monitoring과 통합하면 웹 및 모바일 애플리케이션의 요청을 상응하는 백엔드 트레이스와 연결할 수 있습니다. 이 조합을 사용하면 프런트 엔드와 백엔드 데이터 전체를 한 개의 렌즈를 통해 볼 수 있습니다.

RUM의 프런트 엔드 데이터는 물론 트레이스 ID 주입의 백엔드, 인프라, 로그 정보까지 사용하여 스택 모든 위치의 문제를 정확하게 짚어내고 사용자가 어떤 경험을 하고 있는지 파악하세요.

iOS 애플리케이션 트레이스를 Datadog에 전송하려면 [iOS 트레이스 수집][1]을 참조하세요.

## 사용량 {#usage}

### 전제 조건 {#prerequisites}

-   서비스에서 RUM 애플리케이션이 대상으로 지정한 [APM 트레이싱][2]을 설정했어야 합니다.
-   서비스가 HTTP 서버를 사용합니다.
-   HTTP 서버가 [분산 트레이싱을 지원하는 라이브러리](#supported-libraries)를 사용합니다.
-   SDK에 따라 다음이 설정되어 있습니다.
    - **브라우저 SDK**의 경우, RUM 탐색기에서 XMLHttpRequest(XHR) 또는 Fetch 리소스를 `allowedTracingUrls`에 추가했습니다.
    - **모바일 SDK**의 경우, `firstPartyHosts`에 Native 또는 XMLHttpRequest(XHR)를 추가했습니다.
-   `allowedTracingUrls` 또는 `firstPartyHosts`에 대한 요청에 상응하는 트레이스가 있습니다.

### RUM 설정 {#setup-rum}

**참고:** RUM 및 트레이스를 구성하면 RUM에서 APM 유료 데이터를 사용하며, 이 때문에 APM 청구액에 영향이 발생할 수 있습니다.

{{< tabs >}}
{{% tab "브라우저 RUM" %}}

1. [RUM 브라우저 모니터링][1]을 설정합니다.

2. RUM SDK를 초기화합니다. 브라우저 애플리케이션이 호출한 내부, 퍼스트 파티 출처 목록을 사용해 `allowedTracingUrls` 초기화 파라미터를 구성합니다.

   **npm 설치**의 경우:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not specified, defaults to 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

   **CDN 설치**의 경우:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: matches if any substring of the URL matches the provided RegExp. For example, `/^https:\/\/[^\/]+\.my-api-domain\.com/` matches URLs like `https://foo.my-api-domain.com/path`, but not `https://notintended.com/?from=guess.my-api-domain.com`. **Note:** The RegExp is not anchored to the start of the URL unless you use `^`. Be careful, as overly broad patterns can unintentionally match unwanted URLs and cause CORS errors.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

<div class="alert alert-danger">RegExp를 사용하는 경우, 접두사만이 아니라 URL 전체를 하위 문자열로 하여 이를 기준으로 패턴을 테스트합니다. 의도치 않은 일치를 피하려면 RegExp를 `^`로 고정하고 최대한 구체적으로 설정하세요. </div>

3.  _(선택 사항)_`traceSampleRate` 초기화 파라미터를 구성하여 백엔드 트레이스의 정의된 비율을 유지하세요. 이것이 설정되어 있지 않으면 브라우저 요청에서 유입되는 트레이스의 100%가 Datadog으로 전송됩니다. 예를 들어, 백엔드 트레이스의 20%를 유지하려면:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**참고**: `traceSampleRate`는 RUM 세션 샘플링에 영향을 **미치지 않습니다**. 백엔드 트레이스만 샘플링 아웃됩니다.

4. _(선택 사항)_`traceSampleRate`를 설정하는 경우, 백엔드 서비스의 샘플링 결정이 여전히 적용되도록 보장하려면 `traceContextInjection` 초기화 파라미터를 `sampled`로 구성하세요(기본적으로 `sampled`로 설정됨).

    예를 들어 `traceSampleRate`를 브라우저 SDK의 20%로 설정하는 경우:
    - `traceContextInjection`이 `all`로 설정되면, 백엔드 트레이스의 **20%**는 유지되고 백엔드 트레이스의 **80%**는 삭제됩니다.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection이 all로 설정됨" style="width:90%;">}}

    - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the SDK head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection이 sampled로 설정됨" style="width:90%;">}}

<div class="alert alert-info">브라우저 SDK가 초기화된 이후 발생한 요청에는 전체 트레이싱을 사용할 수 있습니다. 초기 HTML 문서 및 조기 브라우저 요청의 전체 트레이싱은 지원되지 않습니다.</div>

[1]: /ko/real_user_monitoring/application_monitoring/browser/
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. [RUM Android 모니터링][1]을 설정합니다.
2. [Android 트레이스 수집][2]을 설정합니다.
3. 모듈 수준 `build.gradle` 파일의 `dd-sdk-android-okhttp` 라이브러리에 Gradle 종속성을 추가합니다.

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Android 애플리케이션이 호출한 내부, 퍼스트 파티 출처 목록을 사용해 `OkHttpClient` 인터셉터를 구성합니다.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(선택 사항)_`traceSampleRate` 파라미터를 구성하여 백엔드 트레이스의 정의된 비율을 유지하세요. 이것이 설정되어 있지 않으면 애플리케이션 요청에서 유입되는 트레이스의 100%가 Datadog으로 전송됩니다. 백엔드 트레이스의 20%를 유지하려면:

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

**참고**:
* `traceSampleRate`는 RUM 세션 샘플링에 영향을 **미치지 않습니다**. 백엔드 트레이스만 샘플링 아웃됩니다.
* Datadog 구성에서 사용자 지정 트레이싱 헤더 유형을 정의하고`GlobalTracer`를 사용하여 등록한 트레이서를 사용 중인 경우, 사용 중인 SDK에도 동일한 트레이싱 헤더 유형을 설정해야 합니다.

[1]: /ko/real_user_monitoring/android/
[2]: /ko/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. [RUM iOS 모니터링][1]을 설정합니다.

2. `urlSessionTracking` 구성 및 `firstPartyHostsTracing` 파라미터를 사용하여 `RUM` 및 URLSession 계측을 활성화합니다.
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```
    
   기본적으로, 목록에 나열된 호스트의 모든 하위 도메인이 추적됩니다. 예를 들어 `example.com`을 추가하면, `api.example.com` 및 `foo.example.com`에 대한 추적도 활성화합니다.

   트레이스 ID 주입은 `URLRequest`를 `URLSession`에 제공하는 경우 작동합니다. `URL` 개체를 사용할 때는 분산 트레이싱이 작동하지 않습니다.

3. _(선택 사항)_ 상세한 타이밍 분석(DNS 확인, SSL 핸드셰이크, 첫 번째 바이트까지 시간, 연결 시간, 다운로드 소요 시간 등)을 원하는 경우, `SessionDelegate` 유형에 맞는 `URLSessionInstrumentation`을 활성화하세요.
    ```swift
    URLSessionInstrumentation.enableDurationBreakdown(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )

    let session = URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   **참고**: 분산 트레이싱은 자동으로 작동하지만, `URLSessionInstrumentation`을 활성화하고 나면 트레이스 타이밍이 좀 더 정확합니다.

4. _(선택 사항)_ `sampleRate` 파라미터를 설정하여 백엔드 트레이스의 정의된 비율을 유지하세요. 이것이 설정되어 있지 않으면 애플리케이션 요청에서 유입되는 트레이스의 100%가 Datadog으로 전송됩니다.

     백엔드 트레이스의 20%를 유지하려면:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 20
                )
            )
        )
    )
    ```
**참고**: `sampleRate`는 RUM 세션 샘플링에 영향을 **미치지 않습니다**. 백엔드 트레이스만 샘플링 아웃됩니다.

[1]: /ko/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. [RUM React Native 모니터링][1]을 설정합니다.

2. `firstPartyHosts` 초기화 파라미터를 설정해 React Native 애플리케이션이 호출한 내부, 퍼스트 파티 출처 목록을 정의합니다.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(선택 사항)_ `resourceTracingSamplingRate` 초기화 파라미터를 설정하여 백엔드 트레이스의 정의된 비율을 유지하세요. 이것이 설정되어 있지 않으면 애플리케이션 요청에서 유입되는 트레이스의 100%가 Datadog으로 전송됩니다.

     백엔드 트레이스의 20%를 유지하려면:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 20;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /ko/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. [RUM Flutter 모니터링][1]을 설정합니다.

2. [자동으로 리소스 추적][2] 아래 지침을 따라 Datadog 추적 HTTP 클라이언트 패키지를 포함하고 HTTP 추적을 활성화합니다. 여기에 다음과 같은 변경 사항이 포함되어 있어 Flutter 애플리케이션이 호출하는 내부, 퍼스트 파티 출처 목록이 추가됩니다.
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /ko/real_user_monitoring/application_monitoring/flutter/setup/
[2]: /ko/real_user_monitoring/application_monitoring/flutter/advanced_configuration#automatically-track-resources
{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Roku용 RUM은 {{< region-param key="dd_datacenter" >}} Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

1. [RUM Roku 모니터링][1]을 설정합니다.

2. `datadogroku_DdUrlTransfer` 구성 요소를 사용하여 네트워크 요청을 수행합니다.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /ko/real_user_monitoring/application_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. [RUM Kotlin Multiplatform 모니터링][1]을 설정합니다.
2. [Ktor 계측][2]을 설정합니다.

3. Datadog Ktor Plugin 구성에서 `tracedHosts` 초기화 파라미터를 설정하여 Kotlin Multiplatform 애플리케이션이 호출하는 내부, 퍼스트 파티 출처 목록을 정의합니다.
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4. _(선택 사항)_ `traceSampleRate` 초기화 파라미터를 설정하여 백엔드 트레이스의 정의된 비율을 유지하세요. 이것이 설정되어 있지 않으면 애플리케이션 요청에서 유입되는 트레이스의 20%가 Datadog으로 전송됩니다.

     백엔드 트레이스의 100%를 유지하려면:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    **Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /ko/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[2]: /ko/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### 설정 확인 {#verifying-setup}

RUM을 사용하여 APM 통합을 구성했는지 확인하려면, RUM을 설치한 SDK에 따라 아래의 단계를 따르세요.


{{< tabs >}}
{{% tab "브라우저" %}}

1. 애플리케이션 내 페이지를 방문합니다.
2. 브라우저의 개발자 도구에서 **네트워크** 탭으로 이동합니다.
3. 상호 연계될 것으로 예상하는 리소스 요청의 요청 헤더가 [Datadog의 상호 연계 헤더][1]를 포함하는지 확인합니다.

[1]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Android Studio에서 애플리케이션을 실행합니다.
2. 애플리케이션 내 화면을 방문합니다.
3. Android Studio의 [Network Inspector][1]를 엽니다.
4. RUM 리소스의 요청 헤더를 검사하고 [필수 헤더가 SDK로 설정되었는지][2] 확인합니다.

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Xcode에서 애플리케이션을 실행합니다.
2. 애플리케이션 내 화면을 방문합니다.
3. Xcode의 [네트워크 연결 및 HTTP 트래픽 계측][1]을 엽니다.
4. RUM 리소스의 요청 헤더를 검사하고 [필수 헤더가 SDK로 설정되었는지][2] 확인합니다.

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Xcode(iOS) 또는 Android Studio(Android)에서 애플리케이션을 실행합니다.
2. 애플리케이션 내 화면을 방문합니다.
3. Xcode의 [네트워크 연결 및 HTTP 트래픽 계측][1] 또는 Android Studio의 [Network Inspector][2]를 엽니다.
4. RUM 리소스의 요청 헤더를 검사하고 [필수 헤더가 SDK로 설정되었는지][3] 확인합니다.

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. 선호하는 IDE 또는 `flutter run`을 사용하여 애플리케이션을 실행합니다.
2. 애플리케이션 내 화면을 방문합니다.
3. Flutter의 [Dev Tools][1]를 열고 [Network View][2]로 이동합니다.
4. RUM 리소스의 요청 헤더를 검사하고 [필수 헤더가 SDK로 설정되었는지][3] 확인합니다.

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Xcode(iOS) 또는 Android Studio(Android)에서 애플리케이션을 실행합니다.
2. 애플리케이션 내 화면을 방문합니다.
3. Xcode의 [네트워크 연결 및 HTTP 트래픽 계측][1] 또는 Android Studio의 [Network Inspector][2]를 엽니다.
4. RUM 리소스의 요청 헤더를 검사하고 [필수 헤더가 SDK로 설정되었는지][3] 확인합니다.

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## RUM Explorer에서 트레이스로 {#rum-explorer-to-traces}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM과 트레이스" style="width:100%;">}}

RUM Explorer에서 트레이스를 조회하는 방법:

1. [세션 목록][22]으로 이동하여 사용할 수 있는 트레이스가 있는 세션을 클릭합니다. `@_dd.trace_id:*`를 사용하여 트레이스가 있는 리소스를 쿼리할 수도 있습니다.

세션을 선택하면 요청 기간 분석, 각 스팬의 플레임(Flame) 그래프, 그리고 **APM에서 트레이스 조회** 링크가 포함된 세션 패널이 표시됩니다.

## 트레이스에서 RUM Explorer로 {#traces-to-rum-explorer}

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM과 트레이스" style="width:100%;">}}

트레이스에서 RUM 이벤트를 조회하는 방법:

1. 트레이스 조회 내에서 **VIEW**를 클릭하여 해당 조회의 수명 중에 생성된 모든 트레이스를 보거나, **RESOURCE**를 클릭하여 개요 탭에서 특정 리소스와 연결된 트레이스를 봅니다.
1. **RUM에서 조회 보기** 또는 **RUM에서 리소스 보기**를 클릭하면 RUM Explorer에서 상응하는 이벤트가 열립니다.

## 지원되는 라이브러리 {#supported-libraries}

아래는 네트워크 요청을 수신하는 서비스에 있어야 하는 지원되는 백엔드 라이브러리 목록입니다.

| 라이브러리          | 최소 버전 |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## OpenTelemetry 지원 {#opentelemetry-support}

RUM은 여러 전파기 유형을 지원하여 OpenTelemetry 라이브러리로 계측된 백엔드와 리소스를 연결합니다.

기본 주입 스타일은 `tracecontext`, `Datadog`입니다.

{{< tabs >}}
{{% tab "브라우저 RUM" %}}

**참고**: Next.js/Vercel과 같이 OpenTelemetry를 사용하는 백엔드 프레임워크를 사용 중인 경우, 다음 단계를 따르세요.

1. 위에 설명된 것과 같이 RUM을 APM과 연결하도록 설정합니다.

2. 다음과 같이 `allowedTracingUrls`를 수정합니다.
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` accepts the same parameter types (`string`, `RegExp` or `function`) as when used in its simple form, described above.

    `propagatorTypes` accepts a list of strings for desired propagators:
      - `datadog`: Datadog's propagator (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "iOS RUM" %}}

1. 위에 설명된 것과 같이 RUM을 APM과 연결하도록 설정합니다.

2. 다음과 같이 `.trace(hosts:sampleRate:)` 대신 `.traceWithHeaders(hostsWithHeaders:sampleRate:)`를 사용합니다.
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. 위에 설명된 것과 같이 RUM을 APM과 연결하도록 설정합니다.

2. 다음과 같이 `OkHttpClient` 인터셉터를 내부, 퍼스트 파티 출처 목록 및 사용할 트레이싱 헤더 유형으로 구성합니다.
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

{{% /tab %}}

{{% tab "React Native RUM" %}}
1. RUM이 [APM과 연결](#setup-rum)되도록 설정합니다.

2. 다음과 같이 RUM SDK를 내부, 퍼스트 파티 출처 목록 및 사용할 트레이싱 헤더 유형으로 구성합니다.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [{
        match: "example.com",
        propagatorTypes: [
            PropagatorType.TRACECONTEXT,
            PropagatorType.DATADOG
        ]
    }];
    ```

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Flutter RUM" %}}
1. 위에 설명된 것과 같이 RUM을 APM과 연결하도록 설정합니다.

2. 다음과 같이 `firstPartyHosts` 대신 `firstPartyHostsWithTracingHeaders`를 사용합니다.
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Kotlin Multiplatform RUM" %}}
1. RUM이 [APM과 연결](#setup-rum)되도록 설정합니다.

2. 다음과 같이 RUM SDK를 내부, 퍼스트 파티 출처 목록 및 사용할 트레이싱 헤더 유형으로 구성합니다.
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## RUM 리소스가 트레이스에 연결되는 방식 {#how-rum-resources-are-linked-to-traces}

Datadog은 분산 트레이싱 프로토콜을 사용하고 아래의 HTTP 헤더를 설정합니다. 기본적으로 트레이스 컨텍스트와 Datadog 전용 헤더를 둘 다 사용합니다.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Real User Monitoring SDK에서 생성되었습니다. Datadog이 트레이스를 RUM 리소스와 연결하도록 허용합니다.

`x-datadog-parent-id`
: Real User Monitoring SDK에서 생성되었습니다. Datadog이 트레이스에서 첫 스팬을 생성하도록 허용합니다.

`x-datadog-origin: rum`
: Real User Monitoring SDK에서 생성되었습니다. Datadog이 트레이스의 소스를 감지하도록 허용합니다.

`x-datadog-sampling-priority`
: 트레이스가 샘플링된 경우, Real User Monitoring SDK가 `1`로 설정하고, 샘플링되지 않은 경우 `0`으로 설정합니다.
{{% /tab %}}
{{% tab "W3C 트레이스 컨텍스트" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 현재 사양에서는 버전이 `00`으로 설정된 것으로 가정합니다.
: `trace id`: 128비트 트레이스 ID, 32자의 16진수입니다. 소스 트레이스 ID는 APM과 호환성 유지를 위해 64비트입니다.
: `parent id`: 64비트 스팬 ID, 16자의 16진수입니다.
: `trace flags`: 샘플링되거나(`01`) 샘플링되지 않음(`00`)

**트레이스 ID 변환**: 128비트 W3C 트레이스 ID는 원본 64비트 소스 트레이스 ID에 선행 0을 패딩하여 생성됩니다. 이렇게 하면 W3C Trace Context 사양을 준수하면서도 APM과의 호환성도 보장됩니다. 원본 64비트 트레이스 ID는 128비트 W3C 트레이스 ID의 하위 64비트가 됩니다.

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Datadog의 벤더 접두사입니다.
: `sampling priority`: 트레이스가 샘플링된 경우 `1`, 샘플링되지 않은 경우 `0`으로 설정합니다.
: `origin`: Real User Monitoring에서 생성된 트레이스가 APM 인덱스 스팬 수에 영향을 미치지 않게 하려면 항상 `rum`으로 설정해야 합니다.

**예시**:

소스 트레이스 ID(64비트): `8448eb211c80319c`

W3C Trace Context(128비트): `00000000000000008448eb211c80319c`

관계를 보면 원본 64비트 트레이스 ID `8448eb211c80319c`가 16개의 선행 0으로 패딩되어(`0000000000000000`) 128비트 W3C 트레이스 ID를 생성했다는 것을 알 수 있습니다.

전체 traceparent 예시:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3/b3 다중 헤더" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64비트 트레이스 ID, 16자의 16진수입니다.
: `span id`: 64비트 스팬 ID, 16자의 16진수입니다.
: `sampled`: True(`1`) 또는 False(`0`)

b3 단일 헤더의 예시:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

b3 다중 헤더의 예시:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

이러한 HTTP 헤더는 CORS 안전 목록에 없으므로, SDK가 모니터링하도록 설정된 요청을 처리하는 서버에서 [Access-Control-Allow-Headers를 구성][17]해야 합니다. 또한 서버는 [preflight 요청][18]도 수락해야 합니다(OPTIONS 요청). 이것은 교차 사이트 URL에서 트레이싱이 허용된 경우, 브라우저가 모든 요청 이전에 전송합니다.

## 트레이스 보존 {#trace-retention}

수집된 트레이스는 [Live Search][19] 탐색기에서 15분 동안 사용할 수 있습니다. 트레이스를 더 오래 보존하려면 [APM 보존 필터][20]를 만드세요. 어떤 스팬 태그에서든 이러한 보존 필터의 범위를 지정하여 중요한 페이지 및 사용자 액션에 대한 트레이스를 보존할 수 있습니다.

RUM Without Limits를 사용하는 경우, [교차 제품 보존 필터][21]를 사용하여 특정 RUM 세션과 연결된 APM 트레이스를 보존할 수도 있습니다. 이렇게 하면 프런트 엔드와 백엔드 사이의 상호 연계가 최적화됩니다. 기본적으로, RUM [세션 및 그 트레이스의 1%가 추가 비용 없이 자동으로 보존][23]됩니다.

## APM 할당량에 미치는 영향 {#effect-on-apm-quotas}

RUM과 트레이스를 연결하면 APM 수집 볼륨이 대폭 증가할 수 있습니다. 초기화 파라미터 `traceSampleRate`를 사용하여 브라우저 및 모바일 요청에서 수집할 백엔드 트레이스의 비율을 제어하세요.

교차 제품 보존 필터를 구성해도 APM 인덱싱 볼륨이 증가할 수 있습니다. 교차 제품 보존 필터를 사용하여 인덱싱할 백엔드 트레이스의 비율을 제어하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/dd_libraries/ios/?tab=swiftpackagemanagerspm
[2]: /ko/tracing
[3]: /ko/tracing/trace_collection/dd_libraries/python/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: /ko/tracing/trace_collection/dd_libraries/go/
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[7]: /ko/tracing/trace_collection/dd_libraries/java/
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[9]: /ko/tracing/trace_collection/dd_libraries/ruby/
[10]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[11]: /ko/tracing/trace_collection/dd_libraries/nodejs/
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[13]: /ko/tracing/trace_collection/dd_libraries/php/
[14]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[15]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/
[16]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[19]: /ko/tracing/trace_explorer/#live-search-for-15-minutes
[20]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[21]: /ko/real_user_monitoring/rum_without_limits/retention_filters/#cross-product-retention-filters
[22]: https://app.datadoghq.com/rum/explorer
[23]: /ko/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling