---
aliases:
- /ko/security/workload_protection/inventory/coverage_map
- /ko/security/workload_protection/inventory/hosts_and_containers
- /ko/security/workload_protection/inventory/serverless
description: Agent, 정책 및 규칙 배포 상태를 포함하여 호스트, ECS Fargate 및 EKS Fargate 워크로드 전반의 Workload
  Protection 적용 범위를 평가하세요.
disable_toc: false
further_reading:
- link: /security/detection_rules/#mitre-attck-map
  tag: 설명서
  text: MITRE ATT&CK 맵
- link: https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map
  tag: 릴리스 노트
  text: 적용 범위 맵으로 Workload Protection 적용 범위 검토하기
title: 적용 범위
---
Workload Protection [적용 범위][1]를 통해 호스트, ECS Fargate 및 EKS Fargate 워크로드 전반의 보안 적용 범위를 실시간으로 조회할 수 있습니다. 적용 범위를 사용하여 보호 상태를 평가하고, 격차를 식별하며, 보호되지 않거나 잘못 구성된 워크로드에 대해 조치를 취하세요.

적용 범위는 각 리소스의 정책 및 Agent 규칙이 성공적으로 로드되었는지 여부를 반영합니다. 정책이 Agent에 도달하는 방법에 대한 자세한 내용은 [정책 활성화 및 배포하기][5]를 참조하세요.

적용 범위 격차를 식별하고 해결하려면 [적용 범위 검토 및 개선하기][6]를 참조하세요.

{{< img src="security/workload_protection/coverage_page/coverage_explorer.png" alt="패싯이 적용된 표로 리소스를 보여주는 적용 범위 페이지의 탐색기 뷰" width="100%">}}

## 보기 {#views}

적용 범위에는 두 가지 보기가 있습니다. 페이지 상단의 토글을 사용하여 두 가지 보기 간에 전환하세요.

- {{< ui >}}Explorer{{< /ui >}}: 패싯이 적용된 리소스 표입니다. {{< ui >}}Agent{{< /ui >}}, {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Policy{{< /ui >}}, {{< ui >}}Infrastructure{{< /ui >}} 및 {{< ui >}}Container{{< /ui >}} 패싯별로 리소스를 검색하고 필터링한 다음, 리소스를 열어 Agent 규칙 및 정책 배포 상태를 검사하세요.

- {{< ui >}}Map{{< /ui >}}: 각 리소스가 적용 범위 상태 심각도에 따라 지정된 육각형으로 표시되는 시각적 맵입니다.

{{< img src="security/workload_protection/coverage_page/coverage_map.png" alt="적용 범위 상태에 따라 색상이 지정된 육각형으로 리소스를 보여주는 적용 범위 페이지의 맵 보기" width="100%">}}

두 보기 모두에서 다음이 가능합니다.

- 클라우드 공급자, OS, Agent 버전, 심각도 또는 Kubernetes 클러스터를 {{< ui >}}기준으로 그룹화{{< /ui >}}합니다.
- 요청 시 보기를 새로 고침합니다.

리소스의 Agent가 규칙 세트를 로드하는 즉시 해당 리소스가 적용 범위에 나타납니다. 리소스가 오프라인 상태가 되면 15분 이내에 적용 범위에서 제거됩니다.

## 적용 범위 상태 {#coverage-statuses}

### 리소스 적용 범위 상태 {#resource-coverage-status}

각 리소스의 적용 범위 상태는 로드된 규칙에 따라 두 가지 심각도 적용 범위 중 하나에 속합니다.

| 심각도 | 의미 |
|----------|---------|
| 통과 | 모든 규칙이 성공적으로 로드되었거나 예상대로 필터링되었습니다. |
| 오류 | 하나 이상의 규칙에 수정이 필요한 오류가 있거나 리소스가 불완전한 데이터를 보고했습니다. |

맵 보기에서 리소스는 심각도에 따라 색상이 지정된 육각형으로 표시됩니다. 육각형을 클릭하여 리소스를 검사하고 해당 정책 및 규칙을 확인하세요.

### 정책 상태 {#policy-statuses}

리소스에 로드된 각 정책의 상태는 다음 중 하나에 해당합니다.

- {{< ui >}}Loaded{{< /ui >}}: 정책의 모든 규칙이 통과했습니다.
- {{< ui >}}Error{{< /ui >}}: 정책의 규칙 중 하나 이상에 오류가 있습니다.

### 규칙 상태 {#rule-statuses}

각 규칙은 다음 상태 중 하나를 보고합니다.

- {{< ui >}}Loaded{{< /ui >}}: 규칙이 성공적으로 로드되었습니다.
- {{< ui >}}Filtered{{< /ui >}}: 규칙이 의도적으로 적용되지 않았습니다(예: Agent 버전이 너무 낮거나 이벤트 유형이 비활성화됨).
- {{< ui >}}Error{{< /ui >}}: 규칙 로드에 실패했습니다.

규칙이 필터링되거나 오류가 발생하면 **판정**으로 그 이유를 설명합니다.

| 판정 | 의미 |
|---------|---------|
| `syntax_error` | 규칙 표현식이 유효하지 않습니다. |
| `unknown` | Agent가 규칙을 로드할 수 없습니다. |
| `filtered_agent_version` | Agent 버전이 이 규칙을 사용하기에는 너무 낮습니다. |
| `filtered_event_type_disabled` | 이벤트 유형이 구성에서 비활성화되었습니다. |
| `filtered_rule_filter` | 규칙이 규칙 필터에 의해 제외되었습니다. |

규칙이 실패하는 이유를 이해하려면 리소스를 선택하여 측면 패널을 여세요. 측면 패널에는 리소스의 정책과 규칙이 나열됩니다. 각 규칙에 대해 표현식, 상태 및 판정, Agent가 보고한 오류 메시지가 표시됩니다.

{{< img src="security/workload_protection/coverage_page/coverage_side_panel.png" alt="판정과 함께 정책 및 규칙 상태를 보여주는 리소스 측면 패널" width="100%">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[5]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management#enable-and-deploy-policies
[6]: /ko/security/workload_protection/inventory/review_improve_coverage