---
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: 블로그
  text: 제한없는 메트릭 수집TM을 통한 동적 커스텀 메트릭 볼륨 조절
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 대화형 세션에 참여해 메트릭을 최대한으로 활용해 보세요.
- link: /metrics/units
  tag: 설명서
  text: 메트릭 단위
title: Metrics Overview Page
---

## 개요

Metrics Overview Page는 모든 숙련도의 사용자가 메트릭 현황을 심층적으로 이해할 수 있도록 도와드립니다. 아울러 Datadog 메트릭의 가치를 극대화할 수 있는 방법에 대한 지침도 제공합니다.

Metrics Overview Page를 통해 다음 작업 방식을 알아보세요.
- 메트릭 소스 탐색하기
- Datadog 제품을 활용해 추가 메트릭 생성하기
- 백분위수, Metrics without LimitsTM, 과거 메트릭 수집 등의 고급 플랫폼 기능 활성화하기

## Datadog을 통한 메트릭 플로 파악하기

{{< img src="metrics/overview/how_metrics_flow.png" alt="Metrics Overview Page의 Datadog을 통한 메트릭 플로 섹션" >}}

본 섹션에서 모든 메트릭 소스, 메트릭 데이터에 적용된 추가 처리 및 설정, 표준 메트릭과 커스텀 메트릭의 볼륨(사용량) 상세 내역을 확인할 수 있습니다.

**참고**: Overview Page는 메트릭 비용 관리 전용 페이지가 아닙니다. 비용 최적화 방법에 대한 자세한 내용은 [커스텀 메트릭 거버넌스 모범 사례][25]를 참고하세요.

### 메트릭 소스

**Metric Sources** 열에는 Datadog으로 보고되는 메트릭 소스의 요약 정보가 표시됩니다. 소스 중 하나를 클릭하면 해당 소스로 범위가 한정된 [요약 페이지][2]가 열립니다. Datadog 메트릭의 출처 소스는 다음과 같습니다.

{{% collapse-content title="Datadog Agent" level="h4" %}}
[Datadog Agent][3]는 설치된 호스트에서 메트릭을 수집하여 Datadog으로 포워딩합니다. 해당 메트릭의 출처는 다음과 같습니다.

   - Agent에 포함된 공식 Datadog 통합 서비스. 사용 가능한 Agent 기반 통합 서비스의 전체 목록은 [integrations-core 리포지토리][4]를 참조하세요.
   - Datadog Agent에 포함된 메트릭 집계 서비스인 [DogStatsD][6]. DogStatsD는 [StatsD][7] 프로토콜을 따르며, 여기에 Datadog 전용 확장 기능이 추가되었습니다.
   - 커스텀 애플리케이션이나 고유한 시스템에서 메트릭을 수집하는 데 사용되는 [커스텀 점검][8]. 사용자는 Agent의 설정 파일에서 점검 로직을 직접 정의할 수 있습니다. 자세한 내용은 [커스텀 Agent 점검 작성하기][9]를 참조하세요.
   - Agent에 설치된 [Marketplace 통합][10]. [Datadog Marketplace][11]는 기술 파트너가 Datadog 사용자에게 유료 제품을 선보일 수 있는 디지털 마켓입니다.

{{% /collapse-content %}}

{{% collapse-content title="Cloud integrations" level="h4" %}}
인증 기반 통합으로도 알려진 본 통합은 Datadog 내부에서 설정됩니다. 사용자가 메트릭 수집을 위한 인증 정보를 제공하면, Datadog이 사용자를 대신해 API를 호출하여 데이터를 수집합니다. 일반적인 예로 클라우드 제공업체 통합, Slack, PagerDuty 등이 있습니다. 자세한 내용은 개발자 문서의 [API 기반 통합][12]를 참조하세요.
{{% /collapse-content %}}

{{% collapse-content title="Datadog API" level="h4" %}}
[Metrics API][13]에 메트릭을 직접 전송할 수 있습니다.
{{% /collapse-content %}} 

Datadog은 총 {{< translate key="integration_count" >}}개 이상의 통합을 제공합니다. 자세한 통합 관리 정보는 [통합 관리][5]를 참조하세요.

### Configurable Processing

**Configurable Processing** 열에는 메트릭의 가치를 높이는 다양한 고급 설정 옵션이 나열되어 있습니다. 각 옵션을 클릭하면 자세한 정보와 관련 구성 화면 링크를 확인할 수 있습니다.

{{% collapse-content title="Optimize your custom metrics costs with Metrics without LimitsTM" level="h4" %}}
[Metrics without LimitsTM][19]는 조직에 가장 중요한 메트릭 태그만 인덱싱하여 커스텀 메트릭 비용을 관리하도록 도와드립니다. Metrics without LimitsTM의 사용 내역은 Overview 페이지 상단 섹션의 **Selected Metrics**에 표시됩니다. 커스텀 메트릭 비용 관리에 대한 자세한 내용은 [커스텀 메트릭 거버넌스 모범 사례][22]를 참조하세요.
{{% /collapse-content %}} 

{{% collapse-content title="Enable percentiles on distribution metrics" level="h4" %}}
[분포 메트릭][20]에서 백분위수를 활성화하면, 모든 호스트의 데이터를 서버 측에서 계산한 정확한 전역 백분위수를 제공하여 전체 분산 인프라의 통계적 분포를 측정할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="Generate metrics from other Datadog products" level="h4" %}}
일부 제품은 기본 메트릭을 통합하여 인사이트를 즉시 제공하기도 합니다(예: APM).

##### 로그

[수집된 로그에서 커스텀 메트릭을 생성][14]하여 Datadog이 수집한 모든 로그 데이터를 요약할 수 있습니다. 이렇게 하면 로그가 장기 검색용으로 인덱싱되지 않았더라도, 환경 내에서 중요한 로그 데이터를 시각화하고 알림을 설정할 수 있습니다.

##### APM

[수집된 스팬에서 커스텀 메트릭을 생성][15]하여 비즈니스 맥락에서 중요한 모든 파라미터의 이상치와 추세를 시각화할 수 있습니다.

##### Real User Monitoring(RUM)

[RUM 이벤트에서 커스텀 메트릭을 생성][16]하여 RUM 이벤트 데이터를 요약해 조직에 가장 큰 영향을 미치는 사용자 행동을 시각화하고 알림을 설정할 수 있습니다.

##### 프로세스

[프로세스 기반 커스텀 메트릭을 생성][17]하여 프로세스의 리소스 소비는 물론, 비즈니스 니즈에 중요한 기타 모든 프로세스 관련 동작을 모니터링할 수 있습니다.

##### 이벤트

[이벤트 기반 커스텀 메트릭을 생성][18]하여 모니터 알림이나 Datadog이 수집한 기타 모든 이벤트 기반 데이터에 대한 가시성을 확보할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="Ingest historical metrics" level="h4" %}}
[과거 메트릭 수집][21] 기능으로 제출 시점을 기준으로 한 시간 이상 경과한 타임스탬프를 포함한 메트릭 값을 수집할 수 있습니다.
{{% /collapse-content %}} 

### Available Metrics

**Available Metrics** 열은 지난 한 달 동안의 전체 메트릭 사용량을 표준 메트릭 및 커스텀 메트릭별로 나타냅니다. 커스텀 메트릭 볼륨(사용량)을 관리하고 싶다면 [커스텀 메트릭 거버넌스 모범 사례 페이지][25]와 [메트릭 볼륨(사용량) 관리 페이지][26]에서 자세한 인사이트를 얻으세요.

## 소스별 메트릭

본 섹션에는 메트릭 소스와 각 볼륨(사용량)을 요약하여 나타낸 트리맵이 포함되어 있습니다.

{{< img src="metrics/overview/metrics_by_source.png" alt="Metrics Overview 페이지의 소스별 메트릭 섹션" >}}

## 소스에서 메트릭 생성하기

아래 옵션 중 하나를 클릭하면 해당 제품의 Generate Metrics 페이지로 이동하며, 다음 제품의 데이터를 활용해 커스텀 메트릭을 생성할 수 있습니다.
   - [수집된 로그][14]
   - [수집된 스팬][15]
   - [RUM 이벤트][16]
   - [프로세스][17]
   - [이벤트][18]

## 쿼리 가능한 메트릭

본 섹션의 검색창으로 모든 메트릭의 최신 데이터 및 구성 옵션을 조회할 수 있습니다. 메트릭에 포함된 모든 태그로 검색하거나 클릭하면 [Metrics Explorer][23] 또는 [Summary][24] 페이지로 이동하여 해당 메트릭을 더욱 상세히 조사할 수 있습니다.

{{< img src="metrics/overview/available_metrics.png" alt="Metrics Overview 페이지의 쿼리 가능한 메트릭 섹션" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/
[2]: /ko/metrics/summary/
[3]: /ko/agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /ko/agent/guide/integration-management/
[6]: /ko/extend/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /ko/extend/custom_checks/
[9]: /ko/extend/custom_checks/write_agent_check/
[10]: /ko/integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /ko/extend/integrations/?tab=integrations#api-based-integrations
[13]: /ko/api/latest/metrics/#submit-metrics
[14]: /ko/logs/log_configuration/logs_to_metrics/
[15]: /ko/tracing/trace_pipeline/generate_metrics/
[16]: /ko/real_user_monitoring/platform/generate_metrics/
[17]: /ko/infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /ko/events/guides/usage/#custom-metrics
[19]: /ko/metrics/metrics-without-limits/
[20]: /ko/metrics/distributions/
[21]: /ko/metrics/custom_metrics/historical_metrics/
[22]: /ko/metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/summary
[25]: /ko/metrics/guide/custom_metrics_governance/
[26]: /ko/metrics/volume/