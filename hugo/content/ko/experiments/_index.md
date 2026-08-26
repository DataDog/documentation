---
description: Datadog Experiments를 사용하여 스택 전반에서 무작위 실험을 계획, 실행 및 분석하세요.
further_reading:
- link: /feature_flags/
  tag: 설명서
  text: Feature Flags
- link: /product_analytics/
  tag: 설명서
  text: Product Analytics
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: 블로그
  text: 성장을 둔화시키는 제품 신호 지연 격차
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: 블로그
  text: 모든 팀이 A/B 테스트를 수행해야 하는 이유
- link: https://www.datadoghq.com/blog/experiments
  tag: 블로그
  text: Datadog Experiments로 모든 제품 변경의 비즈니스 영향을 측정하세요
title: 실험
---
## 개요 {#overview}

Datadog Experiments는 엔드투엔드 실험을 위한 컴포저블 플랫폼입니다. Datadog의 실험은 두 가지 구성 요소로 이루어집니다.

1. 두 개 이상의 변형에 대한 [피험자][18](일반적으로 사용자)의 **무작위 할당**: [Datadog Feature Flag][1] 또는 선택한 무작위화 시스템에서 제공됩니다.
2. 변형 간 비교를 위한 **메트릭** 세트: Datadog 내에서 또는 웨어하우스 네이티브 분석을 사용하여 계산됩니다.

시작하려면 아래 표에서 링크를 선택하세요. 그렇지 않은 경우 계속 읽고 Datadog Experiments에 대해 자세히 알아보세요.

| 빠른 링크 | |
| :---- | :---- |
| [데이터 웨어하우스 연결][13] | Snowflake, BigQuery, Redshift 또는 Databricks를 설정하여 웨어하우스 네이티브 실험 분석을 수행하세요. |
| [웨어하우스 네이티브 메트릭 생성][14] | 웨어하우스 데이터에서 메트릭 SQL 모델 및 실험 메트릭을 정의하세요. |
| [Product Analytics 또는 Real User Monitoring 데이터에서 메트릭 생성][15] | 클라이언트 측 RUM 및 Product Analytics 이벤트에서 실험 메트릭을 구축하세요. |
| [Datadog Feature Flags를 사용하여 실험 시작][16] | 가설을 계획하고, Feature Flags로 무작위화를 구성하고, 실험을 시작하세요. |
| [프로토콜을 사용하여 실험 표준화][21] | 메트릭, 무작위화, 기간 및 통계 분석에 대한 재사용 가능한 기본값을 정의하세요. |
| [이미 무작위화된 실험 분석][17] | 무작위화가 Datadog Feature Flags 외부에서 실행될 때 웨어하우스에서 노출 데이터를 정의하세요. |
| [실험 진단 이해][20] | 노출, 메트릭, 무작위화 및 분석 상태에 대한 자동화된 검사를 해석하세요. |

## 무작위화 {#randomization}

모든 실험에는 피험자를 대조군 또는 실험군 변형에 할당하는 방법이 필요합니다. Datadog은 두 가지 접근 방식을 지원합니다.

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][1]는 실험을 무작위화하는 기본 방법입니다. Feature Flag를 생성하고 [Feature Flags SDK][9]로 구현한 다음, 동일한 사용자가 항상 동일한 변형을 받을 수 있도록 안정적인 피험자 식별자를 `targetingKey`로 전달하세요. Datadog은 결정론적 해싱을 사용하여 세션 및 기기 전반에서 할당을 일관되게 유지합니다.

[실험 계획 및 시작][16] 시, 실험을 Feature Flag에 연결하여 트래픽 분할, 타겟팅 규칙 및 롤아웃 동작을 정의하세요. Feature Flag의 세부 정보 페이지에서 직접 실험을 생성할 수도 있습니다. 사용자가 아닌 단위(예: 조직)별로 무작위화하려면 [피험자 유형][18]을 참조하세요.

### 자체 무작위화 사용 {#bring-your-own-randomization}

Datadog 외부에서(예: 사내 시스템을 사용하여) 피험자를 무작위화하는 경우 [노출 SQL Model][17]을 사용하여 누가 언제 각 실험에 노출되었는지 Datadog에 알리세요. 노출 SQL Models는 [연결된 데이터 웨어하우스][13]에서 노출 기록을 쿼리하고 이를 피험자 키, 타임스탬프, 실험 ID, 변형 ID와 같은 Datadog 필드에 매핑합니다.

Datadog은 노출 데이터를 자동으로 중복 제거합니다. 동일한 실험에 대해 사용자가 여러 변형에 나타나는 경우, 해당 사용자는 분석에서 제외됩니다. Feature Flags 대신 데이터 웨어하우스에서 노출이 발생하는 경우 Datadog SDK 이벤트를 기반으로 구축된 메트릭은 지원되지 않으므로 [웨어하우스 네이티브 메트릭][14]이 필요합니다.

## 메트릭 {#metrics}

실험 메트릭은 변경 사항의 성공 여부를 결정하기 위해 측정할 항목을 정의합니다. 실험을 시작하기 전에 최소 하나의 기본 메트릭을 생성하고, 성능, 참여도 또는 수익에 대한 의도하지 않은 영향을 방지하기 위해 보조 메트릭을 추가하세요.

### 웨어하우스 네이티브 모드 {#warehouse-native-mode}

웨어하우스 네이티브 모드에서 Datadog은 Snowflake, BigQuery, Redshift 또는 Databricks에서 직접 실험 분석을 실행합니다. [데이터 웨어하우스를 연결][13]한 후 웨어하우스 테이블을 Datadog에 매핑하는 **메트릭 SQL 모델**을 생성한 다음 해당 모델에서 메트릭을 정의하세요. Datadog이 메트릭 이벤트를 실험 노출과 결합할 수 있도록 각 모델을 하나 이상의 [피험자 유형][18]에 매핑하고 타임스탬프 열을 지정하세요.

[노출 SQL 모델][17]을 무작위화에 사용할 경우 웨어하우스 모드가 필요합니다. 또한 비즈니스 메트릭의 정보 소스가 이미 웨어하우스에 있는 팀에게도 적합합니다.

### Product Analytics 및 RUM {#product-analytics-and-rum}

클라이언트 측 실험의 경우 [Real User Monitoring(RUM)][2] 및 [Product Analytics][3] SDK에서 수집한 이벤트로 메트릭을 구축하세요. 액션, 조회, 세션 및 기타 이벤트 유형에서 메트릭을 정의한 다음, 이벤트 수, 고유 사용자 수 또는 속성 합계와 같은 집계 방법을 선택하세요.

이 경로는 [Datadog Feature Flags][1]를 통해 무작위화가 실행되고, 웨어하우스를 쿼리하지 않고 사용자 행동, 퍼널 전환 또는 애플리케이션 성능을 측정하려는 경우에 효과적입니다. Product Analytics 및 RUM 메트릭은 실험이 시작되면 거의 실시간으로 사용할 수 있습니다.

## 통계 {#statistics}

Datadog은 통계 분석을 적용하여 변형군을 비교하고 상승폭을 추정합니다. 실험을 설정할 때 [분석 방법][11](순차적 빈도주의, 고정 샘픅 빈도주의 또는 베이지안)을 선택하고, 필요에 따라 [표본 크기 계산][8]을 실행하여 실험 실행 기간을 추정하세요. 결과가 나오면 [글로벌 리프트][19]를 사용하여 타겟팅된 실험 상승 효과가 회사 전체 메트릭 합계에 미치는 영향을 파악하고, [누적 영향][12]을 사용하여 동일한 메트릭에 대한 여러 실험 전반의 노이즈 조정 효과를 집계하세요.

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="Experiments 메트릭 조회는 비즈니스, 퍼널 및 성능 메트릭과 각 메트릭에 대한 대조군 및 변형군 값, 그리고 상대적 상승폭을 보여줍니다. 수익 메트릭에 툴팁이 열려 있어, 대조군 및 변형군 그룹 전반의 사용자당 수익, 총 수익 및 사용자 할당 수에 대한 Non-CUPED 값을 확인할 수 있습니다." style="width:90%;" >}}

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/
[2]: /ko/real_user_monitoring/
[3]: /ko/product_analytics/#getting-started
[4]: /ko/experiments/defining_metrics
[5]: /ko/experiments/plan_and_launch_experiments
[6]: /ko/getting_started/feature_flags/#create-your-first-feature-flag
[7]: /ko/experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /ko/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /ko/getting_started/feature_flags/#feature-flags-sdks
[10]: /ko/experiments/guide/
[11]: /ko/experiments/statistics/analysis_methods
[12]: /ko/experiments/concepts/cumulative_impact
[13]: /ko/experiments/guide/connecting_a_data_warehouse/
[14]: /ko/experiments/defining_metrics/?tab=warehouse
[15]: /ko/experiments/defining_metrics/?tab=productanalyticsorum
[16]: /ko/experiments/plan_and_launch_experiments/
[17]: /ko/experiments/concepts/exposure_sql/
[18]: /ko/experiments/concepts/subject_types/
[19]: /ko/experiments/statistics/global_lift
[20]: /ko/experiments/diagnostics/
[21]: /ko/experiments/protocols/