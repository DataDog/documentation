---
algolia:
  tags:
  - RUM 트레이스
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: 블로그
  text: 단일 페이지 응용프로그램 모니터링 시작
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 길라잡이
  text: 교차 제품 연결을 통한 트러블슈팅
- link: /tracing/
  tag: 설명서
  text: APM 및 분산 트레이싱
- link: /real_user_monitoring
  tag: 설명서
  text: RUM & 세션 리플레이
- link: https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/
  tag: 블로그
  text: 세션 재생 브라우저 개발자 도구를 사용한 트러블슈팅
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: 블로그
  text: OpenTelemetry 계측 애플리케이션에서 트레이스와 Datadog RUM 이벤트 연결
kind: 설명서
title: RUM 및 트레이스 연결
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM 및 트레이스" style="width:100%;">}}

## 개요

실제 사용자 모니터링(RUM)과 APM의 통합으로 웹과 모바일 애플리케이션 요청을 해당 백엔드 트레이스와 연결할 수 있습니다. 이러한 연결로 한눈에 프런트엔드 및 백엔드 데이터 전체를 확인할 수 있습니다.

백엔드, 인프라, 트레이스 ID 주입 로그 정보뿐만 아니라 프런트엔드 데이터를 사용해 스택 어디에서나 이슈를 파악하고 사용자가 어떤 경험을 하는지 이해할 수 있습니다.

iOS 애플리케이션 트레이스를 Datadog에 전송하려면 [iOS 트레이스 수집][1]을 참조하세요.

## 사용법

### 전제 조건

-   RUM 애플리케이션 대상 서비스에서 [APM 트레이스][2]를 설정했습니다.
-   서비스에서 HTTP 서버를 사용합니다.
-   HTTP 서버는 [분산 트레이싱을 지원하는 라이브러리](#supported-libraries)를 사용합니다.
-   SDK를 기반으로 다음을 설정했습니다.
    - **브라우저 SDK**를 사용해 RUM 탐색기에서 XMLHttpRequest(XHR) 또는 Fetch 리소스를 `allowedTracingUrls`에 추가했습니다.
    - **모바일 SDK**를 사용해 네이티브 또는 XMLHttpRequest(XHR)를 `firstPartyHosts`에 추가했습니다.
-   `allowedTracingUrls` 또는 `firstPartyHosts` 요청에 해당되는 트레이스가 있습니다. 

### RUM 설정

**참고:** RUM 및 트레이스를 설정하면 RUM에서 APM 유료 데이터를 사용할 수 있습니다. APM 결제에 영향을 미칠 수 있습니다.

{{< tabs >}}
{{% tab "Browser RUM" %}}

1. [RUM 브라우저 모니터링][1]을 설정합니다.

2. RUM SDK를 시작합니다. 브라우저 애플리케이션이 호출한 내부 자사 출처 목록을 사용해  `allowedTracingUrls` 초기화 파라미터를 설정합니다. 

   **npm 설치**:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        applicationId: '<DATADOG_APPLICATION_ID>',
        clientToken: '<DATADOG_CLIENT_TOKEN>',
        ...otherConfig,
        service: "my-web-application",
        allowedTracingUrls: ["https://api.example.com", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("https://api.example.com")]
    })
    ```

   **CDN 설치**:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<http://datadoghq.com|datadoghq.com>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: ["<https://api.example.com>", /https:\/\/.*\.my-api-domain\.com/, (url) => url.startsWith("<https://api.example.com>")]
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

   RUM을 트레이스에 연결하려면 `service` 필드에서 브라우저 애플리케이션을 지정해야 합니다.

   `allowedTracingUrls`는 전체 URL(`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`)과 일치합니다. 다음 유형을 허용합니다.
      - `string`: 해당 값으로 시작하는 모든 URL과 일치합니다. `https://api.example.com`은  `https://api.example.com/v1/resource`와 일치합니다.
      - `RegExp`: 제공된 RegExp 및 URL을 사용해 테스트를 실행합니다.
      - `function`: 파라미터로 URL을 평가합니다. `boolean` 세트를 `true`로 반환하면 일치를 나타냅니다.

3.  _(선택 사항)_ `traceSampleRate` 초기화 파라미터를 설정하여 정의된 백엔드 트레이스의 비율을 유지합니다. 설정하지 않으면 브라우저 요청에서 오는 트레이스 100%가 Datadog에 전송됩니다. 예를 들어, 백엔드 트레이스 20%를 유지하려면 다음을 수행해야 합니다.

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**참고**: `traceSampleRate`은 RUM 세션 샘플링에 영향을 **미치지 않습니다.** 백엔드 트레이스만 선별됩니다.

<div class="alert alert-info">엔드 투 엔드 트레이싱에서 브라우저 SDK를 초기화한 후 트리거된 요청에서 사용할 수 있습니다. 초기 HTML 문서와 초기 브라우저 요청의 엔드 투 엔드 트레이싱이 지원되지 않습니다.</div>

[1]: /ko/real_user_monitoring/browser/
{{% /tab %}}
{{% tab "Android RUM" %}}

1. [RUM Android 모니터링][1]을 설정합니다.
2. [Android 트레이스 수집][2]을 설정합니다.
3. 모듈 수준 `build.gradle`파일의 `dd-sdk-android-okhttp`라이브러리에 그래들 종속성을 추가합니다:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Android 애플리케이션에서 호출한 내부 자사 출처 목록을 사용해 `OkHttpClient` 인터셉터를 설정합니다.
    ```java
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

   기본적으로 목록화된 호스트의 모든 하위 도메인이 추적됩니다. 예를 들어 `example.com`를 추가하면 또한 `api.example.com` 및 `foo.example.com` 트레이싱이 활성화됩니다.

3.  _(선택 사항)_ `traceSampler` 파라미터를 설정해 정의된 백엔드 트레이스를 유지합니다. 설정하지 않은 경우 애플리케이션 요청에서 기인한 트레이스 20%가 Datadog에 전송합니다. 백엔드 트레이스 100%를 유지하려면 다음을 수행합니다.

```java
    val okHttpClient = OkHttpClient.Builder()
       .addInterceptor(DatadogInterceptor(traceSampler = RateBasedSampler(100f)))
       .build()
  ```

**참고**: `traceSamplingRate`는 RUM 세션 샘플링에 영향을 **미치지 않습니다.** 백엔드 트레이스만 선별됩니다.

[1]: /ko/real_user_monitoring/android/
[2]: /ko/tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. [RUM iOS 모니터링][1]을 설정합니다.

2. iOS 애플리케이션에서 호출한 내부 자사 출처 목록을 사용해 `trackURLSession(firstPartyHosts:)` 빌더 함수를 호출합니다.
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
            .build()
    )
    ```

3. 글로벌 `Tracer` 초기화:
    ```swift
    Global.sharedTracer = Tracer.initialize(
        configuration: Tracer.Configuration(...)
    )
    ```

4. [설정][1]의 URL 세션 초기화:
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: DDURLSessionDelegate(),
        delegateQueue: ...
    )
    ```

   기본적으로 목록화된 호스트의 모든 하위 도메인이 추적됩니다. 예를 들어 `example.com`을 추가하면 또한 `api.example.com` 및 `foo.example.com` 트레이싱이 활성화됩니다.

   트레이스 ID 주입은 `URLRequest`를 `URLSession`에 제공할 때 작동합니다. 분산된 트레이싱은 `URL` 개체를 사용할 때 작동하지 않습니다.

5. _(선택 사항)_ `tracingSamplingRate` 초기화 파라미터를 설정해 정의된 백엔드 트레이스의 비율을 유지합니다. 설정하지 않으면 애플리케이션 요청에서 오는 트레이스 20%가 Datadog로 전송됩니다.

   백엔드 트레이스 100%를 유지하려면 다음을 수행합니다.
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(rumApplicationID: "<rum_app_id>", clientToken: "<client_token>", environment: "<env_name>")
            .set(tracingSamplingRate: 100)
            .build()
    )
    ```
**참고**: `tracingSamplingRate`은 RUM 세션 샘플링에 영향을 **미치지 않습니다.** 백엔드 트레이스만 선별됩니다.

[1]: /ko/real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. [RUM React Native Monitoring][1]을 설정합니다.

2. `firstPartyHosts` 초기화 파라미터를 설정해 React Native 애플리케이션에서 호출한 내부 자사 출처 목록을 정의합니다.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

   기본적으로 목록화된 호스트의 모든 하위 도메인을 추적합니다. 예를 들어 `example.com`을 추가하면 또한 `api.example.com` 및 `foo.example.com` 트레이싱을 활성화합니다.

3. _(선택 사항)_ `resourceTracingSamplingRate` 초기화 파라미터를 설정해 정의된 백엔드 트레이스의 비율을 유지합니다. 설정하지 않으면 애플리케이션 요청에서 오는 트레이스 20%가 Datadog로 전송됩니다.

   백엔드 트레이스 100%를 유지하려면 다음을 수행합니다.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

   **참고**: `resourceTracingSamplingRate`은 RUM 세션 샘플링에 영향을 **미치지 않습니다.** 백엔드 트레이스만 선별됩니다.

[1]: /ko/real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. [RUM Flutter Monitoring][1]을 설정합니다.

2. [자동 리소스 추적][2]에서 지침을 따라 Datadog 추적 HTTP 클라이언트 패키지를 포함하고 HTTP 추적을 활성화합니다. 이를 통해 초기화에 다음 변경 사항을 포함해 Flutter 애플리케이션에 호출한 내부 자사 출처 목록을 추가합니다.
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /ko/real_user_monitoring/flutter/
[2]: /ko/real_user_monitoring/flutter/#automatic-resource-tracking

{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku용 RUM은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku용 RUM은 베타 버전에 있습니다.</div>

1. [RUM Roku Monitoring][1]을 설정합니다.

2. `datadogroku_DdUrlTransfer` 구성 요소를 사용해 네트워크 요청을 수행합니다.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /ko/real_user_monitoring/roku/
{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### 설정 확인

APM 통합 및 RUM이 설정되었는지 확인하려면 RUM을 설치한 SDK에 따라 아래 단계를 완료하세요.


{{< tabs >}}
{{% tab "Browser" %}}

1. 애플리케이션에서 페이지에 방문합니다.
2. 브라우저 개발자 도구에서 **네트워크** 탭으로 이동합니다.
3. 연결하려는 리소스 요청에 대한 요청 헤더가 [Datadog의 연결 헤더][1]를 포함하는지 확인합니다.

[1]: /ko/real_user_monitoring/connect_rum_and_traces?tab=browserrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Android Studio에서 애플리케이션을 실행합니다.
2. 애플리케이션에서 화면으로 이동합니다.
3. Android Studio의 [네트워크 검사기][1]를 엽니다.
4. RUM 리소스의 요청 헤더를 확인하고 [요청한 헤더가 SDK로 설정되었는지][2] 체크합니다.

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/connect_rum_and_traces?tab=androidrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Xcode에서 애플리케이션을 실행합니다.
2. 애플리케이션에서 화면으로 이동합니다.
3. Xcode의 [네트워크 연결 및 HTTP 트래픽 계측][1]을 엽니다.
4. RUM 리소스의 요청 헤더를 확인하고 [요청한 헤더가 SDK로 설정되었는지][2] 체크합니다.

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://docs.datadoghq.com/ko/real_user_monitoring/connect_rum_and_traces/?tab=iosrum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Xcode(iOS)나 Android Studio(Android)에서 애플리케이션을 실행합니다.
2. 애플리케이션에서 화면으로 이동합니다.
3. Xcode의 [네트워크 연결 및 HTTP 트래픽 계측][1] 또는 Android Studio의 [네트워크 검사기][2]를 엽니다.
4. RUM 리소스의 요청 헤더를 확인하고 [요청된 헤더가 SDK로 설정되었는지][3] 체크하세요.

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. 원하는 IDE 또는 `flutter run`을 사용하여 애플리케이션을 실행합니다.
2. 애플리케이션에서 화면으로 이동합니다.
3. Flutter의 [개발자 도구][1]를 열고 [네트워크 보기][2]로 이동합니다.
4. RUM 리소스의 요청 헤더를 확인하고 [요청된 헤더가 SDK로 설정되었는지][3] 체크하세요.

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/connect_rum_and_traces/?tab=reactnativerum#how-are-rum-resources-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## 지원되는 라이브러리

다음 Datadog 트레이싱 라이브러리가 지원됩니다.

| 라이브러리          | 최소 버전 |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]     |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## OpenTelemetry 지원

RUM은 여러 전파기 유형을 지원하여 OpenTelemetry 라이브러리로 계측된 백엔드와 리소스를 연결합니다.

{{< tabs >}}
{{% tab "Browser RUM" %}}

**참고**: OpenTelemetry를 사용하는 Next.js/Vercel 등 백엔드 프레임워크를 사용하는 경우 다음 단계를 따르세요.

1. 위에 설명된 대로 RUM을 설정해 APM과 연결하세요.

2. `allowedTracingUrls`를 다음과 같이 수정하세요.
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
   위에서 설명된 단순한 형식으로 사용할 때 `match`는 동일한 파라미터 유형(`string`, `RegExp` 또는 `function`)을 허용합니다.

   `propagatorTypes`은 원하는 전파기에 대해 문자열 목록을 허용합니다.
      - `datadog`: Datadog 전파기(`x-datadog-*`)
      - `tracecontext`: [W3C 트레이스 컨텍스트](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "iOS RUM" %}}

1. 위에 설명된 대로 RUM을 설정해 APM과 연결하세요.

2. 다음과 같이 `trackURLSession(firstPartyHosts:)` 대신 `trackURLSession(firstPartyHostsWithHeaderTypes:)`를 사용하세요.
    ```swift
    Datadog.initialize(
        appContext: .init(),
        configuration: Datadog.Configuration
            .builderUsing(
                rumApplicationID: "<rum_app_id>", 
                clientToken: "<client_token>", 
                environment: "<env_name>"
            )
            .trackURLSession(
                firstPartyHostsWithHeaderTypes: [
                    "api.example.com": [.tracecontext]
                ]
            )
            .build()
        )
    ```
   `trackURLSession(firstPartyHostsWithHeaderTypes:)`는 `Dictionary<String, Set<TracingHeaderType>>`을 파라미터로 사용합니다. 키는 호스트이며 값은 지원되는 트레이싱 헤더 유형 목록입니다.

   목록의 `TracingHeaderType`은 다음 트레이싱 헤더 유형을 나타냅니다.
      - `.datadog`: Datadog 전파기(`x-datadog-*`)
      - `.tracecontext`: [W3C 트레이스 컨텍스트](https://www.w3.org/TR/trace-context/)(`traceparent`)
      - `.b3`: [B3 단일 헤더](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 다수 헤더](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. 위에 설명된 대로 RUM을 설정해 APM과 연결하세요.

2. 다음과 같이 사용할 추척 헤더 유형과 내부 자사 출처 목록을 사용해 `OkHttpClient` 인터셉터를 설정하세요.
    ```java
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT), 
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts))
        .eventListenerFactory(DatadogEventListener.Factory())
       .build()
    ```

   `TracingHeaderType`은 다음 추적 헤더 유형을 나타내는 목록입니다.
      - `.DATADOG`: Datadog 전파기(`x-datadog-*`)입니다.
      - `.TRACECONTEXT`: [W3C 트레이스 컨텍스트](https://www.w3.org/TR/trace-context/)(`traceparent`)
      - `.B3`: [B3 단일 헤더](https://github.com/openzipkin/b3-propagation#single-header)(`b3`)
      - `.B3MULTI`: [B3 다수 헤더](https://github.com/openzipkin/b3-propagation#multiple-headers)(`X-B3-*`)

{{% /tab %}}

{{% tab "React Native RUM" %}}
1. RUM을 설정해 [APM과 연결하세요](#setup-rum).

2. 다음과 같이 사용할 추적 헤더 유형과 내부 자사 출처 목록을 사용해 RUM SDK를 설정하세요.
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [
        {match: "example.com", propagatorTypes: PropagatorType.TRACECONTEXT},
        {match: "example.com", propagatorTypes: PropagatorType.DATADOG}
    ];
    ```

   `PropagatorType`은 다음 추적 헤더 유형을 나타내는 목록입니다.
      - `PropagatorType.DATADOG`: Datadog 전파기(`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C 트레이스 컨텍스트](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 단일 헤더](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 다수 헤더](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}} 

{{% tab "Flutter RUM" %}}
1. 위에 설명된 대로 RUM을 설정해 APM과 연결하세요.

2. 다음과 같이 `firstPartyHosts` 대신 `firstPartyHostsWithTracingHeaders`를 사용하세요.
    ```dart
    final configuration = DdSdkConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

   `firstPartyHostsWithTracingHeaders`는 `Map<String, Set<TracingHeaderType>>`을 파라미터로 사용합니다. 키는 호스트이고 값은 지원되는 추적 헤더 유형 목록입니다.

   목록의 `TracingHeaderType`은 다음 트레이싱 헤더 유형을 나타냅니다.
      - `TracingHeaderType.datadog`: Datadog 전파기(`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C 트레이스 컨텍스트](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 단일 헤더](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 다수 헤더](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## RUM 리소스가 트레이스와 어떻게 연결되어 있나요?

Datadog는 분산 추적 프로토콜을 사용하고 다음 HTTP 헤더를 설정합니다.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: 실제 사용자 모니터링 SDK에서 생성됩니다. Datadog에서 트레이스를 RUM 리소스와 연결하도록 허용하세요.

`x-datadog-parent-id`
: 실제 사용자 모니터링 SDK에서 생성됩니다. Datadog가 트레이스에서 최초 스팬을 생성하도록 허용하세요.

`x-datadog-origin: rum`
: 실제 사용자 모니터링에서 생성된 트레이스가 APM 인덱스 스팬 개수에 영향을 미치지 않도록 하세요.

`x-datadog-sampling-priority: 1`
: 에이전트가 트레이스를 유지하도록 하세요.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 현재 사양은 버전이 `00`로 설정되어 있다고 간주합니다.
: `trace id`: 128비트 트레이스 ID, 16진법 32자입니다. 소스 트레이스 ID는 64비트로 APM과의 호환성을 유지합니다.
: `parent id`: 64비트 스팬 ID, 16진법 16자입니다.
: `trace flags`: 샘플링된 (`01`) 또는 샘플링 안 된 (`00`)

예:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{% tab "b3 / b3 Multiple Headers" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64비트 트레이스 ID, 16진법 16자입니다.
: `span id`: 64비트 스팬 ID, 16진법 16자입니다.
: `sampled`: 참(`1`) 또는 거짓(`0`)

b3 단일 헤더 예시:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

b3 다수 헤더 예시:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

이러한 HTTP 헤더는 CORS 안전 목록에 포함되어 있지 않습니다. 그러므로 SDK가 모니터링하기로 설정된 서버 핸들링 요청에서 [액세스-컨트롤-허용 헤더를 설정해야 합니다]. 서버는 또한 [프리플라이트 요청][18](옵션 요청)을 허용해야 합니다. 해당 요청은 모든 요청 전 SDK에서 트리거합니다.

## APM 쿼터가 어떤 영향을 받나요?

RUM과 트레이스를 연결하면 APM 수집 볼륨에 크게 증가할 수 있습니다. 초기화 파라미터 `traceSampleRate`를 사용해 브라우저와 모바일 요청에서 시작된 백엔드 트레이스를 유지하세요.

## 트레이스는 얼마나 오래 보관되나요?

트레이스는 [라이브 검색][19] 탐색기에서 15분 동안 사용할 수 있습니다. 더 긴 시간 동안 트레이스를 유지하려면 [보관 필터][20]를 생성하세요. 아무 스팬 태그에서나 이러한 보관 필터를 사용해 핵심 페이지 및 사용자 작업에서 트레이스를 유지하세요.

## 참고 자료

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