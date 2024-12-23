---
aliases:
- /ko/security_platform/cloud_siem/signal_correlation_rules
further_reading:
- link: /cloud_siem/explorer/
  tag: 설명서
  text: 보안 시그널 익스플로러 알아보기
- link: /security/notifications/variables/
  tag: 설명서
  text: 보안 알림 변수에 대해 자세히 알아보기
title: 신호 상관관계 규칙
type: 설명서
---

## 개요

신호 상관관계 규칙은 여러 개의 신호를 결합하여 새로운 신호를 생성함으로써 보다 복잡한 사용 사례에 대한 알림을 생성하고 알림 피로를 줄일 수 있도록 합니다. 예를 들어 이벤트 또는 신호를 상호 연관시켜 특정 문제를 식별하거나 특정 `low` 심각도 신호가 특정 `high` 심각도 신호와 결합된 경우에만 알림을 생성할 수 있습니다.

다른 예로, 이 두 규칙을 결합하여 신호를 만들 수 있습니다:

1. 만료된 계정에서 액세스 시도가 있었는지 감지하기
2. 호스트 또는 리소스에 대한 인증 시도가 있었는지 감지합니다.

그리고 `expired account ID` 속성을 사용하여 두 규칙을 상호 연관시킵니다.

로그 탐지 규칙과 로그 탐지 규칙을 클라우드 보안 관리 위협 및 애플리케이션 보안 관리 규칙과 상호 연관시킬 수 있습니다.

## 신호 상관관계 규칙 만들기

[탐지 규칙][1]으로 이동한 후 **+ 새 규칙**을 클릭합니다. *규칙 유형 선택* 섹션에서 **신호 상관관계**를 클릭합니다.

### 규칙 설정

1. **규칙 a**에 대한 규칙을 선택합니다. 연필 아이콘을 클릭하여 규칙의 이름을 바꿉니다. **상관관계 기준** 드롭다운을 사용하여 상관관계가 있는 속성을 정의합니다. 여러 속성(최대 3개)을 선택하여 선택한 규칙을 연관시킬 수 있습니다. 슬라이딩 창에 대한 자세한 내용은 [시간 윈도우즈(Windows)](#time-windows)을 참조하세요.

2. 두 번째 규칙 편집기의 드롭다운에서 **규칙 b**에 대한 규칙을 선택합니다. 연필 아이콘을 클릭하여 규칙의 이름을 바꿉니다. 속성 및 슬라이딩 창 시간 프레임은 **규칙 a**에 대해 선택한 것으로 설정됩니다.

### 규칙 사례 설정

#### 트리거

{{< img src="security/security_monitoring/detection_rules/define_rule_case.png" alt="트리거, 심각도 및 알림 필드를 표시하는 설정된 규칙 사례 섹션" >}}

규칙 케이스는 사례 문으로 평가됩니다. 따라서 일치하는 첫 번째 사례가 신호를 생성합니다. 규칙 사례의 예는`a > 3`, 여기서 `a`은 규칙 이름입니다. 규칙 케이스를 클릭하고 드래그하여 순서를 조작할 수 있습니다.

규칙 케이스에는 이전에 정의된 쿼리의 이벤트 개수 에 따라 신호를 생성할지 여부를 결정하는 논리 연산(`>, >=, &&, ||`)이 포함되어 있습니다. 이 섹션에서는 ASCII 소문자 [규칙 이름](#set-rules)을 참조합니다.

**참조**: 쿼리 라벨은 연산자보다 선행해야 합니다. 예를 들어, `a > 3`는 사용할 수 있지만 `3 < a`는 허용되지 않습니다.

각 규칙 사례에 대해 **이름**(예: "사례 1")을 입력합니다. 이 이름은 신호가 생성될 때 규칙 이름에 추가됩니다.

#### 중요도와 알림

{{% security-rule-severity-notification %}}

#### 타임윈도우

{{% security-rule-time-windows %}}

사례를 추가하려면 **사례 추가**를 클릭합니다.

**참조**: `evaluation window`는 `keep alive` 및 `maximum signal duration` 이하여야 합니다.

### Say what's happening

{{% security-rule-say-whats-happening %}}

사용 **태그 결과 신호** 드롭다운 메뉴를 사용하여 태그 을 신호에 추가합니다. 예: `security:attack` 또는 `technique:T1110-brute-force`.

**참조**: `security` 태그는 특수합니다. 이 태그는 보안 시그널 분류에 사용됩니다. `attack`, `threat-intel`, `compliance`, `anomaly`, `data-leak` 등 다른 태그를 사용하시길 권장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?product=siem