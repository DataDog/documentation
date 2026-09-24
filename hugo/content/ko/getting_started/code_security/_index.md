---
aliases:
- /ko/getting_started/code_analysis/
description: SAST, SCA, IAST 도구로 애플리케이션을 보호하고, 퍼스트 파티 코드와 오픈 소스 라이브러리의 취약점을 탐지하세요.
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: 학습 센터
  text: Datadog Code Security를 통해 안전한 코드 작성
title: Code Security 시작하기
---
## 개요 {#overview}

Datadog Code Security는 개발부터 프로덕션까지 애플리케이션의 퍼스트 파티 코드와 오픈 소스 라이브러리를 보호하고 유지 관리하는 과정을 지원합니다.

이 기능은 소프트웨어 개발 수명 주기 전반에 걸쳐 코드를 보호하는 데 도움이 되는 도구 모음을 제공합니다.

- **정적 코드 분석(SAST)**은 Static Application Security Testing 방법으로 리포지토리를 스캔하고, 퍼스트 파티 코드의 보안 및 품질 문제를 찾아내고, 이러한 문제가 프로덕션에 도달하지 않도록 수정 사항을 제안합니다.
- **Software Composition Analysis(SCA)**은 리포지토리에 존재하면서 런타임 중 서비스에 영향을 미치는 취약한 오픈 소스 라이브러리를 탐지하여 소프트웨어 공급망 보호 및 유지 관리를 지원합니다.
- **런타임 코드 분석(IAST)**은 인터랙티브 애플리케이션 보안 테스트 방법으로 런타임 중 서비스에 영향을 미치는 취약점을 탐지합니다.

## Code Security 설정 {#set-up-code-security}

### 오픈 소스 라이브러리 {#open-source-libraries}

Datadog Software Composition Analysis는 라이브러리 취약점을 탐지하고, 코드베이스 및 실행 서비스 내의 종속성을 카탈로그화합니다.

정적/런타임 라이브러리 취약점 탐지를 설정하려면 [Software Composition Analysis][1]를 참조하세요.

### 퍼스트 파티 코드 {#first-party-code}

{{< whatsnext desc="Datadog으로 퍼스트 파티 코드를 보호하고 유지 관리하는 방법은 두 가지가 있습니다.">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}정적 코드 분석(SAST) 설정{{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}런타임 코드 분석(IAST) 설정{{< /nextlink >}}
{{< /whatsnext >}}

## 개발자 도구 통합 {#developer-tool-integrations}

### 풀 리퀘스트 코멘트 활성화 {#enable-pull-request-comments}

Datadog은 자동 코드 리뷰어 기능을 수행하여 GitHub 풀 리퀘스트의 취약점과 품질 위반 사항을 표시할 수 있습니다. 자세한 내용은 [GitHub Pull Requests][2]를 참조하세요.

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="GitHub에서의 Datadog 코드 검토" style="width:100%;" >}}

### IDE 통합 설치 {#install-ide-integrations}

[Datadog IDE Plugins][5]을 설치하여 코드 편집기에서 직접 Code Security 문제를 식별하세요. IDE에 따라 플러그인은 다음 기능을 지원합니다.

- 정적 코드 분석(SAST)
- Software Composition Analysis(SCA)
- 런타임 코드 분석(IAST)
- 시크릿 스캐닝(Secret Scanning)
- 코드형 인프라(IaC) 스캐닝

{{< whatsnext desc="설정 지침과 지원되는 기능에 대한 자세한 내용은 선택한 코드 편집기 설명서를 참조하세요.">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}<u>JetBrains IDEs</u>: IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm, and PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}

### 리포지토리 설정 사용자 지정 {#customize-your-repository-settings}
[Code Security 설정][3]에서 PR 댓글을 활성화할 리포지토리를 관리하고, 리포지토리 전체/내부에 적용할 정적 코드 분석(SAST) 규칙의 [구성 사용자 지정][11]을 수행할 수 있습니다. Datadog에서 제공하는 모든 기본 규칙은 [SAST 규칙][4]을 참조하세요.

### PR 게이트 설정 {#set-up-pr-gates}

Datadog은 코드베이스에 도입되는 변경 사항과 관련해 보안 및 품질 표준을 유지 및 적용할 수 있도록 플랫폼 기능 [PR 게이트][6]를 제공합니다. 자세한 내용은 [PR 게이트 설정][7]을 참조하세요.

## 런타임 컨텍스트를 통해 취약점 우선순위 지정 {#prioritize-vulnerabilities-with-runtime-context}

Code Security은 정적 리포지토리 스캔과 런타임 서비스 탐지 과정에서 탐지된 모든 라이브러리 및 코드 취약점에 대한 **취약점 중심 보기**를 제공합니다.

### 취약점 탐색 {#explore-vulnerabilities}

라이브러리 취약점의 경우, 표의 각 행에는 라이브러리 버전에 영향을 미치는 특정 취약점이 표시됩니다. 정적/런타임 탐지 활성화 여부에 따라 {{< ui >}}Detected In{{< /ui >}} 열에는 이 취약점의 영향을 받는 특정 리포지토리 및 서비스가 표시됩니다.

Datadog은 SCA의 단일 라이브러리 취약점을 보여주는 측면 패널에 취약점 세부 정보 외에도 다음 사항을 표시합니다.

