---
aliases:
- /ko/static_analysis/github_pull_requests
description: GitHub 풀 요청에서 Code Analysis를 사용하는 방법
further_reading:
- link: /integrations/github/
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: /code_analysis/
  tag: 설명서
  text: 코드 분석에 대해 알아보기
title: GitHub Pull Requests
---

## 개요

Code Analysis는 두 가지 방법으로 GitHub 풀 요청과 통합됩니다.
- [위반 사항을 표시하는 풀 요청 코멘트](#enable-code-analysis-pr-comments-for-your-repositories): GitHub에서 코드 리뷰가 진행되는 동안 Datadog은 하나 이상의 규칙 세트가 적용된 리포지토리의 풀 요청에서 Static Analysis 위반 사항을 자동으로 확인할 수 있습니다. 위반 사항은 해당 코드 줄에 인라인 리뷰 코멘트와 함께 표시되며, 풀 요청에 직접 적용할 수 있는 수정 사항(해당하는 경우)도 함께 제시됩니다. 이 기능은 Static Analysis(SAST)에서만 사용할 수 있습니다.
{{< img src="ci/static-analysis-pr-comment-example.png" alt="풀 요청에 대한 Code Analysis 코멘트 예" style="width:90%;" >}}

- [Datadog에서 직접 문제 해결을 위한 풀 요청 생성](#fixing-a-vulnerability-directly-from-datadog): Datadog에서 제안하는 코드 수정 사항을 기반으로 보안 취약점이나 코드 품질 문제를 해결하기 위한 풀 요청를 UI에서 생성할 수 있습니다. 이 기능은 Static Analysis(SAST)에서만 사용할 수 있습니다.
{{< img src="ci/sast_one_click_light.png" alt="Code Analysis 원 클릭 수정 예시" style="width:90%;" >}}

이러한 기능을 사용하려면 리포지토리에 필요한 GitHub 권한(Read & Write)이 있는지 확인하세요.

## GitHub 풀 요청의 Code Analysis 설정

### Datadog Code Analysis 활성화

Datadog Code Analysis를 사용하려면 [설치 지침][1]에 설명된 대로 적절한 구성 파일을 리포지토리에 추가하세요.

### GitHub 앱 구성

GitHub에서 Code Analysis를 사용하려면 다음 중 하나를 선택하세요.

- Datadog에서 GitHub 앱을 만듭니다.
- Datadog에 이미 GitHub 앱을 만들었다면 기존 GitHub 앱을 업데이트합니다.

GitHub 앱에 부여한 권한에 따라 설정할 수 있는 [GitHub 통합][2] 기능이 결정됩니다.

#### GitHub 앱 생성 및 설치

1. Datadog에서 [**Integrations > GitHub Applications > Add New GitHub Application**][3]으로 이동합니다.
1. GitHub 조직 이름 등 필요한 세부 정보를 입력합니다.
1. **Select Features**에서 **Code Analysis: Pull Request Review Comments** 항목을 체크합니다.
1. **Edit Permissions**에서 **Pull Requests** 권한이 **Read & Write**로 설정되어 있는지 확인합니다.
1. **Create App in GitHub**를 클릭합니다.
1. 앱 이름을 입력하고 제출합니다.
1. **Install GitHub App**을 클릭합니다.
1. 앱을 설치할 리포지토리를 선택한 다음 **Install & Authorize**를 클릭합니다.

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App 설치 화면" style="width:50%;" >}}

#### 기존 GitHub App 업데이트

1. Datadog에서 [**Integrations > GitHub Applications**][5]로 이동하여 Code Analysis에 사용할 GitHub 앱을 검색합니다.
{{< img src="ci/static-analysis-existing-github-app.png" alt="풀 요청에 대한 Static Analysis 코멘트 예" style="width:90%;" >}}
1. **Features* 탭에서 **Code Analysis: Pull Request Comments** 섹션을 확인하여 GitHub 앱에 추가 권한이 필요한지 확인합니다. 필요한 경우**Update permissions in GitHub**를 클릭하여 앱 설정을 수정합니다.
1. **Repository permissions**에서 **Pull Requests** 액세스를 **Read and write**로 설정합니다.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="풀 요청 읽기 및 쓰기 권한 관련 드롭다운" style="width:90%;" >}}
1. **Subscribe to events** 제목 아래 **Pull request** 옵션을 체크합니다.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="풀 요청 리뷰 코멘트 권한 관련 체크박스" style="width:90%;" >}}

### 리포지토리의 Code Analysis PR 코멘트 활성화

1. Datadog에서 [**CI Settings** > **Code Analysis Settings**][4]로 이동합니다.
1. **GitHub Comments**를 활성화하려면 해당 리포지토리 옆에 있는 토글 스위치를 클릭합니다. 아래 예시에서는 해당 `demo-static-analysis-gates` 리포지토리에 관한 코멘트 기능이 활성화되어 있습니다.

{{< img src="ci/static-analysis-github-comments.png" alt="풀 요청의 Code Analysis 코멘트 예" style="width:100%;" >}}

**참고:** [GitHub Actions][6]를 사용하여 스캔을 실행하는 경우 코멘트가 나타나도록 `push` 작업을 트리거하세요.

### Datadog에서 직접 취약점 수정

GitHub 앱의 **Pull Requests** 권한이 **Read & Write**으로 설정된 경우, Static Analysis 결과의 원클릭 수정이 활성화되며 사용 가능한 수정 제안 사항을 함께 확인할 수 있습니다.

다음 단계에 따라 취약점을 수정하고 풀 리퀘스트를 엽니다.
1. Code Analysis에서 특정 결과를 확인합니다.
2. 결과 사이드 패널의 **Fix Violation**을 클릭하빈다.
3. **Open a Pull Request**를 선택합니다.
4. 풀 리퀘스트 타이틀과 커밋 메시지를 입력합니다.
5. **Create PR**을 클릭합니다.

결과가 발견된 브랜치에 직접 커밋하여 취약점을 수정할 수도 있습니다.

제안 수정안을 커밋하는 방법

1. Code Analysis에서 특정 결과를 확인합니다.
2. 결과 사이드 패널의 **Fix Violation**을 클릭합니다.
3. **Commit to current branch**를 클릭합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/code_analysis#setup
[2]: /ko/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /ko/code_analysis/static_analysis/github_actions/