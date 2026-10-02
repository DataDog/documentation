---
aliases:
- /ko/continuous_integration/guides/developer_workflows
- /ko/continuous_integration/guides/pull_request_comments
- /ko/continuous_integration/integrate_tests/developer_workflows
- /ko/continuous_integration/tests/developer_workflows
description: Datadog Test Optimization을 추가 Datadog 기능과 함께 사용하여 개발 프로세스를 가속화하는 방법을
  알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로우 모니터링
- link: /integrations/github/
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: /integrations/guide/source-code-integration
  tag: 설명서
  text: Source Code Integration에 대해 알아보기
- link: /incident_response/work_management
  tag: 설명서
  text: Work Management에 대해 알아보기
title: Datadog을 활용한 개발자 워크플로 개선
---
## 개요 {#overview}

[Test Optimization][5]은 다른 개발자 중심 Datadog 제품 및 GitHub와 같은 외부 파트너와 통합되어 다음과 같은 기능을 통해 개발자 워크플로를 간소화합니다.

- [GitHub 풀 리퀘스트 코멘트에서 테스트 요약 활성화](#test-summaries-in-github-pull-requests)
- [GitHub 이슈를 생성하고 열기](#create-and-open-github-issues) 
- [Work Management를 통해 Jira 이슈 생성](#create-jira-issues)
- [GitHub 및 IDE에서 테스트 열기](#open-tests-in-github-and-your-ide)

이러한 기능은 모든 Test Optimization 고객이 사용할 수 있으며, [Datadog GitHub 통합][4]을 사용할 필요가 없습니다.

## GitHub 풀 리퀘스트의 테스트 요약 {#test-summaries-in-github-pull-requests}

Test Optimization은 GitHub와 통합되어 풀 리퀘스트 코멘트에 테스트 결과 요약을 직접 표시합니다. 각 요약에는 테스트 실행 개요, 불안정성 정보, 실패한 테스트에 대한 오류 메시지가 포함되어 있습니다.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub 풀 리퀘스트 코멘트 미리보기" style="width:100%;">}}

이 정보를 통해 개발자는 테스트 결과에 대한 즉각적인 피드백을 얻을 수 있으며, 풀 리퀘스트 조회를 벗어나지 않고도 실패했거나 불안정한 테스트를 디버깅할 수 있습니다.

<div class="alert alert-info">이 통합 기능은 `github.com`에서 호스팅되는 테스트 서비스에만 사용할 수 있습니다.</div>

## 테스트 요약 활성화{#enable-test-summaries}

다음 단계에 따라 풀 리퀘스트에서 테스트 요약을 활성화할 수 있습니다.

1. [GitHub 통합][4] 설치:
   1. [GitHub 통합 타일][6]의 {{< ui >}}Configuration{{< /ui >}} 탭으로 이동한 후, {{< ui >}}+ Create GitHub App{{< /ui >}}을 클릭합니다.
   1. 애플리케이션에 풀 리퀘스트에 대한 읽기 및 쓰기 권한을 부여합니다.
1. [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][3]를 엽니다.
1. 설정을 적용할 위치 선택:
   - {{< ui >}}Organization{{< /ui >}} 탭을 선택하여 모든 리포지토리에 대해 기본적으로 PR 댓글을 활성화합니다.
   - {{< ui >}}Repository-specific{{< /ui >}} 탭을 선택하여 단일 리포지토리에 대해 PR 댓글을 활성화합니다.
1. {{< ui >}}General{{< /ui >}}에서 {{< ui >}}PR Comments{{< /ui >}}를 켭니다.

{{< img src="ci/enable-settings-github-comments-1.png" alt="CI/CD 설정 페이지의 PR 댓글 토글입니다." style="width:100%;">}}

댓글은 활성화된 리포지토리에 대해 최소 한 번의 테스트를 실행한 풀 리퀘스트에만 표시됩니다.

## GitHub 이슈를 생성하고 열기 {#create-and-open-github-issues}

Test Optimization을 사용하면 테스트와 관련된 컨텍스트가 미리 입력된 GitHub 이슈를 생성 및 열 수 있으며, 더 효율적인 디버깅 워크플로를 위해 Datadog으로 돌아가는 딥 링크도 제공됩니다. Test Optimization에서 직접 이슈를 생성하면 테스트 실패 및 불안정한 테스트에 대한 추적과 책임 유지를 도울 수 있습니다.

### 인앱 엔트리 포인트 {#in-app-entry-points}

Test Optimization 내의 세 가지 영역에서 미리 입력된 GitHub 이슈를 만들 수 있습니다.

- [커밋 개요 페이지({{< ui >}}Commits{{< /ui >}} 표에서)](#commit-overview) 
- [브랜치 개요 페이지](#branch-overview)
- [테스트 세부 정보 사이드 패널](#test-details-view)

#### 커밋 개요 {#commit-overview}

모든 커밋의 개요 페이지는 특정 브랜치 또는 특정 테스트 내에서 찾을 수 있습니다. 

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub 이슈 미리보기" style="width:100%;">}}

커밋 개요 페이지에서 `Failed Tests` 또는 `New Flaky Tests` 표의 행을 클릭한 후, {{< ui >}}Open issue in GitHub{{< /ui >}}를 선택합니다. 

#### 브랜치 개요 {#branch-overview}
이 페이지에서 {{< ui >}}Flaky Tests{{< /ui >}} 표의 행을 클릭한 후, {{< ui >}}Open issue in GitHub{{< /ui >}}를 선택합니다.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub 이슈 불안정한 테스트 표 미리보기" style="width:100%;">}}

#### 테스트 세부 정보 보기 {#test-details-view}
특정 테스트 실행 내에서 {{< ui >}}Actions{{< /ui >}} 버튼을 클릭한 후, {{< ui >}}Open issue in GitHub{{< /ui >}}를 선택합니다. 

{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub 이슈 테스트 상세 보기 미리보기" style="width:100%;">}}

테스트 세부 정보를 다른 곳에 붙여넣기 위해 Markdown 형식의 이슈 설명을 복사할 수도 있습니다. Markdown 설명에는 테스트 실행 링크, 서비스, 브랜치, 커밋, 작성자 및 오류와 같은 정보가 포함되어 있습니다. 

{{< img src="ci/github_issues_markdown.png" alt="GitHub 이슈를 위한 Markdown 형식의 이슈 설명 복사" style="width:50%;">}}

### 샘플 GitHub 이슈 {#sample-github-issue}
다음은 사전 채워진 GitHub 이슈의 예시입니다.
{{< img src="ci/prefilled_github_issue.png" alt="사전 채워진 GitHub 이슈" style="width:80%;">}}

## Jira 이슈 생성{#create-jira-issues}

[Work Management][8]를 사용하면 테스트와 관련된 컨텍스트가 포함된 사전 채워진 Jira 이슈를 생성하고 열 수 있으며, 더 간소화된 디버깅 워크플로를 위해 Datadog으로 돌아가는 딥 링크도 제공합니다. Test Optimization에서 직접 이슈를 생성하면 테스트 실패 및 불안정한 테스트에 대한 추적과 책임 유지를 도울 수 있습니다. 

Jira 이슈의 상태를 업데이트하면 Work Management의 상태가 업데이트되어 최신 작업 항목 상태가 반영됩니다.

### 인앱 엔트리 포인트 {#in-app-entry-points-1}

[Jira 통합을 설정][7]한 후에는 Test Optimization 내의 세 영역에서 작업 항목을 생성할 수 있습니다.

- [커밋 개요 페이지({{< ui >}}Commits{{< /ui >}} 표에서)](#commit-overview-1) 
- [불안정한 테스트 섹션](#branch-overview-1)
- [테스트 실행 사이드 패널](#test-runs-view)

[Work Management][9]의 작업 항목에서 `Shift + J`를 클릭하여 수동으로 Jira 이슈를 생성할 수 있습니다.

### 커밋 개요 {#commit-overview-1}

모든 커밋의 개요 페이지는 특정 브랜치 또는 특정 테스트 내에서 찾을 수 있습니다. 

커밋 개요 페이지에서 `Failed Tests` 또는 `New Flaky Tests` 표의 행을 클릭한 후, {{< ui >}}Create work item{{< /ui >}}을 선택합니다.

#### 브랜치 개요 {#branch-overview-1}
이 페이지에서 {{< ui >}}Flaky Tests{{< /ui >}} 표의 행을 클릭한 후, {{< ui >}}Create work item{{< /ui >}}을 선택합니다.

#### 테스트 실행 조회 {#test-runs-view}
특정 테스트 실행 내에서 {{< ui >}}Actions{{< /ui >}} 버튼을 클릭한 후, {{< ui >}}Create work item{{< /ui >}}을 선택합니다.

Jira 통합 구성에 대한 자세한 내용은 [Work Management 문서][7]를 참조하세요.

## GitHub 및 IDE에서 테스트 열기 {#open-tests-in-github-and-your-ide}

### 인앱 엔트리 포인트 {#in-app-entry-points-2}

Datadog 내에서 실패했거나 불안정한 테스트를 감지한 후, 해당 테스트를 GitHub 또는 IDE에서 열어 즉시 수정할 수 있는 옵션이 있습니다.

테스트 실행의 {{< ui >}}Overview{{< /ui >}} 탭에 있는 {{< ui >}}Error Message{{< /ui >}} 섹션에서 {{< ui >}}View Code{{< /ui >}} 버튼을 클릭한 후, Visual Studio Code, IntelliJ 또는 GitHub 내에서 해당 테스트의 관련 코드 줄을 조회합니다.

{{< img src="continuous_integration/error_message_code.png" alt="GitHub 또는 IDE에서 소스를 보기 위해 클릭할 수 있는 버튼이 포함된 인라인 코드 스니펫" style="width:100%;">}}

이 드롭다운의 옵션 순서는 테스트가 작성된 언어에 따라 변경됩니다.

- Java 기반 테스트에는 IntelliJ가 우선적으로 사용됩니다.
- JavaScript 및 Python 기반 테스트에는 Visual Studio Code가 우선적으로 사용됩니다.

### GitHub에서 소스 코드 보기 {#viewing-source-code-in-github}

선택적으로 [GitHub 통합][10]을 설정하여 실패했거나 불안정한 테스트의 소스 코드를 GitHub에서 열 수 있습니다.

테스트 실행의 {{< ui >}}Overview{{< /ui >}} 탭에 있는 {{< ui >}}Source Code{{< /ui >}} 섹션에서 {{< ui >}}View on GitHub{{< /ui >}} 버튼을 클릭한 후, GitHub 내에서 해당 테스트의 관련 코드 줄을 조회합니다

{{< img src="continuous_integration/source_code_integration.png" alt="GitHub 또는 IDE에서 소스를 보기 위해 클릭할 수 있는 버튼이 포함된 인라인 코드 스니펫" style="width:100%;">}}

### IDE 플러그인 설치하기 {#installing-ide-plugins}

IDE에서 테스트를 보려면 IDE 플러그인/확장 프로그램이 필요합니다. 

- VS Code 확장 프로그램이 설치되어 있지 않은 경우, {{< ui >}}View in VS Code{{< /ui >}}를 클릭하여 VS Code에서 직접 확장 프로그램을 열고 설치합니다.
- IntelliJ 플러그인이 설치되어 있지 않은 경우, {{< ui >}}View in IntelliJ{{< /ui >}}를 클릭하여 확장 프로그램을 설치합니다 호환되는 Datadog 버전은 [플러그인 버전 페이지][2]에서 확인할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[4]: /ko/integrations/github/
[5]: /ko/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /ko/incident_response/work_management/settings/#jira
[8]: /ko/incident_response/work_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/work
[10]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account