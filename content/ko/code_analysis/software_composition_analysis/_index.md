---
description: 코드가 프로덕션 환경으로 전송되기 전 불러온 오픈 소스 라이브러리를 스캔하여 알려진 보안 취약성 문제를 검사하는 Datadog
  소프트웨어 구성 요소 분석에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: 블로그
  text: 소프트웨어 구성 요소 분석으로 프로덕션 환경의 애플리케이션 보안 강화
- link: /getting_started/application_security/software_composition_analysis
  tag: 설명서
  text: 소프트웨어 구성 요소 분석 시작하기
- link: /security/application_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아보기
is_beta: true
title: 소프트웨어 구성 분석
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

소프트웨어 구성 요소 분석(SCA) 기능으로 `npm`와 같은 패키지 관리자를 통해 리포지토리로 불러온 오픈 소스 라이브러리 에서 [알려진 취약점][1]을 검사합니다. 엔지니어링 팀은 SCA를 활용하여 취약한 라이브러리를 개발 수명 주기 초기에 식별하여 미취약 버전으로 업데이트하거나 완전히 삭제해 프로덕션 코드베이스의 보안을 유지할 수 있습니다.

SCA는 [코드 분석][3] 기능을 사용하여 CI 파이프라인에서 실행할 수 있으며 [Datadog 애플리케이션 보안][1]을 사용하여 런타임 모니터링 기능을 제공합니다.


## 언어

SCA는 취약한 라이브러리에 관하여 현재 다음과 같은 언어 및 기술 점검을 지원합니다.

- C#
- Go
- Java
- Node.js
- Python
- Ruby

## 통합

### CI 제공자
{{< whatsnext desc="소프트웨어 구성 요소 분석 기능을 사용하면 코드베이스로 불져온 취약한 오픈 소스 라이브러리를 식별할 수 있습니다. 다음 통합에 대한 자세한 내용을 확인하려면 설명서를 참조하세요.">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}일반 CI 제공자{{< /nextlink >}}
{{< /whatsnext >}}

## 결과 검색 및 필터링

Datadog SCA를 실행할 목적으로 CI 파이프라인을 설정하면 [코드 분석 페이지][4]에 리포지토리별로 위반 사항이 요약됩니다. 특정 리포지토리로 드릴 다운 분석을 진행하여 **라이브러리 취약점** 및 **라이브러리 목록 ** 렌즈로 분류된 SCA 결과를  확인하세요.

* **라이브러리 취약점** 렌즈에는 Datadog SCA이 찾아낸 취약한 라이브러리 버전이 포함되어 있습니다.
* **라이브러리 목록 ** 렌즈에는 Datadog SCA이 찾아낸 모든 라이브러리(취약성 여부와 무관)가 포함되어 있습니다.

결과를 필터링하려면 목록 또는 검색 왼쪽의 패싯을 사용하세요.

각 행은 고유 라이브러리 및 버전 조합을 나타냅니다. 각 조합은 페이지 상단의 필터에서 선택한 특정 커밋 및 브랜치(기본적으로 현재 보고 있는 리포지토리 기본 브랜치의 최신 커밋)와 연결됩니다.

취약점이 발생한 라이브러리를 누르면 위반 사항의 범위 및 위반 발생 위치에 관한 정보가 포함된 사이드 패널이 열립니다.
{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="SCA 위반 사항 사이드패널" style="width:80%;">}}

위반 내용은 탭에 표시됩니다:

- **전체 설명**: 라이브러리의 특정 버전의 취약점에 관한 설명입니다.
- **이벤트**: SCA 위반 사항 이벤트와 관련된 JSON 메타데이터입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /ko/code_analysis/software_composition_analysis/setup
[4]: https://app.datadoghq.com/ci/code-analysis