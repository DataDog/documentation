---
algolia:
  tags:
  - 소프트웨어 구성 분석
  - 소프트웨어 구성 분석 규칙
  - library vulnerabilities
  - SCA
description: 프로덕션에 배포하기 전에 가져온 오픈소스 라이브러리에서 알려진 보안 취약점을 검사하도록 Software Composition
  Analysis을 설정하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: 블로그
  text: Datadog 애플리케이션 취약성 관리로 프로덕션 환경의 애플리케이션 보안 강화
- link: /getting_started/application_security/software_composition_analysis
  tag: 설명서
  text: 소프트웨어 구성 요소 분석 시작하기
- link: /security/application_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: Source Code Integration에 대해 알아보기
- link: /code_analysis/static_analysis/
  tag: 설명서
  text: 정적 분석에 대해 알아보기
is_beta: false
title: Software Composition Analysis 설정
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
코드 분석은 미리 보기에 있습니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 코드 분석 기능을 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

Datadog Software Composition Analysis을 설정하려면 [**Software Delivery** > **Code Analysis**][6]으로 이동합니다.

## Software Composition Analysis 검사를 실행할 위치를 선택합니다.
### Datadog에서 호스팅하는 스캐닝을 통한 검사
SCA 검사는 Datadog 인프라에서 직접 실행할 수 있습니다. 시작하려면 [***Code Analysis** 페이지][6]으로 이동하세요.

### CI 파이프라인에서 검사
SCA는 [`datadog-ci` CLI][5]를 사용하여 CI 파이프라인에서 실행할 수 있습니다. Datadog API 및 애플리케이션 키( `code_analysis_read` 범위 필요)][3]를 구성하고 각 CI 공급자에서 SCA 작업을 실행합니다.

{{< whatsnext desc="CI 공급자를 위한 설명서 보기">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}일반 CI 공급자{{< /nextlink >}}
{{< /whatsnext >}}

## 소스 코드 관리 공급자 선택
Datadog SCA는 모든 소스 코드 관리 공급자를 지원하며, GitHub를 기본적으로 지원합니다.
### GitHub 통합 설정 
GitHub가 소스 코드 관리 공급자인 경우 [GitHub 통합 타일][9]을 사용하여 [소스 코드 통합][10]을 설정하고 인라인 코드 스니펫을 확인하여 [풀 요청 댓글][11]을 활성화하도록 GitHub 앱을 구성해야 합니다.

GitHub 앱을 설치할 때 특정 기능을 사용하려면 다음 권한이 필요합니다.

- Datadog에서 `Content: Read`에 표시되는 코드 스니펫을 볼 수 있습니다.
- `Pull Request: Read & Write`를 사용하면 Datadog [풀 요청 댓글][11]을 사용하여 풀 요청에 직접 위반에 관한 피드백을 추가할 수 있습니다.

### 기타 소스 코드 관리 공급자
다른 소스 코드 관리 공급자를 사용하는 경우 `datadog-ci` CLI 도구를 사용하여 CI 파이프라인에서 실행되도록 SCA를 구성하고 [결과를][8] Datadog에 업로드하세요.
기본 브랜치에서 리포지토리 분석을 실행해야만 **Code Analysis** 페이지에 결과가 표시될 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/application_security/vulnerability_management
[2]: /ko/code_analysis/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ko/code_analysis/software_composition_analysis/generic_ci_providers/
[9]: /ko/integrations/github
[10]: /ko/integrations/guide/source-code-integration
[11]: /ko/code_analysis/github_pull_requests/