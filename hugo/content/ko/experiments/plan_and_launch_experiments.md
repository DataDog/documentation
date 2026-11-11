---
aliases:
- /ko/product_analytics/experimentation/
description: Datadog Experiments를 사용하여 새로운 경험이나 기능과 비즈니스 성과, 사용자 행동 및 애플리케이션 성능 사이의
  인과 관계를 측정합니다.
further_reading:
- link: https://www.datadoghq.com/blog/experiments
  tag: 블로그
  text: Datadog Experiments로 모든 제품 변경의 비즈니스 영향을 측정하세요
- link: https://www.datadoghq.com/blog/datadog-product-analytics
  tag: 블로그
  text: Product Analytics를 사용하여 데이터 기반 설계 결정 내리기
title: 실험 계획 및 시작하기
---
## 개요 {#overview}

[실험][8]을 계획하고 시작하여 새로운 기능이 비즈니스 성과, 사용자 행동 및 애플리케이션 성능에 미치는 영향을 측정합니다.

## 전제 조건 {#prerequisites}

<div class="alert alert-info">실험을 생성하고 시작하려면 적절한 <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> 및 <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> 권한이 있어야 합니다.</div>

시작하기 전에 다음 항목이 있는지 확인하세요.

- 테스트하려는 실험 변형을 배포하고 관리하기 위한 [기능 플래그][4]
- 실험 결과를 측정하기 위한 하나 이상의 [실험 메트릭][2]
- Datadog이 실험을 무작위화할 수준을 설정하기 위한 [대상 유형][6]

## 실험 계획 {#plan-your-experiment}

실험 이름과 가설을 지정한 다음 설정을 정의합니다.

### 실험 초안 작성 {#draft-your-experiment}

실험 초안을 작성하려면 다음 단계를 따르세요.

1. Datadog Product Analytics에서 [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][1]로 이동합니다.
1. {{< ui >}}Create Experiment{{< /ui >}}를 클릭하여 대화 상자를 열고 {{< ui >}}Experiment name{{< /ui >}} 및 {{< ui >}}Hypothesis{{< /ui >}}를 입력합니다.
1. {{< ui >}}Create Draft Experiment{{< /ui >}}를 클릭하여 실험 설정 페이지를 열고 [실험 설정](#set-up-your-experiment)으로 진행합니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="실험 이름이 'New Product Photos Experiment'이고, 고해상도 제품 사진이 장바구니 추가 전환율을 높인다는 가설이 입력되어 있으며, 'Create Draft Experiment' 버튼이 강조 표시된 'Create new draft experiment' 대화 상자" style="width:80%;" >}}

기능 플래그의 세부 정보 페이지에서도 직접 실험을 생성할 수 있습니다.

1. [{{< ui >}}Feature Flags{{< /ui >}}][7] 페이지로 이동하여 {{< ui >}}Overview{{< /ui >}} 탭을 선택합니다.
1. 실험에 사용할 기능 플래그를 선택하여 세부 정보 페이지를 엽니다.
1. {{< ui >}}Targeting rules & rollouts{{< /ui >}} 섹션에서 {{< ui >}}Create New Experiment{{< /ui >}}를 클릭하여 대화 상자를 엽니다.
1. 대화 상자에서 {{< ui >}}Create Experiment{{< /ui >}}를 클릭하여 실험 설정 페이지를 엽니다.
1. 실험 설정 페이지에서 Datadog은 {{< ui >}}Experiment name{{< /ui >}}을 기능 플래그의 이름으로 미리 채웁니다. 필요에 따라 편집합니다.
1. {{< ui >}}Hypothesis{{< /ui >}}를 입력하고 [실험 설정](#set-up-your-experiment)으로 진행합니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="new_product_photos라는 기능 플래그의 세부 정보 페이지로, 대조군과 처리 변형이 50:50으로 나뉜 타겟팅 규칙과 롤아웃이 표시되며 하단에는 'Create New Experiment' 버튼이 강조 표시되어 있습니다." style="width:80%;" >}}

### 실험 설정 {#set-up-your-experiment}

실험을 생성한 후 메트릭, 기능 플래그 및 무작위화 설정을 정의합니다.

#### 결정 메트릭 설정 {#set-decision-metrics}

실험 결과를 측정하는 메트릭을 정의하려면 다음 단계를 따르세요.

1. {{< ui >}}Calculate metrics by{{< /ui >}} 드롭다운을 사용하여 대상 유형을 선택합니다.
   - 사용자 지정 대상 유형을 정의하려면 드롭다운에서 {{< ui >}}Create subject type{{< /ui >}}을 선택합니다.
1. {{< ui >}}Primary metric{{< /ui >}} 버튼을 클릭하여 선택 도구를 엽니다.
   1. 측정하려는 결과에 대한 기본 메트릭을 선택합니다.
   1. (선택 사항) {{< ui >}}Certified{{< /ui >}} 또는 {{< ui >}}Non-certified{{< /ui >}} 탭을 클릭하여 목록을 필터링합니다.
   1. (선택 사항) {{< ui >}}Create Metric{{< /ui >}}을 클릭하여 새 메트릭을 정의합니다. 설정 방법은 [실험 메트릭 생성][2]을 참조하세요.
1. (선택 사항) {{< ui >}}Secondary metrics{{< /ui >}} 버튼을 클릭하여 가드레일 메트릭을 추가합니다. 이 메트릭은 성능, 참여도, 수익 등 다른 영역에 실험이 미치는 의도치 않은 영향을 모니터링합니다.
1. [표본 크기 계산 실행(선택 사항)](#run-a-sample-size-calculation-optional)으로 진행하거나 [기능 플래그 추가](#add-a-feature-flag)로 건너뜁니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="'Calculate metrics by' 드롭다운이 'User (@usr.id)'로 설정되고 기본 메트릭이 'Add to Cart Conversion'으로 설정된 'Decision metrics' 섹션과 'Secondary metrics' 섹션이 표시된 실험 구성 페이지" style="width:80%;" >}}

#### 표본 크기 계산 실행(선택 사항) {#run-a-sample-size-calculation-optional}

표본 크기 계산기는 의미 있는 효과를 탐지하는 데 필요한 사용자 수와 기간을 추정합니다. 사용자를 실험에 할당하는 이벤트인 진입점을 선택하면 Datadog이 해당 이벤트의 트래픽 양을 기반으로 추정치를 계산합니다.

계산을 실행하려면 다음 단계를 따르세요.

1. {{< ui >}}Run a sample size calculation (optional){{< /ui >}} 섹션에서 **표본 크기 계산기** 링크를 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Calculation details{{< /ui >}}를 확장합니다. 기본 및 보조 메트릭이 {{< ui >}}Metrics{{< /ui >}} 아래에 표시됩니다.
1. {{< ui >}}Entry point{{< /ui >}} 드롭다운을 사용하여 결제 페이지 조회 또는 장바구니 담기 버튼 클릭과 같이 사용자를 실험에 할당하는 이벤트를 선택합니다. Datadog은 이 이벤트를 사용하여 트래픽 양을 추정합니다.
1. (선택 사항) {{< ui >}}Filter entry point{{< /ui >}} 아래에서 진입점의 대상 사용자 범위를 좁힙니다.
   1. {{< ui >}}\+ Filter{{< /ui >}}를 클릭하여 선택 도구에서 속성을 선택합니다. 필요한 속성이 보이지 않으면 {{< ui >}}Custom property{{< /ui >}} 필드에 속성 이름을 입력하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다.
   1. 표시되는 필터 행에서 필요에 따라 연산자를 수정하고 드롭다운에서 값을 선택합니다.
   1. (선택 사항) {{< ui >}}\+ Filter{{< /ui >}}를 클릭하여 행을 추가합니다. 행 사이에 있는 드롭다운에서 {{< ui >}}or{{< /ui >}} 또는 {{< ui >}}and{{< /ui >}}를 선택하여 필터 결합 방식을 설정합니다.
1. {{< ui >}}Number of variants{{< /ui >}} 및 {{< ui >}}Traffic exposure{{< /ui >}}를 설정합니다.
1. {{< ui >}}Additional inputs{{< /ui >}}를 확장한 다음 통계적 {{< ui >}}Power{{< /ui >}}를 선택하고 {{< ui >}}Target experiment duration{{< /ui >}}을 주 단위로 입력합니다.
   - 계산기가 1, 2, 4, 6, 8주 간격으로 MDE 값과 예상 사용자 수를 추정하므로 {{< ui >}}Target experiment duration{{< /ui >}} 값은 1이거나 짝수여야 합니다.
1. {{< ui >}}Run Calculation{{< /ui >}}를 클릭하여 메트릭의 시간 경과에 따른 **[최소 탐지 가능한 효과(MDE)][3]** 추정치를 확인합니다.
1. 사이드 패널을 닫고 [기능 플래그 추가](#add-a-feature-flag)로 진행합니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="기본 메트릭이 'Add to Cart Conversion', 보조 메트릭(가드레일)이 'Number of cart views', 진입점이 'ADD TO CART' 클릭으로 설정되고, 두 가지 변형에 대한 트래픽 노출이 100%로 설정되어 있으며, 검정력과 목표 실험 기간을 입력하는 추가 필드가 표시된 'Sample Size Calculator' 사이드 패널" style="width:80%;" >}}

#### 기능 플래그 추가 {#add-a-feature-flag}

Datadog이 실험 변형 간에 트래픽을 분할하는 방식을 제어하기 위한 기능 플래그를 추가하려면 다음 단계를 따르세요.

1. {{< ui >}}Feature flag{{< /ui >}} 섹션에서 {{< ui >}}Add a feature flag{{< /ui >}} 버튼을 클릭하여 선택 도구를 엽니다.
1. 실험에 사용할 기능 플래그를 선택합니다.
   - 기능 플래그를 생성하지 않은 경우 {{< ui >}}Create New Feature Flag{{< /ui >}}를 클릭합니다. 설정 방법은 [첫 번째 기능 플래그 만들기][9]를 참조하세요.
1. [무작위화 구성](#configure-randomization)으로 진행합니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="사용 가능한 플래그 목록이 생성 날짜순으로 정렬되어 있고, new_product_photos가 선택되어 플래그 키 new-product-photos, 유형 불리언, 하단의 Create New Feature Flag 링크를 포함한 세부 정보가 표시된 기능 플래그 선택 도구" style="width:80%;" >}}

#### 무작위화 구성 {#configure-randomization}

사용자를 무작위로 할당하고 실험 변형 간에 트래픽을 분할합니다.

기능 플래그를 선택하면 Datadog은 플래그 구성을 기반으로 무작위화 설정을 미리 채웁니다.

<div class="alert alert-info">여기에서 구성하는 무작위화 설정은 실험을 시작한 후 다음과 같이 적용됩니다.<br><br><ul><li>Datadog은 선택한 기능 플래그에 타겟팅 규칙을 추가합니다.</li><li>여러 실험이 동일한 기능 플래그를 공유하는 경우, Datadog은 플래그의 타겟팅 규칙 순서에 따라 트래픽을 평가합니다. 실험을 시작하기 전에 확인 대화 상자에서 타겟팅 규칙의 순서를 변경할 수 있습니다.</li></ul></div>

무작위화를 구성하려면 다음 단계를 따르세요.

1. 드롭다운에서 실험에 사용할 {{< ui >}}Environment{{< /ui >}}를 선택합니다.
1. {{< ui >}}Targeting rules{{< /ui >}}에서 [평가 컨텍스트][10]에 설정한 사용자 지정 속성(예: 사용자 역할 또는 구독 등급)을 기반으로 사용자를 타겟팅하도록 필터를 구성합니다.
   1. {{< ui >}}Add Filter{{< /ui >}}를 클릭합니다. `IF` 행에 속성과 값을 입력하고 드롭다운에서 연산자를 선택합니다.
   1. (선택 사항) 타겟팅 규칙을 세부적으로 조정합니다.
      - 동일한 필터 내에 `AND` 행을 추가하려면 {{< ui >}}Add Condition{{< /ui >}}을 클릭합니다.
      - `OR`로 연결되는 다른 필터를 추가하려면 {{< ui >}}Add Filter{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Variants{{< /ui >}}에서 {{< ui >}}Randomize users and split traffic{{< /ui >}} 드롭다운을 사용하여 {{< ui >}}Equally (recommended){{< /ui >}} 또는 {{< ui >}}Custom{{< /ui >}}을 선택합니다. 이 설정은 Datadog이 변형 간에 트래픽을 분할하는 방식을 결정합니다. 각 사용자는 실험 기간 동안 자신에게 할당된 변형만 볼 수 있습니다.
   - {{< ui >}}Custom{{< /ui >}}을 선택한 경우 각 변형의 비율을 입력합니다. 비율의 합계는 100%여야 합니다.
1. {{< ui >}}Traffic exposure{{< /ui >}}에서 타겟팅 규칙과 일치하는 사용자 중 실험에 포함할 비율을 설정합니다.
1. (선택 사항) [단계적 롤아웃을 예약](#schedule-a-staged-rollout)하거나, [추가 설정을 구성](#additional-configs)하거나, 두 작업을 모두 수행합니다.
1. 실험을 구성한 후 [실험 시작](#launch-your-experiment)으로 진행합니다.

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="환경이 prod로 설정되어 있고, OR로 연결된 두 개의 타겟팅 규칙 필터(각각 IF 및 AND 조건과 Add Condition 버튼 포함), 하단의 Add Filter 버튼, 대조군(true)과 처리 변형(false) 간 50:50 균등 분할, Add Rollout Steps 옵션과 함께 타겟팅 대상 트래픽의 100%로 설정된 트래픽 노출이 표시된 Randomization 섹션" style="width:80%;" >}}

{{% collapse-content title="추가 구성 설정(선택 사항)" level="h4" expanded=false id="additional-configs" %}}

##### 단계적 롤아웃 예약 {#schedule-a-staged-rollout}

모든 사용자에게 실험을 한 번에 시작하지 않고 실험 트래픽을 점진적으로 늘리려면 다음 단계를 따르세요.

1. {{< ui >}}Randomization{{< /ui >}} 섹션에서 {{< ui >}}Add Rollout Steps{{< /ui >}}를 클릭하고 드롭다운에서 사전 설정된 단계 구성(예: 5%에서 100%까지 3단계)을 선택합니다.
1. 필요에 따라 각 단계의 {{< ui >}}Traffic exposure{{< /ui >}} 비율을 조정합니다.
1. {{< ui >}}Scheduled rollout by holding between steps for{{< /ui >}} 옆에서 두 개의 드롭다운을 사용하여 숫자와 시간 단위를 각각 선택합니다(예: {{< ui >}}1{{< /ui >}} 및 {{< ui >}}days{{< /ui >}}). 이 설정은 다음 단계로 넘어가기 전까지 각 단계가 실행되는 시간을 지정합니다.

각 롤아웃 단계에서 Datadog은 적격 사용자 중 일정 비율을 샘플링하여 실험에 포함합니다. 표본에 포함되지 않은 사용자에게도 기본(대조군) 경험이 제공되지만, Datadog은 이들을 실험 결과에 포함하지 않습니다.

##### 알림 설정 {#set-notifications}

실험이 진행됨에 따라 적절한 담당자에게 알림을 라우팅합니다.

{{< ui >}}Notifications{{< /ui >}} 섹션에서 {{< ui >}}Recipients{{< /ui >}} 드롭다운을 사용하여 실험 결과가 통계적 유의성에 도달하거나 Datadog이 문제를 탐지하는 등 실험 수명 주기 이벤트에 대한 알림을 받을 사람을 선택합니다.

##### 통계 분석 계획 선택 {#choose-a-statistical-analysis-plan}

실험에 대한 통계적 유의성을 Datadog이 계산하는 방법을 구성합니다. 분석 방법 선택에 대한 지침은 [분석 방법][11]을 참조하세요.

실험을 생성하면 Datadog은 조직의 기본 통계 분석 설정을 복사합니다. 조직에서 기본 설정을 구성한 경우 {{< ui >}}COMPANY DEFAULT{{< /ui >}} 배지가 나타납니다. 조직의 기본값이 나중에 변경되어도 새로 생성된 실험에만 적용되며 기존 실험은 변경되지 않습니다.

통계 분석 계획을 수정하려면 다음 단계를 따르세요.

1. {{< ui >}}Statistical analysis plan{{< /ui >}} 섹션을 확장합니다.
1. {{< ui >}}Confidence interval method{{< /ui >}} 드롭다운에서 분석 방법을 선택합니다.
   - {{< ui >}}Bayesian{{< /ui >}}을 선택한 경우, 드롭다운에서 {{< ui >}}Standard Deviation of Prior{{< /ui >}}를 선택합니다.
1. {{< ui >}}Confidence level{{< /ui >}} 드롭다운에서 백분율을 선택합니다.
1. [CUPED][12]를 비활성화하려면 {{< ui >}}CUPED calculation{{< /ui >}}을 끕니다. CUPED는 기본적으로 활성화되어 있으며 각 대상의 실험 전 데이터를 사용하여 메트릭 분산을 줄이고 실험 민감도를 향상합니다.
1. 전체 검정의 오류율(family-wise error rate)을 제어하려면 {{< ui >}}Multiple testing correction{{< /ui >}}을 켭니다. 이 설정은 여러 메트릭과 처리 변형 간의 다중 비교를 보정하여 더 보수적인 결과를 도출합니다. 자세한 내용은 [다중 검정 보정][13]을 참조하세요.
   - {{< ui >}}Bayesian{{< /ui >}} 방법을 사용할 때는 이 설정을 사용할 수 없습니다.
1. {{< ui >}}Reset to Default{{< /ui >}}를 클릭하여 실험 생성 시 복사된 통계 분석 기본 설정을 복원합니다. 여기에는 당시 적용된 회사 기본 설정도 포함됩니다.

##### 분할 기준 탐색 차원 추가 {#add-split-by-exploration-dimensions}

[평가 컨텍스트][10]의 속성(특성이라고도 함)을 기준으로 실험 결과를 분할합니다.

분할 기준 차원을 구성하려면 다음 단계를 따르세요.

1. {{< ui >}}Split-by exploration dimensions{{< /ui >}} 섹션을 확장합니다.
1. {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}} 드롭다운에서 속성을 선택합니다. 사용 가능한 속성에는 `context.` 접두사가 붙습니다.
1. 필요한 속성이 보이지 않으면 다음 단계를 따릅니다.
   1. 드롭다운 필드에 `context.` 접두사를 붙여 속성 이름을 입력합니다(예: `context.team`). 그런 다음 {{< ui >}}Add custom property{{< /ui >}}를 클릭하여 {{< ui >}}Split-by exploration dimensions{{< /ui >}} 대화 상자를 엽니다.
   1. {{< ui >}}Column Name{{< /ui >}}이 입력한 속성 이름과 일치하는지 검증합니다.
   1. 드롭다운에서 속성 {{< ui >}}Type{{< /ui >}}을 선택합니다.
   1. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 사용자 지정 속성이 {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}} 드롭다운에 나타납니다.

{{% /collapse-content %}}

## 실험 시작 {#launch-your-experiment}

실험을 시작하려면 다음 단계를 따르세요.

1. {{< ui >}}Start Experiment{{< /ui >}}를 클릭하여 {{< ui >}}Confirm starting the experiment{{< /ui >}} 대화 상자를 엽니다.
1. 대화 상자에서 환경, 기능 플래그 및 플래그의 타겟팅 규칙이 정확한지 검토합니다.
   - 여러 실험이 동일한 플래그를 공유하는 경우, 각 타겟팅 규칙의 위쪽 및 아래쪽 화살표를 사용하여 규칙의 순서를 변경합니다.
1. {{< ui >}}Start Experiment & Enable Flag{{< /ui >}}를 클릭하여 실험을 시작합니다.

실험을 시작하면 {{< ui >}}Flag & Exposures{{< /ui >}} 페이지가 열립니다. 구성이 실제로 적용되었는지 검증하려면 다음 단계를 따르세요.
- {{< ui >}}Exposure balance check{{< /ui >}}를 검토하여 변형이 설정한 비율대로 분할되었는지 확인합니다.
- {{< ui >}}View Exposures Log{{< /ui >}}를 클릭하여 실시간 사용자 등록을 모니터링합니다.

데이터를 검토하려면 [실험 결과 읽기][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /ko/experiments/defining_metrics
[3]: /ko/experiments/statistics/minimum_detectable_effect
[4]: /ko/getting_started/feature_flags
[5]: /ko/experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /ko/experiments/
[9]: /ko/getting_started/feature_flags/#create-your-first-feature-flag
[10]: https://docs.datadoghq.com/ko/feature_flags/client#context-attribute-requirements
[11]: /ko/experiments/statistics/analysis_methods
[12]: /ko/experiments/statistics/cuped
[13]: /ko/experiments/statistics/multiple_testing_correction