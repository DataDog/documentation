---
description: Metrics Overview 페이지를 사용하여 메트릭 소스를 탐색하고 Datadog 제품에서 메트릭을 생성하며 고급 플랫폼
  기능을 사용할 수 있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: 블로그
  text: Metrics without Limits™를 사용하여 동적으로 사용자 지정 메트릭 볼륨 제어
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 메트릭을 최대한으로 활용해 보세요.
- link: /metrics/units
  tag: 설명서
  text: 메트릭 단위
title: Metrics Overview 페이지
---
## 개요 {#overview}

Metrics Overview 페이지는 모든 경험 수준의 사용자에게 메트릭 환경에 대한 더 깊은 이해를 제공합니다. 여기서는 Datadog 메트릭의 가치를 극대화하는 방법에 대한 지침을 제공합니다. 

Metrics Overview 페이지를 통해 다음 방법을 알아볼 수 있습니다. 
- 메트릭 소스 탐색
- Datadog 제품에서 추가 메트릭 생성
- 백분위수, Metrics without Limits™, 과거 메트릭 수집과 같은 고급 플랫폼 기능 사용

## 메트릭이 Datadog에서 흐르는 방식 {#how-your-metrics-flow-through-datadog}

{{< img src="metrics/overview/how_metrics_flow.png" alt="Metrics Overview 페이지의 메트릭이 Datadog을 통해 흐르는 방식 섹션" >}}

이 섹션에는 모든 메트릭 소스, 메트릭 데이터에 적용되는 추가 처리 및 구성, 표준 메트릭과 사용자 지정 메트릭의 볼륨 분석이 표시됩니다.

**참고**: Overview 페이지는 메트릭 비용 관리를 위한 전용 페이지가 아닙니다. 비용 최적화 방법에 대한 자세한 내용은 [사용자 지정 메트릭 거버넌스 모범 사례][25]를 참조하세요.

### 메트릭 소스 {#metric-sources}

{{< ui >}}Metric Sources{{< /ui >}} 열은 Datadog에 보고하는 메트릭 소스의 요약을 보여줍니다. 소스 중 하나를 클릭하여 해당 소스로 범위가 지정된 [Metrics Catalog][2]를 엽니다. Datadog 메트릭은 다음 소스에서 생성될 수 있습니다.

{{% collapse-content title="Datadog Agent" level="h4" %}}
[Datadog Agent][3]는 설치된 호스트에서 메트릭을 수집하여 Datadog으로 전달합니다. 이러한 메트릭은 다음 항목에서 생성될 수 있습니다.

   - Agent와 함께 번들로 제공되는 공식 Datadog 통합 중 하나. 사용 가능한 Agent 기반 통합의 전체 목록은 [통합 코어 리포지토리][4]를 참조하세요.
   - [DogStatsD][6], Datadog Agent와 함께 번들로 제공되는 메트릭 집계 서비스. DogStatsD는 몇 가지 Datadog 전용 확장 프로그램을 포함하여 [StatsD][7] 프로토콜을 구현합니다.
   - [사용자 지정 검사][8], 사용자 지정 애플리케이션이나 고유한 시스템에서 메트릭을 수집하는 데 사용됩니다. Agent의 구성 파일에서 검사 로직을 직접 정의합니다. 자세한 내용은 [사용자 지정 Agent 검사 작성][9]을 참조하세요.
   - Agent에 설치된 [Marketplace 통합][10]. [Datadog Marketplace][11]는 기술 파트너가 Datadog 사용자에게 제공할 유료 상품을 등록할 수 있는 디지털 Marketplace입니다.

{{% /collapse-content %}}

{{% collapse-content title="클라우드 통합" level="h4" %}}
인증 기반 통합이라고도 하는 이러한 통합은 Datadog에서 설정됩니다. 메트릭을 얻기 위한 자격 증명을 제공하면 Datadog이 귀하를 대신하여 API 호출을 수행하여 메트릭을 수집합니다. 일반적인 예로는 클라우드 공급자 통합, Slack, PagerDuty가 있습니다. 자세한 내용은 개발자 설명서의 [API 기반 통합][12]을 참조하세요.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog API" level="h4" %}}
[Metrics API][13]로 직접 메트릭을 보낼 수 있습니다.
{{% /collapse-content %}} 

Datadog은 총 {{< translate key="integration_count" >}} 개가 넘는 통합이 있습니다. 통합 관리에 대한 자세한 내용은 [통합 관리][5]를 참조하세요.

### 구성 가능한 처리 {#configurable-processing}

{{< ui >}}Configurable Processing{{< /ui >}} 열에는 메트릭의 가치를 높이는 데 사용할 수 있는 다양한 고급 구성 옵션이 나열되어 있습니다. 자세한 내용과 관련 구성 화면으로 연결되는 링크를 보려면 옵션 중 하나를 클릭하세요.

{{% collapse-content title="Metrics without Limits™를 사용하여 사용자 지정 메트릭 비용 최적화" level="h4" %}}
[Metrics without Limits™][19]는 조직에 가장 가치 있는 메트릭 태그만 인덱싱하여 사용자 지정 메트릭 비용을 관리하도록 돕습니다. Metrics without Limits™ 사용은 Overview 페이지 상단 섹션에서 {{< ui >}}Selected Metrics{{< /ui >}}로 표시됩니다. 사용자 지정 메트릭 비용 관리에 대한 자세한 내용은 [사용자 지정 메트릭 거버넌스 모범 사례][22]를 참조하세요.
{{% /collapse-content %}} 

{{% collapse-content title="분포 메트릭에 대해 백분위수 활성화" level="h4" %}}
백분위수가 활성화된 [분포 메트릭][20]은 모든 호스트로부터 서버 측에서 계산된 전역적으로 정확한 백분위수를 제공하므로 분산 인프라 전반에서 통계적 분포를 측정할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="다른 Datadog 제품에서 메트릭 생성" level="h4" %}}
일부 제품은 표준 메트릭을 통합하여 즉시 인사이트를 제공합니다(예: APM). 

##### 로그 {#logs}

[수집된 로그에서 사용자 지정 메트릭 생성][14]을 수행하면 Datadog에 의해 수집된 모든 로그의 데이터를 요약할 수 있습니다. 따라서 장기 검색의 경우 로그가 인덱싱되지 않더라도 환경에 중요한 로그 데이터를 시각화하고 경보를 설정할 수 있습니다.

##### APM {#apm}

[수집된 스팬에서 사용자 지정 메트릭 생성][15]을 수행하면 비즈니스 컨텍스트에 중요한 모든 파라미터의 이상 징후와 추세를 시각화할 수 있습니다.

##### RUM(Real User Monitoring) {#real-user-monitoring-rum}

[RUM 이벤트에서 사용자 지정 메트릭 생성][16]을 수행하면 RUM 이벤트의 데이터를 요약하여 조직에 가장 큰 영향을 미치는 사용자 행동을 시각화하고 경보를 설정할 수 있습니다.

##### 프로세스 {#processes}

[프로세스 기반 사용자 지정 메트릭 생성][17]을 수행하면 프로세스의 리소스 소비와 비즈니스 요구 사항에 중요할 수 있는 기타 프로세스 관련 동작을 모니터링할 수 있습니다.

##### 이벤트 {#events}

[이벤트 기반 사용자 지정 메트릭 생성][18]을 수행하면 모니터 경보나 Datadog에 의해 수집된 기타 이벤트 기반 데이터에 대한 가시성을 확보할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="과거 메트릭 수집" level="h4" %}}
[과거 메트릭 수집][21]을 사용하면 제출 시점으로부터 1시간 이상 지난 타임스탬프가 포함된 메트릭 값을 수집할 수 있습니다.
{{% /collapse-content %}} 

### 사용 가능한 메트릭 {#available-metrics}

{{< ui >}}Available Metrics{{< /ui >}} 열은 지난 한 달 동안의 표준 메트릭과 사용자 지정 메트릭별 총 메트릭 볼륨을 분류합니다. 사용자 지정 메트릭 볼륨을 관리하려면 [Best Practices for Custom Metrics Governance 페이지][25]와 [Metrics Catalog 페이지][26]에서 자세한 인사이트를 확인하세요.

## 소스별 메트릭 {#your-metrics-by-source}

이 섹션에는 메트릭 소스와 각 볼륨을 개략적으로 보여주는 트리 맵이 포함되어 있습니다.

{{< img src="metrics/overview/metrics_by_source.png" alt="Metrics Overview 페이지의 소스별 메트릭 섹션" >}}

## 모든 소스에서 메트릭 생성 {#generate-metrics-from-any-source}

아래 옵션 중 하나를 클릭하면 해당 제품의 {{< ui >}}Generate Metrics{{< /ui >}} 페이지로 이동하며, 여기에서 해당 제품의 사용자 지정 메트릭을 생성할 수 있습니다.
   - [수집된 로그][14]
   - [수집된 스팬][15]
   - [RUM 이벤트][16]
   - [프로세스][17]
   - [이벤트][18]

## 쿼리 가능한 메트릭 {#metrics-available-for-querying}

이 섹션에서 검색창을 사용하면 메트릭의 최신 데이터와 구성 옵션을 살펴볼 수 있습니다. 모든 태그를 검색하거나 클릭하여 [Metrics Explorer][23] 또는 [Summary][24] 페이지에서 메트릭을 자세히 조사할 수 있습니다.

{{< img src="metrics/overview/available_metrics.png" alt="Metrics Overview 페이지의 쿼리 가능한 메트릭 섹션" >}}

## 추가 자료 {#further-reading}

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
[24]: https://app.datadoghq.com/metric/catalog
[25]: /ko/metrics/guide/custom_metrics_governance/
[26]: /ko/metrics/volume/