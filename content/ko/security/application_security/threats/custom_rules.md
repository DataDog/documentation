---
aliases:
- /ko/security_platform/application_security/custom_rules
- /ko/security/application_security/custom_rules
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리로 위협으로부터 보호
- link: /security/application_security/event_rules/
  tag: 설명서
  text: 이벤트 규칙 생성
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: 일반적인 Datadog 애플리케이션 보안 관리 문제 트러블슈팅
- link: /security/notifications/variables/
  tag: 설명서
  text: 보안 알림 변수에 대해 자세히 알아보기
- link: /tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: ASM 쿼리를 정의하는 구문
title: 커스텀 탐지 규칙
---

## 개요

애플리케이션 보안 관리(ASM)는 공격 시도, 공격자가 발견한 취약점, 프로덕션 시스템에 영향을 미치는 비즈니스 로직 남용을 탐지하는 [바로 사용 가능한 탐지 규칙][1] 세트를 갖추고 있습니다.

그러나 내 환경이나 워크로드에 맞게 규칙을 사용자 지정해야 할 경우가 있습니다. 예를 들어 내 사업이 운영되는 위치가 아닌 곳에서 민감한 작업을 수행하는 사용자를 탐지하는 탐지 규칙을 사용자 지정할 수 있습니다.

또, 내부 보안 스캐너를 제외하도록 규칙을 커스텀하는 사례도 생각해볼 수 있습니다. ASM은 규칙에 따라 활동을 탐지합니다. 그러나 정기적으로 발생하는 검사 알림을 받고 싶지 않는 경우도 존재합니다.

이러한 경우, 커스텀 탐지 규칙을 생성하여 해당 이벤트를 제외할 수 있습니다. 이번 가이드에서는 ASM의 커스텀 탐지 규칙을 생성하는 방법을 설명해드리겠습니다.

## 비즈니스 로직 남용 탐지 규칙

ASM은 비즈니스 로직 남용(예: 무차별 대입 공격으로 비밀번호 재설정)을 탐지할 수 있는 바로 사용 가능한 규칙을 제공합니다. 해당 규칙을 사용하려면 [트레이스에 비즈니스 로직 정보를 추가][7]해야 합니다.

Datadog의 최신 라이브러리 추적은 코드를 수정하지 않아도 사용자 로그인 및 가입 이벤트를 감지하여 전송합니다. 필요한 경우 [사용자 활동 이벤트 자동 추적]을 해제할 수 있습니다[8].

규칙을 필터링하고 추적을 시작할 비즈니스 로직을 식별할 수 있습니다. 해당 규칙을 청사진으로 활용하여 자체 비즈니스 로직에 기반한 커스텀 규칙을 생성할 수도 있습니다.

규칙을 설정하는 방법을 알아보려면 다음 섹션을 참조하세요.

## 설정

OOTB 탐지 규칙을 커스텀 설정하려면 먼저 기존 규칙을 복제해야 합니다. [Detection Rules][2]로 이동해 규칙을 선택하세요. 규칙 하단까지 스크롤을 내린 다음 Clone Rule 버튼을 클릭합니다. 이렇게 하면 기존 규칙을 수정할 수 있습니다.

### ASM 쿼리 정의

[ASM 트레이스 익스플로러와 동일한 쿼리 구문][3]을 사용하여 ASM 쿼리를 구성합니다. 예를 들어, 미국 외부 지역에서의 로그인 성공을 모니터링하는  `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US` 쿼리를 만듭니다.

