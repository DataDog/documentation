---
aliases:
- /ko/bits_ai/bits_ai_dev_agent/setup/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/bits-code/
  tag: 블로그
  text: Bits Code를 사용하여 Datadog 탐지 결과를 자동화된 코드 수정으로 전환하세요.
title: Bits Code 설정
---
## 개요 {#overview}

[Bits Code][8]는 [소스 코드 제공자][11]와 연동되어 Datadog에서 감지된 이슈를 기반으로 풀 요청 또는 머지 요청을 열고, 업데이트하며, 반복 처리합니다. 설정을 완료한 후 [Bits Code 사용을 시작][7]할 수 있습니다.

## 전제 조건 {#prerequisites}

Bits Code를 설정하려면 [`Bits Code Write` (`bits_dev_write`) 권한][1]이 필요합니다. 이 권한은 Datadog 표준 역할과 같은 Datadog 관리형 역할에 포함되어 있습니다.

조직에서 사용자 지정 역할을 사용하는 경우 관리자가 이 권한을 수동으로 추가해야 합니다. 자세한 내용은 [Access Control][1]을 참조하세요.

## 설정 {#setup}

[지원되는 소스 코드 제공자][11] 중 하나에 Bits Code를 설정하세요.

{{< tabs >}}

{{% tab "GitHub" %}}
1. [GitHub Integration][1]을 설치합니다. 전체 설치 및 구성 단계는 [GitHub Integration 가이드][2]를 참조하세요.
1. GitHub 계정에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}로 이동하여 GitHub 권한을 구성합니다.
   1. 기본 Bits Code 기능을 활성화하려면 다음 권한을 설정하세요.
      - {{< ui >}}Repository permissions{{< /ui >}}
        - 리포지토리 콘텐츠: 읽기 및 쓰기
        - 풀 요청: 읽기 및 쓰기
      - {{< ui >}}Subscribe to events{{< /ui >}}
        - 푸시
   1. (선택 사항) 풀 요청을 반복할 때 Bits Code가 CI 로그를 사용하도록 허용하려면 CI 로그를 Datadog으로 전송하고 [auto-push](#enable-auto-push) 기능을 활성화해야 합니다. 이를 위해서는 추가 권한이 필요합니다.  
       - {{< ui >}}Repository permissions{{< /ui >}}
         - 검사: 읽기  
         - 커밋 상태: 읽기 전용 
       - {{< ui >}}Subscribe to events{{< /ui >}}
         - 검사 실행
         - 검사 모음  
         - 이슈 댓글  
         - 상태

[1]: https://app.datadoghq.com/integrations/github
[2]: /ko/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
1. [GitLab 소스 코드 통합][1]을 설치하세요. 전체 설치 및 구성 단계는 [GitLab 소스 코드 통합 가이드][2]를 참조하세요.
1. GitLab [서비스 계정][3]이 다음 요구 사항을 충족하는지 확인하세요.
   - 서비스 계정은 프로젝트에서 [Developer 역할][4]을 보유해야 합니다. 이 역할은 [그룹][5]에서 상속받을 수 있습니다.
   - 서비스 계정의 [개인 액세스 토큰][7]에 필요한 [범위][6]는 `api`, `write_repository` 및 `read_user`입니다. 

   <div class="alert alert-warning">기존 GitLab 개인 액세스 토큰의 범위는 수정할 수 없습니다. 위의 범위를 포함하는 토큰을 생성해야 하는 경우, GitLab 소스 코드 통합을 사용하는 다른 Datadog 제품에서 요구하는 <a href="/integrations/gitlab-source-code/#required-gitlab-scopes">모든 범위</a>를 추가하세요.</div>

[1]: https://app.datadoghq.com/integrations/gitlab-source-code
[2]: /ko/integrations/gitlab-source-code/
[3]: https://docs.gitlab.com/user/profile/service_accounts/
[4]: https://docs.gitlab.com/user/permissions/#default-roles
[5]: https://docs.gitlab.com/user/permissions/#groups
[6]: https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
[7]: https://docs.gitlab.com/user/profile/personal_access_tokens/
{{% /tab %}}

{{% tab "Azure DevOps" %}}
1. [Azure DevOps 소스 코드 통합][101]을 설치하세요. 전체 설치 및 구성 단계는 [Azure DevOps 소스 코드 통합 가이드][102]를 참조하세요.
2. Microsoft Entra 앱의 서비스 주체가 각 프로젝트에서 프로젝트 기여자 권한을 가지고 있는지, 또는 다음 [리포지토리 권한][103]을 가진 사용자 지정 그룹에 속해 있는지 확인하세요.
   - 기여하기
   - 풀 요청에 기여하기
   - 브랜치 생성하기
   - 읽기

[커밋 작성자 이메일 유효성 검사][104]가 활성화된 경우, 허용된 이메일 주소에 `no-reply@dtdg.co`를 추가하세요. Bits Code는 생성하는 커밋에 이 주소를 사용합니다.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code
[102]: /ko/integrations/azure-devops-source-code/
[103]: https://learn.microsoft.com/en-us/azure/devops/repos/git/set-git-repository-permissions
[104]: https://learn.microsoft.com/en-us/azure/devops/repos/git/repository-settings#commit-author-email-validation-policy
{{% /tab %}}

{{< /tabs >}}

## 추가 구성 {#additional-configuration}

이러한 선택적 구성을 통해 Bits Code를 최대한 활용할 수 있습니다.

### 텔레메트리 태그 구성 {#configure-telemetry-tagging}

Bits Code는 `service` 및 `version` 텔레메트리 태그를 사용하여 감지된 문제(예: 오류 또는 취약점)를 당시 실행 중이던 코드 버전에 연결합니다.  

텔레메트리 태그를 구성하려면 [Git 정보로 APM 텔레메트리 태그 지정][4]을 참조하세요. 

Bits Code 설정의 [{{< ui >}}Repositories{{< /ui >}}][5] > {{< ui >}}Service Repository Mapping{{< /ui >}}에서 서비스와 리포지토리 간 매핑을 수동으로 구성할 수도 있습니다.

### 자동 푸시 활성화 {#enable-auto-push}

자동 푸시를 사용하면 Bits Code가 도움을 줄 수 있는 항목을 감지했을 때 브랜치를 생성하고, 코드를 푸시하며, PR 또는 MR을 열 수 있습니다. 자동 푸시는 PR 또는 MR을 열고 변경 사항을 푸시하기만 하며, 코드를 병합하지는 않습니다. 자동 푸시가 비활성화된 경우, 코드가 푸시되기 전에 Datadog에서 코드를 검토해야 합니다.

자동 푸시를 활성화하려면 {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6]로 이동하세요.


#### 보안 고려 사항 {#security-considerations}

AI 기반 도구가 신뢰할 수 없는 데이터를 읽도록 허용하면 공격자가 출력에 영향을 미칠 수 있습니다. 자동 푸시 동작은 Bits Code가 처리하는 데이터 유형에 따라 달라집니다. 코드 전용 워크플로는 Agent가 직접 검사할 수 있는 소스 코드에서 작동하는 반면, 텔레메트리 기반 워크플로(예: 오류 또는 트레이스)에는 신뢰할 수 없는 런타임 입력이 포함될 수 있습니다.

안전성과 자동화의 균형을 맞추기 위해 [Datadog][6]에서 자동 푸시 동작을 구성할 수 있습니다(예: 자동 푸시를 코드 전용 워크플로로 제한하거나 텔레메트리가 포함된 경우 검토를 요구하도록 설정). Datadog은 변경 사항을 푸시하기 전에 Agent가 생성한 모든 코드를 검사하지만, 이러한 안전장치가 완벽한 것은 아닙니다.

### 사용자 지정 지침 구성 {#configure-custom-instructions}

Bits Code는 다음을 포함하여 리포지토리에서 사용자 지정 지침 파일을 가져옵니다.

- `AGENTS.md`
- `CLAUDE.md`
- `agent.md`
- `.cursorrules`
- `.windsurfrules`
- `copilot-instructions.md`

{{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6]의 {{< ui >}}Global Agent Instructions{{< /ui >}} 섹션에서 모든 Bits Code 세션에 적용되는 전역 사용자 지정 지침을 정의할 수도 있습니다.

사용자 지정 지침 파일에 Bits Code에서 사용하려는 [사용자 지정 기술][12]을 명시할 수 있습니다.

## 환경 설정 {#environment-setup}

Bits Code의 런타임 환경을 구성하고, 네트워크 액세스 정책 및 리포지토리별 도구를 설정하세요.

### 인터넷 액세스 구성 {#configure-internet-access}

기본적으로 Bits Code는 Agent 실행 중 **인터넷에 액세스할 수 없습니다**. Agent가 액세스할 수 있는 외부 도메인을 구성하려면 {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6]으로 이동하여 {{< ui >}}Internet Access{{< /ui >}} 섹션을 찾으세요. 다음 액세스 정책 중에서 선택하세요. {{< ui >}}No Internet Access{{< /ui >}}, {{< ui >}}Default Allowlist{{< /ui >}}, {{< ui >}}Custom + Default Allowlist{{< /ui >}} 또는 {{< ui >}}Custom Allowlist{{< /ui >}}

기본 허용 목록에는 다음 도메인이 포함됩니다. 이 목록은 사용자 피드백 및 생태계 변화에 따라 시간이 지나면서 변경될 수 있습니다. 변경을 방지하려면 사용자 지정 허용 목록을 구성하세요.

| 언어 | 도메인 |
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`, `proxy.golang.org`, `sum.golang.org`, `vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org`, `registry.yarnpkg.com`, `repo.yarnpkg.com` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Python | `files.pythonhosted.org`, `pypi.org`, `pypi.python.org`, `pythonhosted.org` |
| Ruby | `api.rubygems.org`, `index.rubygems.org`, `rubygems.org` |
| Rust | `index.crates.io`, `static.crates.io` |
| Ubuntu | `archive.ubuntu.com`, `ports.ubuntu.com`, `security.ubuntu.com` |

### 리포지토리 환경 구성 {#configure-repository-environment}

코드베이스에 필요한 종속성을 추가하거나, 포매터, 린터 및 빌드 도구를 설치할 수 있도록 Bits Code의 사용자 지정 환경을 구성하세요. 각 리포지토리는 각각 격리된 샌드박스에서 실행되며, 환경에서 해당 샌드박스의 설정을 정의합니다. 

리포지토리 환경을 구성하려면 다음 단계를 따르세요.

1. {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Repositories{{< /ui >}}][5]로 이동하여 {{< ui >}}Environments{{< /ui >}} 섹션을 찾습니다.
1. {{< ui >}}Add Environment{{< /ui >}}를 클릭하여 리포지토리 구성을 생성합니다.
   1. 드롭다운에서 리포지토리를 선택합니다.
   1. (선택 사항) {{< ui >}}Pre-installed Languages{{< /ui >}}에서 {{< ui >}}Select Versions{{< /ui >}}를 클릭하여 샌드박스에서 사용할 언어 버전을 지정합니다.
   1. (선택 사항) 환경 변수 및 보안 정보를 정의합니다. 환경 변수는 환경 설정 및 Bits Code 실행 중에 모두 사용할 수 있습니다. 보안 정보는 환경 설정 단계에서만 환경 변수로 사용할 수 있습니다.
   1. (선택 사항) 실행할 설정 명령이 포함된 셸 스크립트를 추가합니다(예: `pip install -r requirements.txt`).
1. 설정 명령을 실행하여 정상적으로 실행되는지 확인합니다.
1. 구성을 저장합니다.

Bits Code는 시작 시 설정 명령을 실행하며 환경에 설치된 모든 도구를 사용할 수 있습니다. 설정 명령은 종속성을 다운로드할 수 있도록 네트워크 액세스가 활성화된 상태에서 실행됩니다. 설정이 완료되면 [인터넷 액세스](#configure-internet-access) 정책이 Agent 실행 중 아웃바운드 네트워크 액세스를 제어합니다. 리포지토리의 코드를 대상으로 설정 명령이 실행되므로, 리포지토리의 코드를 신뢰하는 경우에만 활성화하세요.

**참고**: 최상의 결과를 얻으려면 코드 빌드 및 테스트 방법에 대한 지침이 포함된 [사용자 지정 지침 파일](#configure-custom-instructions)(예: `claude.md`)을 리포지토리에 추가하세요.

## 문제 해결 {#troubleshooting}

### 예기치 않은 GitHub PR 생성 실패{#creation-of-github-prs-fails-unexpectedly}

일부 경우, 특히 브랜치가 많은 리포지토리에서는 GitHub가 세션에 사용할 브랜치를 생성할 때 권한 검사를 실행하지 않습니다. 사용자 지정 GitHub 앱을 사용하는 경우, [GitHub Integration][2]에서 앱에 `workflows:write` 권한을 추가하여 이 문제를 해결할 수 있습니다.

**참고**: 이 권한을 사용하면 Bits AI가 리포지토리에 워크플로를 생성할 수 있으며, 보안상 영향을 미칠 수 있습니다.

[1]: /ko/account_management/rbac/permissions/#bits-ai
[2]: https://app.datadoghq.com/integrations/github
[4]: /ko/integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[5]: https://app.datadoghq.com/code/settings?tab=repositories
[6]: https://app.datadoghq.com/code/settings
[7]: /ko/bits_ai/bits_code/#start-a-session
[8]: /ko/bits_ai/bits_code/
[11]: /ko/bits_ai/bits_code/#supported-source-code-providers
[12]: /ko/bits_ai/bits_code/#custom-agent-skills-and-instructions

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}