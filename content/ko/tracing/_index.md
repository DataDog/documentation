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
  text: 최신 Datadog APM 릴리스를 확인하세요! (앱 로그인 필요).
- link: /tracing/guide/setting_primary_tags_to_scope/
  tag: 설명서
  text: 트레이스에 기본 및 보조 태그를 추가하세요
- link: /tracing/guide/security/
  tag: 설명서
  text: 트레이스에서 PII를 자동으로 제거하세요
- link: /tracing/metrics/metrics_namespace/
  tag: Documentation
  text: 트레이스 메트릭 및 해당 태그에 대해 자세히 알아보세요
- link: /tracing/glossary/
  tag: 설명서
  text: APM 용어 및 개념에 대해 알아보세요
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

Datadog APM(애플리케이션 성능 모니터링)은 웹 서비스, 대기열 및 데이터베이스의 **즉시 사용 가능한 성능 대시보드**를 통해 요청, 오류 및 지연 시간을 모니터링하고 애플리케이션에 대한 심층적인 가시성을 제공합니다. 분산 추적은 호스트, 컨테이너, 프록시 및 서버리스 기능 전체에서 브라우저 세션, 로그, 프로필, 합성 검사, 네트워크, 프로세스 및 인프라스트럭처 메트릭과 **원활하게 상호 연관**됩니다. 느린 트레이스 조사에서 코드 핫스팟으로 인해 성능 병목 현상을 일으키는 **특정 코드 줄 식별**까지 직접 탐색합니다.

Datadog APM에서 사용되는 용어에 대해 자세히 알아보려면 [APM 용어 및 개념][1]을 참조하세요.

## 시작하기

모놀리스에서 마이크로서비스로 전환할 때 호스트, 컨테이너 또는 서버리스 기능 전반에 걸쳐 Datadog APM을 설정하는 데 단 몇 분 밖에 걸리지 않습니다.

<div class="alert alert-info">
<strong>베타: 단일 단계 APM 계측</strong> - Datadog Agent를 설치할 때 APM 계측을 활성화하면 애플리케이션 성능 모니터링을 빠르게 시작할 수 있습니다. 이 옵션은 코드를 수정할 필요 없이 자동으로 서비스를 계측합니다. 자세한 내용은 <a href="/tracing/trace_collection/single-step-apm">단일 단계 APM 계측</a>을 읽어보세요..
</div>

**Datadog APM을 시작하려면 [애플리케이션 계측][2]을 읽어보세요.**

[프록시 추적][3], [AWS Lambda 함수][4] 추적, [자동][17] 또는 [커스텀 계측][18] 사용 등 사용자의 환경과 언어에 맞는 Datadog 추적 라이브러리를 추가하세요.

## Datadog으로 유입되고 보관되는 데이터를 제어하고 관리합니다.

{{< img src="tracing/apm_lifecycle/apm_lifecycle_0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="APM Lifecycle" >}}

트레이스는 계측된 애플리케이션에서 시작되어 Datadog으로 유입됩니다. 처리량이 많은 서비스의 경우 [수집 제어][6]를 사용하여 수집을 확인하고 제어할 수 있습니다. 수집된 모든 트레이스는 15분 동안 실시간 검색 및 분석에 사용할 수 있습니다. 커스텀 태그 기반 [보존 필터][7]를 사용하여 검색 및 분석을 위해 15일 동안 비즈니스에 중요한 트레이스를 정확하게 유지할 수 있습니다.

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="트레이스 보존 및 수집" style="width:100%;">}}

## 스팬에서 커스텀 메트릭 생성

수집된 모든 스팬을 15개월 동안 보존하여 시간 경과에 따른 주요 비즈니스 및 성과 지표를 생성하고 모니터링하는 [메트릭을 생성합니다][8].

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="수집된 스팬에서 커스텀 메트릭 생성" style="width:100%;">}}

## 트레이스를 다른 텔레메트리와 상호 연결

자동 트레이스 ID 수집을 통해 단일 분산 요청에 대한 트레이스를 애플리케이션 로그와 나란히 확인할 수 있습니다. [실제 사용자 세션과][10] 트레이스를 연결하여 사용자 경험 및 보고된 문제에 해당하는 정확한 트레이스를 확인하세요. [시뮬레이션 테스트를][11] 트레이스에 연결하여 프런트엔드, 네트워크 및 백엔드 요청 전반에 걸친 실패의 원인을 찾습니다.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="로그와 트레이스 연결" style="width:100%;">}}

## 라이브 및 인덱싱된 트레이스 탐색

원하는 태그로 [수집된 트레이스를 검색하세요][12] (15분 동안 실시간). 중단 기간 동안 모든 스팬에서 태그별로 성능을 분석하여 영향을 받은 사용자 또는 트랜잭션을 식별하세요. 요청 플로우를 보여주는 맵과 기타 시각화를 통해 코드가 어떤 작업을 수행하고 있는지, 성능을 개선할 수 있는 부분은 어디인지 파악할 수 있습니다.

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search List 보기" video="true" >}}

## 서비스에 대한 심층적인 인사이트를 확보하세요

서비스 성능 메트릭과 함께 트레이스에서 자동 생성된 서비스 맵을 사용하여 [서비스 종속성을 이해][13]하고 경고 상태를 모니터링합니다.

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="서비스 맵" video=true style="width:100%;">}}

요청, 오류 및 지연 시간 백분위수에 대한 [서비스 메트릭을 모니터링하세요][14]. 인프라스트럭처와 관련된 개별 데이터베이스 쿼리 또는 엔드포인트를 분석합니다.

{{< img src="tracing/index/ServicePage.png" alt="서비스 페이지" style="width:100%;">}}

[서비스 성능을 모니터링][15]하고 롤링, 블루/그린, 섀도우 또는 카나리 배포 버전을 비교합니다.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="서비스 페이지의 버전" style="width:100%;">}}

## 프로덕션 코드 프로파일링

[애플리케이션 지연 시간을 개선][16]하고 상시 프로덕션 프로파일링을 통해 컴퓨팅 리소스를 최적화하여 가장 많은 CPU, 메모리 또는 I/O를 소비하는 코드 라인을 찾아냅니다.

{{< img src="tracing/index/Profiling.png" alt="프로파일링" style="width:100%;">}}


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