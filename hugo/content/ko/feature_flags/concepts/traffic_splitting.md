---
description: Datadog Feature Flags가 백분율 기반 롤아웃을 위해 결정론적 무작위화를 사용하는 방법을 알아보세요.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: 설명서
  text: 타겟팅 규칙 및 필터
- link: /feature_flags/concepts/evaluation_context
  tag: 설명서
  text: 평가 컨텍스트
title: 트래픽 분할 및 무작위화
---
## 개요 {#overview}

타겟팅 규칙을 정의할 때 타겟팅 필터와 일치하는 대상의 백분율에 변형을 제공할 수 있습니다. Datadog은 [평가 컨텍스트][1]의 `targetingKey`를 기반으로 **결정론적 무작위화**를 사용하므로 동일한 대상이 특정 플래그에 대해 항상 동일한 변형을 받습니다.

## 백분율 롤아웃 {#percentage-rollouts}

**Targeting Rules & Rollouts** 섹션에서 각 변형을 받아야 하는 대상의 백분율을 설정하세요. **단일 변형** 타겟팅 규칙의 경우, 원하는 트래픽 노출을 하나의 변형에 할당합니다. 예를 들어, 프로모션 배너의 **Free Shipping** 변형을 필터와 일치하는 대상의 50%에 롤아웃합니다.

{{< img src="feature_flags/concepts/single-variant-traffic-exposure-2.png" alt="단일 변형 백분율 롤아웃이 포함된 타겟팅 규칙입니다." style="width:75%;" >}}

**다중 변형** 롤아웃의 경우, 타겟팅 규칙을 편집하거나 생성할 때 **Serve > Split Traffic**을 선택하여 동일한 타겟팅 규칙에서 여러 변형에 걸쳐 백분율을 할당하세요. SDK는 구성된 백분율에 따라 일치하는 대상을 해당 변형에 분배합니다.

{{< img src="feature_flags/concepts/multi-variant-traffic-split-2.png" alt="여러 변형에 걸쳐 백분율이 분할된 타겟팅 규칙입니다." style="width:75%;" >}}

## SDK가 백분율 롤아웃을 평가하는 방법 {#how-the-sdk-evaluates-percentage-rollouts}

백분율 롤아웃이 포함된 타겟팅 규칙을 평가할 때 SDK는 먼저 평가 컨텍스트가 규칙의 필터와 일치하는지 확인합니다. 일치하는 경우, SDK는 플래그 키와 평가 컨텍스트의 `targetingKey`를 사용하여 대상을 롤아웃 버킷에 할당합니다. 해당 버킷은 대상이 현재 규칙의 변형을 받을지, 아니면 다음 규칙으로 넘어갈지를 결정합니다.

무작위화는 **결정론적**입니다. 즉, 동일한 `targetingKey`를 가진 대상은 특정 플래그에 대해 항상 동일한 버킷에 속하게 되므로 반복 평가 시 동일한 변형을 받게 됩니다. 나중에 롤아웃 백분율을 높이면(예: 30%에서 50%로) 이미 처리 버킷에 있는 대상은 해당 버킷에 그대로 유지됩니다.

다중 변형 규칙의 경우, SDK는 동일한 버킷팅 로직을 적용하여 규칙에 정의된 백분율에 따라 대상을 여러 변형에 분배합니다.

SDK에서 `targetingKey`를 설정하는 방법은 [평가 컨텍스트][1]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/concepts/evaluation_context/