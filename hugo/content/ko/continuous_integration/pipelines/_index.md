---
aliases:
- /ko/continuous_integration/pipelines_setup/
- /ko/continuous_integration/explore_pipelines/
- /ko/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci pipeline
    - ci pipelines
    - supported features
disable_sidebar: true
further_reading:
- link: /monitors/types/ci/
  tag: 문서
  text: CI 파이프라인 모니터 생성하기
- link: /account_management/billing/ci_visibility
  tag: 문서
  text: CI Visibility 청구에 대해 알아보기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
title: Datadog의 CI Pipeline Visibility
---
## 개요 {#overview}

[CI Visibility][1]는 파이프라인의 중요한 메트릭과 결과를 표시하여 CI 상태를 파이프라인 중심의 관점에서 제공합니다. 파이프라인 오류 문제를 해결하고 성능 병목 현상을 처리하며 시간이 지남에 따라 CI 성능 및 안정성을 추적하는 데 도움이 됩니다.

## 설정 {#setup}

Datadog에서 CI Visibility를 설정하려면 CI 공급자를 선택하세요.

{{< card-grid card_width="225px" >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="Azure DevOps 확장 프로그램" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="기타 CI 공급자" >}}
{{< /card-grid >}}

{{< whatsnext desc="사용자 지정 옵션은 다음 섹션을 참조하세요." >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}사용자 지정 명령{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}사용자 지정 태그 및 측정 지표{{< /nextlink >}}
{{< /whatsnext >}}

## 지원되는 기능 {#supported-features}

### Pipeline Visibility 및 실행 {#pipeline-visibility-and-execution}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | 기타 CI 공급자 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="로그 스토리지" >}}CI 공급자의 파이프라인 또는 작업 로그 스토리지입니다. 로그는 파이프라인 실행 보기의 <strong>로그</strong> 탭에 표시됩니다.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="인프라 상관관계" >}}Datadog Agent, CI 파이프라인 또는 작업 러너의 호스트 수준 정보를 CI 파이프라인 실행 데이터와 상관관계 분석합니다.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="실행 중인 파이프라인" >}}연관된 추적과 함께 실행 중인 파이프라인 실행을 식별합니다.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="실행 중인 작업" >}}연관된 추적과 함께 실행 중인 작업 실행을 식별합니다.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="부분 재시도" >}}부분 재시도(예: 작업의 하위 집합만 재시도된 경우)를 식별합니다.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="단계 세분성" >}}더 세분화된 가시성을 위해 단계 수준 스팬을 사용할 수 있습니다.{{< /ci-details >}} |  |  |  |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br />(_작업 스팬으로 표시됨_) |  |  {{< X >}} |
| {{< ci-details title="수동 단계" >}}전체 파이프라인에서 수동 승인 단계가 있는 작업을 식별합니다.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### 자동 분석 및 조치 {#automatic-analysis-and-actions}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | 기타 CI 공급자 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="로그 분석" >}}관련 로그에 LLM 모델을 사용하여 실패한 CI 작업의 근본 원인을 분석합니다. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">추가 정보</a>.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | |  |  |
| {{< ci-details title="임계 경로" >}}파이프라인의 임계 경로에 있는 CI 작업을 식별합니다. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">추가 정보</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="자동 작업 재시도" >}}Datadog은 AI 오류 모델이 일시적인 것으로 분류한 실패 작업을 재시도합니다. <a href="https://docs.datadoghq.com/continuous_integration/pipelines/automatic_retries/">추가 정보</a>.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  |  |

### 기간 분석 {#duration-breakdown}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | 기타 CI 공급자 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="실행 시간" >}}파이프라인이 작업을 활발하게 실행한 시간입니다.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="대기 시간" >}}파이프라인 또는 작업이 실행되기 전에 대기열에 있었던 시간입니다.{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="승인 대기 시간">}}파이프라인 또는 작업이 수동 승인을 기다린 시간입니다.{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### 사용자 지정 및 확장성 {#customization-and-extensibility}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | 기타 CI 공급자 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="사용자 지정 명령" >}}datadog-ci를 사용하여 명령 수준 이벤트를 CI Visibility로 전송해 파이프라인 워터폴 시각화에 통합할 수 있도록 지원합니다. 그런 다음 <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">이러한 이벤트</a>를 쿼리하고 분석할 수 있습니다. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="정적 태그" >}}실행 간에 변경되지 않는 CI 공급자의 정적 파이프라인 태그 설정을 지원합니다.{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="런타임 태그" >}}CI Visibility의 파이프라인 및 작업에 <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">사용자 정의 텍스트 및 숫자 태그</a>를 추가할 수 있도록 지원합니다.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="파라미터" >}}사용자가 설정하는 사용자 지정 파이프라인 파라미터 추가를 지원합니다(예: <code>DYNAMICS_IS_CHILD:true</code>). 그런 다음 <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a>에서 이러한 파라미터를 사용하여 검색해 특정 파라미터가 있는 이벤트를 모두 찾을 수 있습니다.{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## CI 파이프라인 데이터 사용 {#use-ci-pipelines-data}

[대시보드][8] 또는 [노트북][9]을 생성하는 경우 검색 쿼리에서 CI 파이프라인 데이터를 사용할 수 있으며, 이는 시각화 위젯 옵션을 업데이트합니다. 자세한 내용은 [Dashboards][10] 및 [Notebooks 문서][11]를 참조하세요.

## 파이프라인 데이터 경보 {#alert-on-pipeline-data}

{{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 [{{< ui >}}Executions{{< /ui >}} 페이지][6] 또는 [{{< ui >}}Test Runs{{< /ui >}} 페이지][13]에서 [CI 파이프라인 모니터링][12]로 검색 쿼리를 내보낼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /ko/dashboards
[11]: /ko/notebooks
[12]: /ko/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs
[14]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/