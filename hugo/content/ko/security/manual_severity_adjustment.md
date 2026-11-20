---
further_reading:
- link: /security/automation_pipelines/modify_severity/
  tag: 설명서
  text: 심각도 수정자 규칙
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 심각도 조정
---
{{< product-availability >}}

조직의 비즈니스 상황을 반영하도록 해당 탐지 결과의 심각도를 수동으로 조정하되, [심각도 조정자 규칙][1]을 생성하지 않습니다.

## 지원되는 제품 {#supported-products}

다음 제품에서 해당 탐지 결과의 심각도를 수동으로 조정할 수 있습니다.

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## 권한 {#permissions}

해당 탐지 결과의 심각도를 조정하려면 `security_monitoring_findings_write` 또는 `appsec_vm_write` 권한이 있어야 합니다. Datadog의 기본 역할과 세분화된 역할 기반 액세스 제어 권한에 대한 자세한 내용은 [역할 기반 액세스 제어][6]를 참조하세요.

## 탐지 결과의 심각도 조정하기 {#adjust-the-severity-of-a-finding}

{{< img src="security/manual_severity_adjustment/finding_side_panel_button.png" alt="오버플로 메뉴에서 Adjust Severity 옵션이 강조 표시된 탐지 결과의 측면 패널" style="width:100%;" >}}

1. 탐지 결과를 엽니다.
2. {{< ui >}}Adjust Severity{{< /ui >}}를 클릭합니다. **Adjust Severity** 대화 상자가 열립니다.
3. 새 심각도(예: **Critical**)를 선택합니다.
4. 필요한 경우, 설명을 입력합니다.
5. {{< ui >}}Adjust Severity{{< /ui >}}를 클릭합니다.

특정 기준을 충족하는 해당 탐지 결과의 심각도를 자동으로 조정하려면 [심각도 수정자 규칙][1]을 참조하세요.

## 여러 탐지 결과의 심각도 조정하기 {#adjust-the-severity-of-multiple-findings}

여러 탐지 결과의 심각도를 한 번에 조정하려면 다음 단계를 따르세요.

1. 탐색기에서 최대 50개의 발견 항목을 선택합니다.
2. {{< ui >}}Severity{{< /ui >}}를 클릭합니다. **Adjust Severity** 대화 상자가 열립니다.
3. 새 심각도(예: **Critical**)를 선택합니다.
4. 필요한 경우, 설명을 입력합니다.
5. {{< ui >}}Adjust Severity{{< /ui >}}를 클릭합니다.

## 수정된 탐지 결과 식별하기 {#identify-modified-findings}

수동으로 심각도가 조정된 탐지 결과에는 탐색기 목록 보기와 탐지 결과의 측면 패널 헤더에 시각적 표시기가 나타납니다. 표시기 위로 마우스를 가져가면 심각도를 조정한 사용자와 입력한 설명을 확인할 수 있습니다.

{{< img src="security/manual_severity_adjustment/severity_pill_popover.png" alt="심각도 증가를 보여주는 심각도 배지와 심각도를 조정한 사용자와 입력된 설명이 표시되는 팝오버" style="width:65%;" >}}

CVSS 점수가 있는 탐지 결과(컨테이너 이미지 취약성, 호스트 취약성, 라이브러리 취약성 및 런타임 코드 취약성)의 경우, 사이드 패널 심각도 섹션에는 다음을 보여주는 분석 내용도 포함됩니다.
- 조정 전의 원래 심각도 수준, CVSS 점수 및 CVSS 벡터.
- 조정을 수행한 사용자의 이름 및 입력된 설명.
- 결과 심각도 수준 및 조정된 CVSS 점수.

{{< img src="security/manual_severity_adjustment/severity_breakdown.png" alt="원래 심각도, CVSS 점수 및 CVSS 벡터, 조정을 수행한 사용자, 결과 심각도 수준 및 조정된 CVSS 점수와 함께 심각도 분석을 보여주는 탐지 결과 사이드 패널." style="width:100%;" >}}

## 취약성 탐지 결과 및 CVSS 점수 {#vulnerability-findings-and-cvss-scores}

Datadog 조정 CVSS 점수가 있는 취약성 발견 항목의 경우, 심각도를 수동으로 조정하면 `@severity_details.user_adjusted`에 저장한 조정된 점수도 업데이트됩니다. 업데이트된 점수는 대상 심각도 CVSS v3 범위의 중간값 정도로 설정됩니다.

| 대상 심각도 | CVSS v3 범위 |
|---|---|
| None | 0.0 |
| Low | 0.1~3.9 |
| Medium | 4.0~6.9 |
| High | 7.0~8.9 |
| Critical | 9.0~10.0 |

원본 CVSS 벡터는 절대 수정되지 않습니다. 조정된 점수와 일치하도록 생성된 신서틱 벡터는 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/automation_pipelines/modify_severity/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /ko/account_management/rbac/permissions/#cloud-security-platform