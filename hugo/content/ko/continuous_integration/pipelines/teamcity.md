---
aliases:
- /ko/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: 설명서
  text: 파이프라인 실행 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
title: TeamCity용 CI Visibility 설정
---
## 개요 {#overview}

[TeamCity][1]는 소프트웨어 개발 프로세스를 최적화하고 자동화하는 지속적 통합 및 배포 서버입니다.

TeamCity용 CI Visibility를 설정하여 파이프라인 실행에 대한 데이터를 수집하고, 성능 병목 현상을 디버깅하며, 운영 문제를 해결하고, 개발 워크플로를 최적화합니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [부분 재시도][14] | 빌드 트리거 재시도 | 부분적으로 재시도된 파이프라인 실행을 조회합니다. |
| [대기 시간][15] | 대기 시간 | 파이프라인 작업이 처리되기 전까지 대기열에서 기다리는 시간을 조회합니다. |
| [파이프라인 실패 원인][16] | 파이프라인 실패 원인 | 오류 메시지에서 파이프라인 실패 원인을 파악합니다. |
| [임계 경로의 CI 작업 필터링][17] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [실행 시간][18] | 실행 시간  | 파이프라인이 작업을 실행하는 데 소요된 시간을 확인합니다. |

다음 TeamCity 버전이 지원됩니다.

- TeamCity 2021.2 이상

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 TeamCity 간의 개념 매핑 관계를 보여줍니다.

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| 파이프라인                   | 빌드 체인 |
| 작업                        | 빌드       |
| _Datadog에서 사용할 수 없음_ | 단계        |

## Datadog 통합 구성 {#configure-the-datadog-integration}

[TeamCity][1]와 Datadog CI Visibility 간의 통합은 TeamCity 플러그인을 통해 제공됩니다. Datadog CI 통합 플러그인의 [소스 코드][8]는 Apache 2.0 라이선스에 따라 오픈 소스입니다.

통합 설정 방법:

1. TeamCity 서버에서 다음 경로로 이동하여 [Datadog CI Integration 플러그인][5]을 다운로드합니다.
{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} -> {{< ui >}}Browse Plugin Repository{{< /ui >}}.
2. 아직 복합 빌드가 없다면 빌드 체인의 마지막 빌드로 [TeamCity 복합 조건 빌드][6]를 추가합니다. 이 빌드는 체인의 기존 마지막 빌드에 종속되어야 하며, 다른 빌드가 이 빌드에 종속되어서는 안 됩니다.

   플러그인은 복합 조건 빌드로 끝나지 않는 빌드 체인을 무시합니다. 예를 들어, `Aggregating Results`가 마지막 복합 조건 빌드인 빌드 체인을 살펴보겠습니다.

   {{< img src="ci/teamcity_build_chain.png" alt="마지막에 복합 조건 빌드가 있는 TeamCity 빌드 체인" style="width:100%;">}}

   최종 복합 조건 빌드에는 VCS Root가 연결되고 [VCS Trigger][13]가 구성되는 등 버전 제어 설정이 올바르게 적용되어 있어야 합니다.

3. TeamCity 프로젝트에는 다음 구성 파라미터가 있어야 합니다.

   * **datadog.ci.api.key**: [Datadog API 키][2]입니다. 플러그인 0.0.5 이상 버전에서 **Password** 유형을 지원합니다.
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}
   * **datadog.ci.enabled**: `true`(특정 프로젝트에서 플러그인을 비활성화하려면 `false`를 사용할 수 있습니다).

   이 파라미터는 TeamCity 하위 프로젝트 또는 [TeamCity 루트 프로젝트][10]에 추가할 수 있습니다. 루트 프로젝트에 추가되면 모든 하위 프로젝트로 전파됩니다. 예를 들어, 모든 프로젝트에서 플러그인을 활성화하려면 루트 프로젝트에 `datadog.ci.enabled`를 추가하고 값을 `true`로 설정합니다.

   구성 파라미터 정의에 대한 자세한 내용은 [TeamCity 프로젝트 계층 구조 설명서][9]를 참조하세요.

4. 플러그인을 활성화하려면 {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} 페이지에서 {{< ui >}}Enable uploaded plugins{{< /ui >}}를 클릭합니다.
또는 TeamCity 서버를 다시 시작합니다.

## 고급 구성 {#advanced-configuration}

### Git 사용자 정보 구성 {#configure-git-user-information}

플러그인은 [TeamCity 사용자 이름 스타일][7]을 기반으로 Git 작성자 이름과 이메일을 검색합니다. Datadog은 {{< ui >}}Author Name and Email{{< /ui >}} 또는 {{< ui >}}Author Email{{< /ui >}} 사용자 이름 스타일을 사용할 것을 권장합니다. 이러한 스타일은
사용자 이메일 정보를 제공하기 때문입니다.

다른 사용자 이름 스타일 중 하나({{< ui >}}UserId{{< /ui >}} 또는 {{< ui >}}Author Name{{< /ui >}})를 사용하면, 플러그인은 사용자 이름에 `@Teamcity`를 추가하여 사용자 이메일 주소를 자동으로 생성합니다. 예를 들어, {{< ui >}}UserId{{< /ui >}} 사용자 이름 스타일을 사용하고 Git 작성자 사용자 이름이 `john.doe`인 경우, 플러그인은 `john.doe@Teamcity`를 Git 작성자 이메일 주소로 생성합니다. 사용자 이름 스타일은 [VCS 루트][11]에 대해 정의되며, VCS 루트 설정에서 수정할 수 있습니다.

<div class="alert alert-danger"> Git 작성자의 이메일 주소는
<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility">요금 청구</a>에 사용되므로,
이메일 주소를 제공하지 않는 사용자 이름 스타일
(<strong>UserId</strong> 또는 <strong>Author Name</strong>)을 사용하면 요금에 영향을 미칠 수 있습니다. 사용 사례에 관한 질문이 있다면 <a href="/help/">Datadog 지원팀에 문의해 주세요</a>.
</div>

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

파이프라인이 완료된 후 [**CI 파이프라인 목록**][3] 및 [**실행**][4] 페이지에서 데이터를 확인합니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리][12]를 참조합니다.

## 문제 해결 {#troubleshooting}

Datadog CI Integration 플러그인에서 생성된 모든 로그는 `teamcity-server.log` 파일에 저장되며,
TeamCity 서버에서 {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Diagnostic{{< /ui >}} -> {{< ui >}}Server Logs{{< /ui >}}로 이동하여 확인할 수 있습니다.
플러그인 관련 문제에 대한 추가 정보를 확인하려면 이 로그를 검토하세요.

### 테스트 실행이 TeamCity 작업에 연결되지 않음 {#test-runs-are-not-linked-to-teamcity-jobs}

Datadog CI Integration 플러그인은 TeamCity 파이프라인 또는 작업 실행을 Test Optimization의 테스트 실행과 연관시키지 않습니다. 테스트가 Test Optimization에 표시되더라도 해당 CI Visibility 작업에는 **테스트 실행: 0**이 표시될 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/configuring-vcs-roots.html
[12]: /ko/continuous_integration/search/#search-for-pipelines
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /ko/glossary/#partial-retry
[15]: /ko/glossary/#queue-time
[16]: /ko/glossary/#pipeline-failure
[17]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /ko/glossary/#pipeline-execution-time