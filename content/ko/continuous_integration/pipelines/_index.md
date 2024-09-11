---
aliases:
- /ko/continuous_integration/pipelines_setup/
- /ko/continuous_integration/explore_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci pipeline
    - ci pipelines
further_reading:
- link: /monitors/types/ci/
  tag: 설명서
  text: CI Pipeline 모니터 생성
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
title: Datadog의 Pipeline Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트 ({{< region-param key="dd_site_name" >}})에서는 현재 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

[**Pipelines**][1] 페이지는 파이프라인의 중요한 메트릭과 결과를 표시하여 CI 상태에 대한 파이프라인 우선 보기를 제공합니다. 파이프라인을 유지 보수하는 대신 관련 코드를 유지 보수하므로 가장 우려되는 성능 문제나 테스트 실패를 조사하는 데 도움이 됩니다.

## 설정

{{< whatsnext desc="Datadog에서 Pipeline Visibility를 설정하기 위해 해당 CI 공급자를 선택하세요:" >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}커스텀 명령{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_metrics" >}}커스텀 태그 및 메트릭{{< /nextlink >}}
{{< /whatsnext >}}

CI 공급자가 지원되지 않는 경우 [공용 API 엔드포인트][2]를 통해 Pipeline Visibility를 설정할 수 있습니다.

## 파이프라인 탐색

파이프라인을 확인려면 **CI** > **Pipelines**로 이동합니다.

## 파이프라인 상태 개요

파이프라인 페이지에는 선택한 기간 동안 각 파이프라인의 기본 브랜치에 대한 집계 통계와 최근 파이프라인 실행 상태가 표시됩니다. 이 페이지를 통해 모든 파이프라인을 확인하고 상태를 빠르게 확인할 수 있습니다. 파이프라인 페이지에는 _default_ 브랜치에 대한 메트릭이 표시되고, 일반적으로 이름은 `main` 또는 `prod`입니다.

표시되는 메트릭에는 빌드 빈도, 실패율, 평균 기간, 95번째 백분위수 기간이 포함됩니다.이 정보를 통해 사용률이 높고 잠재적으로 리소스 소비량이 많은 파이프라인을 찾아낼 수 있습니다. 마지막 빌드 결과, 기간, 마지막 런타임은 마지막 커밋의 효과를 나타냅니다.

파이프라인 이름으로 페이지를 필터링하여 가장 관심 있는 파이프라인을 볼 수 있습니다. 지연 또는 오류가 발생한 파이프라인을 클릭하면 성능 저하 또는 빌드 오류를 유발했을 커밋에 대한 정보를 확인할 수 있습니다.

## 파이프라인 상세 정보 및 브랜치

특정 파이프라인을 클릭하면 _Pipeline Details_ 페이지에서 지정된 기간 동안 선택한 파이프라인의 데이터를 확인할 수 있습니다. 또한, 기본값 이외의 브랜치도 확인할 수 있습니다.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="단일 파이프라인에 대한 세부 정보" style="width:100%;">}}

총 실행 횟수 및 실패 횟수, 빌드 기간 백분위수, 단계별 총 소요 시간 분석 등 선택한 파이프라인에 대한 인사이트를 얻을 수 있습니다. 또한 단계 및 작업에 대한 요약 테이블이 있어 기간, 전체 실행 시간의 백분위수 또는 실패율로 빠르게 정렬할 수 있습니다.



파이프라인의 _default_ 브랜치를 볼 때 페이지의 각 스테이지 및 작업 요약 테이블에는 스테이지 및 작업 기간의 절대적 및 상대적 변화를 시각화하는 _Duration Change_ 그래프 및 _Errored Executions_ 그래프가 포함되어 있습니다.

{{< img src="ci/pipeline_job_summary_duration_change.png" alt="작업 요약 테이블" style="width:100%;">}}

파이프라인의 피처 브랜치를 볼 때 _Errored Executions_에 대한 두 개의 그래프가 표시됩니다. 하나는 이 피처 브랜치에서 실패한 실행에 대한 것이고, 다른 하나는 이 브랜치의 실패를 다른 실패와 비교하는 데 사용됩니다. `Other Branches`와 `Specific Branch` 사이를 전환할 수 있는 옵션이 있습니다. `Other Branches`를 선택하면 이 피처 브랜치에서 실패한 실행을 다른 모든 브랜치에서 집계된 실패와 비교하여 도입된 (로컬) 실행 실패와 승계된 (글로벌) 실행 실패를 구별할 수 있습니다. `Specific Branch`를 선택하면 이 피처 브랜치의 실행 실패와 선택한 다른 브랜치의 실행 실패를 직접 비교하여 파이프라인의 성능 변화를 구체적으로 추적할 수 있습니다.

필요시 이 피처 브랜치에서 실패한 실행을 선택한 다른 브랜치에서 실패한 실행과 직접 비교할 수 있습니다.

{{< img src="ci/pipeline_stage_summary_feature_branch.png" alt="스테이지 요약 테이블" style="width:100%;">}}

하단의 파이프라인 실행 목록에는 선택한 브랜치와 선택한 시간대 내에 파이프라인(또는 해당 스테이지 또는 작업)이 실행된 모든 시간이 표시됩니다. 왼쪽 패싯을 사용하여 확인하려는 파이프라인, 스테이지 또는 작업으로 목록을 정확하게 필터링합니다.

### 서비스, 리소스, 네트워크 이벤트 연결 탐색

실행 중 하나를 클릭하여 파이프라인 실행 보기를 열고 파이프라인과 해당 스테이지의 프레임 그래프 또는 스팬 목록을 확인합니니다. 왼쪽의 _Executions (n)_ 목록을 사용하면 동일한 커밋으로 파이프라인을 다시 시도할 때마다 데이터에 빠르게 액세스할 수 있습니다.

CI 제공자 링크 (다음 이미지에 있는 `gitlab-ci gitlab.pipeline > documentation`)를 클릭하면 특정 파이프라인, 스테이지, 작업에 대한 리소스, 서비스, 분석 페이지를 자세히 볼 수 있습니다. 전체 태그 정보와 네트워크 모니터링 이벤트에 대한 링크도 확인할 수 있습니다.

{{< img src="ci/ci-pipeline-execution.png" alt="파이프라인 실행에 대한 트레이스 정보" style="width:100%;">}}

### 로그 연결 탐색

CI 제공자에 대해 작업 로그 수집이 지원되고 활성화되어 있는 경우 파이프라인 실행 보기의 _Logs_ 탭에서 관련 로그 이벤트를 볼 수 있습니다.

**참고**: Job 로그 수집은 다음 제공자에 한하여 지원됩니다:
- [GitHub Actions][3]
- [GitLab][4] (베타 버전)
- [Jenkins][5]

## 파이프라인 실행 상세 정보 및 트레이스

[Pipeline Executions][6] 페이지에서 선택한 기간 동안의 파이프라인 실행 집계 데이터를 볼 수 있습니다. 검색 필드와 패싯을 사용하여 자세히 확인하려는 실행으로 목록 범위를 좁힙니다. 상단의 버튼을 사용하여 파이프라인, 스테이지 또는 작업을 표시하도록 목록을 변경합니다.

다음 세 가지 그래프는 가장 활성화된 파이프라인의 기간, 시간 경과에 따라 실패한 파이프라인, 누적 시간으로 토글할 수 있는 옵션이 있는 파이프라인 실행을 각각 시각화한 것입니다. 그래프는 왼쪽 상단에서 선택한 레벨 (`Pipeline`, `Stage`, `Job` 등)로 범위가 지정됩니다. 

{{< img src="ci/pipeline_explorer_trends.png" alt="탐색기 뷰 트렌드 그래프" style="width:100%;">}}

각 파이프라인 실행은 스테이지 및 작업 정보를 포함하는 트레이스로 보고됩니다. 목록에서 실행을 클릭하면 개별 파이프라인, 스테이지, 작업 실행 트레이스에 액세스할 수 있습니다 (파이프라인 세부 정보 페이지에서 파이프라인 실행을 클릭하는 것과 유사함).

또는  [**Analytics**][7] 버튼을 클릭해 파이프라인 실행 데이터를 대화형으로 필터링하고 그룹화하여 질문에 대답하거나 대시보드에서 공유하는 데 사용할 수 있습니다.

{{< img src="ci/ci-pipelines-execution.png" alt="파이프라인 실행을 위한 분석" style="width:100%;">}}

## CI 파이프라인 데이터 사용

[대시보드][8]나 [노트북][9]을 만들 때 검색 쿼리에서 CI 파이프라인 데이터를 사용하면 시각화 위젯 옵션이 업데이트됩니다. 자세한 내용은 [대시보드][10] 및 [노트북 설명서][11]를 참고하세요. 

## 파이프라인 데이터 경고

**Export** 버튼을 클릭하여 [**Pipelines Executions** 페이지][6] 또는 [**Test Runs** 페이지][13]에서  [CI Pipeline 모니터][12]로 검색 쿼리를 내보낼 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ci/pipelines
[2]: /ko/api/latest/ci-visibility-pipelines/#send-pipeline-event
[3]: /ko/continuous_integration/pipelines/github/#enable-log-collection
[4]: /ko/continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[5]: /ko/continuous_integration/pipelines/jenkins#enable-job-log-collection
[6]: https://app.datadoghq.com/ci/pipeline-executions
[7]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /ko/dashboards
[11]: /ko/notebooks
[12]: /ko/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs