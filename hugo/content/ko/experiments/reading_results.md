---
aliases:
- /ko/product_analytics/experimentation/reading_results/
description: 실험 결과를 읽고 이해하세요.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: 설명서
  text: Analytics Explorer
- link: /experiments/diagnostics/
  tag: 설명서
  text: 실험 진단
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: 블로그
  text: Product Analytics를 사용하여 데이터 기반 설계 결정 내리기
title: 실험 결과 읽기
---
## 개요 {#overview}

[실험을 시작][1]한 후, 실험 결과 페이지는 이를 분석하기 위한 가장 핵심적인 공간이 됩니다. 이 페이지에서 다음을 수행할 수 있습니다.

- **메트릭 측정**: 의사결정 메트릭에서 대조군과 처리군의 성과를 비교하는 스코어카드를 검토합니다.
- **결과 추가 분석**: 사용자 세그먼트별로 메트릭 상승폭을 세분화하거나 시간 경과에 따른 상승폭을 플롯하여 변경 사항이 코호트 전반에서 어떻게 수행되었는지 이해합니다.
- **Session Replay 검사**: 개별 사용자 세션 리플레이를 열어 특정 사용자가 각 변형을 어떻게 경험했는지 확인합니다.
- **학습 내용 문서화**: 팀을 위한 결론 및 시사점을 기록합니다.

다음 섹션에서는 메트릭 스코어카드와 결과를 탐색하는 방법을 설명합니다.

## 실험 진단 {#experiment-diagnostics}

Datadog은 실험 분석과 함께 [실험 진단][9]을 실행하여 노출 데이터, 메트릭 데이터, 무작위화 및 분석 상태를 검사합니다. 결과를 해석하기 전에 진단 경고를 검토하세요. 특히 메트릭이 누락되었거나, 예상치 않게 0이거나, 경고가 표시된 경우 더욱 주의해야 합니다.

## 메트릭 스코어카드 {#metric-scorecard}

실험 결과 페이지에는 각 의사결정 메트릭에 대한 스코어카드가 표시됩니다. 각 행은 처리군 변형과 대조군 변형 간의 메트릭 비교 결과를 요약합니다.

{{< img src="/product_analytics/experiment/exp_reading_exps_scorecard.png" alt="대조군 및 처리군 값, 상대적 상승폭, 세 가지 메트릭에 대한 신뢰 구간 막대가 포함된 의사결정 메트릭 표를 보여주는 실험 결과 개요입니다." style="width:90%;" >}}

### 스코어카드 표시 내용 {#what-the-scorecard-shows}

각 메트릭에 대해 스코어카드는 다음을 표시합니다.

- **대조군 및 처리군 값**: 각 변형의 대상자당 평균 메트릭 값입니다.
- **상대적 상승폭**: 처리군과 대조군 간의 해당 평균 변화율입니다.
- **신뢰 구간**: 관측된 데이터와 일치하는 상승 값의 범위이며, 상대적 상승 추정치를 중심으로 하는 막대로 표시됩니다.

신뢰 구간의 폭과 해석은 실험의 구성된 [분석 방법][2]에 따라 달라집니다.

{{% collapse-content title="메트릭 계산 방법" level="h4" expanded=false id="how-metrics-are-calculated" %}}

Datadog은 실험을 설정할 때 구성한 단위인 **대상자** 수준(일반적으로 사용자)에서 실험을 분석합니다. Datadog은 등록된 각 대상자에 대해 메트릭 값을 계산합니다(예: 사용자당 수익 또는 사용자의 가입 완료 여부). 이러한 대상자당 값은 각 버전에 대한 분포를 형성합니다. 그런 다음 Datadog의 통계 엔진이 대조군과 처리군 간의 이러한 분포를 비교합니다.

**상대적 상승폭**은 처리군이 대조군에 비해 대상자당 평균 메트릭 값을 얼마나 변화시켰는지 측정합니다.

```
Relative lift = (Treatment − Control) / Control
```

상대적 상승폭 10%는 처리군의 대상자당 평균값이 대조군의 평균보다 10% 높다는 것을 의미합니다. 음의 상승폭은 처리군의 평균 성과가 더 나쁨을 의미합니다.

{{% /collapse-content %}}

### 신뢰 구간{#confidence-intervals}

신뢰 구간은 관측된 데이터에 부합하는 상승 값의 범위입니다. 실제 상승폭은 이 범위를 벗어날 수 있지만, 구간 내의 값이 실험에서 측정된 결과와 더 일치합니다.

- **전체 구간이 0보다 크면**, 결과는 양의 방향으로 통계적으로 유의미합니다. 실제 효과가 없다면 이 정도의 개선이 나타날 가능성은 낮습니다.
- **전체 구간이 0보다 작으면**, 결과는 음의 방향으로 통계적으로 유의미합니다. 처리군이 메트릭을 감소시켰을 가능성이 높습니다.
- **구간이 0을 통과하면**, 결과는 통계적으로 유의미하지 않습니다. 이 결과는 실제 효과가 0인 것과 일치합니다.

구간의 너비를 정밀도의 지표로 사용하세요. 구간이 더 좁을수록 상승 추정치가 더 정밀함을 의미하며, 구간이 넓을수록 표본이 작거나 메트릭에 노이즈가 많아 불확실성이 더 큼을 의미합니다.

[다중 테스트 보정][8]이 활성화된 경우, Datadog이 실험의 메트릭 및 처리군 변형 비교 전반에 걸쳐 가족 단위 오류율을 제어하므로 신뢰 구간이 더 넓어집니다.

### 글로벌 상승폭{#global-lift}

실험은 일반적으로 적격 사용자 중 일부만 참여시킵니다. 메트릭 스코어카드의 {{< ui >}}Global lift{{< /ui >}} 탭으로 전환하여 적격 사용자 전체에게 처리군을 적용할 경우 전체 메트릭 합계에 미치는 영향을 추정할 수 있습니다. 전체 방법론은 [글로벌 상승폭][7]을 참조하세요.

{{< img src="/product_analytics/experiment/exp_reading_global_lift.png" alt="실험 스코어카드의 글로벌 상승폭 탭에서 각 결정 메트릭에 대한 대조군 및 처리군 평균 메트릭 값, 커버리지, 글로벌 상승폭을 보여줍니다." style="width:90%;" >}}

각 메트릭에 대해 {{< ui >}}Global lift{{< /ui >}} 탭은 다음을 표시합니다.

- **대조군 및 처리군 값**: 각 버전의 대상자당 평균 메트릭 값으로, 주요 스코어카드 탭에 표시된 값과 동일합니다.
- **커버리지**: 실험의 적격 사용자와 관련된 글로벌 메트릭 합계의 추정 비율입니다(실험의 효과는 제외).
- **글로벌 상승폭**: 모든 적격 사용자에게 처리군을 적용했을 경우 전체 메트릭 합계에 영향을 미칠 것으로 예상되는 변화입니다. Datadog은 커버리지와 실험의 로컬(상대적) 상승폭을 곱하여 글로벌 상승폭을 계산합니다.

## 결과 탐색 {#exploring-results}

메트릭 스코어카드에서 메트릭 이름 위로 마우스를 가져가면 탐색 옵션을 볼 수 있습니다. 사용 가능한 옵션은 메트릭의 데이터 소스에 따라 다릅니다.

### 차트 {#chart}

메트릭에서 {{< ui >}}Chart{{< /ui >}}를 클릭하면 실험 기간 동안 메트릭이 어떻게 수행되었는지 보여주는 대화형 시각화가 열립니다. 차트 내에서 다음을 수행할 수 있습니다.

- **세분화 속성별 분할**: 기기 유형이나 사용자 계층과 같은 코호트 전반의 상승폭을 비교합니다. 속성은 노출 초기 시점의 대상자 속성을 반영합니다.
- **시간 경과에 따른 상승폭 플롯**: 달력 기준 날짜별 또는 각 대상자가 실험에 처음 노출된 후 경과한 일수별로 플롯된 실험 전반의 상승 추이를 확인합니다.
- **필터 추가**: 차트를 특정 대상자 하위 집합으로 좁힙니다.
- **상승폭 유형 전환**: 상대적 상승폭과 절대적 상승폭(처리군 - 대조군) 간에 전환합니다.

아래 예시는 국가별 세그먼트 수준의 분석을 보여줍니다. 이 뷰를 사용하여 특정 코호트가 새로운 경험에 다르게 반응한 시점을 파악하세요.

{{< img src="/product_analytics/experiment/exp_segment_view.png" alt="국가 ISO 코드로 분할된 메트릭의 세그먼트 수준 보기로, 상대적 상승폭의 막대 차트와 국가별 대조군 및 처리군 값이 포함된 데이터 테이블을 보여줍니다." style="width:90%;" >}}

### SQL 복사 {#copy-sql}

[웨어하우스 네이티브 메트릭][3]의 경우, {{< ui >}}Copy SQL{{< /ui >}}을 클릭하여 Datadog이 결과를 계산하는 데 사용한 파이프라인 로직의 단순화된 버전을 복사하세요. 쿼리를 웨어하우스에 붙여넣어 결과를 감사하거나 후속 분석을 실행하세요.

{{< img src="/product_analytics/experiment/exposure-sql/copy-sql.png" alt="웨어하우스 메트릭에서 Copy SQL 버튼이 강조 표시된 실험 결과 페이지입니다." style="width:90%;" >}}

### Replays {#replays}

[RUM][4] 또는 [Product Analytics][5] 데이터를 기반으로 하는 메트릭의 경우, {{< ui >}}Replays{{< /ui >}}를 클릭하여 실험에 등록된 사용자의 [Session Replay][6]를 확인하세요. 각 변형의 대상자가 제품을 어떻게 경험했는지 검토하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/experiments/plan_and_launch_experiments
[2]: /ko/experiments/statistics/analysis_methods
[3]: /ko/experiments/guide/connecting_a_data_warehouse/
[4]: /ko/real_user_monitoring/
[5]: /ko/product_analytics/
[6]: /ko/session_replay/
[7]: /ko/experiments/global_lift/
[8]: /ko/experiments/statistics/multiple_testing_correction
[9]: /ko/experiments/diagnostics/