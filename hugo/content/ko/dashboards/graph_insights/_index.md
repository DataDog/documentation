---
description: 메트릭 상관관계, Watchdog Explains, 대시보드 이상 탐지를 사용하여 불규칙한 메트릭 동작을 분석하고 잠재적인
  근본 원인을 파악합니다.
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: 설명서
  text: Watchdog Insights에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: 블로그
  text: 이상 탐지와 예측 상관관계 - AI 지원 메트릭 모니터링 활용
title: 그래프 인사이트
---
## 개요 {#overview}

그래프 인사이트는 비슷한 시기에 불규칙한 동작을 보인 다른 메트릭을 검색하여 관찰된 문제의 잠재적인 근본 원인을 찾는 데 도움이 될 수 있습니다. 메트릭 상관관계는 대시보드, 통합, APM, 사용자 지정 메트릭 등 다양한 소스의 메트릭을 스캔합니다.

## 메트릭 상관관계 {#metric-correlations}

<div class="alert alert-info">메트릭 상관관계는 데이터 소스가 <strong>메트릭</strong>인 <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">시계열 위젯</a>에서 사용할 수 있습니다.</div>

검색 대상을 더 효과적으로 지정하기 위해 메트릭 상관관계는 관련 대시보드 및 서비스에 대한 정보를 사용합니다. 상관관계는 APM, 통합, 대시보드를 포함한 다양한 소스의 메트릭과 사용자가 선택한 임의의 메트릭 네임스페이스를 분석할 수 있습니다. 해당 기간 동안 다른 메트릭의 불규칙성을 검색하여 Datadog이 더 효율적인 근본 원인 분석을 촉진하는 단서를 자동으로 제공할 수 있도록 합니다.

자세한 내용은 [메트릭 상관관계][1] 설명서를 참조하세요.

## Watchdog Explains {#watchdog-explains}

<div class="alert alert-info">Watchdog Explains는 데이터 소스가 <strong>메트릭</strong>인 <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">시계열 위젯</a>에서 사용할 수 있습니다.</div>

Datadog은 애플리케이션 성능에 대한 인사이트를 제공하기 위해 메트릭, 트레이스, 로그를 포함한 다양한 유형의 데이터를 수집하며, 이를 통해 어떤 일이 어떻게, 왜 발생하고 있는지 알려줍니다. Watchdog Explains는 지연 시간, 오류율, 요청 수 변화와 같은 상위 수준의 추세를 분석하여 중요한 신호를 탐지합니다. 이러한 그래프에서 급증 현상이 관찰되면 Watchdog Explains는 우선 확인해야 할 다음과 같은 질문을 조사하는 데 도움이 됩니다.
- 급증이 발생한 출처가 무엇입니까?
- 이 이상 현상은 모든 사용자에게 영향을 미칩니까, 아니면 일부에만 국한된 인시던트입니까?

자세한 내용은 [Watchdog Explains][2] 설명서를 참조하세요.

## 대시보드 이상 탐지 {#dashboard-anomaly-detection}

<div class="alert alert-info">이상 탐지는 데이터 소스가 <strong>메트릭</strong>인 <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">시계열 위젯</a>에서 사용할 수 있습니다.</div>

Datadog은 대시보드의 그래프 전반에서 이상을 감지하고 함께 발생하는 이상을 하나의 이슈로 그룹화합니다. Datadog은 각 이슈에서 이상 현상에 가장 큰 영향을 미친 태그를 식별합니다. Watchdog Explains로 단일 그래프를 분석하거나 Bits Investigation에 근본 원인 분석을 위임할 수 있습니다.

자세한 내용은 [대시보드 이상 조사][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/graph_insights/correlations/
[2]: /ko/dashboards/graph_insights/watchdog_explains/
[3]: /ko/dashboards/graph_insights/investigate_anomalies/