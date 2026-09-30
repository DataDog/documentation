---
aliases:
- /ko/tracing/terminology/
- /ko/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /ko/tracing/visualization/
description: 서비스, 리소스, 트레이스, 스팬, 계측 및 분산 트레이싱을 위한 기타 주요 개념을 포함한 필수 APM 용어를 알아보세요.
further_reading:
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 APM 트레이싱을 설정하는 방법 알아보기
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 발견하고 카탈로그에 등록하기
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog에서 트레이스를 읽는 방법 알아보기
- link: /monitors/types/apm/
  tag: 설명서
  text: APM 모니터링에 대해 알아보기
title: APM 이용 약관
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

APM UI는 애플리케이션 성능 문제를 해결하고 제품 전반에 걸쳐 상관관계를 파악할 수 있는 많은 도구를 제공합니다. 이를 통해 분산 시스템에서 문제를 찾고 해결할 수 있습니다.

_스팬_ 및 _인덱스_와 같은 중요한 APM 용어에 대한 추가 정의 및 설명은 [주요 용어집][22]을 참조하세요. 

| 개념                         | 설명                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [서비스](#services)            | 서비스는 현대 마이크로서비스 아키텍처의 기본 구성 요소로, 일반적으로 서비스는 애플리케이션을 구축하기 위해 엔드포인트, 쿼리 또는 작업을 그룹화합니다.                                  |
| [리소스](#resources)          | 리소스는 고객 애플리케이션의 특정 도메인을 나타내며, 일반적으로 계측된 웹 엔드포인트, 데이터베이스 쿼리 또는 백그라운드 작업입니다.                                                              |
| [모니터링][23] | APM 메트릭 모니터링은 일반적인 메트릭 모니터링처럼 작동하지만, APM에 맞게 특별히 조정된 제어 기능을 제공합니다. 이 모니터링을 사용하여 서비스 수준에서 히트, 오류 및 다양한 지연 측정에 대한 경보를 받으세요. |
| [트레이스](#trace)                 | 트레이스는 애플리케이션이 요청을 처리하는 데 소요된 시간과 이 요청의 상태를 추적하는 데 사용됩니다. 각 트레이스는 하나 이상의 스팬으로 구성됩니다.                                                             |
| [트레이스 컨텍스트 전파](#trace-context-propagation)| 서비스 간에 트레이스 식별자를 전달하는 방법으로, Datadog이 개별 스팬을 완전한 분산 트레이스로 연결할 수 있게 합니다. |
| [보존 필터](#retention-filters) | 보존 필터는 Datadog UI 내에서 설정된 태그 기반 제어로, Datadog에서 15일 동안 인덱싱할 스팬을 결정합니다.                                                                                              |
| [Ingestion Control](#ingestion-controls) | Ingestion Control은 15분 동안 실시간 검색 및 분석을 위해 최대 100%의 트레이스를 Datadog에 전송하는 데 사용됩니다.
| [계측](#instrumentation) | 계측은 애플리케이션에 코드를 추가하여 관찰 가능성 데이터를 캡처하고 보고하는 프로세스입니다. |
| [Baggage](#baggage) | Baggage는 키-값 쌍 형태로 트레이스, 메트릭 및 로그 간에 전달되는 컨텍스트 정보입니다. |

## 서비스 {#services}

[애플리케이션을 계측한 후][3]에는 [카탈로그][4]가 APM 데이터의 주요 랜딩 페이지 역할을 합니다.

{{< img src="tracing/visualization/software_catalog.png" alt="카탈로그" >}}

서비스는 현대 마이크로서비스 아키텍처의 기본 구성 요소로, 일반적으로 서비스는 인스턴스를 확장하기 위해 엔드포인트, 쿼리 또는 작업을 그룹화합니다. 몇 가지 예:

* URL 엔드포인트 그룹은 API 서비스로 그룹화할 수 있습니다.
* 하나의 데이터베이스 서비스 내에서 함께 그룹화된 DB 쿼리 그룹입니다.
* crond 서비스에 구성된 주기적인 작업 그룹입니다.

아래 스크린샷은 이커머스 사이트 빌더를 위한 마이크로서비스 분산 시스템입니다. APM에서 서비스로 표현된 `web-store`, `ad-server`, `payment-db`, 및 `auth-service`이 있습니다.

{{< img src="tracing/visualization/service_map.png" alt="서비스 맵" >}}

모든 서비스는 [카탈로그][4]에서 찾을 수 있으며, [Service Map][5]에서 시각적으로 표현됩니다. 각 서비스는 처리량, 지연 시간, 오류율과 같은 [트레이스 메트릭](#trace-metrics)을 조회하고 검사할 수 있는 [서비스 페이지][6]를 가지고 있습니다. 이 메트릭을 사용하여 대시보드 위젯을 만들고, 모니터링을 생성하며, 서비스에 속하는 웹 엔드포인트나 데이터베이스 쿼리와 같은 모든 리소스의 성능을 확인하세요.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="서비스 페이지" >}}

<div class="alert alert-info">
서비스 페이지에서 기대했던 HTTP 엔드포인트가 보이지 않나요? APM에서 엔드포인트는 서비스 이름 외에도 서비스에 연결됩니다. 트레이스의 진입점 스팬의 `span.name`으로도 연결됩니다. 예를 들어, 위의 웹 스토어 서비스에서 `web.request`는 진입점 스팬입니다. 자세한 내용은 <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">여기</a>에서 확인하세요.
</div>

## 리소스 {#resources}

리소스는 고객 애플리케이션의 특정 도메인을 나타냅니다. 일반적으로 이들은 계측된 웹 엔드포인트, 데이터베이스 쿼리 또는 백그라운드 작업일 수 있습니다. 웹 서비스의 경우, 이러한 리소스는 정적 스팬 이름 `web.request`으로 그룹화된 동적 웹 엔드포인트가 될 수 있습니다. 데이터베이스 서비스에서는 이러한 것이 스팬 이름 `db.query`를 가진 데이터베이스 쿼리가 됩니다. 예를 들어 `web-store` 서비스에는 체크아웃, 장바구니 업데이트, 항목 추가 등을 처리하는 리소스(웹 엔드포인트)가 자동으로 계측되어 있습니다. 리소스 이름은 HTTP 메서드와 HTTP 경로의 조합일 수 있으며, 예를 들어 `GET /productpage` 또는 `ShoppingCartController#checkout`과 같은 형식입니다. 

각 리소스는 특정 엔드포인트에 범위가 지정된 [리소스 페이지][7]와 [트레이스 메트릭][15]을 가지고 있습니다. 트레이스 메트릭은 다른 Datadog 메트릭처럼 사용될 수 있으며 대시보드로 내보내거나 모니터링를 생성하는 데 사용할 수 있습니다. [리소스 페이지]에서는 모든 [트레이스](#trace)의 스팬[21]을 집계한 스팬 요약 위젯, 요청의 지연 분포 및 이 엔드포인트에 대한 요청을 보여주는 트레이스를 확인할 수 있습니다.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="리소스 페이지" >}}

## 트레이스 {#trace}

트레이스는 애플리케이션이 요청을 처리하는 데 소요된 시간과 이 요청의 상태를 추적하는 데 사용됩니다. 각 트레이스는 하나 이상의 스팬으로 구성됩니다. 요청의 전체 처리 과정에서 플레임 그래프 보기를 통해 서비스간 분산 호출, [자동 계측된 라이브러리][3], [OpenTracing][10]과 같은 오픈 소스 도구를 사용한 [수동 계측][9]결과를 확인할 수 있습니다. 이는 [트레이스 ID가 HTTP 헤더를 통해 주입되고 추출][8]되기 때문입니다. 트레이스 보기 페이지에서 각 트레이스는 [로그를 트레이스에 연결하기][11], [스팬에 태그 추가하기][12], [런타임 메트릭 수집하기][13]를 포함하여 플랫폼의 다른 부분과 연결되는 정보를 수집합니다.

{{< img src="tracing/visualization/trace_view.png" alt="트레이스 보기" >}}

## 트레이스 컨텍스트 전파 {#trace-context-propagation}

트레이스 컨텍스트 전파는 분산 시스템에서 서비스 간에 트레이스 식별자를 전달하는 방법입니다. 이를 통해 Datadog은 서로 다른 서비스의 개별 스팬을 하나의 분산 트레이스로 연결할 수 있습니다. 트레이스 컨텍스트 전파는 요청이 시스템을 통과하는 동안 HTTP 헤더에 트레이스 ID 및 상위 스팬 ID와 같은 식별자를 주입하여 작동합니다. 다운스트림 서비스는 이러한 식별자를 추출한 다음 트레이스를 계속 진행합니다. 이를 통해 Datadog은 여러 서비스에 걸쳐 요청의 전체 경로를 재구성할 수 있습니다.

자세한 내용은 [트레이스 컨텍스트 전파][27]를 참조하세요.

## 보존 필터 {#retention-filters}

UI에서 [태그 기반 필터를 설정][19]하여 15일 동안 스팬을 인덱싱하고 이를 [트레이스 검색 및 분석][14]에 사용합니다.

## Ingestion Controls {#ingestion-controls}

서비스의 [모든 트레이스][20]를 Datadog에 전송하고 [태그 기반 보존 필터](#retention-filters)와 결합하여 비즈니스에 중요한 트레이스를 15일 동안 보관합니다.

## 계측 {#instrumentation}

계측은 애플리케이션에 코드를 추가하여 트레이스, 메트릭 및 로그와 같은 관찰 가능성 데이터를 Datadog에 캡처하고 보고하는 프로세스입니다. Datadog은 다양한 프로그래밍 언어와 프레임워크를 위한 계측 라이브러리를 제공합니다.

Datadog Agent를 [단일 단계 계측][24] 방식으로 설치하면 애플리케이션을 자동으로 계측할 수 있으며, 코드에 [Datadog SDK를 수동으로 추가][25]하면 애플리케이션을 계측할 수 있습니다.

트레이스 코드를 애플리케이션 코드에 직접 삽입하면 사용자 정의 계측을 사용할 수 있습니다. 이를 통해 Datadog으로 보내는 트레이스를 프로그래밍 방식으로 생성, 수정 또는 삭제할 수 있습니다.

자세한 내용은 [애플리케이션 계측][26]을 참조하세요.

## Baggage {#baggage}

Baggage는 분산 시스템에서 서비스 경계를 넘어 키-값 쌍(즉, baggage 항목) 등을 전파할 수 있도록 합니다. 트레이스 식별자에 중점을 둔 트레이스 컨텍스트와 달리, Baggage는 트레이스와 함께 비즈니스 데이터 및 기타 맥락 정보를 전송할 수 있습니다.  

자세한 내용은 애플리케이션의 언어에서 지원되는 [전파 형식][28]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/extend/guide/data-collection-resolution/
[3]: /ko/tracing/setup/
[4]: /ko/internal_developer_portal/catalog/
[5]: /ko/tracing/services/services_map/
[6]: /ko/tracing/services/service_page/
[7]: /ko/tracing/services/resource_page/
[8]: /ko/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /ko/tracing/manual_instrumentation/
[10]: /ko/tracing/opentracing/
[11]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[12]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /ko/tracing/metrics/runtime_metrics/
[14]: /ko/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /ko/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors/create
[18]: /ko/tracing/trace_explorer/query_syntax/#facets
[19]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /ko/tracing/trace_pipeline/ingestion_controls/
[21]: /ko/glossary/#span
[22]: /ko/glossary/
[23]: /ko/monitors/types/apm/
[24]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /ko/tracing/trace_collection/
[27]: /ko/tracing/trace_collection/trace_context_propagation
[28]: /ko/tracing/trace_collection/trace_context_propagation/#supported-formats