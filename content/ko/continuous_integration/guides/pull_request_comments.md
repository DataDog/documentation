---
description: GitHub 풀 리퀘스트에서 테스트 결과 요약을 자동으로 생성하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로 모니터링
- link: /integrations/guide/source-code-integration
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
kind: 가이드
title: GitHub 풀 리퀘스트에서 테스트 요약 활성화하기
---

## 개요

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

Test Visibility 제품을 사용하는 경우, Datadog은 GitHub와 통합하여 풀 리퀘스트에서 테스트 결과 요약을 바로 표시할 수 있습니다. 요약에는 테스트 실행에 대한 개요, 테스트 불안정에 대한 정보, 실패한 테스트에 대한 오류 메시지가 포함됩니다. 이 보고서를 통해 개발자는 풀 리퀘스트 보기를 벗어나지 않고도 실패했거나 불안정한 테스트를 디버깅할 수 있으며, 테스트 결과에 대한 즉각적인 피드백을 받을 수 있습니다.

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub pull request comment preview" style="width:100%;">}}

### 호환성

`github.com`에서 호스팅되는 테스트 서비스에만 이 통합 기능을 사용할 수 있습니다.

## 테스트 요약 활성화

다음 단계에 따라 풀 리퀘스트에서 테스트 요약을 활성화할 수 있습니다:

1. [GitHub 통합][1]을 설치합니다:
   1. [GitHub 통합 타일][2]의 **Configuration** 탭으로 이동하여 **+ Create GitHub App**을 클릭합니다.
   2. 애플리케이션에 풀 리퀘스트에 대한 읽기 및 쓰기 권한을 부여하세요.
2. 하나 이상의 테스트 서비스에 대한 테스트 요약을 활성화합니다. [테스트 서비스 설정 페이지][3] 또는 커밋/브랜치 페이지에서 수행할 수 있습니다.

### 테스트 서비스 설정 페이지

1. [테스트 서비스 설정 페이지][3]로 이동하여 리포지토리 또는 테스트 서비스를 검색합니다.
2. 원하는 서비스에 대한 **GitHub Comments** 열 아래의 토글을 클릭합니다.

{{< img src="ci/enable-settings-github-comments.png" alt="The Test Service Settings tab in Datadog with GitHub comments enabled for one test service" style="width:100%;">}}

### 커밋 또는 브랜치 페이지

1. GitHub 코멘트를 활성화하려는 테스트 서비스 커밋 또는 브랜치 페이지로 이동합니다.
2. 설정 아이콘을 클릭하고 **View Test Service Settings**를 클릭합니다.
3. 새 풀 리퀘스트에 코멘트가 표시되도록 **Enable GitHub Comments**를 선택합니다. 이 변경에는 몇 분이 소요될 수 있습니다.

{{< img src="ci/enable-github-comments.png" alt="Enable GitHub comments dropdown" style="width:100%;">}}

테스트 실행 전에 열리고 활성화된 테스트 서비스에 대해 하나 이상의 테스트를 실행한 풀 리퀘스트에만 코멘트가 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/github/
[2]: https://app.datadoghq.com/integrations/github
[3]: https://app.datadoghq.com/ci/settings/test-service