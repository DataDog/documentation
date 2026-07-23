---
algolia:
  tags:
  - 코드 분석
  - Datadog 코드 분석
  - 정적 분석
  - 소프트웨어 구성 분석
  - SAST
  - SCA
aliases:
- /ko/code_analysis/faq
description: Datadog 코드 분석으로 유지 관리 문제, 버그 및 보안 취약성을 해결하여 개발 시 고객에게 영향을 미치지 않는 방법을
  알아봅니다.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 소프트웨어 배포 릴리스를 확인하세요! (앱 로그인 필요)
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아보기
- link: /code_analysis/static_analysis
  tag: 설명서
  text: 정적 분석에 대해 알아보기
- link: /security/application_security/software_composition_analysis
  tag: 설명서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
is_beta: false
title: 코드 분석
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
코드 분석은 미리 보기에 있습니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 Code Analysis 기능을 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

<div class="alert alert-info">Datadog Software Composition Analysis으로 소프트웨어 개발 수명 주기(SDLC) 전반에서 취약한 라이브러리를 찾을 수 있습니다. Code Analysis는 리포지토리를 직접 스캔하여 찾은 결과를 요약합니다. 리포지토리와 런타임 동안 발견된 모든 취약점을 통합하여 확인하려면 자세한 내용은 <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a>를 참조하세요.</div>

Code Analysis는 리포지토리를 스캔하여 보안 취약점과 코드 품질 문제를 찾아냅니다. 여기에는 자사 코드의 [Static Analysis][1]과 코드베이스의 오픈 소스 종속성의 [Software Composition Analysis(SCA)][2] 두 가지 기능이 포함됩니다.

정적 분석
: 개발 수명 주기 초기에 유지 관리 문제, 버그, 성능 문제, 보안 취약성용 맞춤 코드를 점검하여 프로덕션 도달 전 문제를 파악하고, 가능한 경우 사용자에게 영향을 미치 전에 지원 엔지니어링 팀이 해당 문제를 해결할 수 있도록 제안 수정 사항을 제공해 드립니다.

Software Composition Analysis 
: 리포지토리로 불러온 오픈 소스 라이브러리에 알려진 취약성, 라이선스 위험, 서비스 종료 라이브러리가 있는지 스캔합니다.


## 리포지토리에서 코드 분석 설정하기

[**Code Analysis Repositories** 페이지][9]에서 **+ Add a Repository**를 클릭하고 Datadog에서 직접 또는 CI 파이프라인에서 스캔할지 선택합니다.

{{< tabs >}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Datadog 호스팅 스캔은 Software Composition Analysis(SCA) 및 GitHub 리포지토리에서만 지원됩니다. Static Analysis를 사용하거나 다른 CI 공급자를 사용하려면 대신 CI 파이프라인에서 스캔을 실행하세요.</div>

Datadog 호스팅 스캔을 사용하면 CI pipeline이 아니라 Datadog의 인프라 내에서 코드를 스캔합니다 Datadog은 코드를 읽고 정적 분석기를 실행하여 Static Analysis 및/또는 Software Composition Analysis을 수행한 후 결과를 업로드합니다.

Datadog 호스팅 스캔을 사용하면 Code Analysis를 사용할 수 있도록 CI pipeline를 구성하지 않아도 됩니다.

GitHub 리포지토리에서 [Software Composition Analysis][101]를 사용하려면, 원하는 GitHub 계정에서 **Select Repositories**를 클릭하고 `Enable Software Composition Analysis (SCA)`를 토글하여 모든 리포지토리에 대해 활성화합니다. 목록에 GitHub 계정이 표시되지 않으면 [새 GitHub App 생성하기][102]로 시작합니다.

{{< img src="code_analysis/setup/enable_account.png" alt="GitHub 계정의 모든 리포지토리에서 Software Composition Analysis 활성화" style="width:100%;">}}

옵션으로 각 리포지토리를 토글하여 특정 GitHub 리포지토리를 선택해 SCA를 활성화할 수 있습니다.

{{< img src="code_analysis/setup/enable_repository.png" alt="GitHub 리포지토리에서 Software Composition Analysis 활성화" style="width:100%;">}}

[101]: /ko/code_analysis/software_composition_analysis
[102]: /ko/integrations/github/

{{% /tab %}}
{{% tab "CI Pipelines" %}}

Datadog를 통해 직접 스캔하지 않으려면 실행할 스캔([Static Analysis][106] 및 [Software Composition Analysis][107])을 선택하고 그에 따라 CI 파이프라인 공급자를 구성합니다.

## CI/CD 공급자 설정

Static Analysis 및 SCA 스캔을 실행하도록 CI/CD 공급자를 구성하려면 다음 문서를 참조합니다.

- [Static Analysis 및 GitHub Actions][101]
- [Static Analysis 및 CircleCI Orbs][102]
- [Static Analysis 및 Generic CI Providers][103]
- [Software Composition Analysis 및 GitHub Actions][104]
- [Software Composition Analysis 및 Generic CI Providers][105]

[101]: /ko/code_analysis/static_analysis/github_actions 
[102]: /ko/code_analysis/static_analysis/circleci_orbs 
[103]: /ko/code_analysis/static_analysis/generic_ci_providers 
[104]: /ko/code_analysis/software_composition_analysis/github_actions 
[105]: /ko/code_analysis/software_composition_analysis/generic_ci_providers 
[106]: /ko/code_analysis/static_analysis
[107]: /ko/code_analysis/software_composition_analysis

{{% /tab %}}
{{< /tabs >}}

## GitHub 통합 설정 

[GitHub 통합 타일][7]을 사용하고 [소스 코드 통합][8]을 설정하여 GitHub App을 구성하면 Datadog Static Analysis 결과의 일환으로 문제가 되는 코드 스니펫을 확인할 수 있습니다.

{{< img src="code_analysis/source_code_integration.png" alt="Code Analysis 뷰에서 GitHub로 연결" style="width:100%;">}}

자세한 내용은 [Source Code Integration 문서][10]를 참고하세요.

## Static Analysis 통합

Static Analysis를 사용하면, [VS Code][3] 또는 [IntelliJ & PyCharm][4] 등의 [IDE로 직접][11] 작성한 코드의 잘못된 코드 관행 및 보안 취약성과 [GitHub 풀 요청][5]에 관한 자동 피드백을 받을 수 있습니다.

{{< img src="developers/ide_plugins/vscode/static-analysis-issue.png" alt="Visual Studio Code에서 Static Analysis 결과" style="width:100%;">}}

## 리포지토리 검색 및 관리

Code Analysis를 설정한 후에는 [**Code Analysis** 페이지][9]의 각 리포지토리의 Static Analysis 및 SCA 스캔 결과 요약을 확인할 수 있습니다. 기본적으로 요약 결과는 리포지토리 기본 브랜치의 최신 스캔 커밋을 표시하며, 이를 통해 분류 및 수정하려는 각 리포지토리의 기존 문제를 전부 확인할 수 있습니다.

{{< img src="code_analysis/repositories.png" alt="Code Analysis 페이지의 코드 및 라이브러리 스캔 결과가 있는 리포지토리의 목록" style="width:100%;">}}

목록에서 리포지토리를 선택하여 특정 리포지토리의 위반 사항을 검색 및 관리합니다. 기본적으로 결과 값에는 리포지토리 기본 브랜치의 최신 스캔 커밋이 표시되지만, 페이지 상단에서 브랜치 또는 커밋을 변경할 수 있습니다. 결과는 서비스 또는 팀 패싯으로도 필터링할 수 있습니다. 결과가 Datadog 서비스 및 팀과 어떻게 연결되는지에 대한 자세한 내용은 [Code Analysis 시작하기][12]를 참조하세요.

선택한 브랜치 또는 커밋에 관계없이, 모든 결과는 다음과 뷰로 정리됩니다.

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 코드 취약성" style="width:100%;">}}

**코드 취약점** 보기에서 정적 분석이 탐지한 코드 보안 위험을 식별 및 해결하세요.

{{% /tab %}}
{{% tab "Code Quality" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 코드 품질 취약성" style="width:100%;">}}

**코드 품질** 보기에서 정적 분석이 탐지한 잘못된 코드를 식별 및 해결하세요.

{{% /tab %}}
{{% tab "Library Vulnerabilities" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 라이브러리 취약성" style="width:100%;">}}

**라이브러리 취약점** 보기에서 SCA가 탐지한 취약한 오픈 소스 라이브러리를 식별 및 해결하세요.

{{% /tab %}}
{{% tab "Library Catalog" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 라이브러리 목록" style="width:100%;">}}

**Library Catalog** 보기의 코드베이스로 불러온, SCA가 감지한 라이브러리의 전체 목록을 관리하세요.

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/code_analysis/static_analysis
[2]: /ko/code_analysis/software_composition_analysis
[3]: /ko/developers/ide_plugins/vscode/#static-analysis
[4]: /ko/developers/ide_plugins/idea/#static-analysis
[5]: /ko/code_analysis/github_pull_requests/
[6]: /ko/code_analysis/static_analysis_rules
[7]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ko/integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis
[10]: /ko/integrations/guide/source-code-integration/?tab=codeanalysis
[11]: /ko/code_analysis/ide_plugins/
[12]: /ko/getting_started/code_analysis/?tab=incipipelines#linking-services-to-code-violations-and-libraries