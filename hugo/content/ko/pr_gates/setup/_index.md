---
aliases:
- /ko/quality_gates/setup/
description: Datadog에서 PR 게이트 규칙 설정 방법 알아보기
further_reading:
- link: /pr_gates
  tag: 문서
  text: PR 게이트에 대해 알아보기
title: PR 게이트 규칙 설정
---
## 개요 {#overview}

Datadog PR 게이트를 사용하려면 [{{< ui >}}PR Gate Rules{{< /ui >}}][1] 페이지에서 하나 이상의 규칙을 정의할 수 있습니다.

{{< img src="pr_gates/rules_list_3.png" alt="Datadog의 PR 게이트 페이지" style="width:100%" >}}

PR 게이트는 보안 및 품질 표준을 충족하는 코드 변경 사항만 병합되도록 보장합니다.

## 규칙 생성 {#create-a-rule}

Datadog에서 PR 게이트 규칙을 생성하려면 다음 단계를 수행하세요.

1. [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}PR Gates{{< /ui >}} > {{< ui >}}PR Gate Rules{{< /ui >}}][1]로 이동하고 {{< ui >}}New Rule{{< /ui >}}을 클릭합니다.

1. {{< ui >}}Select your source{{< /ui >}}에서 규칙 유형을 선택합니다.
   - {{< ui >}}Static Code Analysis (SAST){{< /ui >}}
   - {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}
   - {{< ui >}}Code Coverage{{< /ui >}}
   - {{< ui >}}Infrastructure as Code Scanning (IaC){{< /ui >}}
   - {{< ui >}}Secret Scanning{{< /ui >}}
   - {{< ui >}}New Flaky Tests{{< /ui >}}

1. {{< ui >}}Define scope{{< /ui >}}에서 규칙이 어떤 리포지토리를 평가할지 설정합니다.
   - {{< ui >}}All repositories{{< /ui >}}: 규칙이 해당 규칙 유형에 대해 구성된 모든 리포지토리를 평가합니다.
   - {{< ui >}}Selected repositories{{< /ui >}}: 규칙이 사용자가 지정한 리포지토리만 평가합니다. `IN`을 사용하여 지정된 리포지토리만 포함하거나, `NOT IN`을 사용하여 사용자가 지정한 리포지토리를 _제외하고_ 구성된 리포지토리를 모두 평가합니다.

1. {{< ui >}}Define condition{{< /ui >}}에서 규칙 실패를 일으키는 조건을 설정합니다. 각 규칙 유형에는 고유한 조건 옵션이 있으며 규칙 유형을 선택할 때 기존 기본 조건 설정을 사용할 수 있습니다.

   다음 예시는 최소 `Critical` 심각도의 정적 코드 분석 코드 취약점 위반이 하나 이상 포함된 풀 리퀘스트가 발생할 때 실패하는 정적 코드 분석(SAST) 규칙을 보여줍니다. 이 규칙은 정적 코드 분석을 위해 구성된 모든 리포지토리를 평가합니다:

   {{< img src="pr_gates/setup/static_analysis_4.png" alt="모든 리포지토리에서 실행되며 PR에 최소 `위험` 심각도의 정적 코드 분석 코드 취약점이 하나 이상 있는 경우 실패하는 정적 코드 분석 규칙" style="width:100%" >}}

1. {{< ui >}}Preview checks{{< /ui >}}에서 소스 코드 관리 공급자를 선택하여 풀 리퀘스트에 추가될 상태 검사를 미리 확인합니다. 규칙이 실패할 때 PR을 차단하려면 병합 전에 PR 게이트를 통과하도록 요구하는 공급업체의 지침을 따르세요. GitHub, Azure DevOps 및 Bitbucket Cloud에서는 PR 게이트의 검사를 필수 항목으로 설정하여 PR 게이트를 통과하도록 합니다. GitLab에서는 GitLab 소스 코드 통합을 설치할 때 생성한 Datadog 서비스 계정을 필수 승인자로 설정하여 PR 게이트를 통과하도록 합니다.

   - [GitHub][2]
   - [GitLab][9]
   - [Azure DevOps][3]
   - [Bitbucket Cloud][10]

   비차단 규칙은 새 규칙을 출시하고 이를 차단 규칙으로 만들기 전에 동작을 테스트하여 확인하려는 경우 유용할 수 있습니다.

1. {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.

1. 새 브랜치와 PR을 생성하여 규칙 조건을 위반하는 코드 변경 사항을 의도적으로 도입함으로써 PR 게이트 규칙을 테스트하는 것이 좋습니다. PR 게이트는 다음 작업을 수행하지 않습니다.
   - PR 게이트 규칙이 생성된 후 새 커밋이 푸시되지 않는 한 기존 PR을 소급하여 차단
   - 수정된 라인의 일부로 위반 사항을 도입하지 않는 새 PR 차단

### PR 검사 관리 {#manage-pr-checks}

PR 게이트는 평가된 각 규칙 유형에 대해 [GitHub][4], [GitLab][11], [Azure DevOps][5] 또는 [Bitbucket Cloud][12] 풀 리퀘스트(GitLab의 경우 머지 리퀘스트)에 PR 검사를 자동으로 생성합니다. 검사에는 실패 이유 및 Datadog의 일치 이벤트와 같은 규칙 평가에 대한 추가 정보가 포함되어 있습니다. GitLab에서 PR 게이트는 모든 PR 게이트 규칙의 조건이 통과될 때 머지 리퀘스트를 승인하기 위해 Datadog 서비스 계정도 사용합니다. 이 서비스 계정은 GitLab 소스 코드 통합 설치 시 생성한 것과 동일한 계정입니다.

<div class="alert alert-info"><strong>참고</strong>: 풀 리퀘스트 UI에서 검사를 다시 실행해도 해당 PR 게이트 규칙이 다시 실행되지 않습니다.</div>

PR 게이트가 PR 검사를 생성할 수 있도록 하려면 SCM 공급자용 통합을 설치해야 합니다. 통합이 설치되어 있지 않은 경우 [GitHub][6], [GitLab 소스 코드][13], [Azure DevOps 소스 코드][7] 또는 [Bitbucket Cloud 소스 코드][14] 통합 설명서에 따라 설정하세요.

### 차단되도록 PR 검사 구성 {#configure-pr-checks-to-be-blocking}

<div class="alert alert-info">
Bitbucket Cloud의 경우 <strong>Bitbucket Cloud Premium</strong>을 사용하는 경우에만 검사를 차단하도록 구성할 수 있습니다.
</div>

이러한 검사를 차단하도록 설정하려면 소스 코드 관리 공급자의 브랜치 정책에서 해당 검사를 필수 항목으로 설정해야 합니다(또는 GitLab의 경우 서비스 계정을 MR의 필수 승인자로 설정해야 함).

- [GitHub][2]
- [GitLab][9]
- [Azure DevOps][3]
- [Bitbucket Cloud][10]

## 규칙 관리 {#manage-rules}

[{{< ui >}}PR Gates Rules{{< /ui >}}][1] 목록에서 PR 게이트 규칙 위에 마우스를 올리고 {{< ui >}}Edit{{< /ui >}} 또는 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭하여 PR 게이트 규칙을 편집하거나 삭제할 수 있습니다.

{{< img src="pr_gates/setup/delete_3.png" alt="PR 게이트 규칙 편집, 복제 또는 삭제" style="width:100%;">}}

## 권한 {#permissions}

`quality_gate_rules_write` 권한이 있는 사용자만 PR 게이트 규칙을 생성하고 편집할 수 있습니다. `quality_gate_rules_read` 권한이 있는 사용자는 PR Gate 규칙을 조회할 수 있습니다.

자세한 정보를 확인하려면 [RBAC 권한 설명서][8]를 참고하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /ko/integrations/github/
[7]: /ko/integrations/azure-devops-source-code/
[8]: /ko/account_management/rbac/permissions
[9]: https://docs.gitlab.com/user/project/merge_requests/approvals/rules/
[10]: https://support.atlassian.com/bitbucket-cloud/docs/suggest-or-require-checks-before-a-merge/
[11]: https://docs.gitlab.com/ci/ci_cd_for_external_repos/external_commit_statuses/
[12]: https://support.atlassian.com/bitbucket-cloud/docs/check-build-status-in-a-pull-request/
[13]: /ko/integrations/gitlab-source-code/
[14]: /ko/integrations/bitbucket-source-code/