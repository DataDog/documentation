---
aliases:
- /ko/static_analysis/github_pull_requests
- /ko/code_analysis/github_pull_requests/
- /ko/security/code_security/dev_tool_int/github_pull_requests/
description: Code Security에서 스캔하는 리포지토리에 대해 풀 리퀘스트 코멘트를 설정하는 방법을 알아보세요.
title: 풀 리퀘스트 코멘트
---
## 개요 {#overview}
Code Security는 활성화된 리포지토리에서 취약성이 탐지되면 SCM(소스 코드 관리) 시스템의 PR(풀 리퀘스트)에 직접 코멘트를 게시합니다. 이를 통해 코드를 병합하기 전에 컨텍스트 내에서 문제를 확인하고 수정할 수 있습니다. 코멘트는 diff를 인식하므로 PR에서 수정된 라인에 도입된 새로운 문제만 플래그합니다.

PR 코멘트에는 두 가지 유형이 있습니다.
- **인라인 코멘트**: 특정 코드 라인에 대한 개별 Code Security 탐지 결과를 플래그하고 수정 방법(사용 가능한 경우)을 제안합니다.
        
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="Datadog 봇이 GitHub 풀 리퀘스트에 \"Critical: Code Vulnerability\"를 표시하는 인라인 코멘트를 게시했습니다. 이 코멘트는 프로세스 호출을 새니타이즈하기 위해 os.system(command) 코드를 os.system(shlex.quote(command))로 교체할 것을 제안합니다." style="width:100%;" >}}

    For SAST vulnerabilities and code quality violations that don't have an available suggested fix, the inline comment includes a {{< ui >}}Fix with Cursor{{< /ui >}} link. Click it to open the pull request's branch in Cursor with a tailored remediation prompt for the finding. When a suggested fix is available, the comment shows a committable suggestion instead. To handle the Cursor deep link, install the [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

    {{< img src="code_security/dev_tool_int/pull_request_comments/fix-with-cursor.png" alt="탐지 결과 아래에 'Fix with Cursor' 링크가 있는, 코드 품질 위반을 플래그하는 GitHub 풀 리퀘스트의 Datadog 봇 인라인 코멘트" style="width:100%;" >}}
- **요약 코멘트**: Datadog의 모든 탐지 결과를 하나의 코멘트로 통합합니다. 이 코멘트는 PR에 대응이 필요한 문제가 있을 경우에만 표시됩니다. 해당 탐지 결과들이 해결되면 코멘트가 자동으로 수정되어 PR이 이제 정리되었음을 확인합니다.
  
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="Datadog 봇이 GitHub 풀 리퀘스트에 요약 코멘트를 게시했습니다. 이 코멘트에는 SQL 및 명령 삽입과 같은 4가지 중요 코드 취약성을 나열하는 \"Warnings\" 섹션이 있으며, 특정 파일 및 코드 라인에 대한 링크가 포함되어 있습니다." style="width:100%;" >}}

[Repository Settings][7]에서 조직 또는 리포지토리 수준으로 PR 코멘트를 구성할 수 있으며, 다음과 같은 제어 기능을 사용할 수 있습니다:
- 스캔 유형별(SAST, 정적 SCA, 시크릿, IaC) PR 코멘트 활성화/비활성화
- 각 스캔 유형에 대한 심각도 임계값 설정
- 테스트 파일 또는 개발/테스트 종속성에서 탐지 결과 제외
- Bits AI가 오탐으로 식별한 결과 필터링

[Datadog 전반의 PR 코멘트][11]에 대해 자세히 알아보세요.

**참고**: PR 코멘트는 PR 검사가 아닙니다. 검사를 설정하려면 [PR 게이트][10]를 참조하세요.

## 전제 조건 {#prerequisites}
- 공급자에 대한 Datadog 소스 통합이 활성화되어 있어야 합니다. PR 코멘트는 [GitHub][2], [GitLab][8] 및 [Azure DevOps][9] 리포지토리에서 지원됩니다.  
- 리포지토리에 관련 Code Security 제품이 활성화되어 있어야 합니다. 앱 내에서 Code Security를 활성화하려면 [{{< ui >}}Code Security{{< /ui >}} Settings 페이지][4]로 이동하세요.

<div class="alert alert-info">
  PR 코멘트는 공개 리포지토리의 풀 리퀘스트나 소스 브랜치와 다른 리포지토리의 대상 브랜치를 대상으로 하는 풀 리퀘스트(포크된 리포지토리가 메인 리포지토리로 병합을 시도하는 경우)에서는 지원되지 않습니다.
</div>

## 풀 리퀘스트 코멘트 설정하기 {#set-up-pull-request-comments}
소스 코드 관리 공급자에 따라 아래 단계를 따르세요.

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">Datadog 호스팅 스캔을 사용하는 경우, GitHub 설정 단계를 완료한 후 원하는 스캔 유형(예: SAST(정적 코드 분석))에 대한 토글을 활성화하세요.
스캔을 실행하기 위해 <a href="/security/code_security/static_analysis/github_actions/">GitHub Actions</a>를 사용하는 경우, GitHub 설정을 완료한 후 코멘트가 표시되도록 <code>push</code> 에서 작업을 트리거하세요.</div>

### Datadog에 GitHub 계정 연결하기 {#connect-your-github-accounts-to-datadog}
설정 지침은 [Datadog GitHub 소스 코드 통합][2] 설명서를 참조하세요.

### GitHub 앱 생성 또는 업데이트하기 {#create-or-update-a-github-app}
이미 Datadog에 연결된 GitHub 앱이 있는 경우 해당 앱을 업데이트하세요. 연결된 앱이 없는 경우에는 새 GitHub 앱을 생성하세요.

<div class="alert alert-info">GitHub 앱에 부여하는 권한에 따라 설정 가능한 <a href="/integrations/github/">GitHub 통합</a> 기능이 결정됩니다.</div>

#### GitHub 앱 생성 및 설치하기 {#create-and-install-a-github-app}

1. Datadog에서 [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}} > {{< ui >}}Add New GitHub Application{{< /ui >}}][3]으로 이동합니다.
2. GitHub 조직 이름 등 필요한 세부 정보를 입력합니다.
3. {{< ui >}}Select Features{{< /ui >}}에서 {{< ui >}}Code Security: Pull Request Review Comments{{< /ui >}} 상자에 체크 표시합니다.
4. {{< ui >}}Edit Permissions{{< /ui >}}에서 {{< ui >}}Pull Requests{{< /ui >}} 권한이 {{< ui >}}Read & Write{{< /ui >}}로 설정되어 있는지 확인합니다.
5. {{< ui >}}Create App in GitHub{{< /ui >}}를 클릭합니다.
6. 앱 이름을 입력하고 제출합니다.
7. {{< ui >}}Install GitHub App{{< /ui >}}을 클릭합니다.
8. 앱을 설치할 리포지토리를 선택한 다음 {{< ui >}}Install & Authorize{{< /ui >}}를 클릭합니다.

    {{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App 설치 화면" style="width:50%;" >}}

#### 기존 GitHub App 업데이트하기 {#update-an-existing-github-app}

1. Datadog에서 [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}}][5]로 이동하여 Code Security에 사용할 GitHub App을 검색합니다.
   {{< img src="ci/static-analysis-existing-github-app.png" alt="풀 리퀘스트에 대한 정적 코드 분석 코멘트의 예시" style="width:90%;" >}}
2. {{< ui >}}Features{{< /ui >}} 탭의 {{< ui >}}Code Security: Pull Request Comments{{< /ui >}} 섹션을 확인하여 GitHub App에 추가 권한이 필요한지 결정합니다. 필요한 경우 {{< ui >}}Update permissions in GitHub{{< /ui >}}를 클릭하여 앱 설정을 편집하세요.
3. {{< ui >}}Repository permissions{{< /ui >}}에서 {{< ui >}}Pull Requests{{< /ui >}} 액세스 권한을 {{< ui >}}Read and write{{< /ui >}}로 설정합니다.
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="풀 리퀘스트 읽기 및 쓰기 권한을 위한 드롭다운" style="width:90%;" >}}
4. {{< ui >}}Subscribe to events{{< /ui >}} 제목 아래에서 {{< ui >}}Pull request{{< /ui >}} 상자에 체크 표시를 합니다.
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="풀 리퀘스트 검토 코멘트 권한을 위한 확인란" style="width:90%;" >}}


[2]: /ko/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab 리포지토리를 Datadog에 연결하는 방법은 [GitLab 소스 코드][8] 설정 지침을 참조하세요.

[8]: /ko/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "DevOps" %}}

Azure DevOps 리포지토리를 Datadog에 연결하는 방법은 [Azure 소스 코드 설정 지침][9]을 참조하세요.

[9]: /ko/integrations/azure-devops-source-code/#source-code-functionality

{{% /tab %}}
{{< /tabs >}}

## 구성 옵션 {#configuration-options}

PR 코멘트를 활성화하기 전에 **리포지토리에 최소 하나의 Code Security 스캔 기능이 활성화되어 있는지 확인하세요.** PR 코멘트가 조직 수준에서 구성된 경우에도 지원되는 스캔 유형(예: SAST, SCA 또는 IaC)이 활성화된 리포지토리에만 코멘트가 추가됩니다. 스캔 유형이 활성화되지 않은 리포지토리에는 PR 코멘트가 제공되지 않습니다.

PR 코멘트는 조직 수준 또는 리포지토리 수준에서 다음과 같이 구성할 수 있습니다.
- **조직 수준:** 설정은 최소 하나의 스캔 기능이 활성화된 조직 내 모든 리포지토리에 적용됩니다.
- **리포지토리 수준:** 설정은 선택한 리포지토리에 대해 조직 기본값을 재정의합니다.

PR 코멘트를 구성할 때 다음을 수행할 수 있습니다.
- 특정 스캔 유형(SAST, SCA, IaC)에 대한 코멘트를 활성화하거나 비활성화합니다.
- 코멘트가 표시되는 시점을 제어하기 위해 최소 심각도 임계값을 설정합니다.
- 테스트 파일이나 개발/테스트 종속성에서 탐지된 결과에 대한 코멘트를 제외하여 우선순위가 낮은 문제로 인한 노이즈를 방지합니다.
- Bits AI가 오탐으로 식별한 결과를 필터링합니다.

## 조직 수준에서 PR 코멘트 구성하기 {#configure-pr-comments-at-the-organization-level}

1. Datadog에서 [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7]로 이동합니다.
1. {{< ui >}}Repository Settings{{< /ui >}}에서 {{< ui >}}Global PR Comment Configuration{{< /ui >}}을 클릭합니다.
1. 다음과 같이 설정을 구성합니다.
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}: 활성화하여 모든 유형 및 심각도에 걸쳐 PR 코멘트를 적용합니다.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}: 이 옵션을 전환하여 SAST에 대한 PR 코멘트를 활성화합니다. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}를 선택하세요. {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}를 선택하여 Bits AI가 오탐으로 식별한 결과를 제외합니다. {{< ui >}}Include public repositories{{< /ui >}}를 선택하여 공개 리포지토리에 코멘트를 작성합니다.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}: SCA에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환합니다. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 개발 또는 테스트 환경에만 존재하는 종속성에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}}를 선택하세요. {{< ui >}}Include public repositories{{< /ui >}}를 선택하여 공개 리포지토리에 코멘트를 작성합니다.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}: 시크릿에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환하세요. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 시크릿에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}}를 선택하세요. {{< ui >}}Include public repositories{{< /ui >}}를 선택하여 공개 리포지토리에 코멘트를 작성합니다.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}: IaC에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환하세요. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}를 선택하세요. {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}를 선택하여 Bits AI가 오탐으로 식별한 결과를 제외합니다. {{< ui >}}Include public repositories{{< /ui >}}를 선택하여 공개 리포지토리에 코멘트를 작성합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 리포지토리 수준에서 PR 코멘트 구성하기 {#configure-pr-comments-at-the-repository-level}

1. Datadog에서 [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7]로 이동합니다.
1. {{< ui >}}Repository Settings{{< /ui >}}에서 목록의 리포지토리를 선택합니다.
1. 다음과 같이 설정을 구성합니다.
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}: 활성화하여 모든 유형 및 심각도에 걸쳐 PR 코멘트를 적용합니다.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}: 이 옵션을 전환하여 SAST에 대한 PR 코멘트를 활성화합니다. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}를 선택하세요. {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}를 선택하여 Bits AI가 오탐으로 식별한 결과를 제외합니다.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}: SCA에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환합니다. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 개발 또는 테스트 환경에만 존재하는 종속성에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}}를 선택하세요.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}: 시크릿에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환하세요. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 시크릿에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}}를 선택하세요.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}: IaC에 대한 PR 코멘트를 활성화하려면 이 옵션을 전환하세요. 활성화된 경우 최소 심각도 임계값을 지정합니다. 또한, 테스트 파일에서 발견된 문제에 대한 코멘트를 방지하려면 {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}를 선택하세요. {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}를 선택하여 Bits AI가 오탐으로 식별한 결과를 제외합니다.
    - {{< ui >}}Block all comments in this repository{{< /ui >}}: 활성화하여 이 리포지토리에 대한 모든 코멘트를 비활성화하고 전역 설정을 재정의합니다.
1. {{< ui >}}Save Configuration{{< /ui >}}을 클릭합니다.

[1]: /ko/security/code_security/
[2]: /ko/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /ko/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /ko/integrations/gitlab-source-code/
[9]: https://docs.datadoghq.com/ko/integrations/azure-devops-source-code/#source-code-functionality
[10]: /ko/quality_gates/?tab=staticanalysis#setup
[11]: /ko/integrations/guide/source-code-integration/?tab=codesecurity#pr-comments