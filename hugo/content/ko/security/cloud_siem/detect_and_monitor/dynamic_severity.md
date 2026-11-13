---
aliases:
- /ko/security/cloud_siem/detect_and_monitor/critical_assets/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/suppressions/
  tag: 설명서
  text: 억제
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
title: Dynamic Severity
---
{{< product-availability >}}

## 개요 {#overview}

Dynamic Severity를 사용하면 보안 신호가 영향을 미치는 자산에 따라 보안 신호의 심각도를 조정할 수 있습니다. 이를 통해 분석가는 영향을 받는 자산의 비즈니스 중요도에 따라 기본 심각도를 높이거나 낮추거나 유지하여 신호의 우선순위를 지정할 수 있습니다. 자산별로 심각도 수준을 조정하고, 사용자 지정 태그를 적용하며, 변경 사항을 특정 규칙으로 한정할 수 있습니다.

### 작동 방식 {#how-it-works}

- 보안 신호의 심각도 수준을 조정하도록 여러 동적 심각도 규칙이 설정된 경우, 더 높은 심각도 수준이 자동으로 적용됩니다. 예를 들어, 하나의 동적 심각도 규칙이 심각도를 `MEDIUM`으로 설정하고 다른 규칙이 `HIGH`로 설정하면 심각도는 `HIGH`가 됩니다.
- 보안 신호의 심각도 수준에 대해 동일한 작업을 수행하도록 여러 동적 심각도 규칙이 설정된 경우, 해당 작업은 한 번만 적용됩니다. 예를 들어, `MEDIUM`으로 설정된 신호의 심각도 수준을 높이도록 두 개의 별도 동적 심각도 규칙이 설정된 경우, `CRITICAL`로 다시 높아지지 않고 `HIGH`로 한 번만 높아집니다.

## 동적 심각도 규칙 생성 {#create-a-dynamic-severity-rule}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1]로 이동한 다음 {{< ui >}}Create Dynamic Severity Rule{{< /ui >}}을 클릭합니다. Create Dynamic Severity Rule 창이 열립니다.
1. {{< ui >}}Define Asset{{< /ui >}}에서 자산을 정의할 쿼리를 입력합니다.
1. {{< ui >}}Choose Severity Adjustment{{< /ui >}}에서 자산과 관련된 보안 신호의 심각도를 조정하는 방법을 선택합니다.
   - 기본 심각도 수준으로 시작하려면 {{< ui >}}Increase{{< /ui >}} 또는 {{< ui >}}Decrease{{< /ui >}}를 선택하여 심각도를 한 단계 높이거나 낮춥니다.
   - 기본 심각도 수준을 유지하려면 {{< ui >}}Maintain{{< /ui >}}을 선택합니다.
   - 신호와 관련된 초기 심각도와 관계없이 항상 특정 심각도 수준을 적용하려면 해당 심각도 수준을 선택합니다.
1. (선택 사항) {{< ui >}}Details{{< /ui >}}에서 동적 심각도 규칙에 적용할 설명, 태그 및 팀을 추가합니다.
1. {{< ui >}}Select Detection Rules{{< /ui >}}에서 심각도 변경 범위를 좁힐 특정 탐지 규칙을 입력합니다. 모든 탐지 규칙에 변경 사항을 적용하려면 쿼리를 `*`로 설정합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다. Create Dynamic Severity Rule 창이 닫히고 동적 심각도 규칙이 표에 나타나며, 여기서 규칙을 활성화 또는 비활성화하거나 구성을 Terraform 또는 JSON 파일로 내보낼 수 있습니다.

## 동적 심각도 규칙이 영향을 미친 신호 보기{#view-the-signals-a-dynamic-severity-rule-affected}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1]로 이동합니다.
1. 동적 심각도 규칙 옆의 {{< ui >}}More Options{{< /ui >}} 아이콘을 클릭한 다음 {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}{{< ui >}}Signals affected{{< /ui >}}를 클릭합니다. 영향을 받은 신호를 보여주는 쿼리가 미리 채워진 Signals Explorer가 새 탭에서 열립니다.

## 보안 신호에서 동적 심각도 데이터 보기 {#view-dynamic-severity-data-in-security-signals}

동적 심각도 규칙이 수정한 모든 보안 신호에는 {{< ui >}}Adjusted Severity{{< /ui >}} 배지가 표시되어 원래 심각도 수준과 조정된 심각도 수준을 모두 나타냅니다. 해당 배지 위로 마우스를 가져가면 동적 심각도 규칙이 적용한 조정 내용을 확인할 수 있습니다.
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="CloudTrail 신호의 심각도가 낮음에서 중간으로 상향 조정되었음을 나타내는 Adjusted Severity 배지 및 팝업" style="width:50%;" >}}

보안 신호의 {{< ui >}}JSON{{< /ui >}} 탭에서 `critical_assets_data` 객체를 찾을 수도 있으며, 여기에는 연결된 동적 심각도 규칙에 대한 정보와 해당 규칙이 신호의 심각도에 미친 영향이 포함되어 있습니다.
<div class="alert alert-info">동적 심각도 규칙의 심각도 수준이 더 높은 심각도 수준에 의해 재정의된 경우, 해당 규칙은 <code>critical_assets_data</code> 객체에 나타나지 않을 수 있습니다.</div>

## 편집 권한 제한 {#restrict-edit-permissions}

{{% security-products/dynamic-severity-granular-access %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/dynamic-severity