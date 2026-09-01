---
description: Workload Protection 적용 범위 공백을 식별하고 해결하며, Agent 및 규칙 배포 문제를 해결하고, 환경 전반의
  탐지 적용 범위를 검토하세요.
disable_toc: false
title: 적용 범위 검토 및 개선
---
이 페이지의 절차를 사용하여 사각지대를 줄이고, 정책 일치 여부를 확인하며, Workload Protection이 환경 전반의 위협을 탐지하고 대응하도록 지원하세요. 이러한 검사를 규정 준수, CI/CD 및 인프라 검토에 통합할 수 있습니다.

적용 범위 조회 및 상태에 대한 자세한 내용은 [적용 범위][1]를 참조하세요.

## 권장 검토 순서 {#recommended-review-order}

이 순서에 따라 환경 전반의 적용 범위를 검토하세요.

1. 전체 환경을 검토하여 기준을 설정합니다. 완전히 적용된 것으로 표시되는 리소스에 정책, 규칙 및 Agent가 작동하는지 확인하고, 눈에 보이는 공백을 해결하기 전에 드러나지 않은 오류를 찾아내세요.
2. 보호되지 않거나 부분적으로 보호되는 워크로드를 식별한 다음, 비즈니스 영향과 노출도가 가장 높은 리소스의 우선순위를 지정합니다.
3. 우선순위가 지정된 리소스에 대한 정책 및 규칙 배포 상태를 확인하고, 나머지 모든 워크로드에서 오래되었거나 정상 상태가 아닌 Agent가 있는지 확인합니다.
4. 탐지 적용 범위를 MITRE ATT&CK에 매핑한 다음, 탐지 규칙을 배포하거나 업데이트하여 공백을 메웁니다.
5. 적용 범위를 재평가하여 변경 사항이 적용되었는지 확인합니다.
6. 규정 준수 여부, 감사, 인시던트 참조 및 향후 비교를 위해 최종 상태를 기록하세요.

## 적용 범위 위젯 {#coverage-widget}

Coverage 페이지 상단의 위젯은 Workload Protection으로 보호되는 리소스의 비율과 관련 탐지 결과를 함께 보여줍니다. 해당 버튼을 사용하여 보호되지 않는 워크로드와 오래되었거나 불완전한 Agent를 조사하세요.

{{< img src="security/workload_protection/coverage_page/coverage_top_widgets.png" alt="리소스 적용 범위, 규칙 로드 상태, Workload Protection 도입 현황 및 Remote Config 배포 상태를 보여주는 Coverage 페이지 상단 위젯" width="100%">}}

## 보호되지 않은 워크로드 찾기 {#find-workloads-without-protection}

- {{< ui >}}View without WP{{< /ui >}}: Workload Protection이 활성화되지 않은 상태로 Datadog Agent를 실행 중인 호스트입니다. 이 작업은 Fleet Automation을 열며, 여기에서 [Workload Protection을 설정][3]할 수 있습니다.
- {{< ui >}}View without Agents{{< /ui >}}: Datadog Agent를 실행하지 않아 Workload Protection으로 평가할 수 없는 호스트입니다. 이 작업은 Infrastructure Catalog를 엽니다.

## 정책 또는 규칙 배포 오류 수정 {#fix-policy-or-rule-deployment-errors}

규칙 오류가 있는 리소스를 찾아 수정하려면 다음을 수행하세요.

1. Explorer에서 심각도 {{< ui >}}Error{{< /ui >}}별로 필터링하거나, Map에서 {{< ui >}}Error{{< /ui >}} 육각형을 선택합니다.
2. 실패한 리소스를 선택하여 사이드 패널을 열고 정책을 검토합니다. 실패한 규칙이 있는 정책은 {{< ui >}}Error{{< /ui >}} 상태로 표시됩니다.
3. 실패한 규칙의 판정 결과(예: `syntax_error` 또는 `unknown`)와 오류 메시지를 검토하여 실패 원인을 파악합니다.
4. [필요에 따라 규칙을 편집][4]합니다.
5. 재배포하고 Coverage에서 수정 사항을 확인합니다.

## 오래되었거나 불완전한 Agent 찾기 {#find-outdated-or-incomplete-agents}

- {{< ui >}}View outdated{{< /ui >}}: 최소 지원 버전(`7.65.0`) 이전 Agent 버전을 실행 중인 리소스로, 최신 Workload Protection 기능을 지원하지 않을 수 있습니다.
- {{< ui >}}View incomplete{{< /ui >}}: 불완전하거나 잘못된 데이터를 보고하는 리소스입니다.

Datadog Agent를 업데이트하거나 배포한 다음, 영향을 받는 리소스가 완전한 적용 범위 데이터를 보고하는지 확인하세요.

## 탐지 적용 범위 검토 {#review-detection-coverage}

{{< ui >}}Rule{{< /ui >}} 및 {{< ui >}}Policy{{< /ui >}} 그룹 아래의 Explorer 패싯을 사용하여 적용된 탐지 콘텐츠별로 리소스를 필터링하세요. MITRE ATT&CK 전술 및 기법별로 필터링하여 인프라 전반에서 프레임워크의 어떤 부분이 적용되는지 확인하세요.

Cloud SIEM 또는 Workload Protection에서 사용할 수 있는 MITRE ATT&CK 맵에 대한 자세한 내용은 [MITRE ATT&CK 맵][2]을 참조하세요.

## 새 규칙이 로드되었는지 확인하세요 {#confirm-that-new-rules-are-loaded}

Coverage를 사용하여 사용자 지정 보안 규칙을 테스트하고 반복적으로 개선할 수 있습니다.

1. [새 사용자 지정 규칙][4]을 작성하고 배포합니다.
2. Coverage에서 규칙 ID, 정책 ID 또는 호스트 이름으로 규칙을 검색합니다.
3. Agent가 규칙을 성공적으로 로드했는지 확인합니다.
4. 오류가 나타나면 판정을 검토하고, 규칙을 수정한 후 다시 배포합니다.

[1]: /ko/security/workload_protection/inventory/
[2]: /ko/security/detection_rules/#mitre-attck-map
[3]: /ko/security/workload_protection/setup/
[4]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules