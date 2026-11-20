---
aliases:
- /ko/security/cloud_security_management/iac_scanning/
further_reading:
- link: /security/code_security/iac_security/setup
  tag: 설명서
  text: IaC Security 설정
- link: /security/code_security/iac_security/configuration
  tag: 설명서
  text: IaC Security 구성
- link: /security/code_security/iac_security/iac_rules/
  tag: 설명서
  text: IaC Security 규칙
- link: /security/code_security/iac_security/custom_rules/
  tag: 설명서
  text: IaC 사용자 지정 규칙
- link: /pr_gates/
  tag: 설명서
  text: PR 게이트
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 사용하여 클라우드의 구성 오류가 프로덕션 환경에 도달하지 못하도록 방지
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: 블로그
  text: Datadog Secret Scanning을 사용하여 노출된 자격 증명 탐지 및 차단
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: 블로그
  text: '봇보다 먼저 CI/CD 구성 오류 찾아내기: Datadog IaC Security로 GitHub Actions 보안 강화'
title: Infrastructure as Code(IaC) Security
---
Datadog Infrastructure as Code(IaC) Security는 IaC 구성의 구성 오류가 배포되기 전에 탐지합니다. 이 기능은 연결된 GitHub, GitLab 또는 Azure DevOps 리포지토리에 저장된 파일에서 누락된 암호화나 지나친 권한이 부여된 액세스와 같은 문제를 플래그합니다. 자세한 정보는 [IaC Security 규칙][13]을 참조하세요.

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="심각도가 높은 IMDSv1 Enabled 문제에 대한 세부 정보가 표시된 IaC 구성 오류 사이드 패널(보안 요약, 코드 스니펫, 탐지 타임스탬프 및 해결 단계 포함)." width="100%">}}

## 작동 방식 {#how-it-works}

IaC Security는 리포지토리와 통합하여 구성 오류를 지속적으로 스캔하며, 구성된 각 리포지토리의 모든 브랜치에서 모든 커밋을 스캔합니다. 위반 사항이 탐지되면 발견 사항이 표시되고 관련 리포지토리, 브랜치 및 파일 경로에 연결됩니다. 이런 방식이기 때문에 소스에서 직접 구성 오류를 식별, 우선 순위를 지정하고 해결하는 데 도움이 됩니다.

## 주요 기능 {#key-capabilities}

### pull 요청에서 위반 사항 검토 및 수정 {#review-and-fix-violations-in-pull-requests}

pull 요청에 IaC 변경 사항이 포함되면 Datadog은 위반 사항을 표시하는 인라인 주석을 추가합니다. 해당하는 경우 pull 요청에서 직접 적용할 수 있는 코드 수정 사항도 제안합니다. Datadog에서 직접 새 pull 요청을 열어 발견 사항을 수정할 수도 있습니다. 자세한 정보는[Pull 요청 댓글][5]을 참조하세요.

### Cursor로 수정 {#fix-with-cursor}
IaC 발견 사항에 대한 문제 해결을 Cursor와 같은 AI 코딩 에이전트에 넘길 수 있습니다.

