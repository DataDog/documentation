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
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 억제
---
{{< product-availability >}}

## 개요 {#overview}

억제 조건은 신호가 생성되지 말아야 할 조건을 뜻합니다. 이 조건을 사용해 생성되는 신호의 정확도와 관련성을 높일 수 있습니다.

{{< callout btn_hidden="true" header="억제 평가" respect-site-support="false" >}}
억제 쿼리에는 **신호 속성**에 대한 억제와 **로그 또는 이벤트 속성**에 대한 억제, 두 가지 유형이 있습니다. 신호 기반 억제는 신호가 생성되는 시점에만 평가됩니다. 신호가 업데이트될 때는 재평가되지 않습니다. 로그 및 이벤트 속성 억제는 일치하는 이벤트가 새 신호를 생성하거나 기존 신호를 업데이트하지 못하도록 합니다. Datadog은 특정 활동을 안정적으로 제외하기 위해 로그 및 이벤트 속성 억제를 사용할 것을 권장합니다.
{{< /callout >}}

## 억제 루트 {#suppression-routes}

개별 [탐지 규칙](#detection-rules) 내에서 억제 쿼리를 설정하거나 별도의 [억제 규칙](#suppression-rules)을 정의해 하나 이상의 탐지 규칙에 걸쳐 신호를 억제할 수 있습니다.

### 탐지 규칙 {#detection-rules}

탐지 규칙을 [만들거나][1] [수정할][2] 때, 신호가 생성되지 않도록 억제 쿼리를 정의할 수 있습니다. 예를 들어, 탐지 규칙이 보안 신호를 트리거하는 시점을 결정하기 위해 규칙 쿼리를 추가합니다. 특정 속성 값에 대한 신호를 억제하도록 억제 쿼리를 사용자 지정할 수도 있습니다.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="억제 쿼리 추가 섹션을 보여주는 탐지 규칙 편집기" style="width:65%;" >}}

### 억제 규칙 {#suppression-rules}

각 개별 탐지 규칙에 대해 억제 조건을 설정하는 대신 억제 규칙을 사용하여 여러 탐지 규칙에 걸쳐 일반적인 억제 조건을 설정하세요. 예를 들어, 특정 IP를 포함하는 모든 신호를 억제하도록 억제 규칙을 설정할 수 있습니다.

## 억제 구성 {#suppressions-configuration}

### 억제 목록 {#suppression-list}

[억제 목록][3]을 사용해 여러 탐지 규칙의 억제 조건을 중앙에서 조직적으로 관리할 수 있습니다.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="억제 규칙 목록을 보여주는 억제 페이지" style="width:90%;" >}}

## 억제 규칙 만들기 {#create-a-suppression-rule}

1. [억제][3] 페이지로 이동합니다.
1. {{< ui >}}\+ New Suppression{{< /ui >}}를 클릭합니다.
1. 억제 쿼리 이름을 입력합니다.
1. 이 억제가 적용되는 컨텍스트를 제공하는 설명을 추가합니다.
1. 필요시 이 억제가 비활성화될 만료 날짜를 추가합니다.
1. 이 억제를 적용할 탐지 규칙을 선택합니다. 여러 탐지 규칙을 선택할 수 있습니다.
1. {{< ui >}}Add Suppression Query{{< /ui >}} 섹션에서 억제 쿼리를 입력하여 해당 조건이 충족될 때 신호가 생성되지 않도록 설정할 수 있습니다. 예를 들어, 사용자 `john.doe`가 신호를 트리거하지만 해당 액션이 무해하여 더 이상 이 사용자로 인해 신호가 트리거되지 않도록 하려면 로그 쿼리 `@user.username:john.doe`를 입력합니다.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="@user.username:john.doe 쿼리가 입력된 억제 쿼리 추가 화면" style="width:65%;" >}}
  억제 규칙 쿼리는 **신호 속성**에 기반합니다.
1. 또한, 로그 제외 쿼리를 추가하여 로그가 분석 대상에서 제외되도록 할 수 있습니다. 이러한 쿼리는 **로그 속성**에 기반합니다. **참고**: 기존 억제는 로그 제외 쿼리에 기반했지만, 이제는 억제 규칙의 {{< ui >}}Add a suppression query{{< /ui >}} 단계에 포함됩니다.

### 편집 권한 제한하기 {#restrict-edit-permissions}

{{% security-products/suppressions-granular-access %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /ko/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /ko/logs/explorer/facets/#log-side-panel