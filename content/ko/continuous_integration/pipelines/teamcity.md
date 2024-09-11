---
aliases:
- /ko/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI 문제 해결
title: TeamCity 파이프라인에서 트레이스 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서는 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 호환성

- **지원되는 TeamCity 버전**: 2021.2 이상

- **Partial retries**: 일부 재시도한 파이프라인 실행 표시

- **Queue time**: 파이프라인 작업이 처리되기 전 대기열에서 대기하는 시간 표시

- **Pipeline failure reasons**: 오류 메시지에서 파이프라인 실패 원인 파악

## Datadog 통합 설정

[TeamCity][1]와 Datadog CI Visibility는 TeamCity 플러그인을 통해 제공됩니다.
통합을 활성화하려면 다음 단계를 따르세요:
1. **Administration** -> **Plugins** -> **Browse Plugin Repository**으로 이동하여 TeamCity 서버에서  [Datadog CI Integration 플러그인][5]을 다운로드합니다.
2. [TeamCity 복합 빌드][6]를 아직 추가하지 않았다면 빌드 체인의 마지막 빌드로 추가합니다. 이 빌드는 
현재 마지막 빌드에 의존하고 다른 빌드에 의존하지 않아야 합니다. 마지막 빌드로 복합 빌드가 없는 빌드 체인은 플러그인에 의해 무시됩니다. 다음은 `Aggregating Results`가 마지막 복합 빌드인 예상 빌드 체인의 예시입니다.
{{< img src="ci/teamcity_build_chain.png" alt="TeamCity build chain with composite build at the end" style="width:90%;">}}
최종 복합 빌드는 연결된 VCS Root와 설정된 [VCS Trigger][13]를 통해 버전 관리 설정이 적절하게 이루어져야 합니다.
 3. TeamCity 프로젝트에 다음 설정 파라미터가 필요합니다:
   * **datadog.ci.api.key**: [Datadog API 키][2].
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}.
   * **datadog.ci.enabled**: `true` (`false`로 설정되어 있으면 특정 프로젝트에서 플러그인이 비활성화될 수 있음).

이러한 설정 파라미터는 TeamCity 하위 프로젝트 또는 [TeamCity 루트 프로젝트][10]에 추가할 수 있습니다. 루트 프로젝트에 추가하면 모든 하위 프로젝트에 전파됩니다. 예를 들어, 모든 프로젝트에서 플러그인을 활성화하려면 루트 프로젝트에 **datadog.ci.enabled**를 `true` 값으로 설정하면 됩니다. 설정 파라미터 정의에 대한 자세한 내용은[TeamCity Project Hierarchy][9] 문서를 참조하세요.
4. 플러그인을 사용하려면 **Administration** -> **Plugins** 페이지에서 **Enable uploaded plugins** 를 클릭합니다. 또는 TeamCity 서버를 재시작할 수도 있습니다.

## Datadog에서 파이프라인 시각화

파이프라인이 완료되면  [Pipelines][3] 및 [Pipeline Executions][4] 페이지에서 데이터를 볼 수 있습니다.

**참고**: 파이프라인 페이지에는 각 리포지토리의 [기본 브랜치][12] 데이터만 표시됩니다.

## Git 사용자 정보 설정

플러그인은 [TeamCity 사용자 이름 스타일][7]을 기반으로 Git 작성자 이름과 이메일을 가져옵니다.
Datadog은 사용자 이메일 정보를 제공하는 **Author Name and Email** 또는 **Author Email** 사용자 이름 스타일을 권장합니다. 다른 사용자 이름 스타일(**UserId** 또는 **Author Name**) 중 하나를 사용하는 경우 플러그인은 사용자 이름에 `@Teamcity`를 추가하여 사용자의 이메일을 자동으로 생성합니다. 예를 들어, **UserId** 사용자 이름 스타일이 사용되고 Git 작성자의 사용자 이름이 `john.doe`인 경우 플러그인은`john.doe@Teamcity`를 Git 작성자의 이메일로 생성합니다. 사용자 이름 스타일은 [VCS Roots][11]에 대해 정의되어 있으며, VCS Root 설정에서 변경할 수 있습니다.

<div class="alert alert-danger"><strong>참고:</strong> Git 작성자 이메일은 <a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility" target="_blank">청구</a>목적으로도 사용되기 때문에  이메일을 제공하지 않는 사용자 이름 스타일 (<strong>UserId</strong> 또는 <strong>Author Name</strong>)을 사용하면 비용이 발생할 수 있습니다. 사용 사례와 관련해 궁금한 사항은 <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog 지원팀에 문의</a>하시기 바랍니다.</div>

## 플러그인 리포지토리

Datadog CI 통합 플러그인의  [소스 코드][8]는 Apache 2.0 라이선스에 따라 오픈 소스입니다.

## 트러블슈팅

Datadog CI 통합 플러그인에서 생성된 모든 로그는 `teamcity-server.log` 파일에 저장되고, **Administration** -> **Diagnostic** -> **Server Log**로 이동하여 TeamCity 서버에서 액세스할 수 있습니다.
이 로그를 확인하여 플러그인 관련 문제에 대한 추가 컨텍스트를 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/vcs-root.html
[12]: https://docs.datadoghq.com/ko/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies