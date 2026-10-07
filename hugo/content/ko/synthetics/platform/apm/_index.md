---
aliases:
- /ko/synthetics/apm
description: 신서틱(Synthetic) 모니터링으로 애플리케이션 성능 모니터링(APM) 및 분산 추적하기
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱 모니터링 소개
- link: /tracing/
  tag: 설명서
  text: APM 및 분산 추적
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
title: 신서틱(Synthetic) 애플리케이션 성능 모니터링(APM)
---

{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM 및 신서틱 모니터링" video="true" >}}

## 개요

신서틱(Synthetic) 모니터링을 활용하여 애플리케이션 성능 모니터링(APM) 통합 기능을 사용하면 테스트를 실행하여 생성한 트레이스를 확인해 잠재적 테스트 실행 실패 문제의 근본 원인을 알아낼 수 있습니다

네트워크 관련 세부 정보(테스트 실행으로 인한)와 백엔드, 인프라스트럭처, 로그 정보(트레이스로 인한)가 있으면 사용자가 경험한 애플리케이션의 작동 방식에 대한 새로운 수준의 세부 정보를 확인할 수 있습니다.

## 사용량

본 페이지의 구문은 애플리케이션 성능 모니터링(APM)용 [HTTP API 테스트][1], [다단계 API 테스트][2], [브라우저 테스트][3]에 적용됩니다.

### 필수 요건

* 서비스, 그리고 테스트가 실행 중인 엔드포인트는 [애플리케이션 성능 모니터링(APM) 쪽에서 추적][4]합니다.
* 서비스가 HTTP 서버를 사용합니다.
* HTTP 서버가 분산 추적 지원 라이브러리를 사용합니다.

추적된 HTTP 서버에 도달하는 테스트를 생성하면 Datadog은 서버가 생성한 트레이스에 해당 테스트 결과를 자동으로 연결합니다.

브라우저 테스트 결과를 연결하려면 애플리케이션 성능 모니터링(APM) 통합 헤더를 추가할 URL을 허용하세요. [신서틱(Synthetic) 설정][5]에서 해당 작업을 수행할 수 있습니다. 와일드카드로 다음 `*`을 사용합니다.

```text
https://*.datadoghq.com/*
```

## 지원되는 라이브러리

다음 Datadog 트레이싱 라이브러리가 지원됩니다.

| 라이브러리                             | 최소 버전                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### 트레이스와 테스트는 어떻게 연결되어 있나요?

Datadog은 분산 추적 프로토콜을 사용하며 다음과 같이 HTTP 헤더를 설정합니다.


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: 신서틱(Synthetic) 모니터링 백엔드에서 생성되었습니다. Datadog에서 트레이스를 테스트 결과와 연결할 수 있도록 허용합니다.

`x-datadog-parent-id: 0`
: 신서틱(Synthetic) 테스트를 생성한 트레이스의 루트 스팬으로 설정합니다.

`x-datadog-origin: synthetics`
: API 테스트에서 생성한 트레이스를 식별합니다. 해당 트레이스 스팬(span)에는 `ingestion_reason:synthetics` 태그가 할당됩니다.

`x-datadog-origin: synthetics-browser`
: 브라우저 테스트에서 생성된 트레이스을 식별합니다. 이러한 트레이스에는 `ingestion_reason:synthetics-browser` 태그가 지정됩니다.

`x-datadog-sampling-priority: 1`
: 에이전트가 트레이스를 유지하도록 합니다.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 이 사양에서는 버전이 `00` 로 설정되어 있다고 가정합니다.
 `trace id`: 128비트 트레이스 ID, 32자 16진수. 소스 트레이스 ID는 애플리케이션 성능 모니터링(APM) 과의 호환성을 유지하기 위해 64비트입니다.
: `parent id`: 64비트 스팬(span) ID, 16자 16진수.
: `trace flags`: 샘플링됨(`01`) 또는 샘플링되지 않음 (`00`)

**예**:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### 트레이스는 얼마나 오래 보관되나요?

해당 트레이스는 [기존 애플리케이션 성능 모니터링(APM) 트레이스][20]와 동일하게 `Synthetics Default` 보존 필터를 사용하여 15일 동안 보관됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ko/synthetics/api_tests/http_tests/?tab=requestoptions
[2]: /ko/synthetics/multistep?tab=requestoptions
[3]: /ko/synthetics/browser_tests/
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