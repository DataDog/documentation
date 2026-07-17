---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
  - trace
  - tracing
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
  text: 최신 Datadog APM 릴리스를 확인하세요! (앱 로그인 필요)
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: 학습 센터
  text: APM Metrics 및 트레이스 시작하기
- link: https://www.datadoghq.com/blog/monitor-rust-otel/
  tag: 블로그
  text: OpenTelemetry로 Rust 애플리케이션을 모니터링하는 방법
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: 블로그
  text: 애플리케이션 성능의 과거 추세를 추적하기 위해 스팬 기반 메트릭을 생성하세요.
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM 보안 뷰를 통해 위험, 취약점 및 공격에 대한 가시성 확보
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog를 통해 Azure App Service에서 Linux 웹 앱 모니터링
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: 블로그
  text: Datadog API 카탈로그로 API 성능, 보안 및 소유권 관리하기
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: 블로그
  text: Software Catalog로 개발자 경험 및 협업 개선
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버로 보안 Kubernetes 환경에 고성능 관측 가능성 실현
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 애플리케이션 성능 모니터링(APM)에 대한 이해도를 높이세요.
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠른 문제 해결
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: 블로그
  text: Datadog로 Cloud Run에서 Google Pub/Sub 워크로드 트레이스
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: 블로그
  text: 왕복 쿼리 지연 시간 분석
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  개요 또는 중급 활성화 세션에 참여해 Datadog Application Performance Monitoring(APM)이 브라우즈 및 모바일 애플리케이션에서 백엔드 서비스 및 데이터베이스까지 AI 기반, 코드 수준 분산 트레이싱을 제공하는 방법에 관해 자세히 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

Datadog Application Performance Monitoring(APM)을 이용하면 애플리케이션을 더욱 상세히 가시화할 수 있어 성능 병목을 파악하고 문제를 해결하고 서비스를 최적화할 수 있습니다. Datadog APM은 분산 추적, 기본 제공 대시보드, 다른 텔레메트리 데이터와의 원활한 상호 연결을 통해 애플리케이션의 가능한 최선의 성능과 사용자 경험을 보장하는 데 도움이 됩니다.

Datadog APM에서 사용되는 용어에 대해 자세히 알아보려면 [APM 용어 및 개념][1]을 참조하세요.

## 시작하기 {#getting-started}

Datadog APM을 시작하는 가장 간단한 방법은 Single Step Instrumentation입니다. 이 접근 방식은 추가 구성 단계가 필요 없이 애플리케이션에서 한 단계로 Datadog Agent와 계측을 설치합니다. 자세한 내용은 [Single Step Instrumentation][27]을 참조하세요.

더 많은 사용자 지정이 필요한 설정의 경우, Datadog은 Datadog SDK 및 Datadog UI의 [Dynamic Instrumentation][30]을 통해 사용자 지정 계측을 지원합니다. 자세한 내용은 [Application Instrumentation][2]을 참조하세요.

<div class="alert alert-info">Datadog APM을 처음 접하는 경우, <a href="https://docs.datadoghq.com/getting_started/tracing/">APM 시작하기</a>에서 Datadog으로 처음 트레이스를 전송하는 방법을 알아보세요.</div>

## 사용 사례 {#use-cases}

Datadog 애플리케이션 성능 모니터링(APM)이 사용 사례를 지원하는 방법을 확인하세요.

| 원하는 작업...| Datadog APM이 어디에 도움이 되는지 이해 |
| ----------- | ----------- |
| 시스템을 통한 요청 흐름을 이해하세요. | [Trace Explorer][21]를 사용하여 분산 서비스 전반에 걸쳐 엔드 투 엔드 트레이스를 쿼리하고 시각화합니다. |
| 개별 서비스의 서비스 상태 및 성능을 모니터링합니다. | [서비스][26] 및 [리소스 페이지][28]를 사용하여 성능 메트릭을 분석, 배포를 추적하고 문제 있는 리소스를 식별하여 서비스 상태를 평가합니다. |
| 트레이스를 DBM, RUM, 로스, Synthetics 및 프로필과 상호 연결합니다. | [APM 데이터를 다른 텔레메트리와 상호 연결][20]하여 데이터에 컨텍스트를 부여함으로써 더 종합적인 분석이 가능합니다. |
| 데이터가 Datadog으로 이동하는 흐름을 제어합니다. | [Ingestion Controls][6]을 사용하여 수집 구성 및 샘플링 속도를 서비스 및 리소스별로 조정합니다. [보존 필터][7]를 사용해 어느 스팬을 15일간 보존할지 선택하세요. |

### Trace Explorer {#trace-explorer}

[Trace Explorer][21]를 사용하여 실시간으로 트레이스를 검색 및 분석할 수 있습니다. 성능 병목을 식별하고, 오류를 해결하고 관련 로드 및 메트릭으로 피벗하여 어떤 문제든 전체적인 컨텍스트를 파악하세요.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Trace Explorer 뷰입니다." style="width:100%;" >}}

### 서비스 페이지 {#service-page}

[서비스 페이지][26]는 서비스 성능 모니터링 및 [배포 중 버전 간 비교][15]에 도움이 됩니다.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="서비스 페이지의 버전" style="width:100%;">}}

### 트레이스와 다른 텔레메트리 상호 연계 {#correlating-traces-with-other-telemetry}

Datadog APM은 Real User Monitoring(RUM), Synthetic 모니터링 등과 원활하게 통합됩니다.

- [애플리케이션과 트레이스를 나란히 조회][9]하여 특정 요청, 서비스 또는 버전의 로그를 찾습니다.
- [RUM 세션을 백엔드 트레이스와 연결][10]하여 백엔드 성능이 사용자 경험에 어떤 영향을 미치는지 알아봅니다.
- [Synthetic 테스트를 트레이스와 연결][11]하여 프런트엔드 및 백엔드 요청 전반의 오류를 문제 해결합니다.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="로그 및 트레이스 연결" style="width:100%;">}}

### Ingestion Control 및 보존 필터 {#ingestion-controls-and-retention-filters}

트레이스는 계측된 애플리케이션에서 시작하여 Datadog로 이동합니다.

Datadog APM은 트레이스 데이터의 양과 보존을 관리하는 도구를 제공합니다. [Ingestion Controls][6]을 사용하여 샘플링 속도를 조정하고, [보존 필터][7]로는 어느 스팬을 저장할지 제어하세요.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Datadog APM을 통한 데이터 흐름." style="width:100%;" >}}

## 문제 해결 {#troubleshooting}

문제 해결에 도움이 필요한 경우, [APM 문제 해결][29] 가이드를 참조하세요.

## 추가 자료 {#further-reading}

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
[10]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm
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
[29]: /ko/tracing/troubleshooting/
[30]: /ko/tracing/dynamic_instrumentation/