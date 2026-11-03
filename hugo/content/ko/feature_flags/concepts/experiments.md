---
description: Feature Flags의 타겟팅 규칙이 Datadog Experiment를 무작위화하고 분석을 위해 노출을 기록하는 방법을
  알아보세요.
further_reading:
- link: /experiments/
  tag: 문서
  text: Datadog Experiments 소개
- link: /experiments/plan_and_launch_experiments
  tag: 문서
  text: 실험 계획 및 시작하기
- link: /experiments/concepts/subject_types
  tag: 문서
  text: Experiments의 대상 유형
- link: /feature_flags/concepts/targeting_rules
  tag: 문서
  text: Feature Flags 타겟팅 규칙 및 필터
- link: /feature_flags/concepts/evaluation_context
  tag: 문서
  text: Feature Flags 평가 컨텍스트
title: Feature Flags 및 실험
---
## 개요 {#overview}

Datadog Feature Flags는 [Datadog Experiment][1]를 무작위화하는 기본 방법입니다. 플래그를 실험에 연결하면 Datadog은 해당 플래그에 Experiment 타겟팅 규칙을 추가합니다. 해당 규칙에 대한 평가는 대상을 변형에 할당하고 Datadog이 실험을 분석하는 데 사용하는 노출 이벤트를 기록합니다.

## 플래그를 실험에 연결 {#link-a-flag-to-an-experiment}

워크플로의 다음 두 위치 중 하나에서 플래그를 실험에 연결할 수 있습니다.

- [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1]에서 실험을 생성하고 [기존 Feature Flag 추가][2]를 수행합니다.
- 플래그의 세부 정보 페이지에서 {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} 섹션의 {{< ui >}}Create New Experiment{{< /ui >}}를 클릭하여 해당 플래그가 미리 채워진 실험을 생성합니다.

## 실험 타겟팅 규칙 {#experiment-targeting-rules}

실험 타겟팅 규칙은 다른 [타겟팅 규칙][3]과 동일하게 작동합니다. 필터를 포함할 수 있으며, 동일한 [결정론적 무작위화][4]를 사용하여 대상을 변형에 할당합니다. 무작위화는 [평가 컨텍스트][5]의 `targetingKey`를 기반으로 하므로, 동일한 대상이 실험 기간 동안 항상 동일한 변형을 받습니다.

여러 실험이 동일한 플래그를 공유하는 경우, Datadog은 타겟팅 규칙을 위에서 아래로 순서대로 평가합니다. 실험을 시작하기 전에 규칙의 순서를 변경하여 특정 대상에 대해 어떤 규칙이 우선순위를 갖는지 제어하세요.

## 노출 {#exposures}

SDK가 대상에 대한 플래그의 실험 타겟팅 규칙을 평가할 때마다 Datadog은 _노출_을 기록합니다. 여기에는 대상, 제공된 변형 및 타임스탬프가 포함됩니다. Datadog은 노출을 메트릭 이벤트와 결합하여 변형 간의 상승 효과를 계산합니다. 해당 메트릭 이벤트는 Product Analytics, Real User Monitoring 또는 데이터 웨어하우스에서 가져올 수 있습니다.

Datadog은 대상 식별자를 기준으로 노출과 메트릭을 결합합니다. [평가 컨텍스트][5]에 SDK가 설정하는 `targetingKey`는 실험에 구성된 [대상 유형 속성][6](예: `@usr.id`)과 일치해야 합니다. 그렇지 않으면 Datadog이 메트릭 이벤트를 올바른 노출과 연결할 수 없습니다.

## 자체 무작위화 사용 {#bring-your-own-randomization}

Datadog Feature Flags가 아닌 다른 시스템으로 대상을 무작위화하는 경우, 이 플래그-실험 통합은 적용되지 않습니다. Datadog은 여전히 실험을 분석할 수 있습니다. 대신 데이터 웨어하우스에서 노출 레코드를 읽는 [Exposure SQL Model][7]을 정의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/experiments/
[2]: /ko/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /ko/feature_flags/concepts/targeting_rules/
[4]: /ko/feature_flags/concepts/traffic_splitting/
[5]: /ko/feature_flags/concepts/evaluation_context/
[6]: /ko/experiments/concepts/subject_types/
[7]: /ko/experiments/concepts/exposure_sql/