---
description: 재사용 가능한 타겟팅 속성을 정의하여 타겟팅 규칙을 작성할 때 자동 완성 제안과 데이터 유형을 인식하는 연산자를 사용할 수
  있습니다.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: 문서
  text: 타겟팅 규칙 및 필터
- link: /feature_flags/concepts/environments
  tag: 문서
  text: 환경
title: 타겟팅 속성
---
## 개요 {#overview}

**타겟팅 속성**은 `country` 또는 `user_role`과 같이 애플리케이션이 평가 컨텍스트에서 전송하는 값에 대한 재사용 가능한 정의입니다. 속성을 한 번 정의하면 속성 이름을 다시 입력하고 매번 호환되는 연산자를 수동으로 선택하는 대신, 자동 완성 제안과 데이터 유형을 인식하는 연산자를 사용하여 타겟팅 규칙 전반에서 재사용할 수 있습니다.

각 타겟팅 속성에는 다음이 포함됩니다.

- **속성 키**: 타겟팅 규칙에서 참조하는 식별자입니다(예: `country` 또는 `user.plan`). 키는 조직 내에서 고유하며 대소문자를 구분합니다.
- **데이터 유형**: `Boolean`, `String`, `Number` 또는 `Semver`. 데이터 유형은 타겟팅 규칙에서 속성을 사용할 때 어떤 연산자를 사용할 수 있는지 결정합니다.
- **배포 채널**: 어떤 SDK가 평가 컨텍스트에서 이 속성을 보고하는지 결정합니다. **클라이언트 및 서버**, **클라이언트 전용** 또는 **서버 전용** 중 하나입니다. Semver 속성은 클라이언트 SDK에서만 사용할 수 있습니다.
- **설명**(선택 사항): 해당 속성이 무엇을 나타내는지에 대한 다른 사용자를 위한 메모입니다.

타겟팅 속성은 조직 전체에 적용됩니다. 일단 정의되면 해당 속성은 모든 플래그 및 환경의 타겟팅 규칙에서 사용할 수 있습니다.

## 타겟팅 속성 관리{#manage-targeting-attributes}

조직의 타겟팅 속성을 확인하고 관리하려면 다음 단계를 따르세요.

1. **Feature Flags** > **Settings** > **Targeting Attributes**로 이동합니다.
2. **Create Attribute**를 클릭하여 새 속성을 정의하거나 기존 속성을 선택하여 편집합니다.

각 속성에 대해 다음을 구성합니다.

- **속성 키**: 짧고 설명적인 식별자입니다. Datadog은 저장 시 지원되지 않는 문자를 자동으로 제거합니다.
- **데이터 유형**: Boolean, String, Number 또는 Semver 중에서 선택합니다.
- **배포 채널(어떤 SDK가 평가 컨텍스트에 이 속성을 포함하나요?)**: 클라이언트 및 서버, 클라이언트 전용 또는 서버 전용 중에서 선택하세요.
- **설명**(선택 사항): 다른 사용자가 해당 속성이 무엇을 나타내고 어떻게 채워지는지 알 수 있도록 컨텍스트를 추가하세요.

조직 내에서 동일한 키를 가진 속성을 2개 만들 수 없습니다. 속성을 삭제하는 대신 보관 처리하면 향후 자동 완성 제안에서 제거되지만, 이미 해당 속성을 참조하는 타겟팅 규칙은 변경되지 않습니다.

## 타겟팅 규칙의 속성 자동 완성 {#attribute-autocomplete-in-targeting-rules}

타겟팅 규칙에 필터를 작성하고 속성 필드에 입력을 시작하면 Datadog은 다음 3가지 소스에서 속성을 제안합니다.

- **저장된 타겟팅 속성**: 조직 카탈로그에 저장된 속성으로, 데이터 유형 및 설명과 함께 표시됩니다.
- **평가 데이터에서 관찰된 속성**: 아직 카탈로그에 저장되지 않았지만 지난 7일 동안 SDK가 실제로 전송한 속성입니다. 이 속성들은 데이터 유형 없이 표시됩니다.
- **새 속성 만들기**: 기존 속성이나 관찰된 속성과 일치하지 않는 이름을 입력한 경우 **Create new attribute**를 선택하여 타겟팅 규칙 편집기를 벗어나지 않고 정의할 수 있습니다.

{{< img src="feature_flags/concepts/targeting-attributes-autocomplete.png" alt="자동 완성 제안과 Create new attribute 옵션이 표시되는 타겟팅 규칙의 속성 필드입니다." style="width:70%;" >}}

이 방식으로 속성을 만들면 조직의 카탈로그에 **클라이언트 및 서버** 배포 채널로 저장되며 데이터 유형은 지정되지 않습니다. 데이터 유형을 설정하지 않은 상태로 두거나, 나중에 **Settings** > **Targeting Attributes**에서 속성을 편집하여 설정할 수 있습니다.

필터 위의 **View all attributes**를 클릭하여 Targeting Attributes 설정 페이지로 이동하세요.

## 데이터 유형이 연산자에 미치는 영향{#how-data-type-affects-operators}

타겟팅 규칙에서 속성을 선택하면 제공되는 연산자가 해당 데이터 유형에 맞게 필터링됩니다.

| 데이터 유형 | 사용 가능한 연산자 |
|-----------|---------------------|
| **Boolean** | is, is null |
| **String** | is, matches, does not match, is one of, is not one of, is null |
| **Number** | is, is one of, is not one of, less than, less than or equal to, greater than, greater than or equal to, is null |
| **Semver** | is, is one of, is not one of, is null, semver equals, semver not equals, semver less than, semver less than or equal to, semver greater than, semver greater than or equal to |

Semver 비교는 [Semantic Versioning 2.0.0][1] 값을 지원합니다. 사양에서는 3가지 숫자 구성 요소(예: `1.2.3`)를 요구하지만, Datadog은 하나 이상의 숫자 구성 요소가 있는 값도 허용합니다. 누락된 구성 요소는 0으로 비교되며(`18`, `18.0`, `18.0.0`은 동일함), 0이 아닌 추가 구성 요소는 순서에 영향을 줍니다(`18.0.0.1`이 `18.0.0`보다 큼). 표준 사전 릴리스 우선순위가 적용되며, 빌드 메타데이터는 비교에 영향을 주지 않습니다.

조건의 속성을 호환되지 않는 데이터 유형으로 변경하면 Datadog은 연산자와 값을 새 유형의 기본값으로 재설정합니다. 아직 카탈로그에 저장되지 않은(평가 데이터에서만 관찰된) 속성은 사용 가능한 연산자를 제한하지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/spec/v2.0.0.html