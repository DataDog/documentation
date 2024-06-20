---
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
is_beta: true
title: 코드 분석
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 코드 분석 기능을 사용할 수 없습니다.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="베타 버전을 사용해보세요!" >}}
코드 분석 기능은 퍼블릭 베타 버전입니다.
{{< /callout >}}

## 개요

코드 분석은 [정적 분석][1] 및 [소프트웨어 컴포지션 분석(SCA)][2] 프로덕트로 구성되어 있습니다. 

정적 분석
: 개발 수명 주기 초기에 유지 관리 문제, 버그, 성능 문제, 보안 취약성용 맞춤 코드를 점검하여 프로덕션 도달 전 문제를 파악하고, 가능한 경우 사용자에게 영향을 미치 전에 지원 엔지니어링 팀이 해당 문제를 해결할 수 있도록 제안 수정 사항을 제공해 드립니다.

소프트웨어 컴포지션 분석 
:리포지토리로 불러온 오픈 소스 라이브러리에 알려진 취약성이 있는지 검사합니다. 

코드 분석을 설정한 후에는 [코드 분석 페이지][9]에서 설정한 각 리포지토리에 대한 정적 분석 및 SCA 스캔 결과의 요약을 확인할 수 있습니다. 요약 결과는 항상 각 리포지토리 기본 브랜치의 최신 커밋 데이터이므로, 각 리포지토리에서 분류 및 수정할 수 있는 기존 문제를 전부 확인할 수 있습니다.

목록 리포지토리를 선택하여 특정 리포지토리에 대한 위반 사항을 검색 및 관리합니다. 기본적으로 결과값은 리포지토리 기본 브랜치의 최신 커밋 데이터로 필터링되지만 페이지 상단에서 브랜치 또는 커밋을 변경할 수 있습니다. 선택한 브랜치 또는 커밋에 관계없이 모든 결과값은 다음 보기로 정리됩니다.

{{< tabs >}}
{{% tab "코드 취약성" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 코드 취약성" style="width:100%;">}}

**코드 취약점** 보기에서 정적 분석이 탐지한 코드 보안 위험을 식별 및 해결하세요.

{{% /tab %}}
{{% tab "코드 품질" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 코드 품질 취약성" style="width:100%;">}}

**코드 품질** 보기에서 정적 분석이 탐지한 잘못된 코드를 식별 및 해결하세요.

{{% /tab %}}
{{% tab "라이브러리 취약성" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 라이브러리 취약성" style="width:100%;">}}

**라이브러리 취약점** 보기에서 SCA가 탐지한 취약한 오픈 소스 라이브러리를 식별 및 해결하세요.

{{% /tab %}}
{{% tab "라이브러리 목록" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Datadog Shopist 서비스 및 리포지토리용 코드 분석 페이지의 라이브러리 목록" style="width:100%;">}}

**라이브러리 목록** 보기의 코드베이스로 불러온, SCA가 감지한 라이브러리의 전체 목록을 관리하세요.

{{% /tab %}}
{{< /tabs >}}

정적 분석을 사용하면, [VS Code][3] 또는 [IntelliJ & PyCharm][4] 등의 IDE로 직접 작성한 잘못된 코드 및 보안 취약성과 [GitHub 풀 리퀘스트][5]에 대한 자동 피드백을 받을 수 있습니다.

## 리포지토리에서 코드 분석 설정하기

[코드 분석 페이지][9]에서 **+ 리포지토리 설정**을 클릭하고 관련 프로그래밍 언어를 선택하여 프로젝트에 코드 분석을 추가합니다. Datadog은 다음 언어에 대해 즉시 사용할 수 있는 규칙 세트를 제공해 드립니다.

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br>

정적 분석 규칙 세트에 대한 자세한 내용을 확인하려면 [정적 분석 규칙][6]을 참조하세요.

## CI/CD 공급자 설정

{{< whatsnext desc="코드 분석을 설정하려는 CI/CD 공급자 선택:">}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}정적 분석 및 GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}정적 분석 및 CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}정적 분석 및 일반 CI 공급자{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}소프트웨어 컴포지션 분석 및 GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}소프트웨어 컴포지션 분석 및 일반 CI 공급자{{< /nextlink >}}
{{< /whatsnext >}}

</br>

## GitHub 통합 설정 

[GitHub 통합 타일][7]을 사용하여 GitHub 앱과 [소스 코드 통합][8]을 설정해야 Datadog UI 정적 분석 결과의 일환으로 문제가 되는 코드 스니펫을 확인할 수 있습니다.

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
[9]: /ko/security/application_security/software_composition_analysis