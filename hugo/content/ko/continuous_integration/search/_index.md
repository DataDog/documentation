---
aliases:
- /ko/continuous_integration/explorer/search/
description: CI 파이프라인을 검색하는 방법을 알아보십시오.
further_reading:
- link: /continuous_integration/explorer
  tag: 문서
  text: 파이프라인 실행 검색하고 필터링하기
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: 문서
  text: 파이프라인 지속 시간을 줄이기 위해 임계 경로상의 CI 작업을 식별하십시오.
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: 문서
  text: 로그 분석을 사용하여 실패한 CI 작업의 근본 원인을 식별하십시오.
title: CI 파이프라인 검색 및 관리
---
## 개요 {#overview}

[Pipelines 페이지][1]는 서비스의 빌드 파이프라인을 모니터링하려는 개발자에게 유용합니다.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

이 페이지는 다음 질문에 대한 답변을 제공합니다:

- 서비스 파이프라인이 특히 기본 브랜치에서 성능이 우수하고 안정적입니까?
- 그렇지 않다면, 근본 원인은 무엇입니까?

다음과 같은 고급 누적 데이터 및 트렌드에도 액세스할 수 있습니다:

- 파이프라인 실행 및 브랜치에 대한 집계 통계를 포함하여 전체 빌드 시스템의 상태를 개괄적으로 보여줍니다.
- 프로덕션 파이프라인 중단과 같은 즉각적이고 긴급한 문제를 빠르게 파악하고 해결할 수 있는 창입니다.
- 각 파이프라인이 시간이 지남에 따라 어떻게 실행되었는지, 그리고 그 결과와 트렌드는 어떠한지 보여줍니다.
- 시간이 지남에 따라 각 빌드 스테이지에서 시간이 어디에 소요되는지 분석하여, 가장 큰 개선 효과를 낼 수 있는 부분에 집중할 수 있도록 합니다.

## 파이프라인 검색 {#search-for-pipelines}

파이프라인을 보려면 [**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1]로 이동하십시오.

[Pipelines 페이지][1]는 선택한 기간 동안 각 파이프라인의 기본 브랜치에 대한 집계 통계와 최신 파이프라인 실행 상태를 보여줍니다. 이 페이지를 사용하여 모든 파이프라인을 확인하고 상태를 빠르게 파악하십시오. 기본 브랜치(일반적으로 `main` 또는 `prod`으로 명명됨)와 관련된 Git 정보가 있는 파이프라인과 Git 정보가 없는 파이프라인만 이 페이지에 표시됩니다.

표시되는 메트릭에는 빌드 빈도, 실패율, 중앙값 지속 시간, 그리고 절대 및 상대 기준의 중앙값 지속 시간 변화가 포함됩니다. 이 정보는 어떤 파이프라인이 사용량이 많고 잠재적으로 리소스를 많이 소비하는지, 또는 회귀 현상을 겪고 있는지를 보여줍니다. 마지막 빌드 결과, 기간 및 마지막 런타임은 마지막 커밋의 영향을 보여줍니다.

파이프라인 이름별로 페이지를 필터링하여 가장 관심 있는 파이프라인을 확인할 수 있습니다. 느리거나 실패하는 파이프라인을 클릭하여 성능 저하나 빌드 오류를 유발했을 수 있는 커밋을 보여주는 세부 정보를 확인하십시오. [Datadog Teams][6]를 사용하는 경우 팀 핸들과 일치하는 [사용자 지정 태그][7]를 사용하여 팀과 관련된 특정 파이프라인을 필터링할 수 있습니다.

## 파이프라인 세부 정보 및 실행 {#pipeline-details-and-executions}

특정 파이프라인을 클릭하여 지정된 시간 범위 동안 선택한 파이프라인에 대한 데이터 조회를 제공하는 {{< ui >}}Pipeline Details{{< /ui >}} 페이지를 확인하십시오.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="단일 파이프라인에 대한 파이프라인 세부 정보 페이지" style="width:100%;">}}

시간 경과에 따른 총 실행 및 실패 실행, 빌드 기간 백분위수, 오류율, 스테이지별 총 소요 시간 분석과 같은 선택한 파이프라인에 대한 인사이트를 얻으십시오. 스테이지 및 작업에 대한 요약 테이블도 있으므로 기간, 전체 실행 시간 비율 또는 실패율을 기준으로 빠르게 정렬할 수 있습니다.

파이프라인 실행 목록은 선택한 시간 범위 동안 선택한 브랜치에 대해 해당 파이프라인(또는 해당 스테이지나 작업)이 실행된 모든 횟수를 보여줍니다. 왼쪽의 패싯을 사용하여 보려는 파이프라인, 스테이지 또는 작업을 정확하게 필터링하십시오.

### 임계 경로 강조 표시 {#highlight-critical-path}

트레이스에서 임계 경로를 강조 표시하려면 파이프라인 실행 페이지에서 {{< ui >}}Critical path{{< /ui >}} 확인란을 클릭하십시오.

임계 경로는 파이프라인의 전체 실행 시간을 단축하려는 경우 속도를 높여야 하는 스팬을 강조 표시합니다. CI 작업이 임계 경로에 있다는 것은 실행 시간 측면에서 트레이스를 통과하는 가장 긴 경로의 일부임을 의미합니다. CI 파이프라인의 속도를 높이려면 임계 경로에 있는 CI 작업의 속도를 높이는 것이 반드시 필요합니다.

[이 가이드][11]를 사용하여 임계 경로에 있는 CI 작업을 식별함으로써 CI 파이프라인의 전체 기간을 단축하기 위해 우선순위를 지정할 작업을 결정할 수 있습니다.

### 서비스, 리소스, 네트워크 이벤트 연결 탐색 {#explore-connections-to-services-resources-and-network-events}

실행 중 하나를 클릭하여 파이프라인 실행 목록을 열고 파이프라인 및 해당 스테이지에 대한 플레임 그래프나 스팬 목록을 확인하십시오. 왼쪽의 {{< ui >}}Executions (n){{< /ui >}} 목록을 사용하면 동일한 커밋에 대한 파이프라인의 각 재시도 데이터에 빠르게 액세스할 수 있습니다.

CI 공급자 링크(`gitlab-ci gitlab.pipeline > documentation` 다음 이미지 참조)를 클릭하여 파이프라인, 스테이지 또는 작업에 대한 리소스, 서비스 또는 분석 페이지를 구체적으로 조사하십시오. 전체 태그 정보와 네트워크 모니터링 이벤트에 대한 링크도 찾을 수 있습니다.

{{< img src="ci/ci-pipeline-execution.png" alt="트레이스 정보 및 플레임그래프 표시가 포함된 파이프라인 실행 조회" style="width:100%;">}}

### 로그 연결 탐색 {#explore-connections-to-logs}

CI 공급자에 대해 로그 스토리지가 활성화된 경우, 파이프라인 실행 슬라이드아웃 패널의 {{< ui >}}Logs{{< /ui >}} 탭에서 특정 파이프라인 실행과 관련된 로그 이벤트를 조회할 수 있습니다.

로그 스토리지는 다음 공급자에 대해 지원됩니다:

- [AWS CodePipeline][8]
- [Azure][9]
- [Buildkite][13]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### 관련 로그 기반 로그 분석 {#logs-analysis-based-on-relevant-logs}

CI Visibility는 LLM 모델을 사용하여 모든 실패한 CI 작업에서 수집된 관련 로그를 기반으로 향상된 오류 메시지를 생성하고 도메인 및 하위 도메인별로 분류합니다.

[로그 분석][12]을 사용하여 CI 작업 실패의 가장 일반적인 근본 원인을 파악하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /ko/continuous_integration/pipelines/github/#logs-storage
[4]: /ko/continuous_integration/pipelines/gitlab/#logs-storage
[5]: /ko/continuous_integration/pipelines/jenkins#logs-storage
[6]: /ko/account_management/teams/
[7]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ko/continuous_integration/pipelines/awscodepipeline/#logs-storage
[9]: /ko/continuous_integration/pipelines/azure/#logs-storage
[10]: /ko/continuous_integration/pipelines/circleci/#logs-storage
[11]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[13]: /ko/continuous_integration/pipelines/buildkite/#logs-storage