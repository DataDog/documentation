---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: 설명서
  text: 탐지 규칙에 대해 자세히 알아보기
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: CSM 위협
  url: /security/threats/
- icon: app-sec
  name: 앱 및 API 보호
  url: /security/application_security/
title: 억제
---

{{< product-availability >}}

## 개요

억제 조건은 신호가 생성되지 말아야 할 조건을 뜻합니다. 이 조건을 사용해 생성되는 신호의 정확도와 관련성을 높일 수 있습니다.

## 억제 루트

개별 [탐지 규칙](#detection-rules) 내에서 억제 쿼리를 설정하거나 별도의 [억제 규칙](#suppression-rules)을 정의해 하나 이상의 탐지 규칙에 신호를 억제할 수 있습니다.

### 탐지 규칙

탐지 규칙을 [생성][1]하거나 [수정][2]할 때 억제 쿼리를 정의해 신호가 생성되는 것을 예방할 수 있습니다. 예를 들어 탐지 규칙으로 보안 신호를 트리거하는 시기를 규칙 쿼리로 추가할 수 있습니다. 또 억제 쿼리를 사용자 지정해 특정 속성 값의 신호를 억제할 수 있습니다.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="억제 쿼리 추가 섹션을 보여주는 탐지 규칙 편집기" style="width:65%;" >}}

### 억제 규칙

개별 탐지 규칙마다 억제 조건을 설정하는 대신, 여러 탐지 규칙에 일반적인으로 적용할 수 있는 억제 조건을 사용하는 것이 좋습니다. 예를 들어 특정 IP를 포함한 신호를 억제하는 억제 규칙을 설정할 수 있습니다.

## 억제 구성

### 억제 목록

[억제 목록][3]을 사용해 여러 탐지 규칙의 억제 조건을 중앙에서 조직적으로 관리할 수 있습니다.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="억제 규칙 목록을 보여주는 억제 페이지" style="width:90%;" >}}

## 억제 규칙 만들기

1. [억제][3] 페이지로 이동하세요.
1. **+ New Suppression**을 클릭하세요.
1. 억제 쿼리 이름을 입력하세요.
1. 이 억제 조건을 적용하는 이유를 포함한 컨텍스트 설명을 추가하세요.
1. (선택 사항) 이 억제 조건이 비활성화될 만료 날짜를 추가하세요.
1. 이 억제 조건을 적용할 탐지 규칙을 선택하세요. 탐지 규칙 여러 개를 선택해도 됩니다.
1. **Add Suppression Query** 섹션에 특정 값일 경우 신호를 생성하지 않는 억제 쿼리를 입력하는 옵션이 있습니다. 예를 들어 사용자 `john.doe`가 신호를 트리거했으나 악영향이 없는 것으로 파악되어 이 사용자가 트리거하는 신호를 받고 싶지 않을 경우, 로그 쿼리에 `@user.username:john.doe`를 입력하면 됩니다.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="@user.username:john.doe 쿼리로 억제 쿼리 추가" style="width:65%;" >}}
  억제 규칙 쿼리는 **신호 속성**에 기반합니다.
1. 또한 로그 제외 쿼리를 추가하여 로그를 분석에서 제외할 수 있습니다. 이러한 쿼리는 **로그 속성**을 기반으로 합니다. **참고**: 기존 억제 조건은 로그 제외 쿼리를 기반으로 했지만 이제 억제 규칙의 **Add a suppression query** 단계에 포함됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /ko/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /ko/logs/explorer/facets/#log-side-panel
