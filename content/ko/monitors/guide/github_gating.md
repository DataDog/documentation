---
aliases:
- /ko/continuous_integration/guides/github_gating
description: GitHub 애플리케이션을 배포하기 전에 Datadog 모니터를 사용하여 품질 검사를 수행하는 방법에 대해 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로우 모니터링
- link: /integrations/guide/source-code-integration
  tag: 설명서
  text: GitHub 통합에 대해 알아보기
- link: https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/
  tag: 설명서
  text: GitHub 풀 요청에서 테스트 요약 사용
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: 블로그
  text: GitHub 배포 보호 규칙 및 Datadog으로 실패한 품질 검사 감지
kind: guide
title: Datadog 모니터로 GitHub Actions 배포 게이팅하기
---

## 개요

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트 ({{< region-param key="dd_site_name" >}})에서는 현재 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

Datadog은 최종 고객에게 고품질 애플리케이션을 제공할 수 있도록 도와주는 [GitHub Actions 배포 보호 규칙][10]의 통합 파트너입니다. Datadog 모니터를 사용하여 GitHub Actions 배포 워크플로우에 품질 게이트를 적용할 수 있습니다.

이러한 기능은 GitHub Enterprise Cloud의 모든 Datadog 고객이 사용할 수 있으며 CI Visibility를 사용할 필요가 없습니다.

## 배포 보호 규칙 실행
애플리케이션 배포 시 품질 검사를 위해 Datadog을 사용하려면 애플리케이션에 대해 배포 보호 규칙 기능을 활성화해야 합니다.

### Datadog에서 새 GitHub 애플리케이션 설정

Datadog에 자동으로 연결되는 GitHub 애플리케이션을 생성하려면 [이 지침][1]을 참조하세요. **배포 보호 규칙** 체크박스를 선택하는 것을 잊지 마세요.

{{< img src="ci/github_gates_new_app.png" alt="Datadog GitHub 풀 요청 댓글 미리보기" style="width:100%;">}}

이미 GitHub 애플리케이션이 설정되어 있고 Datadog에 연결되어 있는 경우 인앱 [GitHub 통합 타일][2]에서 배포 보호 규칙을 활성화할 수 있는 링크를 찾을 수 있습니다.

{{< img src="ci/github_gates_existing_app.png" alt="Datadog GitHub 풀 요청 댓글 미리보기" style="width:100%;">}}

### GitHub에서 배포 보호 규칙 설정
1. 배포에 대한 읽기 및 쓰기 권한을 활성화합니다.
2. 액션에 대한 읽기 권한을 활성화합니다.
3. 애플리케이션의 **Subscribe to events**에서 **Deployment protection rule**에 대한 체크박스를 클릭합니다.
4. 리포지토리에서 **Settings**를 클릭하고 **Code and Automation** 섹션에서 **Environments**를 클릭합니다. **Deployment Protection Rules**에서 Datadog 통합과 연결된 GitHub 애플리케이션을 활성화합니다.

## 배포를 게이팅하는 모니터 만들기 

[본 지침][3]에 따라 GitHub Actions 배포 게이팅에 사용할 Datadog 모니터를 만들고 설정합니다.

품질 검사를 위해 여러 개의 개별 모니터를 사용할 수 있지만, 하나의 모니터로 두 개 이상의 신호를 기반으로 배포를 게이팅할 수 있으므로 [복합 모니터][4]를 사용할 것을 권장합니다. 자세한 내용은 [모니터 유형][5]을 참조하세요.

품질 게이팅에 사용할 모든 모니터에는 다음과 같은 적절한 태그를 반드시 지정해야 합니다.
- `git_env` 
- `git_repo` 

`git_repo` 태그에는 리포지토리 소유자 이름이 `Datadog/my-repo`와 같은 `<OWNER>/<REPO>` 형식으로 포함되어야 합니다.

워크플로를 실행하면 GitHub Actions가 Datadog 모니터에 요청을 보냅니다. 아래 나열된 모니터의 평가 결과 중 하나에 따라 Datadog은 워크플로 실행 내 관련 이벤트 및 환경에 대한 **Comment** 섹션에서 확인할 수 있는 코멘트를 GitHub로 다시 전송합니다.
- 환경 및 리포지토리 태그를 통해 배포와 연결된 모든 모니터가 `OK` 상태에 있으면 Datadog이 배포를 승인합니다.
- 배포와 관련된 모니터가 `OK` 상태가 아니라 `ALERT`,`WARN` 또는 `NODATA`의 상태에 있으면 Datadog은 배포를 거부합니다.

## 품질 검사 예시
### 애플리케이션 성능
배포 전에 애플리케이션의 오류율 및/또는 평균 대기 시간이 특정 임계값 미만인지 확인하려면 [APM 모니터][7]를 사용할 수 있습니다.

### 환경 인프라스트럭처 상태
배포 전에 애플리케이션이나 서비스의 CPU 및/또는 메모리 사용량을 확인하려면 [통합][8] 및 [메트릭 모니터][9]를 사용하세요.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /ko/integrations/github/
[3]: /ko/monitors/configuration/?tab=thresholdalert
[4]: /ko/monitors/types/composite/ 
[5]: /ko/monitors/types/
[6]: /ko/monitors/settings/
[7]: /ko/monitors/types/apm/?tab=apmmetrics
[8]: /ko/monitors/types/integration/?tab=checkalert 
[9]: /ko/monitors/types/metric/?tab=threshold
[10]: https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/