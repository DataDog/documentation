---
description: 타겟팅 규칙, 필터 및 롤아웃 유형이 애플리케이션에서 제공할 변형을 어떻게 제어하는지 알아보세요.
further_reading:
- link: /feature_flags/concepts/evaluation_tester
  tag: 설명서
  text: 평가 테스터
- link: /feature_flags/concepts/targeting_attributes
  tag: 설명서
  text: 타겟팅 속성
- link: /feature_flags/concepts/scheduled_rollouts
  tag: 설명서
  text: 예약된 롤아웃
- link: /feature_flags/concepts/saved_filters
  tag: 설명서
  text: 저장된 필터
- link: /feature_flags/concepts/traffic_splitting
  tag: 설명서
  text: 트래픽 분할 및 무작위화
- link: /feature_flags/concepts/experiments
  tag: 설명서
  text: Feature Flags 및 실험
- link: /feature_flags/concepts/evaluation_context
  tag: 설명서
  text: 평가 컨텍스트
- link: /feature_flags/concepts/environments
  tag: 설명서
  text: 환경
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 SDK
title: 대상 지정 규칙 및 필터
---
## 개요 {#overview}

**타겟팅 규칙**은 어떤 대상에게 어떤 변형을 제공할지 정의합니다. 각 규칙에는 **필터**, 하나 이상의 변형, 선택적 비율 롤아웃이 포함될 수 있습니다. 규칙은 일치하는 항목이 발견될 때까지 순서대로 평가됩니다.

## 타겟팅 규칙 유형 {#targeting-rule-types}

Datadog은 롤아웃 전략에 따라 다양한 타겟팅 규칙 유형을 지원합니다.

| 유형 | 설명 |
|------|-------------|
| **기능 게이트** | 필터와 일치하는 대상의 비율(무작위 여부 선택 가능)에 대해 즉시 또는 [예약된 시작 시간](/feature_flags/concepts/scheduled_rollouts/) |에 롤아웃합니다.
| **점진적 롤아웃** | 수동 또는 [예약된 시작 시간](/feature_flags/concepts/scheduled_rollouts/) |에 시작하여 여러 단계에 걸쳐 일정에 따라 무작위로 롤아웃합니다.
| **실험** | [실험][5]과 관련된 무작위 할당 |

## 타겟팅 규칙 구성 {#configure-targeting-rules}

플래그에 대한 타겟팅 규칙을 구성하려면 다음 단계를 따르세요.

1. **Feature Flags**로 이동하여 플래그를 선택합니다.
2. 규칙을 수정할 환경을 선택합니다.
3. **Add Targeting Rule**을 클릭합니다(또는 수정하려는 타겟팅 규칙을 클릭합니다).

{{< img src="feature_flags/concepts/ff-targeting-rules-and-rollouts-2.png" alt="기능 플래그의 Targeting Rules and Rollouts 섹션" style="width:100%;" >}}

각 타겟팅 규칙에 대해 다음을 구성합니다.

- **타겟팅 규칙 이름 지정**: 타겟팅 규칙이 대상으로 하는 그룹을 설명하는 이름을 지정합니다.
- **필터 정의**(선택 사항): 필터를 정의하지 않으면 규칙이 해당 환경의 모든 대상과 일치합니다. 여러 플래그에서 동일한 조건을 재사용하려면 각 플래그에서 조건을 재정의하는 대신 [저장된 필터][1]를 추가합니다.
- **변형 선택**: 일치하는 대상에게 제공할 변형을 선택합니다. **Split Traffic**을 클릭하여 여러 변형에 무작위로 분배합니다([트래픽 분할 및 무작위화](/feature_flags/concepts/traffic_splitting/) 참조).
- **트래픽 노출 설정**(선택 사항): 일치하는 대상의 일정 비율에 변형을 제공합니다([트래픽 분할 및 무작위화](/feature_flags/concepts/traffic_splitting/) 참조).
- **시작 시간 예약**(선택 사항): 즉시가 아닌 향후 날짜 및 시간에 규칙을 자동으로 활성화합니다([일정 롤아웃](/feature_flags/concepts/scheduled_rollouts/) 참조).

{{< img src="feature_flags/concepts/configure-targeting-rule-3.png" alt="기능 플래그의 타겟팅 규칙 편집기 사이드 패널" style="width:70%;" >}}

타겟팅 규칙을 구성한 후 **Save**를 클릭한 다음 SDK가 타겟팅 규칙을 평가할 수 있도록 해당 환경에서 플래그를 활성화합니다. 또한 [평가 테스터][2]를 사용하여 프로덕션 데이터에 영향을 주지 않고 주어진 타겟팅 키 및 속성에 대해 규칙이 어떻게 평가되는지 시뮬레이션할 수 있습니다.

<div class="alert alert-info">
플래그가 환경에서 <b>비활성화</b>되거나 <b>재정의</b>된 경우 SDK는 타겟팅 규칙을 평가하지 않습니다. 플래그가 고정된 변형으로 재정의된 경우 SDK는 대신 해당 변형을 반환합니다. 플래그가 비활성화된 경우 SDK는 코드에 지정된 기본 변형을 반환합니다.
</div>

## 필터 및 평가 컨텍스트 {#filters-and-evaluation-context}

필터는 SDK의 [평가 컨텍스트][4]에 있는 속성을 사용합니다. 플래그를 평가하기 전에 평가 컨텍스트를 설정할 때 속성을 정의하세요. 속성은 중첩되지 않은 원시 값(문자열, 숫자, 불리언)이어야 합니다. 중첩된 객체 및 배열은 지원되지 않습니다.

필터를 빌드할 때 속성 필드는 조직에서 이미 정의했거나 SDK가 최근에 보낸 속성을 제안합니다. 데이터 유형과 함께 재사용 가능한 속성을 정의하려면 [타겟팅 속성][3]을 참조하세요. 이 데이터 유형은 해당 속성에 사용할 수 있는 연산자도 결정합니다.

`country`, `tier`, `user_role`, `account_age_days` 속성이 있는 평가 컨텍스트가 주어지면 같음, **다음 중 하나임**, **다음이 아님** 또는 숫자 비교와 같은 다양한 연산자를 사용하여 필터를 빌드할 수 있습니다.

- `country` **다음 중 하나임** `US`, `CA`
- `tier` **같음** `premium`
- `user_role` **다음이 아님** `guest`
- `account_age_days` **보다 큼** `90`

## 규칙 계층 구조 {#rule-hierarchy}

타겟팅 규칙은 위에서 아래로 **순서대로** 평가됩니다.

1. SDK는 첫 번째 규칙을 평가합니다. 대상이 필터와 일치하면(또는 필터가 정의되지 않은 경우), 규칙이 변형을 제공할 수 있습니다.
2. 대상이 일치하지 않으면 평가가 다음 규칙으로 넘어갑니다.
3. 일치하는 규칙이 없으면 SDK는 해당 환경의 **기본 변형**을 제공합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/concepts/saved_filters/
[2]: /ko/feature_flags/concepts/evaluation_tester/
[3]: /ko/feature_flags/concepts/targeting_attributes/
[4]: /ko/feature_flags/concepts/evaluation_context/
[5]: /ko/feature_flags/concepts/experiments/