선택 사항으로 고유한 카운트와 시그널 그룹화(group-by)를 정의할 수 있습니다. 특정 타임 프레임에서 속성에 대해 관측된 고유값의 수를 셉니다. 그룹화 정의에 따라 각 그룹화 값별로 시그널이 생성됩니다. 일반적으로 그룹으로 묶으면 하나의 엔티티(예: 사용자, IP 또는 서비스)가 됩니다. 그룹화는 [쿼리를 병합](#joining-queries)하는 용도로도 활용됩니다.

미리보기 섹션에서 검색 쿼리와 일치하는 ASM 트레이스를 확인합니다. 쿼리 추가 버튼을 사용하여 쿼리를 추가할 수도 있습니다.

##### 쿼리의 병합

기간 내 쿼리를 병합하면 보안 시그널의 신뢰도와 중요도를 높일 수 있습니다. 예를 들어 성공한 공격 시도를 탐지하기 위해, 성공한 트리거와 실패한 트리거를 모두 서비스와 연계할 수 있습니다.

쿼리를 병합할 때는 `group by` 값을 사용합니다. `group by` 값은 일반적으로 엔티티(예: `IP` 또는 `Service`)입니다만, 모든 속성을 지정할 수 있습니다.

예를 들면 동일한 `business_logic.users.login.success` 동작을 검색하는 반대 쿼리를 만들고, 성공한 경우와 실패한 경우에 대하여 반대되는 HTTP 경로 쿼리를 추가할 수 있습니다.

쿼리 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

쿼리 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

이 경우, 병합된 쿼리는 기술적으로 동일한 속성값을 보유합니다. `group by` 값이 존재하지 않는다면 케이스에 부합하지 않습니다. 케이스에 부합하면 고유한 `group by` 값마다 보안 시그널이 생성됩니다.

### 억제 쿼리로 정상 활동 제외하기

**값이 일치하는 경우에만 시그널 생성** 필드에는 값이 일치할 경우에만 트리거가 생성되도록 쿼리를 입력하는 옵션이 있습니다.

**이 규칙은 값이 일치하는 경우 시그널을 생성하지 않음** 필드에는 값이 일치할 경우 트리거가 생성되지 않도록 억제 쿼리를 입력하는 옵션이 있습니다. 예를 들어, 서비스가 시그널을 트리거하지만 동작이 정상이므로 해당 서비스가 트리거하는 시그널을 수신하지 않으려면 `service`을 제외한 쿼리를 생성합니다.

### 규칙 케이스 설정

#### 트리거

`successful login > 0` 같은 규칙 케이스는 케이스 구문(case문)으로 평가됩니다. 따라서 처음 일치하는 케이스가 시그널을 생성합니다. 하나 또는 여러 개의 규칙 케이스를 작성하고, 옆에 있는 회색 영역을 클릭한 다음 드래그하여 순서를 변경할 수 있습니다.

규칙 케이스에는 과거에 정의된 쿼리 이벤트 개수를 기준으로 시그널을 생성해야 하는지 여부를 판단하는 논리 연산(`>, >=, &&, ||`)이 포함됩니다.

**참조**: 쿼리 라벨은 연산자보다 선행해야 합니다. 예를 들어, `a > 3`는 사용할 수 있지만 `3 < a`는 허용되지 않습니다.

각 규칙 케이스에 **이름**을 부여합니다. 시그널 생성 시 여기서 부여한 이름이 규칙 이름에 추가됩니다.

#### 중요도와 알림

{{% security-rule-severity-notification %}}

### 타임 윈도우

{{% security-rule-time-windows %}}

케이스를 추가하려면 **케이스 추가**를 클릭합니다.

**참조**: `evaluation window`는 `keep alive` 및 `maximum signal duration` 이하여야 합니다.

### 진행 상황 전달

{{% security-rule-say-whats-happening %}}

**결과 신호 태그** 드롭다운 메뉴에서 신호에 태그를 추가합니다. 예: `attack:sql-injection-attempt`.

**참조**: `security` 태그는 특수합니다. 이 태그는 보안 시그널 분류에 사용됩니다. `attack`, `threat-intel`, `compliance`, `anomaly`, `data-leak` 등 다른 태그를 사용하시길 권장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /ko/tracing/trace_explorer/query_syntax/
[4]: /ko/monitors/notify/?tab=is_alert#integrations
[5]: /ko/security/notifications/variables/
[6]: /ko/security/notifications/variables/#template-variables
[7]: /ko/security/application_security/threats/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /ko/security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking