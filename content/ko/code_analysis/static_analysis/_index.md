---
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
is_beta: true
kind: 설명서
title: 정적 분석
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    코드 분석 기능은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="베타를 사용해 보세요!" >}}
코드 분석 기능은 퍼블릭 베타 서비스입니다.
{{< /callout >}}

## 개요

정적 분석은 프로그램 실행 없이도 프로그램의 사전 제작 코드를 분석하는 클리어박스 소프트웨어 테스트 기술입니다. 즉, 프로그램이 실행되고 있지 않기에 '정적'이라는 의미를 갖습니다. 정적 분석을 사용하면 소프트웨어 개발 수명 주기(SDLC) 초기에 유지 관리 문제와 보안 취약성을 식별하여 가장 안전한 최고 품질의 코드만 프로덕션에 적용할 수 있습니다. 보안 취약성을 검색하는 정적 분석 도구는 대개 SAST(정적 애플리케이션 보안 테스트) 도구라고도 불리기도 합니다.

조직은 정적 분석 활용 시 다음과 같은 혜택을 누릴 수 있습니다.

* 정적 분석은 개발 팀이 조직의 코드 규정 준수에 관해 어림짐작하는 일을 방지하므로 개발 팀은 개발 속도에 큰 영향을 미치지 않고 규정을 준수하는 코드를 퍼블리시할 수 있습니다. *코드가 프로덕션에 적용되기 전 SAST 스캔으로 신규 취약점을 발견하기에 조직의 애플리케이션은 시간이 지남에 따라 보안 위반에 보다 덜 취약해집니다. *시간이 지남에 따라 조직은 정적 분석을 활용하여 더 읽기 쉬운 코드베이스를 유지할 수 있으므로, 조직의 신규 개발자가 더 빠르게 온보딩할 수 있습니다. * 개발자가 오류 코드를 작성할 위험이 최소화되므로, 조직의 소프트웨어는 시간이 지날수록 유지 관리가 용이한 코드로 인해 신뢰성이 높아집니다.
## 언어

현재 정적 분석 기능은 잘못된 코드 예시 및 보안 취약성에 대해 다음 언어 및 기술 점검을 지원합니다.

- C#
- Dockerfiles
- Java
- JavaScript
- Python
- TypeScript

## 통합

### CI 제공자
{{< whatsnext desc="정적 분석을 사용하면 선택한 CI 플랫폼 공급자의 다양한 언어용 코드 검토에 대한 피드백을 통합할 수 있습니다. 다음의 통합에 대한 자세한 내용을 확인하려면 설명서를 참조하세요:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub 작업{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}일반 CI 제공자{{< /nextlink >}}
{{< /whatsnext >}}

### 소스 코드 관리
{{< whatsnext desc="코드 검토 중 소스 코드 관리(SCM) 통합 기능은 하나 이상의 규칙 세트가 적용된 리포지토리에 대한 풀 리퀘스트에서 정적 분석 규정 위반 여부를 확인합니다. 해당 위반 사항은 관련 코드 라인에 주석으로 표시됩니다. 특정 규정 위반에는 SCM 도구 UI에 직접 적용할 수 있는 제안 변경 사항도 포함됩니다." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}GitHub 풀 리퀘스트{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="정적 분석을 사용하면 IDE(통합 개발 환경)에서 파일 편집 시 코드 취약점을 식별할 수 있습니다. 다음 통합에 대한 자세한 내용을 확인하려면 설명서를 참조하세요:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Datadog IntelliJ IDEA 플러그인{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/" >}}Datadog Visual Studio 코드 확장{{< /nextlink >}}
{{< /whatsnext >}}

## 검색 및 필터 결과

Datadog 정적 분석기를 실행할 목적으로 CI 파이프라인을 설정하면 [코드 분석 페이지][1]에 리포지토리별로 위반 사항이 요약됩니다. 특정 리포지토리로 드릴 다운 분석을 진행한 후, 정적 분석 규정 위반 사항은 **코드 취약점** 및 **코드 품질** 렌즈로 분류됩니다. 

* **코드 취약점** 렌즈에는 [보안 카테고리][2]의 Datadog 규정에 의해 식별된 위반 사항이 포함되어 있습니다. * **코드 품질** 렌즈에는 [모범 예시, 코드 스타일, 오류 발생 가능성 또는 성능 카테고리][3]에서 Datadog의 규정에 의해 식별된 위반 사항이 포함되어 있습니다.

결과를 필터링하려면 목록 또는 검색 왼쪽의 패싯을 사용하세요. 

각 행은 위반 사항을 나타냅니다. 각 위반 사항은 페이지 상단의 필터로 선택한 특정 커밋 및 브랜치(기본적으로 현재 보고 있는 리포지토리 기본 브랜치의 최신 커밋)와 연관되어 있습니다.

위반 사항을 누르면 해당 위반 사항의 범위 및 위반 발생 위치에 관한 정보가 포함된 사이드 패널이 열립니다.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="정적 분석 규정 위반용 사이드 패널" style="width:80%;">}} 

