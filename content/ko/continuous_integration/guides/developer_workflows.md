---
description: Datadog CI Visibility 및 다른 기능을 사용하여 개발 프로세스를 가속화하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로 모니터링
- link: /integrations/guide/source-code-integration
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
kind: 가이드
title: Datadog으로 개발자 워크플로 개선하기
---

## 개요

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

CI Test Visibility는 다른 개발자 중심 Datadog 제품 및 GitHub와 같은 외부 파트너와 통합되어 개발자 워크플로를 간소화합니다. 관련 기능은 다음과 같습니다:
- GitHub 이슈를 생성하고 열기
- GitHub 및 IDE에서 테스트 열기
- [GitHub 풀 리퀘스트 코멘트에서 테스트 요약 활성화][1]

이러한 기능은 모든 Test Visibility 고객이 사용할 수 있으며, Datadog GitHub 앱 통합을 사용할 필요가 없습니다.

## GitHub 이슈를 생성하고 열기
테스트 Visibility에서 테스트에 대한 관련 컨텍스트가 미리 입력된 GitHub 이슈를 생성하고 열 수 있을 뿐만 아니라 Datadog로 다시 연결되는 딥링크를 통해 더욱 간소화된 디버깅 워크플로를 사용할 수 있습니다. Test Visibility에서 직접 이슈를 생성하면 테스트 실패 및 불안정한 테스트에 대한 책임을 추적하고 유지하는 데 도움이 됩니다.

### 인앱 엔트리 포인트

CI Test Visibility 내의 세 가지 영역에서 미리 입력된 GitHub 이슈를 만들 수 있습니다:

1. 커밋 개요 (커밋 테이블에서)
2. 브랜치 개요
3. 테스트 상세 보기

#### 커밋 개요
{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub issues preview" style="width:100%;">}}

모든 커밋의 개요 페이지는 특정 브랜치 또는 특정 테스트 내에서 찾을 수 있습니다.

커밋 개요 페이지에서 `Failed Tests` 또는 `New Flaky Tests` 테이블의 행을 클릭하고 `Open issue in GitHub`를 선택합니다.

#### 브랜치 개요
이 페이지에서 `Flaky Tests` 테이블의 행을 클릭하고 `Open issue in GitHub`를 선택합니다.
{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub issues flaky tests table preview" style="width:100%;">}}

#### 테스트 상세 보기
특정 테스트 실행 내에서 오른쪽 상단의 `Actions` 버튼을 클릭하고 `Open issue in GitHub`를 선택합니다. 
{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub issues test detail view preview" style="width:100%;">}}

또한 Markdown에서 이슈 설명을 복사하여 테스트 세부 정보를 다른 곳에 붙여넣을 수 있는 옵션도 있습니다. Markdown 설명에는 테스트 실행 링크, 서비스, 브랜치, 커밋, 작성자 및 오류와 같은 정보가 포함됩니다.
{{< img src="ci/github_issues_markdown.png" alt="Copy issue description in Markdown format for GitHub issues" style="width:40%;">}}

### 샘플 GitHub 이슈
다음은 GitHub 이슈의 미리 입력된 내용입니다:
{{< img src="ci/prefilled_github_issue.png" alt="Pre-filled GitHub issue" style="width:60%;">}}

## GitHub 및 IDE에서 테스트 열기
### 인앱 엔트리 포인트
Datadog 내에서 실패했거나 불안정한 테스트를 감지한 후, 해당 테스트를 GitHub 또는 IDE에서 열어 즉시 수정할 수 있는 옵션이 있습니다.

테스트 실행의 Overview 탭에 있는 Error Message 섹션 아래에서 `View Code` 버튼을 클릭하면 Visual Studio Code, IntelliJ 또는 GitHub 내에서 해당 테스트의 관련 코드 줄을 볼 수 있습니다.
이 드롭다운의 옵션 순서는 테스트가 작성된 언어에 따라 변경됩니다:

- Java 기반 테스트에는 IntelliJ가 우선적으로 사용됩니다.
- JavaScript 및 Python 기반 테스트에는 Visual Studio 코드가 우선적으로 사용됩니다.
{{< img src="ci/IDE.png" alt="Open test in IDE" style="width:30%;">}}

### IDE 플러그인 설치하기
IDE에서 테스트를 보려면 IDE 플러그인/확장 프로그램이 필요합니다.
- VS Code 확장 프로그램이 설치되어 있지 않은 경우 `View in VS Code`를 클릭하면 VS Code에서 직접 확장 프로그램이 열리므로 설치할 수 있습니다.
- IntelliJ 플러그인이 설치되어 있지 않은 경우 `View in IntelliJ`를 클릭하면 확장 프로그램 설치로 연결됩니다. 호환되는 Datadog 버전은 [여기][2]에서 확인할 수 있습니다.

## GitHub 풀 리퀘스트의 테스트 요약
Datadog은 풀 리퀘스트 코멘트에 테스트 결과 요약 및 실패한 테스트에 대한 오류 메시지를 표시하기 위해 GitHub와 통합됩니다. 자세한 내용은 이 [가이드][1]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service