---
algolia:
  tags:
  - 소프트웨어 구성 분석
  - datadog software composition analysis
  - library vulnerabilities
  - SCA
description: 코드가 프로덕션 환경으로 전송되기 전 불러온 오픈 소스 라이브러리를 스캔하여 알려진 보안 취약성 문제를 검사하는 Datadog
  소프트웨어 구성 요소 분석에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: 블로그
  text: 소프트웨어 구성 요소 분석으로 프로덕션 환경의 애플리케이션 보안 강화
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: 블로그
  text: Datadog SCA로 취약성 해결 우선 순위 지정하기
- link: /getting_started/application_security/software_composition_analysis
  tag: 설명서
  text: 소프트웨어 구성 요소 분석 시작하기
- link: /security/application_security/software_composition_analysis/
  tag: 설명서
  text: 소프트웨어 구성 요소 분석에 대해 알아보기
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아보기
is_beta: false
title: 소프트웨어 구성 분석(SCA)
---

{{< callout url="#" btn_hidden="true" header="평가판 신청하기!" >}}
Software Composition Analysis는 평가판으로 제공됩니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis는 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

Software Composition Analysis(SCA)는 `npm`과 같은 패키지 관리자를 통해 리포지토리로 가져온 오픈 소스 라이브러리를 검사하여 [알려진 취약점][1]을 찾아내고, 리포지토리 전체에서 사용되는 라이브러리의 카탈로그를 생성하여 위험한 라이선스, 지원 종료 라이브러리, 취약점을 식별함으로써 고품질의 안전한 코드베이스를 유지할 수 있도록 합니다.

SCA 검사는 Datadog을 통해 직접 실행하거나 CI 파이프라인에서 [Code Analysis][3]를 통해 실행하여 라이브러리 취약점이 프로덕션 환경에 적용되기 전에 탐지할 수 있습니다. Datadog은 [Datadog Application Security][1]를 통해 런타임 탐지 기능도 제공합니다.

## Software Composition Analysis 설정

SCA는 다음 언어와 기술을 사용하는 라이브러리 검사를 지원합니다.

{{< partial name="code_analysis/sca-getting-started.html" >}}

시작하려면 [**Code Analysis** 페이지][2]에서 Software Composition Analysis를 설정하거나 [Setup 설명서][3]를 참고하세요.

### Lockfiles

SCA는 Lockfile에 포함된 라이브러리를 검사합니다. 지원되는 Lockfile은 다음과 같습니다:

| Package Manager | Lockfile                                 |
|-----------------|------------------------------------------|
| C# (.NET)       | `packages.lock.json`                     |
| Go (mod)        | `go.mod`                                 |
| JVM (Gradle)    | `gradle.lockfile`                        |
| JVM (Maven)     | `pom.xml`                                |
| Node.js (npm)   | `package-lock.json`                      |
| Node.js (pnpm)  | `pnpm-lock.yaml`                         |
| Node.js (yarn)  | `yarn.lock`                              |
| PHP (composer)  | `composer.lock`                          |
| Python (pip)    | `requirements.txt`, `Pipfile.lock`       |
| Python (poetry) | `poetry.lock`                            |
| Ruby (bundler)  | `Gemfile.lock`                           |

## 소프트웨어 개발 라이프사이클에 Software Composition Analysis를 통합하세요

### CI 제공업체
{{< whatsnext desc="원하는 CI 플랫폼 제공업체에서 SCA를 실행할 수 있습니다. CI 파이프라인에 SCA를 설정하려면 제공업체별 설명서를 참고하세요:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}일반 CI 제공업체{{< /nextlink >}}
{{< /whatsnext >}}

## 결과 검색 및 필터링

<div class="alert alert-info">Datadog Software Composition Analysis(SCA)는 소프트웨어 개발 수명 주기(SDLC) 전반에 걸쳐 취약한 라이브러리를 찾아낼 수 있습니다. Code Analysis는 리포지토리를 직접 검사하여 발견된 결과를 요약합니다. 리포지토리와 런타임에서 발견된 모든 취약점을 통합하여 보려면 <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a>를 확인하세요.</div> 

Datadog SCA를 실행하도록 CI 파이프라인을 구성하면 [**Code Analysis Repositories** 페이지][4]에서 리포지토리별 위반 사항이 요약됩니다. 리포지토리를 클릭하면 Software Composition Analysis 결과인 **Library Vulnerabilities** 및 **Library Catalog**를 분석할 수 있습니다.

* **Library Vulnerabilities** 탭에는 Datadog SCA에서 발견된 취약한 라이브러리 버전이 포함되어 있습니다.
* **Library Catalog** 탭에는 Datadog SCA에서 발견된 모든 라이브러리(취약 여부와 관계없이)가 포함되어 있습니다.

결과를 필터링하려면 목록 왼쪽의 패싯이나 상단의 검색 창을 사용하세요. 결과는 서비스 또는 팀 패싯별로 필터링할 수 있습니다. 결과가 Datadog 서비스 및 팀에 어떻게 연결되는지 알아보려면 [Code Analysis 시작하기][5]를 참고하세요.

각 행은 고유한 라이브러리 및 버전 조합을 나타냅니다. 각 조합은 페이지 상단의 필터에서 선택한 특정 커밋 및 브랜치와 연결됩니다(기본적으로, 선택한 리포지토리의 기본 브랜치에서 가장 최신 커밋을 기준으로 함).

취약점이 있는 라이브러리를 클릭하면 위반 범위와 발생 위치 정보가 포함된 사이드 패널이 열립니다.

{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="SCA 위반에 대한 사이드 패널" style="width:80%;">}}

위반 내용은 탭에 표시됩니다:

- **전체 설명**: 라이브러리의 특정 버전의 취약점에 관한 설명입니다.
- **이벤트**: SCA 위반 사항 이벤트와 관련된 JSON 메타데이터입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /ko/code_analysis/software_composition_analysis/setup
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /ko/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries