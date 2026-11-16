---
algolia:
  tags:
  - secrets scanning
  - secret scanning
  - datadog static analysis
  - SAST
description: Datadog Secret Scanning을 사용하여 소스 코드에 노출된 시크릿을 찾습니다.
further_reading:
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: 블로그
  text: Datadog Secret Scanning을 사용하여 노출된 자격 증명 탐지 및 차단
is_beta: true
title: Secret Scanning
---
{{< callout url="https://www.datadoghq.com/product-preview/generic-secret-scanning-in-code/" header="코드에서 일반 시크릿 찾기" >}}
Generic Secret Scanning은 미리 보기로 제공되고 있습니다. 공급자 패턴과 일치하지 않는 내부 토큰 및 비밀번호를 찾습니다.
{{< /callout >}}

Datadog Secret Scanning은 코드를 스캔하여 노출된 시크릿을 찾습니다. 또한 Datadog은 시크릿의 유효성을 검증하고 상태(유효, 무효)를 표시하여 시크릿 수정 작업의 우선순위를 정할 수 있도록 지원합니다.

## Secret Scanning 설정 {#set-up-secret-scanning}

스캔은 CI/CD 파이프라인에서 실행하거나 호스팅된 스캔을 통해 Datadog에서 직접 실행할 수 있습니다(GitHub, Azure DevOps, GitLab 지원). 시작하려면 [{{< ui >}}Code Security Setup{{< /ui >}}][1]으로 이동하여 {{< ui >}}Activate scanning for your repositories{{< /ui >}}를 클릭하거나 [GitHub Actions][5] 또는 [기타 CI 공급자][6]를 사용하여 Secret Scanning을 설정하는 방법을 알아보세요.

## Secret Scanning 규칙 {#secret-scanning-rules}

Datadog Secret Scanning은 [Sensitive Data Scanner(SDS)][3]를 기반으로 작동하며, 다음에 포함된 모든 규칙을 지원합니다.
[SDS의 시크릿 및 자격 증명 카테고리][4]. 일부 탐지 결과에 대해 Secret Scanning은 [타사 활성 유효성 검사][17]를 통해 탐지된 키가 실제로 활성 상태인지 자동으로 확인합니다. 

## 작동 방식 {#how-it-works}

Secret Scanning은 리포지토리와 직접 통합되어 코드에서 유출된 시크릿을 지속적으로 탐지합니다. Datadog의 정적 분석기를 기반으로 하며, 구성된 각 리포지토리의 모든 브랜치에서 모든 커밋을 스캔합니다. 발견 결과는 리포지토리, 브랜치 및 파일 경로 컨텍스트와 함께 표시되므로 팀에서 소스에 노출된 시크릿을 식별하고 수정 우선순위를 정한 후 수정할 수 있습니다.

각 스캔은 해당 커밋에서 변경된 줄이나 파일뿐만 아니라, 스캔 대상 커밋 시점에 범위에 포함된 모든 파일의 전체 내용을 분석합니다. Datadog이 호스팅된 스캔을 사용하여 리포지토리를 처음 스캔할 때, 리포지토리의 전체 Git 기록도 함께 스캔합니다. [Git 기록에서 시크릿 탐지](#detect-secrets-in-git-history)를 참조하세요.

[Static Code Analysis][18]에서 사용할 수 있는 변경 사항 인식 스캔은 Secret Scanning에서 지원되지 않습니다.

## 주요 기능 {#key-capabilities}

### Git 기록에서 시크릿 탐지 {#detect-secrets-in-git-history}

파일에서 시크릿을 삭제해도 리포지토리에서 제거되지는 않습니다. 시크릿은 이전 커밋에 남아 있으며, 리포지토리에 액세스할 수 있는 사람은 누구나 이를 복구할 수 있습니다.

호스팅된 스캔으로 리포지토리를 처음 스캔할 때, Datadog은 최신 커밋 외에도 모든 브랜치에 걸쳐 전체 Git 기록을 스캔합니다. 기본 브랜치의 최신 커밋에 더 이상 존재하지 않는 시크릿은 기록 전용 발견 결과로 보고됩니다.

기록 전용 발견 결과에는 발견 결과 목록에서 {{< ui >}}Detected in Git History{{< /ui >}} 라벨이 표시됩니다. 이를 검토하려면 다음 단계를 따르세요.

- **모든 리포지토리에서** [{{< ui >}}Vulnerabilities{{< /ui >}} > {{< ui >}}Secret Scanning (Secrets){{< /ui >}}][15]으로 이동하여 {{< ui >}}Is Git History{{< /ui >}} 패싯으로 필터링합니다.
- **단일 리포지토리의 경우** [{{< ui >}}Repositories{{< /ui >}}][14]로 이동하여 리포지토리를 선택하고 {{< ui >}}Leaked Secrets{{< /ui >}} 탭을 엽니다.

발견 결과 세부 정보 패널에는 리포지토리 기록에서 시크릿이 위치한 곳이 표시됩니다.

- {{< ui >}}Introduced in{{< /ui >}}: 시크릿이 추가된 커밋 및 해당 커밋의 작성자
- {{< ui >}}Removed in{{< /ui >}}: 시크릿이 제거된 커밋 시크릿이 병합되지 않은 브랜치나 태그에 여전히 존재하는 경우, {{< ui >}}Not removed{{< /ui >}}가 표시됩니다.

<div class="alert alert-info">Git 기록은 호스팅 스캔으로 리포지토리를 처음 스캔할 때 한 번만 스캔됩니다. 병합되지 않은 브랜치나 태그에는 여전히 존재하지만 기본 브랜치에는 존재하지 않는 시크릿은 기록 전용 발견 결과로 보고됩니다. CI 스캔은 스캔된 커밋만 분석합니다.</div>

<div class="alert alert-warning">기록 전용 발견 결과는 후속 스캔에서 자동으로 종료되지 않으며, Git 기록을 다시 작성해도 종료되지 않습니다. 노출된 자격 증명을 교체하거나 폐기한 다음 <a href="#mute-findings">발견 결과를 음소거</a>합니다.</div>

### 풀 리퀘스트에서 노출된 시크릿 검토 {#review-exposed-secrets-in-pull-requests}

풀 리퀘스트로 인해 시크릿이 유출되면 Datadog은 자동으로 인라인 주석을 추가하여 노출에 플래그를 지정합니다. Datadog에서 새 풀 리퀘스트를 생성하여 발견 결과를 직접 수정할 수도 있습니다. 자세한 내용은 [풀 리퀘스트 댓글][7]을 참조하세요. 

### PR Gates로 시크릿 유출 자동 차단 {#automatically-block-leaks-with-pr-gates}

[PR Gates][11]를 사용하여 유출된 시크릿이 메인 브랜치에 병합되지 않도록 합니다. Datadog은 각 풀 리퀘스트에서 노출된 시크릿을 스캔하고 GitHub, Azure DevOps 또는 GitLab(미리 보기로 제공)에 직접 통과 또는 실패 여부를 보고합니다.

기본적으로 검사는 정보 제공용이지만, 시크릿이 탐지되면 병합을 차단하도록 설정할 수 있습니다. 설정 방법은 [PR 게이트 규칙 설정][12]을 참조하세요.

### 인라인 제외 {#inline-exclusions}

인라인 제외를 추가하여 특정 발견 결과가 스캔 결과에 표시되지 않도록 할 수 있습니다. 다음 줄에서 탐지되는 시크릿을 무시하려면 `no-dd-secrets`를 주석으로 추가합니다.

### 발견 결과 조회 및 필터링 {#view-and-filter-findings}

Secret Scanning을 설정하고 나면, 스캔된 리포지토리에 대한 각각의 커밋이 스캔을 트리거합니다. 발견 결과는 [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] 페이지에 요약되며 [{{< ui >}}Code Security Repositories{{< /ui >}}][14] 페이지에서 리포지토리별로 그룹화됩니다.

{{< ui >}}Secret Scanning (Secrets){{< /ui >}} 탭에서 다음과 같은 패싯을 기준으로 필터링하여 결과 범위를 좁힐 수 있습니다.

- 심각도
- 상태(진행 중, 음소거됨, 수정됨)
- {{< ui >}}Validation Status{{< /ui >}}
- 팀
- 리포지토리 가시성
- {{< ui >}}Is Git History{{< /ui >}}

### 발견 결과에서 Jira 티켓 생성 {#create-jira-tickets-from-findings}

모든 발견 사항에서 직접 양방향 Jira 티켓을 생성하여 기존 워크플로에서 문제를 추적하고 해결할 수 있습니다. 티켓 상태는 Datadog과 Jira 간에 계속 동기화됩니다. 자세한 정보는 [Jira와의 양방향 티켓 동기화][16]를 참조하세요.

### 유출된 시크릿에 대한 인시던트 선언 {#declare-an-incident-from-a-leaked-secret}
Secret Scanning 사이드 패널에서 {{< ui >}}Declare incident{{< /ui >}}를 클릭하여 발견 결과로부터 [인시던트를 선언][13]합니다. 인시던트에는 모든 탐지 메타데이터가 미리 채워집니다.

### 발견 결과 음소거 {#mute-findings}

발견 사항을 차단하려면 발견 사항 세부 정보 패널에서 {{< ui >}}Mute{{< /ui >}}를 클릭하세요. 그러면 태그 값(예: `repository`)을 기준으로 컨텍스트를 고려한 필터링을 수행하도록 [음소거 규칙을 생성][10]할 수 있는 워크플로가 열립니다. 발견 사항을 음소거하면 해당 항목이 숨겨지고 보고서에서 제외됩니다.

음소거된 발견 사항을 복원하려면 세부 정보 패널에서 {{< ui >}}Unmute{{< /ui >}}를 클릭하세요. [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] 페이지에서 {{< ui >}}Status{{< /ui >}} 필터를 사용하여 음소거된 발견 결과를 검토할 수도 있습니다.

## 다음 단계 {#next-steps}

1. 사용 중인 환경에서 [Secret Scanning을 설정][1]합니다.
2. 초기 분류를 자동화하려면 [Automation Pipelines][10]을 설정합니다.
3. [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] 페이지에서 발견 결과를 검토합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /ko/security/code_security/static_analysis/setup
[3]: /ko/security/sensitive_data_scanner/
[4]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[5]: /ko/security/code_security/secret_scanning/github_actions
[6]: /ko/security/code_security/secret_scanning/generic_ci_providers
[7]: /ko/security/code_security/dev_tool_int/pull_request_comments/
[8]: /ko/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /ko/security/automation_pipelines/
[11]: /ko/pr_gates/
[12]: /ko/pr_gates/setup
[13]: /ko/incident_response/incident_management/investigate/declare/#from-a-leaked-secret
[14]: https://app.datadoghq.com/ci/code-analysis?
[15]: https://app.datadoghq.com/security/code-security/secrets
[16]: /ko/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[17]: /ko/security/code_security/secret_scanning/secret_validation/
[18]: /ko/security/code_security/static_analysis/setup/#diff-aware-scanning