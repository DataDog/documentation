---
description: Workload Protection 발견 사항을 검토하고 분류하여 런타임 보안 태세 문제를 해결합니다.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
  tag: 설명서
  text: 발견 사항 규칙에 관해 알아보기
title: 발견 사항
---
[Workload Protection][1] 발견 사항은 리소스(호스트 또는 컨테이너)의 Agent 이벤트가 [발견 사항 규칙][2]과 일치할 때 생성됩니다. [Findings Explorer][3]에서 발견 사항을 조회, 필터링 및 분류하여 런타임 보안 태세를 평가하고 개선하세요.

Datadog은 조사 및 감사 목적으로 발견 사항 전체 기록을 저장합니다.

## Findings Explorer {#findings-explorer}

[Findings Explorer][3]에는 인프라 전반의 발견 사항이 나열됩니다. 각 항목에는 영향을 받는 리소스, 발견 사항을 생성한 발견 사항 규칙, 문제가 처음 보고된 시점, 현재 상태, 담당 팀 또는 서비스가 표시됩니다.

{{< ui >}}View All{{< /ui >}}을 클릭하면 동일한 발견 사항 규칙의 영향을 받는 리소스 전체 목록을 확인할 수 있습니다.

### 발견 사항 필터링{#filter-findings}

검색창과 패싯 패널을 사용하여 심각도, 분류 상태, 규칙, 호스트 또는 컨테이너를 기준으로 발견 사항의 범위를 좁히세요.

분류 상태별로 필터링하려면 검색 쿼리 `@workflow.triage.status:(open OR in-progress)`를 사용하세요.

### 발견 사항 그룹화{#group-findings}

{{< ui >}}Group by{{< /ui >}}를 사용하여 목록을 구성하세요.

- {{< ui >}}Rule Name{{< /ui >}}: 발견 사항 규칙을 기준으로 리소스를 그룹화합니다.
- {{< ui >}}Resource Name{{< /ui >}}: 호스트 또는 컨테이너별로 발견 사항을 그룹화합니다.
- {{< ui >}}None{{< /ui >}}: 발견 사항을 flatlist로 표시합니다.

### 보기 저장{#save-views}

현재 검색 및 필터 설정을 나중에 사용할 수 있도록 저장하려면 {{< ui >}}Views{{< /ui >}} 위에 마우스를 올린 다음 {{< ui >}}Save as new view{{< /ui >}}를 클릭합니다.

## 발견 사항 세부 정보{#finding-details}

발견 사항을 클릭하면 사이드 패널이 열리고, 리소스 및 해당 발견 사항을 생성한 발견 사항 규칙에 관한 상세한 정보가 표시됩니다.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_side_panel.png" alt="What Happened 섹션과 분류 컨트롤이 표시된 발견 사항 사이드 패널" width="100%">}}

{{< ui >}}What Happened{{< /ui >}} 섹션에는 다음 정보가 표시됩니다.

- 발견 사항이 처음 보고된 시점.
- 영향을 받는 리소스의 위치.
- 일치한 발견 사항 규칙.

{{< ui >}}Trigger Event{{< /ui >}} 탭을 선택하여 발견 사항과 연결된 Agent 이벤트를 검토하세요.

### 해결 지침 {#remediation-guidance}

각 OOTB 발견 사항 규칙에는 Datadog 보안 팀이 작성한 문제 해결 지침이 포함되어 있습니다. {{< ui >}}Remediation{{< /ui >}} 탭을 선택하여 문제 해결 단계를 검토하고 근본적인 구성 오류를 해결하세요.

{{< img src="security/workload_protection/investigate_and_triage/findings/findings_remediation.png" alt="영향을 받는 리소스에 대한 문제 해결 단계가 표시된 발견 사항 세부 정보" width="100%">}}

## 발견 사항 분류 {#triage-findings}

발견 사항 사이드 패널에서 {{< ui >}}Next Steps{{< /ui >}}를 사용하여 발견 사항을 관리하세요.

- {{< ui >}}Status{{< /ui >}}: 조사 진행 상황을 반영하도록 발견 사항의 상태를 업데이트합니다.
- {{< ui >}}Mute{{< /ui >}}: 해당 동작이 예상되거나 허용 가능한 경우 지정된 기간 동안 발견 사항을 차단합니다.
- {{< ui >}}Add Ticket{{< /ui >}}: 후속 조치를 위해 발견 사항을 티켓에 추가합니다.

[1]: /ko/security/workload_protection/
[2]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[3]: https://app.datadoghq.com/security/workload-protection/findings