탭에 표시되는 위반 사항:

- **세부 사항**: 위반 사항에 및 위반의 원인이 된 코드 라인을 설명합니다. 위반 코드 스니펫을 확인하려면 [Datadog GitHub 앱][4]을 설정하세요.
- **수정**: 위반 사항을 해결할 수 있는 하나 이상의 코드 수정안. 복사하여 붙여넣을 수 있습니다.
- **이벤트**: 정적 분석 위반 사항 이벤트에 대한 JSON 메타데이터입니다.

### 제안 수정 사용
<div class="alert alert-warning">AI 제안 수정은 아직 비공개 베타 서비스입니다. 서비스 접근을 요청하려면 <a href="/help/">지원 팀에 문의하세요.</div>

{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="정적 분석 위반 사항의 수정 탭" style="width:80%;">}}

Datadog 정적 분석은 다음과 같은 두 가지 유형의 수정 방안을 제안합니다.

1. **기본 제안 수정:** 린트 오류와 같은 간단한 규정 위반의 경우, 규정 분석기가 자동으로 템플릿 수정 사항을 제공해 드립니다.
2. **AI 제안 수정:** 복잡한 규정 위반 사항의 경우 대개 미리 수정할 수 없습니다. 대신 OpenAI의 GPT-4를 사용하여 수정 방안을 제안하는 'AI 제안 수정' 기능을 사용할 수 있습니다. '텍스트' 수정과 '통합 Diff' 수정 중에서 선택할 수 있으며, 일반 텍스트 지침 또는 위반 사항 해결용 코드 변경 사항을 개별 출력합니다.

본 수정 방안 두 가지는 UI에서 서로 다른 레이블로 시각적으로 구분됩니다.

*기본 제안 수정:*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="기본 정적 분석의 수정 제안 시각적 표시" style="width:60%;">}}

*AI 제안 수정:*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="AI 정적 분석의 수정 제안 시각적 표시" style="width:60%;">}}

### 위반 사항 무시
무시할 코드 라인 상단에 `no-dd-sa`으로 주석 처리하여 특정 규정 위반 사례를 무시할 수 있습니다. 이렇게 하면 해당 라인이 규정 위반 데이터를 생성하지 않습니다. 예를 들어, 다음의 파이썬(Python) 코드 스니펫에서 `foo = 1` 라인은 정적 분석 검사 시 무시됩니다.

```python
#no-dd-sa
foo = 1
bar = 2
```

### 오탐 보고하기
특정 규정 위반 사항이 오탐이라고 생각되신다면 해당 오탐을 표시하고 신고 사유를 알려주세요. Datadog에서 신고해 주신 내용을 검토하여 후에 운영 원칙을 개선합니다.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="정적 분석 규정 위반을 오탐으로 신고 버튼" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /ko/code_analysis/static_analysis_rules?categories=Security
[3]: /ko/code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /ko/integrations/github/