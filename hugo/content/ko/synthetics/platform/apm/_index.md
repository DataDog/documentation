---
aliases:
- /ko/synthetics/apm
description: Synthetic Monitoring으로 애플리케이션 성능 모니터링(APM) 및 분산 추적하기
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: /tracing/
  tag: 문서
  text: APM 및 분산 트레이싱
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 제품 간 상관관계를 활용하여 문제 해결을 간소화합니다.
products:
- icon: synthetics
  name: HTTP API 테스트
  url: /synthetics/api_tests/http_tests/
- icon: synthetics
  name: 다단계 API 테스트
  url: /synthetics/multistep/
- icon: browser
  name: 브라우저 테스트
  url: /synthetics/browser_tests/
title: Synthetic APM
---
{{< product-availability >}}

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="Trace 탭에 사이드 패널이 열려 있는 실패한 API 테스트 - 서비스 전반에 걸쳐 색상으로 구분된 스팬으로 테스트 실행을 통해 생성된 APM 트레이스를 보여줌" video="true" >}}

## 개요 {#overview}

Synthetic Monitoring을 활용하여 애플리케이션 성능 모니터링(APM) 통합 기능을 사용하면 테스트를 실행하여 생성한 트레이스를 확인해 잠재적 테스트 실행 실패 문제의 근본 원인을 알아낼 수 있습니다

네트워크 관련 세부 정보(테스트 실행으로 인한)와 백엔드, 인프라스트럭처, 로그 정보(트레이스로 인한)가 있으면 사용자가 경험한 애플리케이션의 작동 방식에 대한 새로운 수준의 세부 정보를 확인할 수 있습니다.

## 사용 방법 {#usage}

### 전제 조건 {#prerequisites}

* 서비스와 테스트가 실행되는 엔드포인트는 [APM 측에서 트레이스가 수집됩니다][4].
* 서비스가 HTTP 서버를 사용합니다.
* HTTP 서버가 분산 트레이싱을 지원하는 라이브러리를 사용합니다.

추적된 HTTP 서버에 도달하는 테스트를 생성하면 Datadog은 서버가 생성한 트레이스에 해당 테스트 결과를 자동으로 연결합니다.

브라우저 테스트 결과를 연결하려면 APM 통합 헤더를 추가할 URL을 허용 목록에 추가합니다. [{{< ui >}}Synthetic Settings{{< /ui >}}][5]에서 수행할 수 있습니다. 

와일드카드로 `*`를 사용합니다. 도메인에서 `*`는 하나의 하위 도메인 레이블에만 일치하며 점(.)을 넘어 일치하지는 않습니다. URL 경로에서 `*`는 `/`를 포함한 모든 문자에 일치합니다.

예를 들어 `https://*.datadoghq.com/*`를 추가하면 다음과 같습니다.
| URL | 허용됨 | 이유 |
| --- | --- | --- |
| `https://www.datadoghq.com/product` | 예 | `*` 단일 레이블 `www` |와 일치합니다.
| `https://www.datadoghq.com/product/synthetic-monitoring` | 예 | URL 경로 와일드카드는 `/` |를 포함하여 일치합니다.
| `https://www.docs.datadoghq.com/synthetics` | 아니요 | `*`은 점(.)이 포함된 `www.docs`와 일치할 수 없습니다. |

## 지원되는 라이브러리 {#supported-libraries}

다음 Datadog SDK가 지원됩니다.

| 라이브러리                             | 최소 버전                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### 트레이스는 테스트와 어떻게 연결되나요? {#how-are-traces-linked-to-tests}

Datadog은 분산 추적 프로토콜을 사용하며 다음과 같이 HTTP 헤더를 설정합니다.


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: Synthetic Monitoring 백엔드에서 생성됩니다. Datadog이 트레이스를 테스트 결과와 연결할 수 있도록 합니다.

`x-datadog-parent-id: 0`
: Synthetic 테스트가 생성된 트레이스의 루트 스팬이 되도록 합니다.

`x-datadog-origin: synthetics`
: API 테스트에서 생성된 트레이스를 식별합니다. 이러한 트레이스의 스팬에는 `ingestion_reason:synthetics` 태그가 지정됩니다.

`x-datadog-origin: synthetics-browser`
: 브라우저 테스트에서 생성된 트레이스를 식별합니다. 이러한 트레이스에는 `ingestion_reason:synthetics-browser` 태그가 지정됩니다.

`x-datadog-sampling-priority: 1`
: Agent가 트레이스를 유지하도록 합니다.
{{% /tab %}}
{{% tab "W3C 트레이스 컨텍스트" %}}
`traceparent: [버전]-[트레이스 ID]-[부모 ID]-[트레이스 플래그]`
: `version`: 이 사양에서는 버전이 `00`으로 설정되어 있다고 가정합니다.
: `trace id`: 128비트 트레이스 ID, 32자의 16진수입니다. 소스 트레이스 ID는 APM과의 호환성을 유지하기 위해 64비트입니다.
: `parent id`: 64비트 스팬 ID로, 16자리 16진수입니다.
: `trace flags`: 샘플링됨(`01`) 또는 샘플링되지 않음(`00`)

**예시**:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### 트레이스 보존 기간은 얼마인가요? {#how-long-are-traces-retained}

이러한 트레이스는 {{< ui >}}Synthetics Default{{< /ui >}} 보존 필터를 통해 [기존 APM 트레이스와 마찬가지로][20] 15일 동안 보존됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[4]: /ko/tracing/
[5]: https://app.datadoghq.com/synthetics/settings/integrations
[6]: /ko/tracing/trace_collection/dd_libraries/python/
[7]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.50.4
[8]: /ko/tracing/trace_collection/dd_libraries/go/
[9]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[10]: /ko/tracing/trace_collection/dd_libraries/java/
[11]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[12]: /ko/tracing/trace_collection/dd_libraries/ruby/
[13]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[14]: /ko/tracing/trace_collection/dd_libraries/nodejs/
[15]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[16]: /ko/tracing/trace_collection/dd_libraries/php/
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[18]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/
[19]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[20]: /ko/tracing/trace_pipeline/trace_retention/