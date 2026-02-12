---
algolia:
  tags:
  - 정적 분석
  - Datadog 정적 분석
  - 코드 품질
  - SAST
aliases:
- /ko/continuous_integration/static_analysis
- /ko/static_analysis
description: 코드가 프로덕션 환경에 도달하기 전에 코드의 품질 문제와 보안 취약성을 검사하는 Datadog 정적 분석에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: Source Code Integration에 대해 알아보기
is_beta: false
title: 정적 분석(SAST)
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
코드 분석은 미리 보기에 있습니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis는 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}


## 개요

Static Analysis(SAST)는 프로그램을 실행하지 않고 프로그램 프리 프로덕션 코드를 분석하는 클리어 박스 소프트웨어 테스트 기법입니다. 즉, 프로그램이 실행되고 있지 않기에 '정적'이라는 뜻을 갖습니다.

Static Analysis는 소프트웨어 개발 수명 주기(SDLC) 초기에 유지관리 문제와 보안 취약점을 식별하여, 최고 품질의 가장 안전한 코드만 프로덕션에 반영되도록 지원합니다. 보안 취약점을 스캔하는 Static Analysis 도구는 보통 Static Application Security Testing(SAST) 도구라고도 불립니다.

Static Analysis를 활용하면 조직은 다음과 같은 장점이 있습니다.

* Static Analysis는 개발 팀이 조직의 코드 규정 준수에 관해 어림짐작하는 일을 방지하므로 개발 팀은 개발 속도에 큰 영향을 미치지 않고 규정을 준수하는 코드를 게시할 수 있습니다.
* SAST 스캔으로 코드가 프로덕션에 적용되기 전에 새로운 취약점을 발견할 수 있어, 시간이 지남에 따라 조직 애플리케이션의 보안 침해 취약성이 감소합니다.
* 시간이 지남에 따라 조직은 Static Analysis를 활용하여 더 읽기 쉬운 코드베이스를 유지할 수 있으므로, 조직의 신규 개발자가 더 빠르게 온보딩할 수 있습니다. 
* 개발자가 오류 코드를 작성할 위험이 최소화되므로, 조직의 소프트웨어는 시간이 지날수록 유지 관리가 용이한 코드로 인해 신뢰성이 높아집니다.

## Static Analysis 설정

Static Analysis는 다음 언어 및 기술 환경에서 잘못된 코드 관행과 보안 취약성 스캔을 지원합니다.

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br> 

시작하려면 [**Code Analysis** 페이지][1]에서 Static Analysis를 설정하거나 또는 [설정 설명서][9]를 참고하세요.

## 소프트웨어 개발 수명 주기에 Static Analysis 통합

### CI 공급자
{{< whatsnext desc="원하는 CI 플랫폼 공급자에서 Static Analysis를 실행할 수 있습니다. 공급자별 설명서를 참조하여 CI 파이프라인에서 Static Analysis를 설정하세요.">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}기타 CI 공급자{{< /nextlink >}}
{{< /whatsnext >}}

### 소스 코드 관리
{{< whatsnext desc="GitHub에서 코드를 리뷰할 때 Datadog은 관련 코드 라인에 인라인 리뷰 코멘트를 추가하여 풀 요청의 Static Analysis 위반 사항을 자동으로 플래그 지정할 수 있습니다. Datadog은 해당되는 경우 풀 요청에서 바로 적용할 수 있는 수정안도 제공해 드립니다. 아울러, Datadog에서 직접 풀 요청을 생성하여 취약점 또는 품질 문제를 수정할 수 있습니다." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub 풀 요청{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="정적 분석을 사용하면 Integrated Development Environment(IDE)에서 파일 편집 시 코드 취약점을 실시간으로 파악할 수 있습니다. 자세한 내용을 확인하려면 통합별 설명서를 참조하세요.">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}JetBrains IDE용 Datadog 플러그인{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Datadog Visual Studio 코드 확장{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Datadog Visual Studio 확장{{< /nextlink >}}
{{< /whatsnext >}}

## 검색 및 필터 결과

Datadog Static Analyzer를 실행하기 위해 CI 파이프라인을 설정하면 [**Code Analysis Repositories** 페이지][1]에 리포지토리별로 위반 사항이 요약됩니다. 리포지토리를 클릭하여 Static Analysis의 **Code Vulnerabilities** 및 **Code Quality** 결과를 분석합니다.

* **Code Vulnerabilities** 탭에는 [Security 카테고리][2]에서 Datadog 규정이 식별한 위반 사항이 포함되어 있습니다.
* **Code Quality** 탭에는 [모범 사례, 코드 스타일, 오류 발생 가능성 또는 성능 카테고리][3]에서 Datadog의 규정이 식별한 위반 사항이 포함되어 있습니다.

결과를 필터링하려면 목록 또는 검색 좌측 패싯을 사용하세요. 결과는 서비스 또는 팀 패싯별로 필터링할 수 있습니다. 결과와 Datadog 서비스 및 팀이 연관되는 방식에 대해 더 알아보려면 [Code Analysis 시작하기][11]를 참조하세요.

각 행은 위반 사항을 나타냅니다. 각 위반 사항은 페이지 상단의 필터로 선택한 특정 커밋 및 브랜치(기본적으로 현재 보고 있는 리포지토리 기본 브랜치의 최신 커밋의 결과가 표시됨)와 연관되어 있습니다.

위반 사항을 클릭하면 해당 위반 사항의 범위 및 위반 발생 위치에 관한 정보가 포함된 사이드 패널이 열립니다.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="정적 분석 규정 위반용 사이드 패널" style="width:80%;">}} 

탭에 표시되는 위반 사항

- **세부 사항**: 위반 사항 및 위반의 원인이 된 코드 줄에 관한 설명입니다. 위반 코드 스니펫을 확인하려면 [Datadog GitHub App][4]을 설정하세요.
- **수정**: 위반 사항을 해결할 수 있는 하나 이상의 코드 수정안입니다. 복사하여 붙여넣을 수 있습니다.
- **이벤트**: 위반 사항 이벤트에 대한 JSON 메타데이터입니다.

### 제안 수정 사용
{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="정적 분석 규정 위반용 수정 탭" style="width:80%;">}}

Datadog Static Analysis는 다음 두 가지 수정안을 제공합니다.

1. **기본 수정안:** 린팅 문제 등 단순한 위반 사항의 경우, 규칙 분석기가 템플릿 형태의 수정안을 자동 제공합니다.
2. **AI 제안 수정안:** 복잡한 위반 사항의 경우 보통 사전 제공되는 수정안이 없습니다. 대신 OpenAI GPT-4를 활용한 AI 제안 수정안을 사용할 수 있습니다. 'Text' 및 'Unified Diff' 수정안 중에서 선택할 수 있으며, 각 위반 사항별로 이를 해결하기 위한 일반 텍스트 지침 또는 코드 변경 사항을 제공해 드립니다.

두 가지 유형의 수정안은 서로 다른 라벨로 UI에서 시각적으로 구별됩니다.

*기본 제안 수정안*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="기본 정적 분석 제안 수정안의 시각적 표시자" style="width:60%;">}}

*AI 제안 수정안*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="AI 제안 정적 분석 수정안의 시각적 표시자" style="width:60%;">}}

<div class="alert alert-warning">AI 제안 수정안은 평가판 버전입니다. 사용하려면 <a href="/help/">지원 팀에 문의하세요.</div>

### Datadog에서 취약점 또는 품질 문제를 직접 수정하기
{{< img src="ci/sast_one_click_light.png" alt="Code Analysis 원 클릭 수정 예시" style="width:90%;" >}}

Datadog의 결과에서 Code Analysis로 발견한 문제를 직접 해결하기 위해 코드 변경을 푸시하는 방법은 두 가지가 있습니다.

#### 풀 요청 열기
GitHub 앱의 **Pull Requests** 권한이 **Read & Write**로 설정되어 있는 경우, 모든 Static Analysis 결과에 사용 가능한 수정안이 포함된 원클릭 수정이 활성화됩니다. GitHub 통합 설정에 대한 자세한 내용은 [GitHub Pull Requests][10]를 참조하세요.

다음 단계에 따라 취약점을 수정하고 풀 요청을 엽니다.
1. Code Analysis에서 특정 결과를 확인합니다.
2. 결과 사이드 패널의 **Fix Violation**을 클릭합니다.
3. **Open a Pull Request**를 선택합니다.
4. 풀 요청 타이틀과 커밋 메시지를 입력합니다.
5. **Create PR**을 클릭합니다.

#### 현재 브랜치에 직접 커밋하기
결과가 발견된 브랜치에 직접 커밋하여 취약점을 수정할 수도 있습니다.

제안 수정안을 커밋하는 방법

1. Code Analysis에서 특정 결과를 확인합니다.
2. 결과 사이드 패널의 **Fix Violation**을 클릭합니다.
3. **Commit to current branch**를 클릭합니다.

### 설정 커스텀하기

리포지토리에 어떤 Static Analysis 규칙을 설정할지 사용자 지정하려면 [설정 문서][8]를 참조하세요.

### 오탐 보고하기
특정 위반 사항이 오탐이라고 생각된다면, 해당 오탐을 사유와 함께 플래그 지정할 수 있습니다. 이렇게 하면 Datadog으로 신고가 전송됩니다. 신고 제출 내용은 규칙 세트 품질을 개선하기 위해 정기적으로 검토됩니다.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="정적 분석 규정 위반을 오탐으로 신고 버튼" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ko/code_analysis/static_analysis_rules?categories=Security
[3]: /ko/code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ko/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /ko/code_analysis/static_analysis/setup/#customize-your-configuration
[9]: /ko/code_analysis/static_analysis/setup
[10]: /ko/code_analysis/github_pull_requests/
[11]: /ko/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries