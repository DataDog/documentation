---
aliases:
- /ko/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: 문서
  text: 파이프라인 실행 결과 및 성능 탐색하기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: 문서
  text: 사용자 지정 태그 및 측정값을 추가하여 Pipeline Visibility 확장하기
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 GitHub Actions 워크플로우 모니터링하기
title: CI Visibility를 위한 GitHub Actions 설정
---
## 개요 {#overview}

[GitHub Actions][1]는 GitHub에서 코드를 빌드, 테스트 및 배포할 수 있게 해주는 자동화 도구입니다. 개발 프로세스의 모든 단계를 자동화하는 워크플로를 생성하여 소프트웨어 업데이트를 간소화하고 리포지토리에 통합된 CI/CD 기능으로 코드 품질을 개선할 수 있습니다.

워크플로 실행을 추적하고, 성능 병목 현상을 식별하며, 운영 문제를 해결하고, 배포 프로세스를 최적화하도록 GitHub Actions에 대해 CI Visibility를 설정할 수 있습니다.

### 호환성 {#compatibility}

| Pipeline Visibility | 플랫폼 | 정의 |
|---|---|---|
| [실행 중인 파이프라인][2] | 실행 중인 파이프라인 | 실행 중인 파이프라인 실행을 조회합니다. 대기열에 있거나 대기 중인 파이프라인은 Datadog에서 '실행 중' 상태로 표시됩니다. |
| [실행 중인 작업][28] | 실행 중인 작업 | 현재 실행 중인 작업 실행을 조회합니다. |
| [로그 분석][23] | 로그 분석 | 관련 로그에 LLM 모델을 사용하여 실패한 CI 작업의 근본 원인을 분석합니다. |
| 로그 상관관계 | 로그 상관관계 | 파이프라인 및 작업 스팬을 로그와 상호 연결합니다. [로그 스토리지](#logs-storage)가 필요합니다. |
| [부분 재시도][3] | 부분 파이프라인 | 부분적으로 재시도된 파이프라인 실행을 조회합니다. |
| [자동 작업 재시도][27] | 자동 작업 재시도 | Datadog은 AI 오류 모델에 의해 일시적인 것으로 분류된 실패 작업을 재시도합니다. |
| 인프라 메트릭 상관관계 | 인프라 메트릭 상관관계 | GitHub 작업에 대해 작업을 [인프라 호스트 메트릭][4]과 상호 연결합니다. |
| [런타임 시][5] [사용자 지정 태그 및 측정값][6] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][7]을 구성합니다. |
| [대기 시간][8] | 대기 시간 | 파이프라인의 작업이 처리되기 전까지 대기열에서 기다리는 시간을 조회합니다. |
| [승인 대기 시간][9] | 승인 대기 시간 | 워크플로 실행 및 워크플로 작업이 수동 승인을 기다리는 시간을 조회합니다. |
| [사용자 지정 스팬][10] | 사용자 지정 스팬 | 파이프라인에 대한 사용자 지정 스팬을 구성합니다. |
| [임계 경로의 CI 작업 필터링][24] | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다. |
| [실행 시간][25] | 실행 시간  | 파이프라인이 작업을 실행하는 데 걸린 시간을 조회합니다. |


다음 GitHub 버전이 지원됩니다.

- GitHub.com(SaaS)
- GitHub Enterprise Server(GHES) 3.5.0 이상

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 GitHub Actions 간의 개념 매핑을 보여줍니다.

| Datadog  | GitHub Actions |
|----------|----------------|
| 파이프라인 | 워크플로       |
| 작업      | 작업            |
| 단계     | 단계           |

## Datadog 통합 구성 {#configure-the-datadog-integration}

### GitHub App 구성 {#configure-a-github-app}

[GitHub Actions][1] 통합은 프라이빗 [GitHub App][11]을 사용하여 워크플로 정보를 수집합니다. 이미 앱이 있는 경우 다음 섹션으로 건너뛸 수 있습니다.

1. [GitHub 통합 타일][12]로 이동합니다.
2. {{< ui >}}\+ Create GitHub App{{< /ui >}}을 클릭합니다.
3. 개인 또는 조직 계정에 대한 통합을 구성하고 GitHub 조직 이름을 입력합니다.
3. GitHub App에 대해 활성화할 Datadog 기능을 선택합니다.
4. {{< ui >}}Edit Permissions{{< /ui >}} 섹션에서 `Actions: Read Only` 액세스 권한을 부여합니다.
5. {{< ui >}}Create App in GitHub{{< /ui >}}를 클릭하여 GitHub에서 앱 생성 프로세스를 완료합니다.
6. 앱 이름을 지정합니다(예: `Datadog CI Visibility`).
7. {{< ui >}}Install GitHub App{{< /ui >}}을 클릭하고 GitHub의 지침을 따릅니다.

### GitHub Actions에 대해 CI Visibility 구성 {#configure-ci-visibility-for-github-actions}

GitHub App을 만들고 설치한 후 가시성을 확보하려는 계정 및/또는 리포지토리에서 CI Visibility를 활성화하세요.

1. Datadog에서 [**Software Delivery** > **CI Visibility** > **파이프라인 공급자 추가**][13]로 이동하여 **GitHub**를 선택합니다.
2. 활성화하려는 계정에 대해 {{< ui >}}Enable Account{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Enable CI Visibility{{< /ui >}} 옆의 토글을 클릭하여 전체 계정에 대한 CI Visibility를 활성화합니다.
4. 또는 리포지토리 목록을 스크롤하고 {{< ui >}}Enable CI Visibility{{< /ui >}} 토글을 클릭하여 개별 리포지토리를 활성화할 수 있습니다.

파이프라인은 계정 또는 리포지토리에 대해 CI Visibility를 사용 설정한 직후에 나타납니다.

### GitHub Actions에 대해 CI Visibility 비활성화 {#disable-ci-visibility-for-github-actions}

CI Visibility GitHub Actions 통합을 비활성화하려면 다음 단계를 따르세요.

1. [**CI/CD 최적화** > **설정** > **GitHub Actions**][14]를 엽니다.
2. CI Visibility를 비활성화할 GitHub 계정을 선택하고 {{< ui >}}Account Enabled{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Enable CI Visibility{{< /ui >}}를 끄거나 개별적으로 비활성화할 리포지토리를 선택합니다.

### 작업 로그 관리 {#manage-job-logs}

#### 로그 분석 {#logs-analysis}

로그 분석은 LLM 모델을 사용하여 GitHub Actions에서 제공되는 관련 로그를 기반으로 작업 실패를 근본 원인별로 분류합니다.

자세한 내용은 [Logs Analysis 사용][23] 가이드를 참조하세요.

로그 분석은 Datadog에서 기본적으로 활성화되어 있습니다. 로그 분석 설정을 관리하려면 [CI/CD 리포지토리 설정][29]으로 이동하여 Datadog 조직 수준 또는 원하는 리포지토리에 대해 로그 분석을 구성합니다.

PR 코멘트에 로그 분석을 추가할 수도 있습니다. [PR 코멘트 사용][26]에 대한 가이드를 참조하세요.

로그 분석이 활성화되어 있어야 [자동 작업 재시도][27]를 사용할 수 있습니다.

#### 로그 스토리지{#logs-storage}

로그 스토리지를 활성화하려면 [CI/CD 리포지토리 설정][29]으로 이동하여 Datadog 조직 수준 또는 원하는 리포지토리에 대해 로그 스토리지를 활성화하세요.

로그 스토리지는 CI Visibility와 별도로 청구됩니다. 로그 보존, 제외 및 인덱스는 [Log Management][16]에서 구성됩니다. GitHub 작업에 대한 로그는 `datadog.product:cipipeline` 및 `source:github` 태그로 식별할 수 있습니다.

작업 로그는 [Log Management][15]에서 수집되며, 저장되면 CI Visibility 내에서 GitHub Actions 워크플로와 자동으로 상관관계가 설정됩니다. 1GiB를 초과하는 로그 파일은 잘립니다.

### 인프라 메트릭을 작업과 상호 연관시키기 {#correlate-infrastructure-metrics-to-jobs}

GitHub Actions CI Visibility 통합을 통해 인프라와 작업 간의 상관관계를 설정할 수 있습니다. 이렇게 하려면 작업이 실행되는 호스트에서 [Datadog Agent][20]가 실행 중인지 확인하세요. 구성에 따라 추가 단계가 필요할 수 있습니다.

- [Actions Runner Controller][21]의 경우: 추가 설정이 필요하지 않습니다. Datadog Agent의 제한 사항으로 인해 Datadog Agent의 최소 수집 간격보다 짧은 작업은 인프라 상관관계 메트릭이 항상 표시되지 않을 수 있습니다. 이 값을 조정하려면 [Agent 구성 파일][22]에서 `min_collection_interval`을 15초 미만으로 설정하세요.

- 다른 구성의 경우: 작업을 실행 중인 호스트와 상관관계를 설정하려면 GitHub 러너 이름이 머신의 호스트 이름과 일치해야 합니다.

메트릭을 보려면 트레이스 조회에서 작업 스팬을 클릭합니다. 창이 열리고 여기에는 호스트 메트릭을 표시하는 {{< ui >}}Infrastructure{{< /ui >}} 탭이 있습니다.

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

파이프라인이 완료되면 [**CI Pipeline List**][17]와 [**Executions**][18] 페이지가 채워집니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리하기][19]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: /ko/glossary/#running-pipeline
[3]: /ko/glossary/#partial-retry
[4]: /ko/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[5]: /ko/glossary/#custom-tag
[6]: /ko/glossary/#measure
[7]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ko/glossary/#queue-time
[9]: /ko/glossary/#approval-wait-time
[10]: /ko/glossary/#custom-span
[11]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[12]: https://app.datadoghq.com/integrations/github/
[13]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[14]: https://app.datadoghq.com/ci/settings/ci-cd/github
[15]: /ko/logs/
[16]: /ko/logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /ko/continuous_integration/search/#search-for-pipelines
[20]: /ko/agent
[21]: https://github.com/actions/actions-runner-controller
[22]: /ko/agent/configuration/agent-configuration-files/
[23]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[24]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[25]: /ko/glossary/#pipeline-execution-time
[26]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[27]: /ko/continuous_integration/pipelines/automatic_retries/
[28]: /ko/glossary/#running-job
[29]: https://app.datadoghq.com/ci/settings/ci-cd/repositories