1. [Code Security 취약성][3] 페이지에서 발견 사항을 클릭하여 사이드 패널을 엽니다.
2. {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} 섹션에서 {{< ui >}}Remediate with AI{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Coding agent{{< /ui >}} 탭을 선택합니다.
4. {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}에서 {{< ui >}}Fix with Cursor{{< /ui >}} 옆의 {{< ui >}}Open{{< /ui >}}을 클릭합니다. Datadog이 Cursor를 열고, 해당 구성 오류에 대한 맞춤형 해결 프롬프트도 함께 표시됩니다.

다른 에이전트를 사용하려면 {{< ui >}}Copy fix prompt{{< /ui >}} 옆의 {{< ui >}}Copy{{< /ui >}}를 클릭하고 프롬프트를 선택한 에이전트에 붙여넣습니다.

Cursor 딥 링크를 처리하려면 [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor)를 설치합니다.

{{< img src="code_security/iac_security/fix-with-cursor.png" alt="Remediate with AI 대화 상자, Coding 에이전트 탭이 선택되어 있고 Fix with Cursor와 Copy fix prompt 옵션이 표시됨" style="width:100%;" >}}

### PR 게이트로 위험한 변경 사항 자동 차단 {#automatically-block-risky-changes-with-pr-gates}

IaC 변경 사항이 병합되기 전에 보안 표준을 적용하려면 [PR 게이트][11]를 사용하세요. Datadog은 각 pull 요청의 IaC 변경 사항을 스캔하여 구성된 심각도 임계값을 초과하는 취약성을 식별하고 GitHub 또는 Azure DevOps에 통과 또는 실패 상태를 보고합니다.

기본적으로 검사는 정보 제공용이지만, GitHub 또는 Azure DevOps에서 검사를 차단하도록 설정하여 중대한 문제가 탐지되면 병합을 방지하게 할 수 있습니다. 설정 방법은 [PR 게이트 규칙 설정][12]을 참조하세요.

### 발견 사항 확인 및 필터링 {#view-and-filter-findings}

IaC Security를 설정하고 나면, 스캔된 리포지토리에 대한 각각의 커밋이 스캔을 트리거합니다. 발견 사항은 [Code Security 취약성][3] 페이지에 요약되며, [Code Security 리포지토리][6] 페이지에서는 리포지토리별로 그룹화됩니다.

필터를 사용하여 다음 기준으로 결과 범위를 좁힐 수 있습니다.

- 심각도
- 상태(진행 중, 음소거됨, 수정됨)
- 리소스 유형
- 클라우드 공급자
- 파일 경로
- 팀
- 리포지토리

발견 사항을 클릭하면 다음 정보가 표시되는 사이드 패널이 열립니다.

- {{< ui >}}Details{{< /ui >}}: 발견 사항을 트리거한 설명 및 관련 코드입니다. (코드 스니펫을 확인하려면 [GitHub 앱 설치][9]를 참조하세요.)
- {{< ui >}}Remediation{{< /ui >}}: 사용 가능한 경우, 문제 해결을 지원하는 발견 사항에 대해 권장되는 코드 수정 사항이 제공됩니다.

### 발견 사항에서 Jira 티켓 생성 {#create-jira-tickets-from-findings}

모든 발견 사항에서 직접 양방향 Jira 티켓을 생성하여 기존 워크플로에서 문제를 추적하고 해결할 수 있습니다. 티켓 상태는 Datadog과 Jira 간에 계속 동기화됩니다. 자세한 정보는 [Jira와의 양방향 티켓 동기화][4]를 참조하세요.

### 발견 사항 음소거 {#mute-findings}

발견 사항을 차단하려면 발견 사항 세부 정보 패널에서 {{< ui >}}Mute{{< /ui >}}을 클릭하세요. 그러면 태그 값(예: `service` 또는 `environment`)을 기준으로 상황에 맞게 필터링할 수 있는 [음소거 규칙 생성][10] 워크플로가 열립니다. 발견 사항을 음소거하면 해당 항목이 숨겨지고 보고서에서 제외됩니다.

음소거된 발견 사항을 복원하려면 세부 정보 패널에서 {{< ui >}}Unmute{{< /ui >}}를 클릭하세요. [Code Security 취약성][3] 페이지에서 {{< ui >}}Status{{< /ui >}} 필터를 사용하여 음소거된 발견 사항을 검토할 수도 있습니다.

### 특정 규칙, 파일 또는 리소스 제외 {#exclude-specific-rules-files-or-resources}

제외를 구성하여 특정 발견 사항이 스캔 결과에 표시되지 않도록 할 수 있습니다. 제외 사항은 규칙 ID, 파일 경로, 리소스 유형, 심각도 또는 태그를 기준으로 할 수 있습니다.

제외는 구성 파일 또는 IaC 코드의 인라인 주석을 통해 관리합니다. 지원되는 형식 및 사용 예시는 [IaC Security 구성][7]을 참조하세요.

## 다음 단계 {#next-steps}

1. 환경에서 [IaC Security를 설정][1]합니다.
2. [IaC Security][2]가 오탐을 줄이거나 예상된 결과를 무시하도록 구성합니다.
3. [Code Security 취약성][3] 페이지에서 발견 사항을 검토하고 분류합니다.
4. 조직에만 국한한 요구 사항을 적용할 수 있도록 [IaC 사용자 지정 규칙][14]을 생성합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/iac_security/setup
[2]: /ko/security/code_security/iac_security/configuration
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /ko/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /ko/security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /ko/security/code_security/iac_security/configuration/
[8]: /ko/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /ko/security/automation_pipelines/
[11]: /ko/pr_gates/
[12]: /ko/pr_gates/setup
[13]: /ko/security/code_security/iac_security/iac_rules
[14]: /ko/security/code_security/iac_security/custom_rules