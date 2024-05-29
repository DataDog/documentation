---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
aliases:
- /ko/tracing/faq/terminology
- /ko/tracing/guide/terminology
- /ko/tracing/guide/distributed_tracing/
- /ko/tracing/advanced/
- /ko/tracing/api
- /ko/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
description: 성능 향상을 위해 코드 계측
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: 릴리스 노트
  text: 최신 Datadog 애플리케이션 성능 모니터링(APM) 릴리스를 확인하세요!(앱 로그인 필수)
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: 블로그
  text: 애플리케이션 성능의 과거 추세를 추적하기 위해 범위 기반 메트릭을 생성하세요
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM 보안 뷰를 통해 위험, 취약점 및 공격에 대한 가시성을 확보하세요
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog을 통해 Azure App Service에서 Linux 웹 앱을 모니터링하세요
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: 블로그
  text: Datadog API 카탈로그를 사용하여 API 성능, 보안 및 소유권을 관리하세요
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 대화형 세션에 참여하여 애플리케이션 성능 모니터링(APM)에 대한 이해도를 높이세요
kind: 설명서
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

## 개요

Datadog 애플리케이션 성능 모니터링(APM)은 애플리케이션에 대한 심층적인 가시성을 제공하여 성능 병목 현상을 식별하고, 문제를 트러블슈팅하며,  서비스를 최적화할 수 있도록 해줍니다. 분산 추적, 즉시 사용 가능한 대시보드 및 기타 원격 측정 데이터와의 원활한 연계를 통해 Datadog APM은 애플리케이션을 위한 최상의 성능과 사용자 경험을 보장할 수 있도록 해줍니다.

Datadog APM에서 사용되는 용어에 대해 자세히 알아보려면 [APM 용어 및 개념][1]을 참조하세요.

## 시작하기

Datadog APM을 시작하는 가장 간단한 방법은 단일 단계 계측을 사용하는 것입니다. 이 접근 방식은 추가 설정 단계 없이 한 단계로 Datadog Agent를 설치하고 애플리케이션을 계측합니다. 자세한 내용은 [단일 단계 계측][27]을 참조하세요.

더 많은 커스터마이제이션이 필요한 설정의 경우 Datadog은 Datadog 추적 라이브러리를 사용하여 커스텀 계측을 지원합니다. 자세한 내용은 [애플리케이션 계측][2]을 읽어보세요.

## 사용 사례

Datadog 애플리케이션 성능 모니터링(APM)이 사용 사례를 지원하는 방법을 확인하세요.

| 원하는 작업| Datadog 애플리케이션 성능 모니터링(APM) 지원 방법 |
| ----------- | ----------- |
| 시스템을 통한 요청 흐름을 이해하세요. | [트레이스 탐색기][21]를 사용하여 분산 서비스 전반에 걸쳐 엔드 투 엔드 트레이스를 쿼리하고 시각화합니다. |
| 개별 서비스의 서비스 상태와 성능을 모니터링합니다. | [서비스][26] 및 [리소스 페이지][28]를 사용하면 성능 지표를 분석하고 배포를 추적하며 문제가 있는 리소스를 식별하여 서비스 상태를 평가할 수 있습니다. |
| 트레이스를 DBM, RUM, 로그, 신서틱(Synthetic) 및 프로필과 연계합니다. | [애플리케이션 성능 모니터링(APM) 데이터와 다른 원격 측정 데이터 연계][20]를 통해 데이터에 컨텍스트를 부여하여 보다 포괄적인 분석을 할 수 있습니다. |
| 데이터가 Datadog로 이동하는 흐름을 제어하세요. | [수집 제어][6]를 사용하여 수집 설정 및 샘플링 속도를 서비스 및 리소스별로 조정합니다. [보존 기간 필터][7]를 사용하여 15일 동안 보존할 스팬(span)을 선택합니다. |

### Trace Explorer

[트레이스 탐색기][21]를 사용하면 트레이스를 실시간으로 검색 및 분석할 수 있습니다. 성능 병목 현상을 파악하고, 오류를 트러블슈팅하고, 관련 로그 및 메트릭에 활용하여 모든 문제에 대한 전체 컨텍스트를 파악할 수 있습니다.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="트레이스 탐색기 보기" style="width:100%;" >}}

### 서비스 페이지

[서비스 페이지][26]는 서비스 성능 모니터링 및 [배포 중 버전 간 비교][15]에 도움이 됩니다.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="서비스 페이지의 버전" style="width:100%;">}}

### 트레이스와 다른 텔레메트리 연계

Datadog 애플리케이션 성능 모니터링(APM)은 로그, 실제 사용자 모니터링(RUM), 신서틱(Synthetic) 모니터링 등과 원활하게 통합됩니다:

- [애플리케이션 로그와 트레이스를 나란히 확인하여][9]를 특정 요청, 서비스 또는 버전에 대한 로그를 찾습니다.
- 백엔드 성능이 사용자 경험에 미치는 영향을 이해하기 위해 [RUM 세션을 백엔드 트레이스와 연결][10]을 참조하세요.
- [신서틱(Synthetic) 테스트와 트레이스를 연결하여][11]을 연결하여 프론트엔드 및 백엔드 요청 전반의 오류를 트러블슈팅합니다.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="로그와 트레이스 연결" style="width:100%;">}}

### 수집 제어 및 보존 기간 필터

트레이스는 계측된 애플리케이션에서 시작하여 Datadog로 이동합니다.

Datadog 애플리케이션 성능 모니터링(APM)은 트레이스 데이터의 양과 보존 기간을 관리할 수 있는 도구를 제공합니다. [수집 제어][6]를 사용하여 샘플링 속도를 조정하고 [보존 기간 필터][7]를 사용하여 저장되는 스팬(span)을 제어할 수 있습니다.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Datadog APM을 통한 데이터 흐름" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/
[2]: /ko/tracing/trace_collection/
[3]: /ko/tracing/trace_collection/proxy_setup/
[4]: /ko/serverless/distributed_tracing
[5]: /ko/tracing/trace_collection/otel_instrumentation/
[6]: /ko/tracing/trace_pipeline/ingestion_controls/
[7]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /ko/tracing/trace_pipeline/generate_metrics/
[9]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[10]: /ko/real_user_monitoring/platform/connect_rum_and_traces
[11]: /ko/synthetics/apm/
[12]: /ko/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /ko/tracing/services/services_map/
[14]: /ko/tracing/services/service_page/
[15]: /ko/tracing/services/deployment_tracking/
[16]: /ko/profiler/
[17]: /ko/tracing/trace_collection/automatic_instrumentation/
[18]: /ko/tracing/trace_collection/custom_instrumentation/
[19]: /ko/tracing/metrics/
[20]: /ko/tracing/other_telemetry/
[21]: /ko/tracing/trace_explorer/
[22]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /ko/agent/
[24]: /ko/tracing/metrics/metrics_namespace/
[25]: /ko/tracing/metrics/runtime_metrics/
[26]: /ko/tracing/services/service_page/
[27]: /ko/tracing/trace_collection/single-step-apm/
[28]: /ko/tracing/services/resource_page/