- 리포지토리 및 서비스 전반에서 관찰된 이 취약점에서 심각도가 가장 높은 인스턴스의 {{< ui >}}Severity breakdown{{< /ui >}} 리포지토리 및 서비스에서 취약점이 탐지된 각 위치별로, Datadog은 환경적 요인을 기반으로 취약점의 기본 심각도 점수를 조정합니다. 자세한 내용은 [Datadog Severity Score][8]를 참조하세요.
- 리포지토리에서 취약점이 탐지된 모든 인스턴스 관련 {{< ui >}}Repositories{{< /ui >}}표 각 인스턴스에 대해 Datadog은 종속성이 '직접' 또는 '전이적'으로 분류되는지 여부, 취약점의 수정 상태, 구체적인 수정 단계를 표시합니다.
- 이 라이브러리 취약점의 영향을 받는 모든 실행 서비스 관련 {{< ui >}}Impacted Services{{< /ui >}}표 라이브러리가 런타임에 로드되고 Datadog의 애플리케이션 SDK에서 탐지된 경우 라이브러리 취약점이 서비스에 영향을 미칩니다.

 심각도 점수는 다음과 같습니다.
| CVSS 점수    | 질적 등급
| --------------| -------------------|
|   `0.0`         | 없음                |
|   `0.1 - 3.9`   | 낮음                 |
|   `4.0 - 6.9`   | 중간              |
|   `7.0 - 8.9`   | 높음                |
|   `9.0 - 10.0`  | 위험            |

### 리포지토리별 결과 탐색 {#explore-results-per-repository}

또한 Code Security는 정적 스캔 결과에 대한 **리포지토리 중심 보기**를 제공하여 스캔된 리포지토리의 브랜치 및 커밋 전반에 걸쳐 세분화된 필터링을 지원합니다.

{{< ui >}}Repositories{{< /ui >}} 페이지에서 리포지토리를 클릭하면 브랜치(기본 브랜치가 먼저 표시됨) 및 커밋(최신 커밋부터 시작) 기준으로 검색 쿼리를 사용자 지정할 수 있는 상세 보기에 액세스할 수 있습니다.

{{< tabs >}}
{{% tab "정적 코드 분석(SAST)" %}}

다음과 같은 기본 제공 패싯을 사용하여 {{< ui >}}Code Quality{{< /ui >}} 탭에서 잘못된 코딩 관행을 식별 및 해결하거나 {{< ui >}}Code Vulnerabilities{{< /ui >}} 탭에서 보안 위험을 식별 및 해결하기 위한 검색 쿼리를 생성할 수 있습니다.

| 패싯 이름                        | 설명                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| 결과 상태                     | 분석 완료 상태를 기준으로 결과를 필터링합니다.         |
| 규칙 ID                           | 발견 사항을 트리거한 특정 규칙입니다.                             |
| 도구 이름                         | 분석에 기여한 도구를 확인합니다.                     |
| CWE(공통 약점 열거) | 인식된 취약점 카테고리를 기준으로 결과를 필터링합니다.                |
| 수정 사항 있음                         | 수정 사항이 제안된 문제를 필터링합니다.                 |
| 결과 메시지                    | 발견 사항과 관련이 있는 간결한 설명이나 메시지를 포함합니다. |
| 규칙 설명                  | 각 규칙의 근거를 포함합니다.                                |
| 소스 파일                       | 문제가 탐지된 파일을 포함합니다.                          |
| 도구 버전                      | 사용된 도구의 버전을 기준으로 결과를 필터링합니다.                       |

결과 페이지에서 바로 제안된 수정 사항에 액세스하여 보안 취약점을 해결하거나 코드 품질 관행을 개선할 수 있습니다.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="코드 분석 결과의 수정 사항 탭의 제안된 코드 수정 사항" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

다음과 같은 기본 제공 패싯을 사용하여 {{< ui >}}Library Vulnerabilities{{< /ui >}} 탭에서 타사 라이브러리의 보안 위험을 식별 및 해결하거나 {{< ui >}}Library Catalog{{< /ui >}} 탭에서 라이브러리 인벤토리를 검토하기 위한 검색 쿼리를 생성할 수 있습니다.

| 패싯 이름         | 설명                                                    |
|--------------------|----------------------------------------------------------------|
| 종속성 이름    | 이름을 기준으로 라이브러리를 식별합니다.                              |
| 종속성 버전 | 특정 라이브러리 버전을 기준으로 필터링합니다.                     |
| 언어           | 프로그래밍 언어를 기준으로 라이브러리를 정렬합니다.                   |
| 점수              | 종속성의 위험 또는 품질 점수를 정렬합니다.           |
| 심각도           | 심각도 등급을 기준으로 취약점을 필터링합니다.        |
| 플랫폼           | 라이브러리가 대상으로 하는 플랫폼을 기준으로 구분합니다. |

취약점 보고서에 액세스하고 프로젝트에서 취약점이 발견된 소스 파일의 위치, 그리고 파일의 코드 소유자 관련 정보를 확인할 수 있습니다.

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="탐지된 라이브러리 취약점에서 GitHub 소스 코드로 직접 연결되는 링크" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## 알리고, 수정하고, 보고하기 {#notify-remediate-and-report}

Code Security는 발견 사항에 대한 수정 작업을 추적 및 관리하기 위한 워크플로 설정을 지원합니다.

- Slack, Jira, 이메일 등을 통해 팀에게 새로운 발견 사항을 알리는 [알림 규칙][9]을 설정합니다.
- {{< ui >}}Code Security Summary{{< /ui >}} 페이지에서 서비스 및 팀별로 취약점을 추적합니다.

## 발견 사항을 Datadog 서비스 및 팀에 연결 {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/software_composition_analysis/
[2]: /ko/security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /ko/security/code_security/static_analysis/static_analysis_rules/
[5]: /ko/security/code_security/dev_tool_int/ide_plugins/
[6]: /ko/pr_gates/
[7]: /ko/pr_gates/setup
[8]: /ko/security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /ko/account_management/teams/
[11]: /ko/security/code_security/static_analysis/setup/#customize-your-configuration