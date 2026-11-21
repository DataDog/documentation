---
aliases:
- /ko/security/application_security/policies/custom_rules/
- /ko/security_platform/application_security/custom_rules
- /ko/security/application_security/custom_rules
- /ko/security/application_security/threats/attacker_fingerprint
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog App and API Protection을 사용하여 위협으로부터 보호
- link: /security/application_security/threat_protection/policies/inapp_waf_rules/
  tag: 설명서
  text: 인앱 WAF 규칙 생성
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: Datadog App and API Protection에 관한 일반적인 문제 해결
- link: /security/notifications/variables/
  tag: 설명서
  text: 보안 알림 변수에 대해 자세히 알아보기
- link: /tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: AAP 쿼리를 정의하는 구문
title: 사용자 지정 탐지 규칙
---
## 개요 {#overview}

App and API Protection(AAP)은 공격 시도, 공격자가 발견한 취약점, 프로덕션 시스템에 영향을 미치는 비즈니스 로직 남용을 탐지하는 [바로 사용 가능한 탐지 규칙][1] 세트를 갖추고 있습니다.

단, 환경이나 워크로드에 따라 규칙을 사용자 지정해야 하는 상황이 있을 수 있습니다. 예를 들어, 비즈니스가 운영되지 않는 지리적 위치에서 민감한 작업을 수행하는 사용자를 탐지하는 탐지 규칙을 사용자 지정할 수 있습니다.

또 다른 예는 내부 보안 스캐너를 제외하도록 규칙을 사용자 지정하는 경우입니다. AAP는 예상대로 해당 활동을 탐지합니다. 그러나 정기적으로 실행되는 스캔에 대해 알림 수신을 거부하고 싶을 수 있습니다.

이러한 상황에서는 해당 이벤트를 제외하도록 사용자 지정 탐지 규칙을 생성할 수 있습니다. 이 가이드에서는 AAP의사용자 지정 탐지 규칙을 생성하는 방법을 안내합니다.

## 비즈니스 로직 남용 탐지 규칙 {#business-logic-abuse-detection-rule}

AAP는 비즈니스 로직 남용(예: 무차별 대입 공격으로 비밀번호 재설정)을 탐지할 수 있는 바로 사용 가능한 규칙을 제공합니다. 이 규칙을 사용하려면 [트레이스에 비즈니스 로직 정보를 추가][7]해야 합니다.

최신 Datadog SDK는 코드를 수정할 필요 없이, 사용자 로그인 및 가입 이벤트를 자동으로 탐지하고 전송합니다. 필요한 경우 [자동 사용자 활동 이벤트 추적을 선택 해제][8]할 수 있습니다.

규칙을 필터링하고 추적을 시작할 비즈니스 로직을 파악할 수 있습니다. 또한 이 규칙을 청사진으로 활용해 자체 비즈니스 로직을 기반으로 사용자 지정 규칙을 생성할 수 있습니다. 

규칙을 설정하는 방법을 알아보려면 다음 섹션을 참조하세요.

## 구성 {#configuration}

바로 사용 가능한(OOTB) 탐지 규칙을 사용자 지정하려면 우선 기존 규칙을 복제해야 합니다. [탐지 규칙][2]으로 이동하여 규칙을 선택합니다. 규칙 하단으로 스크롤하여 {{< ui >}}Clone Rule{{< /ui >}} 버튼을 클릭합니다. 이제 기존 규칙을 편집할 수 있습니다.

### AAP 쿼리 정의 {#define-an-aap-query}

[AAP Trace Explorer와 동일한 쿼리 구문][3]을 사용하여 AAP 쿼리를 구성합니다. 예를 들어, 미국 외부에서 발생하는 로그인 성공을 모니터링하는 쿼리를 생성합니다. `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

(선택 사항) 고유 개수 및 신호 그룹화를 정의합니다. 지정된 기간 동안 특정 속성에 대해 관찰된 고유 값의 수를 계산합니다. 정의된 그룹화(group-by)는 각 그룹화 값별로 신호를 생성합니다. 일반적으로 그룹화는 엔터티(사용자, IP, 서비스 등)입니다. 또한 그룹화는 [쿼리를 병합](#joining-queries)하는 데 사용됩니다.

미리 보기 섹션을 통해 검색 쿼리와 일치하는 AAP 트레이스를 확인합니다. 또한 {{< ui >}}Add Query{{< /ui >}} 버튼을 사용하여 쿼리를 추가할 수 있습니다.

##### 쿼리 병합 {#joining-queries}

쿼리 병합으로 기간 범위를 확장하면 보안 신호의 신뢰도나 심각도를 높일 수 있습니다. 예를 들어, 성공적인 공격 탐지를 위해 서비스와 관련하여 성공 트리거와 실패 트리거를 모두 상호 연결할 수 있습니다.

쿼리는 `group by` 값을 사용하여 상호 연결합니다. `group by` 값은 일반적으로 엔터티(예: `IP` 또는 `Service`)이지만, 어떤 속성이든 지정 가능합니다.

예를 들어, 동일한 `business_logic.users.login.success` 동작을 검색하는 반대 쿼리를 만들고, 성공한 경우와 실패한 경우에 대해 반대되는 HTTP 경로 쿼리를 추가할 수 있습니다.

쿼리 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

쿼리 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

이 경우, 병합된 쿼리는 기술적으로 동일한 속성 값을 가집니다. 즉, 케이스를 충족하려면 값이 동일해야 합니다. `group by` 값이 존재하지 않으면 케이스를 충족할 수 없습니다. 케이스가 일치하면 각 고유 `group by` 값에 대해 보안 신호가 생성됩니다.

### 억제 쿼리로 정상 활동 제외 {#exclude-benign-activity-with-suppression-queries}

{{< ui >}}Only generate a signal if there is a match{{< /ui >}} 필드에서 값이 일치할 경우에만 트리거가 생성되도록 쿼리를 입력할 수 있습니다.

{{< ui >}}This rule will not generate a signal if there is a match{{< /ui >}} 필드에서 값이 일치할 때 트리거가 생성되지 않도록 억제 쿼리를 입력할 수 있습니다. 예를 들어, 서비스에서 신호를 트리거하지만 해당 작업이 정상적이며 이 서비스에서 신호가 트리거되지 않도록 설정하려면 `service`를 제외하는 쿼리를 생성합니다.

### 규칙의 케이스 설정 {#set-a-rule-case}

#### 트리거 {#trigger}

`successful login > 0`와 같은 규칙 케이스는 케이스 구문으로 평가됩니다. 따라서 일치하는 첫 번째 케이스가 신호를 생성합니다. 하나 이상의 규칙 케이스를 생성하고, 옆의 회색 영역을 클릭 후 드래그하여 순서를 조정할 수 있습니다.

규칙 케이스에는 과거에 정의된 쿼리 이벤트 개수를 기준으로 시그널을 생성해야 하는지 여부를 판단하는 논리 연산(`>, >=, &&, ||`)이 포함됩니다.

**참고**: 쿼리 레이블이 연산자보다 선행해야 합니다. 예를 들어, `a > 3`는 사용할 수 있지만 `3 < a`는 허용되지 않습니다.

각 규칙 케이스에 이름을 부여합니다. 신호 생성 시 여기서 부여한 이름이 규칙 이름에 추가됩니다.

#### 중요도와 알림 {#severity-and-notification}

{{% security-rule-severity-notification %}}

### 타임윈도우 {#time-windows}

{{% security-rule-time-windows %}}

{{< ui >}}Add Case{{< /ui >}}를 클릭하여 케이스를 추가합니다.

**참고**: `evaluation window`는 `keep alive` 및 `maximum signal duration`보다 작거나 같아야 합니다.

### 현재 상황 설명 {#say-whats-happening}

{{% security-rule-say-whats-happening %}}

{{< ui >}}Tag resulting signals{{< /ui >}} 드롭다운 메뉴를 사용하여 신호에 태그를 추가하세요. 예를 들어, `attack:sql-injection-attempt`입니다.

**참고**: `security`는 특수 태그입니다. 이 태그는 보안 신호를 분류하는 데 사용됩니다. 권장 옵션은 `attack`, `threat-intel`, `compliance`, `anomaly`, `data-leak`입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /ko/tracing/trace_explorer/query_syntax/
[4]: /ko/monitors/notify/?tab=is_alert#integrations
[5]: /ko/security/notifications/variables/
[6]: /ko/security/notifications/variables/#template-variables
[7]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /ko/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking