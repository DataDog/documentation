---
algolia:
  tags:
  - static analysis
  - datadog static analysis
  - code quality
  - SAST
aliases:
- /ko/code_analysis/static_analysis
description: 코드가 프로덕션 환경에 도달하기 전에 코드의 품질 문제와 보안 취약성을 검사하는 Datadog Static Code Analysis에
  관해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: 블로그
  text: 'CI/CD Security: GitHub 생태계를 보호하는 방법'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: 블로그
  text: Code Security용 Bits Code 소개
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: 블로그
  text: Datadog Secret Scanning을 사용하여 노출된 자격 증명 탐지 및 차단
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: 블로그
  text: LLM을 사용하여 정적 코드 분석에서 오탐을 필터링하는 방법
is_beta: false
title: 정적 코드 분석(SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}


## 개요 {#overview}

정적 코드 분석은 Datadog의 Static Application Security Testing(SAST) 기능입니다. SAST는 프로그램을 실행할 필요 없이 프로덕션 이전 단계의 프로그램 코드를 분석하는 클리어박스 소프트웨어 테스트 기법입니다.

정적 코드 분석은 소프트웨어 개발 수명 주기(SDLC) 초기에 보안 취약점과 유지 관리 문제를 파악하여 최고 품질의 가장 안전한 코드만 프로덕션에 배포되도록 지원합니다. 조직 차원의 이점은 다음과 같습니다.

* 코드가 프로덕션에 도달하기 전 SAST 스캔을 통해 새로운 취약점이 발견되므로, 시간 경과에 따라 애플리케이션의 보안 침해 위험성이 감소합니다.
* 조직의 코드 표준을 준수할 때 추측에 의존하지 않아도 되므로, 개발 팀이 개발 속도에 큰 영향을 주지 않고 표준을 준수하는 코드를 배포할 수 있습니다.
* 정적 코드 분석을 통해 조직은 시간 경과에 따라 보다 읽기 쉬운 코드베이스를 유지할 수 있어 개발자 온보딩 속도가 빨라집니다.

## 정적 코드 분석 설정 {#set-up-static-code-analysis}

정적 코드 분석은 다음과 같은 언어 및 기술의 보안 취약점과 잘못된 코딩 관행을 스캔하는 기능을 지원합니다.

{{< card-grid card_width="130px" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Python" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=JavaScript" src="integrations_logos/javascript_large.png" alt="javascript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=TypeScript" src="integrations_logos/typescript_large.svg" alt="typescript" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Java" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=CSharp" src="integrations_logos/dotnet_avatar.svg" alt="c sharp" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Go" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Ruby" src="integrations_logos/ruby_avatar.svg" alt="ruby" image_width="60" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=PHP" src="integrations_logos/php_opcache.png" alt="php" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Docker" src="integrations_logos/docker_avatar.svg" alt="docker" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=YAML" src="integrations_logos/yaml.png" alt="yaml" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Kotlin" src="integrations_logos/kotlin.png" alt="kotlin" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Elixir" src="integrations_logos/elixir.png" alt="elixir" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Apex" src="integrations_logos/salesforce_large.svg" alt="apex" >}}
  {{< image-card href="/security/code_security/static_analysis/static_analysis_rules?languages=Swift" src="integrations_logos/swift_large.svg" alt="swift" >}}
  {{< image-card href="/security/code_security/static_analysis/setup/?tab=circleciorbs#upload-third-party-static-analysis-results-to-datadog" src="integrations_logos/datadog_avatar.svg" alt="기타" >}}
{{< /card-grid >}}

CI/CD 파이프라인을 통해 스캔을 실행하거나, 호스팅된 스캔을 통해 Datadog에서 직접 실행할 수 있습니다.  
시작하려면 [{{< ui >}}Code Security{{< /ui >}} 설정 페이지][12]로 이동하거나 [설정 설명서][9]를 참조하세요.

## 개발 수명 주기에 반영 {#integrate-into-the-development-lifecycle}

### 소스 코드 관리 {#source-code-management}
{{< whatsnext desc="Datadog은 코드 검토 과정에서 관련 코드 줄에 인라인 검토 의견을 추가하여 풀 리퀘스트의 정적 코드 분석 위반 사항을 자동으로 표시할 수 있습니다. 이는 GitHub, GitLab, Azure DevOps 리포지토리(클라우드 호스팅)에서 지원됩니다. 해당하는 경우 Datadog은 풀 리퀘스트에서 직접 적용할 수 있는 수정 사항을 제안합니다." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}풀 리퀘스트{{< /nextlink >}}
{{< /whatsnext >}}

### IDE {#ides}
{{< whatsnext desc="통합 개발 환경(IDE)에서 파일을 편집하는 과정에서 실시간으로 코드 취약점을 식별할 수 있습니다. 자세한 내용은 통합별 문서를 참조하세요.">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}JetBrains IDE용 Datadog 플러그인{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}Visual Studio Code 및 Cursor용 Datadog 확장{{< /nextlink >}}
{{< /whatsnext >}}

## 결과 검색 및 필터링 {#search-and-filter-results}
정적 코드 분석을 설정한 후에는, 스캔 대상 리포지토리에 커밋이 발생할 때마다 스캔이 실행됩니다. 위반 사항은 리포지토리별로 [{{< ui >}}Code Security Repositories{{< /ui >}} 페이지][1]에 요약되어 있습니다. 리포지토리를 클릭하여 정적 코드 분석에서 도출된 {{< ui >}}Code Vulnerabilities{{< /ui >}} 및 {{< ui >}}Code Quality{{< /ui >}} 결과를 분석하세요.

* {{< ui >}}Code Vulnerabilities{{< /ui >}} 탭에는 [보안 카테고리][2]에서 Datadog의 규칙에 의해 발견된 위반 사항이 포함되어 있습니다.
* {{< ui >}}Code Quality{{< /ui >}} 탭에는 [모범 사례, 코드 스타일, 오류 가능성, 성능 카테고리][3]에서 Datadog의 규칙에 의해 발견된 위반 사항이 포함되어 있습니다.

결과를 필터링하려면 목록 또는 검색 왼쪽의 패싯을 사용하세요. 결과는 [서비스 또는 팀 패싯별로 필터링][13]할 수 있습니다.

각 행은 위반 사항을 나타냅니다. 각 위반 사항은 페이지 상단의 필터에서 선택한 특정 커밋 및 브랜치와 연결됩니다(기본적으로 현재 보고 있는 리포지토리 기본 브랜치의 최신 커밋에 대한 결과가 표시됨).

위반 사항을 클릭하면 위반 범위와 위반이 발생한 위치에 대한 정보가 포함된 사이드 패널이 열립니다.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="정적 분석 위반 사항의 측면 패널" style="width:80%;">}}  -->

위반 내용은 탭에 표시됩니다.

- {{< ui >}}Details{{< /ui >}}: 위반에 대한 설명 및 위반의 원인이 된 코드 줄입니다. 위반 코드 스니펫을 확인하려면 공급자([GitHub][4], [GitLab][5], Azure[6])에 대한 관련 소스 코드 통합을 구성하세요.
- {{< ui >}}Remediation{{< /ui >}}: 위반 사항을 해결할 수 있는 하나 이상의 코드 수정 사항과 수정 방안입니다.
- {{< ui >}}Event{{< /ui >}}: 위반 사항과 관련된 JSON 메타데이터입니다.

### 오탐 필터링 {#filter-out-false-positives}
SAST 취약점 일부에 대해, Bits AI는 컨텍스트를 검토하고 오탐인지 정탐인지를 판단하며 판단 근거를 간략히 설명할 수 있습니다. 

자세한 내용은 [AI 기반 정적 코드 분석][17]을 참조하세요.

## 구성 사용자 지정 {#customize-your-configuration}
리포지토리 내 또는 조직 전체에서 구성할 정적 코드 분석 규칙을 사용자 지정하려면 [설정 설명서][8]를 참조하세요.

## 발견 사항을 Datadog 서비스 및 팀에 연결 {#link-findings-to-datadog-services-and-teams}
발견 사항을 Datadog 서비스 및 팀에 연결하려면 [설정 설명서][13]를 참조하세요.

## 제안된 수정 사항 적용 {#apply-suggested-fixes}
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="정적 분석 규정 위반의 수정 사항 탭" style="width:80%;">}} -->

Datadog 정적 코드 분석은 다음과 같은 두 가지 유형의 수정 방안을 제안합니다.

1. **결정적 제안 수정:** 린트 오류와 같은 간단한 규정 위반의 경우, 규정 분석기가 자동으로 템플릿 수정 사항을 제공합니다.
2. **AI 제안 수정:** 복잡한 규정 위반의 경우, 일반적으로 사전에 수정 사항을 제공할 수 없습니다. 대신 OpenAI의 GPT-4를 사용하여 제안된 수정 사항을 생성하는 AI 제안 수정을 활용할 수 있습니다. {{< ui >}}Text{{< /ui >}}와 {{< ui >}}Unified Diff{{< /ui >}} 수정 중에서 선택할 수 있으며, 각각 위반을 해결하기 위한 일반 텍스트 지침이나 코드 변경 사항을 출력합니다.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="기본 정적 분석을 통해 제안된 수정 사항의 시각적 표시기" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="AI 정적 분석을 통해 제안된 수정 사항의 시각적 표시기" style="width:60%;">}} -->

### Datadog에서 직접 취약점 또는 품질 문제 수정 {#fix-a-vulnerability-or-quality-issue-directly-from-datadog}

<!-- {{< img src="ci/sast_one_click_light.png" alt="Code Security의 원클릭 수정 예시" style="width:90%;" >}} -->

GitHub를 소스 코드 관리자로 사용하는 경우, 두 가지 방법으로 Datadog에서 직접 SAST 문제를 해결하는 코드 변경 사항을 푸시할 수 있습니다.

#### 풀 리퀘스트 열기 {#open-a-pull-request}
GitHub 앱의 {{< ui >}}Pull Requests{{< /ui >}} 권한이 {{< ui >}}Read & Write{{< /ui >}}로 설정된 경우, 수정 사항이 제안된 모든 정적 코드 분석 발견 사항에 대해 원클릭 문제 해결을 활성화합니다.

다음 단계에 따라 취약점을 수정하고 풀 리퀘스트를 엽니다.
1. Code Security에서 특정 SAST 결과를 조회합니다.
2. 결과의 측면 패널에서 {{< ui >}}Fix Violation{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Open a Pull Request{{< /ui >}}를 선택합니다.
4. 풀 리퀘스트 타이틀과 커밋 메시지를 입력합니다.
5. {{< ui >}}Create PR{{< /ui >}}을 클릭합니다.

#### 현재 브랜치에 직접 커밋 {#commit-directly-to-the-current-branch}
또한 결과가 발견된 브랜치에 직접 커밋하여 취약점을 수정할 수 있습니다.

제안된 수정 사항을 커밋하려면 다음 단계를 따르세요.

1. Code Security에서 특정 SAST 결과를 조회합니다.
2. 결과의 측면 패널에서 {{< ui >}}Fix Violation{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Commit to current branch{{< /ui >}}를 클릭합니다.

### Cursor로 수정 {#fix-with-cursor}
SAST 발견 사항에 대한 문제 해결을 Cursor와 같은 AI 코딩 에이전트에 넘길 수 있습니다.

1. Code Security에서 특정 SAST 결과를 조회합니다.
2. 측면 패널의 {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} 섹션에서 {{< ui >}}Remediate with AI{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Coding agent{{< /ui >}} 탭을 선택합니다.
4. {{< ui >}}Generate your fix directly from Claude Code, Codex, or Cursor{{< /ui >}}에서 {{< ui >}}Fix with Cursor{{< /ui >}} 옆의 {{< ui >}}Open{{< /ui >}}을 클릭합니다. Datadog이 Cursor를 열고, 해당 발견 사항에 대한 맞춤형 해결 프롬프트를 함께 표시합니다. 변경 사항을 커밋하기 전에 제안된 변경 사항을 검토합니다.

다른 AI 코딩 에이전트를 사용하려면 {{< ui >}}Copy{{< /ui >}} 옆의 {{< ui >}}Copy fix prompt{{< /ui >}}를 클릭하고 프롬프트를 선택한 에이전트에 붙여넣습니다.

Cursor 딥 링크를 처리하려면 [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor)를 설치합니다.

{{< img src="code_security/static_analysis/fix-with-cursor.png" alt="Remediate with AI 대화 상자, Coding 에이전트 탭이 선택되어 있고 Fix with Cursor와 Copy fix prompt 옵션이 표시됨" style="width:100%;" >}}

## 오탐 보고 {#report-false-positives}
특정 위반 사항이 오탐이라고 판단되면, 사유와 함께 오탐으로 표시할 수 있으며, 해당 보고서는 Datadog으로 직접 전송됩니다. 제출된 보고서는 규칙 세트의 품질 개선을 위해 정기적으로 검토됩니다.

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="정적 코드 분석 위반 사항을 오탐으로 신고하기 버튼" style="width:60%;">}} -->

## <!-- 추가 자료

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ko/security/code_security/static_analysis_rules?categories=Security
[3]: /ko/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ko/integrations/github/
[5]: /ko/integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /ko/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /ko/security/code_security/static_analysis/setup
[10]: /ko/security/code_security/dev_tool_int/github_pull_requests/
[11]: /ko/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: /ko/security/code_security/static_analysis/setup/?tab=github#link-findings-to-datadog-services-and-teams
[14]: /ko/account_management/teams/
[15]: /ko/integrations/github/#connect-github-teams-to-datadog-teams
[16]: /ko/integrations/azure-devops-source-code/
[17]: /ko/security/code_security/static_analysis/ai_enhanced_sast/