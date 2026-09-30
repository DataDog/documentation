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
title: Datadog 모니터로 GitHub Actions 배포 게이팅하기
site_support_id: ci_visibility
---

## 개요

Datadog은 최종 고객에게 고품질 애플리케이션을 제공할 수 있도록 도와드리는 [GitHub Actions 배포 보호 규칙][10]의 통합 파트너입니다. Datadog 모니터링을 사용하여 GitHub Actions 배포 워크플로에 품질 게이트를 적용할 수 있습니다.

해당 기능은 GitHub Enterprise Cloud를 사용하는 모든 Datadog 고객께 제공되며, CI 가시성을 사용하지 않아도 됩니다.

## 배포 보호 규칙 사용
애플리케이션 배포 시 Datadog으로 품질 점검을 하려면 애플리케이션에 대한 배포 보호 규칙 기능을 활성화해야 합니다.

### Datadog에서 새 GitHub 애플리케이션을 설정합니다. 

Datadog에 자동으로 연결되는 GitHub 애플리케이션을 생성하려면 [이 지침][1]을 참조하세요. **배포 보호 규칙** 체크박스를 선택하는 것을 잊지 마세요.

{{< img src="ci/github_gates_new_app.png" alt="Datadog GitHub 풀 리퀘스트 코멘트 미리보기" style="width:100%;">}}

이미 GitHub 애플리케이션을 설정하고 Datadog에 연결된 경우 앱 내 [GitHub 통합 타일][2]에서 배포 보호 규칙을 활성화하는 링크를 찾을 수 있습니다.

{{< img src="ci/github_gates_existing_app.png" alt="Datadog GitHub 풀 리퀘스트 코멘트 미리보기" style="width:100%;">}}

### GitHub 배포 보호 규칙 설정
1. 배포에 대한 읽기 및 쓰기 권한을 사용 설정합니다.
2. 작업에 대한 읽기 권한을 사용 설정합니다.
3. 애플리케이션의 **이벤트 구독하기**에서 **배포 보호 규칙** 확인란을 클릭합니다.
4. 리포지토리에서 **설정**을 클릭합니다. **코드 및 자동화** 섹션에서 **환경**를 클릭합니다. **배포 보호 규칙**에서 Datadog 통합과 연결된 GitHub 애플리케이션을 활성화합니다. 

## 배포를 게이팅하는 모니터링 생성하기

[본 지침][3]에 따라 Datadog 모니터링을 생성 및 설정하고 GitHub Actions 배포 게이팅에 사용하세요. 

품질 점검을 위해 다중 개별 모니터링를 사용할 수 있지만, Datadog은 [컴포짓(composite) 모니터링][4]을 사용할 것을 권장하는데, 이는 하나의 모니터링으로 두 개 이상의 신호에 기반하여 배포를 게이팅할 수 있기 때문입니다. 자세한 내용은 [모니터링 유형][5]를 참조하세요. 

품질 게이팅에 사용하려는 모든 모니터링은 다음 태그를 사용하여 올바르게 태그를 지정해야 합니다.
- `git_env` 
- `git_repo` 

`git_repo` 태그에는 `<OWNER>/<REPO>` 형식의 리포지토리 소유자 이름이 포함되어야 합니다(예: `Datadog/my-repo`).

워크플로우 실행하면 GitHub Actions가 Datadog 모니터링으로 요청을 보냅니다. 아래 명시된 모니터링의 평가 결과 중 하나에 따라, Datadog은 GitHub로 코멘트를 다시 보냅니다. 해당 코멘트는 워크플로 실행 내의 연결된 이벤트 및 환경에 대한 GitHub의 **코멘트** 섹션에서 볼 수 있습니다.
- 배포와 관련된 모든 모니터링(환경 및 리포지토리 태그를 통해)이 `OK` 상태면 Datadog이 배포를 승인합니다.
- 배포와 관련된 모니터링이 `OK` 상태가 아닌 경우( `ALERT`, `WARN`, 또는 `NODATA`) Datadog은 배포를 거부합니다.

## 품질 점검 예시
### 애플리케이션 성능
배포하기 전에 애플리케이션의 오류율 및/또는 평균 레이턴시가 특정 임계값 미만인지 확인하려면 [애플리케이션 성능 모니터링(APM) 모니터링][7]를 사용할 수 있습니다.

### 환경 인프라스트럭처 서비스 상태
배포 전에 애플리케이션 또는 서비스의 CPU 및/또는 메모리 사용량을 점검하려면 [통합][8] 및 [메트릭 모니터링][9]을 사용하세요.

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