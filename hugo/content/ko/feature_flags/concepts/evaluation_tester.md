---
description: 프로덕션 데이터에 영향을 주지 않고 특정 타겟팅 키 및 속성에 대해 기능 플래그가 어떻게 평가되는지 시뮬레이션하세요.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: 문서
  text: 대상 지정 규칙 및 필터
- link: /feature_flags/concepts/saved_filters
  tag: 문서
  text: 저장된 필터
- link: /feature_flags/concepts/environments
  tag: 문서
  text: 환경
- link: /feature_flags/concepts/evaluation_results
  tag: 문서
  text: 플래그 평가 결과
title: 평가 테스터
---
## 개요 {#overview}

평가 테스터를 사용하면 애플리케이션의 SDK를 호출하지 않아도 특정 타겟팅 키 및 속성 집합에 대해 기능 플래그가 어떻게 평가되는지 시뮬레이션할 수 있습니다. 평가 테스터는 변경 사항을 롤아웃하기 전 "이 사용자에게는 어떤 변형이 표시될까요?" 또는 "이 타겟팅 규칙이 일치하지 않는 이유는 무엇인가요?"와 같은 질문에 답을 찾는 데 사용할 수 있습니다.

평가 테스터를 통해 실행되는 평가는 드라이 런입니다. 이러한 평가는 노출 이벤트를 내보내지 않으며, 평가 메트릭이나 그래프에 포함되지 않고 실험 통계에 영향을 미치지 않습니다.

## 평가 테스터 열기 {#open-the-evaluation-tester}

1. [{{< ui >}}Feature Flags{{< /ui >}}][1]로 이동하여 플래그를 선택합니다.
1. 테스트하려는 [환경][4]에 대한 탭을 선택합니다(예: {{< ui >}}Production{{< /ui >}} 또는 {{< ui >}}Staging{{< /ui >}}).
1. {{< ui >}}Targeting rules{{< /ui >}} 카드에서 {{< ui >}}Test Rule Evaluation{{< /ui >}}을 클릭하여 {{< ui >}}Evaluation tester{{< /ui >}} 측면 패널을 엽니다.

{{< img src="feature_flags/concepts/evaluation-tester-canvas.png" alt="플래그에 대한 타겟팅 규칙 캔버스의 규칙 평가 테스트 버튼입니다." style="width:100%;" >}}

## 타겟팅 컨텍스트 제공 {#provide-a-targeting-context}

평가 테스터는 타겟팅 컨텍스트(타겟팅 키 및 필요시 [속성][2] 집합)를 기준으로 플래그의 [타겟팅 규칙][3]을 평가합니다.

- 타겟팅 키(필수): 결정론적 버킷팅에 사용되는 식별자입니다(예: 사용자 ID). 타겟팅 키를 변경하면 규칙이 백분율 기반 트래픽 분할을 사용할 때 할당되는 변형이 변경될 수 있습니다.
- 속성(필요시): `country`, `email` 또는 `tier`와 같이 타겟팅 규칙의 필터를 평가하는 데 사용되는 값입니다. 자세한 내용은 [타겟팅 속성][2]을 참조하세요.

타겟팅 키 및 속성에 대한 값은 다음 두 가지 방법으로 제공할 수 있습니다.

- {{< ui >}}Form{{< /ui >}}: Datadog은 선택한 환경의 타겟팅 규칙에서 참조하는 타겟팅 키와 각 속성에 대한 입력 필드를 생성합니다. 각 속성 필드에는 해당 속성을 참조하는 규칙이 나열됩니다. 환경 내에 어떠한 속성도 참조하는 타겟팅 규칙이 없으면 양식에는 타겟팅 키만 표시됩니다.
- {{< ui >}}JSON{{< /ui >}}: 타겟팅 키와 속성의 원시 JSON 객체를 입력합니다. 숫자, 불리언, 배열 또는 중첩된 객체와 같은 비문자열 속성 값을 테스트해야 할 때는 JSON 모드를 사용하세요.

[평가 결과](#understand-the-result)는 타겟팅 키나 속성을 편집할 때 자동으로 업데이트됩니다.

{{< img src="feature_flags/concepts/evaluation-tester-panel.png" alt="타겟팅 키, 속성, 결과가 표시되는 평가 테스터의 사이드 패널입니다." style="width:60%;" >}}

## 결과 이해 {#understand-the-result}

{{< ui >}}Result{{< /ui >}} 섹션에는 제공된 [타겟팅 컨텍스트](#provide-a-targeting-context)에 대해 할당될 변형과 일치하는 타겟팅 규칙의 이름이 함께 표시됩니다.

{{< ui >}}How did I get this result?{{< /ui >}}을 확장하면 평가에 대한 규칙별 분석을 확인할 수 있습니다.

- 규칙은 평가 순서대로 나열됩니다.
- 각 규칙은 일치 여부, 통과(즉, 대상이 규칙의 필터와 일치하지 않아 다음 규칙으로 평가가 계속 진행됨) 여부 또는 건너뛰기(즉, 이전 규칙의 결과로 인해 도달할 수 없음) 여부를 보여줍니다.
- 필터가 적용된 규칙의 경우 분석 결과는 일치하는 조건 또는 일치하지 않는 조건(예: `country matched US` 또는 `browser did not match is one of Chrome, Safari`)을 설명합니다.

{{< img src="feature_flags/concepts/evaluation-tester-breakdown.png" alt="일치한 규칙과 일치 이유를 보여주는 확장된 평가 분석입니다." style="width:60%;" >}}

일치하는 규칙은 {{< ui >}}Targeting rules{{< /ui >}} 캔버스에서도 강조 표시되므로 평가 경로를 시각적으로 확인할 수 있습니다.

## 비활성화된 플래그 테스트 {#testing-a-disabled-flag}

선택한 환경에서 이 플래그가 비활성화되면 평가 테스터는 이 플래그가 활성화되었을 경우 대상이 수신하는 내용을 보여줍니다. 이 시뮬레이션은 런타임 SDK 동작과 다릅니다. 클라이언트 측 SDK 및 서버 측 SDK는 비활성화된 플래그에 대해 애플리케이션에서 제공하는 기본값을 반환합니다. 상세 평가에서는 `ERROR`를 `FLAG_NOT_FOUND`와 함께 보고합니다. 자세한 내용은 [플래그 평가 결과][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags
[2]: /ko/feature_flags/concepts/targeting_attributes/
[3]: /ko/feature_flags/concepts/targeting_rules/
[4]: /ko/feature_flags/concepts/environments/
[5]: /ko/feature_flags/concepts/evaluation_results/